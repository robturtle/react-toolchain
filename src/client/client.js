import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Router from './router';
import store from './store';

ReactDOM.render((
  <Provider store={store}>
    <div>
      <Router/>
    </div>
  </Provider>
), document.getElementById('app'));

// enable HMR for this entry js file
if (module.hot) {
  module.hot.accept();
}
