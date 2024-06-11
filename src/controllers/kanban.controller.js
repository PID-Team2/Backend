const db = require("../models");
const User = db.user;
const Project = db.project;
const Kanban = db.kanban;
const KanbanCol = db.kanbancol;

const Op = db.Sequelize.Op;

// Create and Save a new Kanban
exports.create = async (req, res) => {
  // Validate request TODO: hacer una validacion real
  const { projectId } = req.body;
  if (!projectId) {
    res.status(400).send({
      message: "Project can not be empty!",
    });
    return;
  }
  // validate project
  const project = await Project.findByPk(projectId);
  if (!project) {
    res.status(400).send({
      message: "Project not found",
    });
    return;
  }

  // Create a Kanban
  const data = {
    projectId: projectId,
  };

  // Save Kanban in the database
  Kanban.create(data)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the kanban.",
      });
    });
};

// Retrieve all Members from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  let condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  Kanban.findAll({ where: condition, include: ["kanbancols"] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving questions.",
      });
    });
};

// Find a single Kanban with an id
// exports.findOne = (req, res) => {
//   const id = req.params.id;

//   Question.findByPk(id, {
//     include: {
//       model: User,
//       attributes: ["id", "username"],
//     },
//   })
//     .then((data) => {
//       if (data) {
//         res.send(data);
//       } else {
//         res.status(404).send({
//           message: `Cannot find Question with id =${id}.`,
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: "Error retrieving Question with id =" + id,
//       });
//     });
// };

// Update a Kanban by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Kanban.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Kanban was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Kanban with id=${id}. Maybe Kanban was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Kanban with id=" + id,
      });
    });
};

// Delete a Member with the specified id in the request
// exports.delete = (req, res) => {
//   const id = req.params.id;

//   Member.destroy({
//     where: { id: id },
//   })
//     .then((num) => {
//       if (num == 1) {
//         res.send({
//           message: "Member was deleted successfully!",
//         });
//       } else {
//         res.send({
//           message: `Cannot delete Member with id=${id}. Maybe Member was not found!`,
//         });
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).send({
//         message: "Could not delete Member with id=" + id,
//       });
//     });
// };

// Create and Save a new Kanban column
exports.createCol = async (req, res) => {
  // Validate request TODO: hacer una validacion real
  const { kanbanId, name } = req.body;
  if (!kanbanId) {
    res.status(400).send({
      message: "Kanban can not be empty!",
    });
    return;
  }

  // Create a Kanban col
  const data = {
    kanbanId: kanbanId,
    name: name,
  };

  // Save Kanban in the database
  KanbanCol.create(data)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the kanban column.",
      });
    });
};

// Update a Kanban column by the id in the request
exports.updateCol = (req, res) => {
  const id = req.params.id;

  KanbanCol.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Kanban col was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Kanban col with id=${id}. Maybe Kanban col was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Kanban col with id=" + id,
      });
    });
};

// Delete a Kanban col with the specified id in the request
exports.deleteCol = (req, res) => {
  const id = req.params.id;

  KanbanCol.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Kanban col was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Kanban col with id=${id}. Maybe Kanban col was not found!`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Could not delete Kanban col with id=" + id,
      });
    });
};
