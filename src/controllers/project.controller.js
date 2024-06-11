const db = require("../models");
const Project = db.project;
const Group = db.group;
const Kanban = db.kanban;
const Op = db.Sequelize.Op;

// Create and save a new Project
exports.create = async (req, res) => {
  // Validate request TODO: hacer una validacion real
  const {
    title,
    description,
    groupId,
    status,
    priority,
    startTieme,
    endTieme,
  } = req.body;
  if (!title || !description || !groupId) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // validate if group exist
  const group = await Group.findByPk(groupId);
  if (!group) {
    res.status(400).send({
      message: "Group not found",
    });
    return;
  }

  // Create a Project
  const project = {
    title: title,
    description: description,
    groupId: groupId,
    status,
    priority,
    startTieme,
    endTieme,
  };

  // Save Project in the database
  Project.create(project)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Project.",
      });
    });
};

// Retrieve all projects from the database.
exports.findAll = (req, res) => {
  Project.findAll({
    include: [
      {
        association: "group",
      },
      {
        association: "members",
        include: ["user"],
      },
      {
        association: "kanban",
        include: [
          {
            association: "kanbancols",
            include: ["tasks"],
          },
        ],
      },
    ],
  }) // TODO: mejorar este join despues
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving projects.",
      });
    });
};

// Find a single project with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Project.findByPk(id, { include: ["group", "member"] })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Project with id =${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Project with id =" + id,
      });
    });
};

// Update a Project by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Project.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Project was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Project with id=${id}. Maybe Project was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Project with id=" + id,
      });
    });
};

// Delete a Project with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Project.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Project was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Project with id = ${id}. Maybe Project was not found!`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Could not delete Project with id=" + id,
      });
    });
};
