import Sequelize from 'sequelize';
import connection from './connection';

const User = connection.define('user', {
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true,
    },
    unique: true,
    allowNull: false,
  },

  emailConfirmed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },

  name: {
    type: Sequelize.STRING,
    validate: {
      is: /^[a-zA-Z0-9_]+$/,
    },
    primaryKey: true,
    allowNull: false,
  },

  company: {
    type: Sequelize.STRING,
    allowNull: true,
  },

  location: {
    type: Sequelize.STRING,
    allowNull: true,
  },

  website: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      isUrl: true,
    }
  },
}, {
  indexes: [
    {
      fields: ['email'],
    },
    {
      fields: ['name'],
    }
  ],
});

export default User;
