// A generic async fetching Redux actions
// A fetch is distinguished by its mount point on the DOM tree,
// and an unique key of the requesting resource.
import isoFetch from 'isomorphic-fetch';

const isoPost = (url, data) => {
  console.log(`posting ${data} => ${url}`);
  return isoFetch(url, {
    method: 'POST',
    body: JSON.stringify({ data }),
    headers: {
      'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
      'Content-Type': 'application/json; charset=utf-8',
    }
  });
}

export const FETCH_START = 'FETCH_START';
const fetchStart = (url, mountPoint) => ({
  type: FETCH_START,
  url, mountPoint,
});

export const FETCH_SUCCESS = 'FETCH_SUCCESS';
const fetchSuccess = (mountPoint, payload) => ({
  type: FETCH_SUCCESS,
  mountPoint, payload,
});

export const FETCH_FAIL = 'FETCH_FAIL';
const fetchFail = (mountPoint, err) => ({
  type: FETCH_FAIL,
  mountPoint, err,
});

export function sendFetch(url, mountPoint, data = undefined) {
  return (dispatch) => {
    dispatch(fetchStart(url, mountPoint));
    return (data ? isoPost(url, data) : isoFetch(url))
      .then(res => res.json())
      .then(json => {
        dispatch(fetchSuccess(mountPoint, json));
      })
      //.catch(err => dispatch(fetchFail(mountPoint, err)));
  };
}

export const fetch = (state = {}, action) => {
  // TODO implement caching
  switch (action.type) {
    case FETCH_START:
      return Object.assign({}, state, {
        [action.mountPoint]: {
          status: 'pending'
        }
      });
    case FETCH_SUCCESS:
      return Object.assign({}, state, {
        [action.mountPoint]: {
          status: 'resolve',
          data: action.payload,
          utime: new Date(),
        },
      });
    case FETCH_FAIL:
      return Object.assign({}, state, {
        [action.mountPoint]: {
          status: 'error',
          err: action.err,
          utime: new Date(),
        },
      });
    default:
      return state;
  }
};