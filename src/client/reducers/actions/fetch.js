// A generic async fetching Redux actions
// A fetch is distinguished by its mount point on the DOM tree,
// and an unique key of the requesting resource.
import fetch from 'isomorphic-fetch';

export const FETCH_START = 'FETCH_START';
const fetchStart = (host, path, mountPoint) => ({
  type: FETCH_START,
  host, path, mountPoint,
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

export default function fetching(host, path, mountPoint) {
  return (dispatch) => {
    dispatch(fetchStart(host, path, mountPoint));
    return fetch(`http://${window.location.host}/${path}`)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchSuccess(mountPoint, json));
      })
      .catch(err => dispatch(fetchFail(mountPoint, err)));
  };
}