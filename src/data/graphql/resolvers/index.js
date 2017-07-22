import user from './user';
import login from './login';
import snippet from './snippet';
import preset from './preset';
import { mergeResolvers } from 'merge-graphql-schemas';

const rootValue = mergeResolvers([
  user,
  login,
  snippet,
  preset,
]);

export default rootValue;
