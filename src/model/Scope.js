import connection from './connection';
import Sequelize from 'sequelize';

const Scope = connection.define('scope', {
  name: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
});

export default Scope;
