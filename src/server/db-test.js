/* eslint-disable no-console */
const DATABASE_URL = require('../config/config').DATABASE_URL;
const Sequelize = require('sequelize');

const sequelize = new Sequelize(DATABASE_URL);

sequelize.authenticate()
  .then(() => console.log('DB connected!'))
  .then(() => sequelize.close())
  .catch(e => console.error(e));
