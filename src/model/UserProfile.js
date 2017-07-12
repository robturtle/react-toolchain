import connection from './connection';
import Sequelize from 'sequelize';

const UserProfile = connection.define('user_profile', {
  displayName: {
    type: Sequelize.STRING,
    allowNull: true,
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
});

export default UserProfile;
