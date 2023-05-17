const { authJwt } = require("../middlewares");

module.exports = app => {
    const project = require("../controllers/project.controller.js");

    let router = require("express").Router();

    // Create a new project
    router.post("/", [authJwt.verifyToken], project.create);

    // Retrieve all projects
    router.get("/", project.findAll);

    // Retrieve a single project with id
    router.get("/:id", project.findOne);

    // Update a project with id
    router.put("/:id", [authJwt.verifyToken], project.update);

    // Delete a project with id
    router.delete("/:id",  [authJwt.verifyToken], project.delete);

    app.use('/api/project', router); // prefix for all routes
};