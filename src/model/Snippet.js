import connection from './connection';
import Sequelize from 'sequelize';

const Snippet = connection.define('snippet', {
  key: {
    type: Sequelize.STRING,
  },

  snippet: {
    type: Sequelize.STRING,
  },
});

export default Snippet;
