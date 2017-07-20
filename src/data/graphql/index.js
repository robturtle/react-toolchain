import { buildSchema } from 'graphql';
import types from './types';
import rootValue from './resolvers';

const schema = buildSchema(types);

export {
  schema,
  rootValue,
};
