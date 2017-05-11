import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Routing from './routes';
import { Responsive } from './containers';
import store from './store';

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

