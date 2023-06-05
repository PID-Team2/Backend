const db = require("../models");
const User = db.user;

//--------- controller methods example --------
exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};
//--------------------------------------------

exports.findAll = (req, res) => {
    User.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
    });
};
// Find a single user with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findOne({where: { id: id }, include: [
    {
      model: db.player,
      as: 'players'
    },
    {
      model: db.group,
      as: 'groups'
    }
]})
    .then(data => {
      if (data) {
        res.send({
          id: data.id,
          username: data.username,
          email: data.email,
          players: data.players,
          groups: data.groups
        });
      } else {
        res.status(404).send({
          message: `Cannot find User with id = ${id}.`
        });
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({
        message: "Error retrieving User with id = " + id
      });
    });
};