import Sequelize from 'sequelize';
import connection from './connection';

const User = connection.define('user', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
  },

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
      is: /^[a-z0-9_]+$/,
    },
    unique: true,
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
