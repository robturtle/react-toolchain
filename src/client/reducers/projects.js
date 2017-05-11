import {
  FETCH_SUCCESS,
  FETCH_FAIL,
} from './actions/fetch';

const projects = (state = {}, action) => {
  if (action.type === FETCH_SUCCESS
   && action.mountPoint === 'projects') {
      return action.payload;
   }
  return state;
};

export default projects;