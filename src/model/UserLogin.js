import connection from './connection';
import Sequelize from 'sequelize';

const UserLogin = connection.define('user_login', {
  user: {
    type: Sequelize.UUID,
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
