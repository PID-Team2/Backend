const { authJwt } = require("../middlewares");

module.exports = (app) => {
  const kanban = require("../controllers/kanban.controller.js");

  let router = require("express").Router();

  // Create a new members
  router.post("/", [authJwt.verifyToken], kanban.create);

  // Retrieve all questions
  router.get("/", kanban.findAll);

  // Retrieve a single question with id
  //   router.get("/:id", questions.findOne);

  // Update a members with id
  //   router.put("/:id", [authJwt.verifyToken], members.update);

  // Delete a members with id
  //   router.delete("/:id", [authJwt.verifyToken], members.delete);

  // Create a new kanban col
  router.post("/col", [authJwt.verifyToken], kanban.createCol);

  app.use("/api/kanban", router); // prefix for all routes
};
