import React from 'react';
import s from './Href.css';
import { withRouter } from 'react-router';

const Href = withRouter(props => (
  <a href={props.to} className={s.href}
    onClick={
      e => {
        e.preventDefault();
        props.history.push(props.to);
      }
    }>{props.children}</a>
));

export default Href;