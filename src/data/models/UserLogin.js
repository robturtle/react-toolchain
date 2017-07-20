import connection from './connection';
import Sequelize from 'sequelize';

const UserLogin = connection.define('user_login', {
  username: {
    type: Sequelize.STRING,
    primaryKey: true,
  },

  loginType: {
    type: Sequelize.STRING,
    primaryKey: true,
  },

  key: {
    type: Sequelize.STRING,
  },
});

export default UserLogin;
