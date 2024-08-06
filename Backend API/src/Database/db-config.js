const { Sequelize } = require('sequelize');
const { MySqlDialect } = require('@sequelize/mysql');

/*const dbContext = new Sequelize({
    dialect: 'sqlite',
    storage: './src/Database/backend-api.sqlite3'
  });*/

const dbContext = new Sequelize({
    dialect: 'mysql',
    database: 'backend-db',
    username: 'backend-api',
    password: 'NN.PyI@aIZaDK)k(',
    host: 'localhost',
    port: 3307
  });
   
dbContext.authenticate()
.then(() => {
  console.log('conected to MySql Server Database');
}).catch(error => {
  console.log(`Error: ${error}`);
})

async function testConnection() {
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

module.exports = dbContext;