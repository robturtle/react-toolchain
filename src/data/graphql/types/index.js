import { mergeTypes } from 'merge-graphql-schemas';
import user from './user.graphql';
import login from './login.graphql';
import snippet from './snippet.graphql';

const types = mergeTypes([
  user,
  login,
  snippet,
]);

export default types;
