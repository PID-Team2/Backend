const { authJwt } = require("../middlewares");

module.exports = app => {
    const questions = require("../controllers/question.controller.js");

    let router = require("express").Router();

    // Create a new question
    router.post("/", [authJwt.verifyToken], questions.create);

    // Retrieve all questions
    router.get("/", questions.findAll);

    // Retrieve a single question with id
    router.get("/:id", questions.findOne);

    // Update a question with id
    router.put("/:id", [authJwt.verifyToken], questions.update);

    // Delete a question with id
    router.delete("/:id",  [authJwt.verifyToken], questions.delete);

    app.use('/api/question', router); // prefix for all routes
};