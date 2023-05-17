const db = require("../models");
const User = db.user;
const Group = db.group;

const Op = db.Sequelize.Op;

// Create and save a new Group
exports.create = async (req, res) => {
  // Validate request TODO: hacer una validacion real
  const {title, description, userAdminId} = req.body
  if (!title || !description || !userAdminId) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // validate user exist
  const userAdmin = await User.findByPk(userAdminId)
  if(!userAdmin){
    res.status(400).send({
        message: "User admin not found"
    });
    return;
  }

  // Create a Group
  const group = {
    title: title,
    description: description,
    userAdminId: userAdminId
  };

  // Save Group in the database
  Group.create(group)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Group."
      });
    });
};

// Retrieve all Groups from the database.
exports.findAll = (req, res) => {
    Group.findAll({include: ['user', {model: User}]}) // TODO: mejorar este join despues
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving groups."
        });
      });
  };

// Find a single Group with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Group.findByPk(id, {include: ['user', {model: User}]})
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Group with id =${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Group with id =" + id
        });
      });
  };

// Update a Group by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Group.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Group was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Group with id=${id}. Maybe Group was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Group with id=" + id
        });
      });
  };

// Delete a Group with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Group.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Group was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Group with id=${id}. Maybe Group was not found!`
          });
        }
      })
      .catch(err => {
        console.log(err)
        res.status(500).send({
          message: "Could not delete Group with id=" + id
        });
      });
  };

