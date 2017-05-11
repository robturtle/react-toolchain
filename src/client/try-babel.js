import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';
import Routing from './routes';
import { Responsive } from './containers';

const isProduction = process.env.NODE_ENV === 'production';

const store = isProduction ? (
  createStore(reducer)
) : (
  createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

ReactDOM.render((
  <Provider store={store}>
    <div>
      <Routing/>
      <Responsive/>
    </div>
  </Provider>
  ), document.getElementById('app'));

// enable HMR for this entry js file
if (module.hot) {
  module.hot.accept();
}
