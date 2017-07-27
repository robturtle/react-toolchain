import {
  User,
  UserLogin,
  Snippet,
  Preset,
} from './models';

class ExistenceAssertionError extends Error {}
class NotFoundError extends ExistenceAssertionError {}
class AlreadyExistsError extends ExistenceAssertionError {}

function finder(clazz) {
  async function find(keys, expectExistence = true) {
    // use object key to print model name polymorphically
    for (const name in clazz) {
      if (Reflect.apply(Object.prototype.hasOwnProperty, clazz, [name])) {
        const model = clazz[name];
        // eslint-disable-next-line no-await-in-loop
        const instance = await model.findOne({ where: { ...keys } });
        if (instance && !expectExistence) {
          throw new AlreadyExistsError(`${name} already exists!`);
        }
        if (!instance && expectExistence) {
          throw new NotFoundError(`${name} not exists!`);
        }
        return instance;
      }
    }
    return null;
  }

  return find;
}

const findUser = finder({ User });
const findLogin = finder({ UserLogin });
const findSnippet = finder({ Snippet });
const findPreset = finder({ Preset });

export {
  findUser,
  findLogin,
  findSnippet,
  findPreset,
  ExistenceAssertionError,
  NotFoundError,
  AlreadyExistsError,
}

export default finder;
