import hello from './hello';
import user from './user';
import { mergeResolvers } from 'merge-graphql-schemas';

const rootValue = mergeResolvers([
  user,
  hello,
]);

export default rootValue;
