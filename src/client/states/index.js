import { combineReducers } from 'redux';

import { auth } from './auth';

import { menu } from './menu';
import { pagination } from './pagination';
import { message } from './message';

import { projects } from './projects';

import { fetch } from './fetch';
import { screenSize } from './screen-size';

export default combineReducers({
  auth,

  menu,
  pagination,
  message,

  projects,

  fetch,
  screenSize,
});