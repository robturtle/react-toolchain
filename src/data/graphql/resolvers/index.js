import user from './user';
import login from './login';
import snippet from './snippet';
import { mergeResolvers } from 'merge-graphql-schemas';

const rootValue = mergeResolvers([
  user,
  login,
  snippet,
]);

export default rootValue;
