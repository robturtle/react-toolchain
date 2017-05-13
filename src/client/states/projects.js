import { FETCH_SUCCESS } from './fetch';

export const projects = (state = {
  total: 0,
  data: [],
}, action) => {
  if (action.type === FETCH_SUCCESS) {
    if (action.mountPoint === 'projects') {
      return action.payload;
    } else if (action.mountPoint === 'like') {
      const change = action.payload;
      return Object.assign({}, state, 
      {
        data: state.data.map(p => {
          return p.pid === change.pid ? (
            Object.assign({}, p, { liked: change.liked })
          ) : p;
        }),
      });
    }
  }
  return state;
};

export default projects;