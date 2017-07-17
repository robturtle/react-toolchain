import connection from './connection';
import Sequelize from 'sequelize';

const UserLogin = connection.define('user_login', {
  user: {
    type: Sequelize.STRING,
    primaryKey: true,
  },

  loginType: {
    type: Sequelize.STRING,
    primaryKey: true,
  },

  key: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
});

export default UserLogin;
