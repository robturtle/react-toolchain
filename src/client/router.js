import React from 'react';
import {
  BrowserRouter as Router,
  IndexRoute,
  Route,
  Switch,
} from 'react-router-dom';

import App from './containers/App';
import ProjectCards from './containers/ProjectCards';

const TODO = () => <p>Not implemented!</p>;

export default () => (
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={ProjectCards} />
        <Route path="/login" component={TODO} />
        <Route path="/signup" component={TODO} />
        <Route path="/user/:username" render={TODO} />
        <Route path="/project/:pid" component={TODO} />
        <Route path="/city/:cname" component={TODO} />
        <Route path="/due/:date" component={TODO} />
        <Route render={({ match }) => (<p>No match</p>)} />
      </Switch>
    </App>
  </Router>
);
