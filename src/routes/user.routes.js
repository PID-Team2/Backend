const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  let router = require("express").Router();

  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

//------- routes example -------------------------
router.get("/test/all", controller.allAccess);

  router.get(
    "/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  router.get(
    "/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  ); 
  //----------------------------------------------

  router.get("/user", controller.findAll);

  router.get("/user/:id", controller.findOne);

  app.use('/api', router); // prefix for all routes
};
