const db = require("../models");
const User = db.user;
const Question = db.question;
const Answare = db.answare;

const Op = db.Sequelize.Op;

// Create and Save a new Question
exports.create = async (req, res) => {
  // Validate request TODO: hacer una validacion real
  const {title, description, userId} = req.body
  if (!title || !description || !userId) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // validate user
  const user = await User.findByPk(userId)
  if(!user){
    res.status(400).send({
        message: "User not found"
    });
    return;
  }

  // Create a Question
  const question = {
    title: title,
    description: description,
    userId: userId
  };

  // Save Question in the database
  Question.create(question)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Question."
      });
    });
};

// Retrieve all Questions from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    let condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
  
    Question.findAll({ where: condition, include:['user'] })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving questions."
        });
      });
  };

// Find a single Question with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Question.findByPk(id, {
        include: {
          model: User,
          attributes: ["id", "username"]
        }
      })
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Question with id =${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Question with id =" + id
        });
      });
  };

// Update a Question by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Question.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Question was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Question with id=${id}. Maybe Question was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Question with id=" + id
        });
      });
  };

// Delete a Question with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Question.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Question was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Question with id=${id}. Maybe Question was not found!`
          });
        }
      })
      .catch(err => {
        console.log(err)
        res.status(500).send({
          message: "Could not delete Question with id=" + id
        });
      });
  };

