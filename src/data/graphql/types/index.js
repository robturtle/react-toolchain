import { mergeTypes } from 'merge-graphql-schemas';
import user from './user.graphql';
import login from './login.graphql';
import snippet from './snippet.graphql';
import preset from './preset.graphql';
import using from './using.graphql';

const types = mergeTypes([
  user,
  login,
  snippet,
  preset,
  using,
]);

export default types;
