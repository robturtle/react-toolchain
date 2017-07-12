import Sequelize from 'sequelize';
import connection from './connection';

const User = connection.define('user', {
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true,
    },
  },

  emailConfirmed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  }
}, {
  indexes: [
    {
      fields: ['email'],
    },
  ],
});

export default User;
