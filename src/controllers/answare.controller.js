const db = require("../models");
const User = db.user;
const Question = db.question;
const Answare = db.answare;

// Create and Save a new Question
exports.create = async (req, res) => {
  // Validate request TODO: hacer una validacion real
  const { description, userId, questionId } = req.body
  if (!description || !userId || !questionId) {
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

  // validate question
  const question = await Question.findByPk(questionId)
  if(!question){
    res.status(400).send({
        message: "Question not found"
    });
    return;
  }

  // Create a Answare
  const answare = {
    description: description,
    userId: userId,
    questionId: questionId
  };

  // Save Answare in the database
  Answare.create(answare)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Answare."
      });
    });
};

// Retrieve all Answares from the database.
exports.findAll = (req, res) => {
    Answare.findAll({ include:['user', 'question'] })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving answares."
        });
      });
  };

// Find a single Answare with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Answare.findByPk(id, {
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
            message: `Cannot find Answare with id = ${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Answare with id = " + id
        });
      });
  };

// Update a Answare by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Answare.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Answare was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Answare with id = ${id}. Maybe Answare was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Answare with id = " + id
        });
      });
  };

// Delete a Answare with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Answare.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Answare was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Answare with id = ${id}. Maybe Answare was not found!`
          });
        }
      })
      .catch(err => {
        console.log(err)
        res.status(500).send({
          message: "Could not delete Answare with id=" + id
        });
      });
  };

