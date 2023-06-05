const { authJwt } = require("../middlewares");

module.exports = app => {
    const player = require("../controllers/player.controller.js");

    let router = require("express").Router();

    // Create a new player
    router.post("/", [authJwt.verifyToken], player.create);

    // Retrieve all players
    router.get("/", player.findAll);

    // Retrieve a single player with id
    router.get("/:id", player.findOne);

    // Update a player with id
    router.put("/:id", [authJwt.verifyToken], player.update);

    // Delete a player with id
    router.delete("/:id",  [authJwt.verifyToken], player.delete);

    // Retrieve all players for an user
    router.get("/user/:uid", player.findAllByUser);


    app.use('/api/player', router); // prefix for all routes
};