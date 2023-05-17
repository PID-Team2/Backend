const db = require("../models");
const User = db.user;
const Player = db.player;

// const Op = db.Sequelize.Op;

// Create and save a new Player
exports.create = async (req, res) => {
  // Validate request TODO: hacer una validacion real
  const {name, userId} = req.body
  if (!name || !userId) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // validate user exist
  const user = await User.findByPk(userId)
  if(!user){
    res.status(400).send({
        message: "User admin not found"
    });
    return;
  }

  // Create a Player
  const palyer = {
    name,
    userId: userId
  };

  // Save player in the database
  Player.create(palyer)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Player."
      });
    });
};

// Retrieve all Players from the database.
exports.findAll = (req, res) => {
    Player.findAll({include: ['user']}) // TODO: mejorar este join despues
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving players."
        });
      });
  };

// Find a single Player with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Player.findByPk(id, {include: ['user']})
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Player with id =${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Player with id =" + id
        });
      });
  };

// Update a Player by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Player.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Player was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Player with id=${id}. Maybe Player was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Player with id=" + id
        });
      });
  };

// Delete a Player with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Player.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Player was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Player with id=${id}. Maybe Player was not found!`
          });
        }
      })
      .catch(err => {
        console.log(err)
        res.status(500).send({
          message: "Could not delete Player with id=" + id
        });
      });
  };

