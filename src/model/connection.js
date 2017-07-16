import Sequelize from 'sequelize';
import { DATABASE_URL } from '../../config/config';

const connection = new Sequelize(DATABASE_URL);

export default connection;
