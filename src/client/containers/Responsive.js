import React from 'react';
import windowSize from '../reducers/actions/window-size';
import { connect } from 'react-redux';

class Responsive extends React.Component {
  constructor(props) {
    super(props);
  }

  updateWindowSize = dispatch => {
    dispatch(windowSize(window.innerWidth, window.innerHeight));
  };

  componentWillMount = () => {
    this.updateWindowSize(this.props.dispatch);
    window.addEventListener('resize', () => {
      this.updateWindowSize(this.props.dispatch);
    });
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', updateWindowSize);
  };

  render() {
    return null;
  }
};

Responsive = connect()(Responsive);

export default Responsive;