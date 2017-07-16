/* eslint-disable no-console */
import model from '../src/model';

function syncDatabase() {
  return model.sync({ force: true })
    .then(() => model.close());
}

export default syncDatabase;
