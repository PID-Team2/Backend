const { authJwt } = require("../middlewares");

module.exports = (app) => {
  const tasks = require("../controllers/task.controller.js");

  let router = require("express").Router();

  // Create a new task
  router.post("/", [authJwt.verifyToken], tasks.create);

  // Retrieve all tasks
  //router.get("/", tasks.findAll);

  // Retrieve a single task with id
  //router.get("/:id", tasks.findOne);

  // Update a task with id
  router.put("/:id", [authJwt.verifyToken], tasks.update);

  // Delete a task with id
  router.delete("/:id", [authJwt.verifyToken], tasks.delete);

  app.use("/api/task", router); // prefix for all routes
};
