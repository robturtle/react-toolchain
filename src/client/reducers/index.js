import { combineReducers } from 'redux';
import windowSize from './window-size';
import fetch from './fetch';
import projects from './projects';

export default combineReducers({
  windowSize,
  fetch,
  projects,
});