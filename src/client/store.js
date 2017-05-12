import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers';
import fetch from './reducers/actions/fetch';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(
  applyMiddleware(thunkMiddleware)
));

export default store;

export const asyncFetch = (host, path, mountPoint) => {
  return store.dispatch(fetch(host, path, mountPoint));
};