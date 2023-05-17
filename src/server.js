const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();
const app = express();

let corsOptions = {
  origin: "http://localhost:3000"  // ?
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
const db = require("./models");
const Role = db.role;

/* only the first time use force an initial()*/
db.sequelize.sync(/*{force: true}*/).then(() => {
  console.log('Sync Db');
 //initial();
}).catch((err) => {
    console.log("Failed to sync db: " + err.message)
});


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to codebrackets application." });
});

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/question.routes')(app);
require('./routes/answare.routes')(app);

require('./routes/group.routes')(app);
require('./routes/project.routes')(app);

require('./routes/player.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


// only the first time
function initial() {
    Role.create({
      id: 1,
      name: "user"
    });
   
    Role.create({
      id: 3,
      name: "admin"
    });
}