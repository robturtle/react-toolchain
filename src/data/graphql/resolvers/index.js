import user from './user';
import login from './login';
import { mergeResolvers } from 'merge-graphql-schemas';

const rootValue = mergeResolvers([
  user,
  login,
]);

export default rootValue;
