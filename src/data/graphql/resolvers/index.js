import user from './user';
import login from './login';
import snippet from './snippet';
import preset from './preset';
import using from './using';
import { mergeResolvers } from 'merge-graphql-schemas';

const rootValue = mergeResolvers([
  user,
  login,
  snippet,
  preset,
  using,
]);

export default rootValue;
