const Sequelize = require('sequelize');

module.exports = new Sequelize(process.env.POSTGRES_URI, {
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

