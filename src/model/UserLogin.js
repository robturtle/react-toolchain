import connection from './connection';
import Sequelize from 'sequelize';

const UserLogin = connection.define('user_login', {
  name: {
    type: Sequelize.STRING,
    primaryKey: true,
  },

  key: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
});

export default UserLogin;
