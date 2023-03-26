const { authJwt } = require("../middlewares");

module.exports = app => {
    const answares = require("../controllers/answare.controller.js");

    let router = require("express").Router();

    // Create a new answare
    router.post("/", [authJwt.verifyToken], answares.create);

    // Retrieve all answares
    router.get("/", answares.findAll);

    // Retrieve a single answare with id
    router.get("/:id", answares.findOne);

    // Update an answare with id
    router.put("/:id", [authJwt.verifyToken], answares.update);

    // Delete an answare with id
    router.delete("/:id",  [authJwt.verifyToken], answares.delete);

    app.use('/api/answare', router); // prefix for all routes
};