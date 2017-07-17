import path from 'path';
import { fileLoader, mergeTypes } from 'merge-graphql-schemas';
import { buildSchema } from 'graphql';
import rootValue from './resolvers';

const types = mergeTypes(fileLoader(path.join(__dirname, 'types')));
const schema = buildSchema(types);

export {
  schema,
  rootValue,
};
