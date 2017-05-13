import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { sendFetch } from '../states/fetch';

class Fetcher extends React.Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    mountPoint: PropTypes.string.isRequired,
  };

  componentDidUpdate = () => {
    const { url, mountPoint } = this.props;
    console.log(`fetching ${url}`)
    this.props.request(url, mountPoint);
  }

  componentDidMount = this.componentDidUpdate;

  render = () => null;
};

const dispatchToProps = dispatch => ({
  request(url, mountPoint) {
    dispatch(sendFetch(url, mountPoint));
  }
});

// use like <Fetcher utime={this.state.utime} mountPoint="projects"/>
export default connect(null, dispatchToProps)(Fetcher);
