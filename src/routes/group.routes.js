const { authJwt } = require("../middlewares");

module.exports = app => {
    const group = require("../controllers/group.controller.js");

    let router = require("express").Router();

    // Create a new group
    router.post("/", [authJwt.verifyToken], group.create);

    // Retrieve all groups
    router.get("/", group.findAll);

    // Retrieve a single group with id
    router.get("/:id", group.findOne);

    // Update a group with id
    router.put("/:id", [authJwt.verifyToken], group.update);

    // Delete a group with id
    router.delete("/:id",  [authJwt.verifyToken], group.delete);

    app.use('/api/group', router); // prefix for all routes
};