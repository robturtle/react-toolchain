import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
} from 'react-router-dom';
import {
  Row,
  Col,
} from 'antd';
import globalStyles from '../assets/styles/global.css';

import { Layout, Menu } from '../components';
import { Home } from '../containers';


const Login = () => (
  <h2>Login</h2>
);

const Signup = () => (
  <h2>Signup</h2>
);

const Search = () => (
  <h2>Search</h2>
);

const NavMenu = withRouter(({ history }) => (
  <Menu onClick={item => history.push(item.key)} />
));

function TODO(props) { return <p>Not Implemented!</p>; }

const Routing = () => (
  <Router>
    <Layout
      header={<NavMenu/>}
      content={(
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/user/:username" render={TODO}/>
          <Route path="/project/:pid" component={TODO}/>
          <Route path="/city/:cname" component={TODO}/>
          <Route path="/due/:date" component={TODO}/>
          <Route render={({ match }) => (<p>No match</p>)} />
        </Switch>
      )}
      footer={(
        <p>Footer</p>
      )}
    />
  </Router>
);

export default Routing;