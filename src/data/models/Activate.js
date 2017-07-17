import connection from './connection';
import Sequelize from 'sequelize';

const Activate = connection.define('activate', {
  user: {
    type: Sequelize.STRING,
    primaryKey: true,
  },

  snippet: {
    type: Sequelize.UUID,
    primaryKey: true,
  },
});

export default Activate;
