import { mergeTypes } from 'merge-graphql-schemas';
import user from './user.graphql';
import login from './login.graphql';

const types = mergeTypes([
  user,
  login,
]);

export default types;
