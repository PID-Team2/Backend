const db = require("../models");
const User = db.user;
const Question = db.question;
const Member = db.member;
const Project = db.project;

const Op = db.Sequelize.Op;

// Create and Save a new Question
exports.create = async (req, res) => {
  // Validate request TODO: hacer una validacion real
  const { projectRole, userId, projectId } = req.body;
  if (!userId) {
    res.status(400).send({
      message: "User can not be empty!",
    });
    return;
  }
  if (!projectId) {
    res.status(400).send({
      message: "Project can not be empty!",
    });
    return;
  }
  // validate user
  const user = await User.findByPk(userId);
  if (!user) {
    res.status(400).send({
      message: "User not found",
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

  // Create a Member
  const member = {
    projectRole: projectRole,
    userId: userId,
    projectId: projectId,
  };

  // Save Member in the database
  Member.create(member)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Member.",
      });
    });
};

// Retrieve all Members from the database.
// exports.findAll = (req, res) => {
//   const title = req.query.title;
//   let condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

//   Question.findAll({ where: condition, include: ["user"] })
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving questions.",
//       });
//     });
// };

// Find a single Member with an id
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

// Update a Member by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Member.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Member was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Member with id=${id}. Maybe Member was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Member with id=" + id,
      });
    });
};

// Delete a Member with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Member.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Member was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Member with id=${id}. Maybe Member was not found!`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Could not delete Member with id=" + id,
      });
    });
};
