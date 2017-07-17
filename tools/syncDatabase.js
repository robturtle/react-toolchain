/* eslint-disable no-console */
import models from '../src/data/models';

function syncDatabase() {
  return models.sync({ force: true })
    .then(() => models.close());
}

export default syncDatabase;
