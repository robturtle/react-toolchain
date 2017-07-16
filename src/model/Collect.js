import connection from './connection';
import Sequelize from 'sequelize';

const Collect = connection.define('collect', {
  collector: {
    type: Sequelize.UUID,
    primaryKey: true,
  },

  collected: {
    type: Sequelize.UUID,
    primaryKey: true,
  },
});

export default Collect;
