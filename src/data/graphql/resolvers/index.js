/* eslint-disable no-console */
import hello from './hello';
import client from './client';
import product from './product';
import { mergeResolvers } from 'merge-graphql-schemas';

const rootValue = mergeResolvers([
  hello,
  client,
  product,
]);

export default rootValue;
