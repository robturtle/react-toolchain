import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import Home from '../components/Home';

const Login = () => (
  <h2>Login</h2>
);

const Signup = () => (
  <h2>Signup</h2>
);

const Search = () => (
  <h2>Search</h2>
);

const Routing = () => (
  <Router>
    <div>
      <header>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Signup</Link></li>
          <li><Link to="/search">Search</Link></li>
        </ul>
        <Route path="/search" component={Search}/>
      </header>

      <hr/>

      <main>
        <Route exact path="/" component={Home}/>
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={Signup}/>
      </main>
    </div>
  </Router>
);

export default Routing;