import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers';
import fetch from './reducers/actions/fetch';

const reduxMiddleware = applyMiddleware(
  thunkMiddleware,
  //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
const store = createStore(reducer, reduxMiddleware);

export default store;

export const asyncFetch = (host, path, mountPoint) => {
  return store.dispatch(fetch(host, path, mountPoint));
};