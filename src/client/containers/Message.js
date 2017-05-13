import React, { PropTypes } from 'react';
import { message } from 'antd';
import { connect } from 'react-redux';

const statesToProps = state => ({
  text: state.message
});

class Message extends React.Component {
  static propTypes = {
    text: PropTypes.string,
  };

  componentDidUpdate = () => {
    if (this.props.text) {
      message.info(this.props.text);
    }
  }

  render = () => null;
};