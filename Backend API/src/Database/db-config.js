const { Sequelize } = require('sequelize');

const dbContext = new Sequelize({
    dialect: 'sqlite',
    storage: './src/Database/backend-api.sqlite3'
  });

async function testConnection() {
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

module.exports = dbContext;