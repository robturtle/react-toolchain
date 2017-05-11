import {
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_FAIL,
} from './actions/fetch';

export default fetch = (state = {
  fetchQueue: [],
  fetches: {},
}, action) => {
  switch (action.type) {
    case FETCH_START:
      return Object.assign({}, state, {
        fetches: {
          [action.mountPoint]: {
            status: 'pending'
          }
        },
        fetchQueue: [...state.fetchQueue, {
          host: action.host,
          path: action.path,
          mountPoint: action.mountPoint,
        }],
      });
    case FETCH_SUCCESS:
      return Object.assign({}, state, {
        fetches: {
          [action.mountPoint]: {
            status: 'resolve',
            data: action.payload,
            utime: new Date(),
          },
        },
        fetchQueue: state.fetchQueue.filter(q => {
          return q.mountPoint !== action.mountPoint;
        }),
      });
    case FETCH_FAIL:
      return Object.assign({}, state, {
        fetches: {
          [action.mountPoint]: {
            status: 'error',
            err: action.err,
          },
        },
        fetchQueue: state.fetchQueue.filter(q => {
          return q.mountPoint !== action.mountPoint;
        }),
      });
    default:
      return state;
  }
};