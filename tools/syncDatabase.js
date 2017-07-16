/* eslint-disable no-console */
import model from '../src/model';

function syncDatabase() {
  return model.sync({ force: true });
}

export default syncDatabase;
