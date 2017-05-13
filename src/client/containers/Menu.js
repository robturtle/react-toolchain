import React from 'react';
import Menu from '../components/Menu';
import { withRouter } from 'react-router';

export default withRouter(({ history }) => (
  <Menu onClick={item => history.push(item.key)} />
));
