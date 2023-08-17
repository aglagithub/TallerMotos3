const { Sequelize } = require('sequelize');
const db = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'agla1313',
  database: 'tallerMotosDb',
  port: 5433,
  logging: false,
});
module.exports = { db };
