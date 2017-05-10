import React from 'react';
import ReactDOM from 'react-dom';
import Routing from './routes';

ReactDOM.render(<Routing/>, document.getElementById('app'));

// enable HMR for this entry js file
if (module.hot) {
  module.hot.accept();
}
