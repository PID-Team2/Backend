const { authJwt } = require("../middlewares");

module.exports = (app) => {
  const members = require("../controllers/member.controller.js");

  let router = require("express").Router();

  // Create a new members
  router.post("/", [authJwt.verifyToken], members.create);

  // Retrieve all questions
  //   router.get("/", questions.findAll);

  // Retrieve a single question with id
  //   router.get("/:id", questions.findOne);

  // Update a members with id
  router.put("/:id", [authJwt.verifyToken], members.update);

  // Delete a members with id
  router.delete("/:id", [authJwt.verifyToken], members.delete);

  app.use("/api/member", router); // prefix for all routes
};
