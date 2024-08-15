require('dotenv').config();
const { Sequelize } = require('sequelize');

/*const dbContext = new Sequelize({
    dialect: 'sqlite',
    storage: './src/Database/backend-api.sqlite3'
  });*/

const dbContext = new Sequelize({
    dialect: process.env.DB_DIALECT,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT
  });
   
dbContext.authenticate()
.then(() => {
  console.log('connected to MySql Server Database');
}).catch(error => {
  console.log(`Error: ${error}`);
})

module.exports = dbContext;