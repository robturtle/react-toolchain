import Sequelize from 'sequelize';
import connection from './connection';

const Session = connection.define('session', {
  sid: {
    type: Sequelize.STRING,
    primaryKey: true,
  },

  username: Sequelize.STRING,

  expires: Sequelize.DATE,

  data: Sequelize.STRING(50000),
});

export default Session;
