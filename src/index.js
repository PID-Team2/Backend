import app from "./app.js";
import { sequelize } from "./db/db.js";
// import './models/User.js'
// import './models/Question.js'

const port = process.env.PORT || 3000

async function main(){
    try {
        await sequelize.sync({force: true}); // sincronizar la bd, el force es para forzar la recreacion de las tablas 
        console.log('Connection with db has been established successfully.');
        app.listen(port)
        console.log('server on port', port)
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

main()