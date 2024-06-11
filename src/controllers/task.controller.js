const db = require("../models");
const User = db.user;
const Question = db.question;
const Task = db.task;

const Op = db.Sequelize.Op;

// Create and Save a new Question
exports.create = async (req, res) => {
  // Validate request TODO: hacer una validacion real
  const {
    title,
    description,
    status,
    priority,
    startTime,
    completedAt,
    kanbancolId,
  } = req.body;
  if (!title || !description) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a task
  const data = {
    title: title,
    description: description,
    status,
    priority,
    startTime,
    completedAt,
    kanbancolId,
  };

  // Save Question in the database
  Task.create(data)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Task.",
      });
    });
};

// Retrieve all Tasks from the database.
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

// Find a single Question with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Task.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Task with id =${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Task with id =" + id,
      });
    });
};

// Update a Task by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Task.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Task was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Task with id=${id}. Maybe Task was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Task with id=" + id,
      });
    });
};

// Delete a Task with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Task.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Task was deleted successfully!",
        });
      } else {
        res.send({
          message: `Task delete Task with id=${id}. Maybe Question was not found!`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Could not delete Task with id=" + id,
      });
    });
};
