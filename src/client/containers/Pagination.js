import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Pagination } from 'antd';
import {
  changePage,
  changePageSize,
  changePageTotal,
  setMountPoint,
} from '../states/pagination';

import NothingHere from '../components/NothingHere';

const statesToProps = (state, ownProps) => {
  const mountPoint = ownProps.mountPoint;
  return Object.assign(
  {
    current: state.pagination.current,
    pageSize: state.pagination.pageSize,
    total: state.pagination.pageSize,
  },
  state[mountPoint] ? {
    total: state[mountPoint].total,
  } : {});
};

const dispatchesToProps = dispatch => ({
  onChange: page => dispatch(changePage(page)),
});

class PageFetcher extends React.Component {
  static propTypes = {
    mountPoint: PropTypes.string.isRequired,
  };

  render() {
    const { pageSize, total, current, onChange } = this.props;
    return pageSize < total ? ( // TODO enable switch
      <Pagination {...{ current, pageSize, total, onChange }} />
    ) : null;
  }
};
const PaginationContainer = connect(statesToProps, dispatchesToProps)(PageFetcher);

const paginatedStateToProps = (state, ownProps) => {
  const mountPoint = ownProps.mountPoint;
  return Object.assign(
    {
      from: state.pagination.from,
      to: state.pagination.to,
      data: [],
    },
    state[mountPoint] ? {
      data: state[mountPoint].data,
    } : {});
}

class PaginatedComponent extends React.Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    mountPoint: PropTypes.string.isRequired,
  };

  render = () => {
    const { data, from, to, mountPoint } = this.props;
    const dataToShow = data.slice(from, to);
    const elems = dataToShow.length === 0 ? (
      <NothingHere text={"Loading..."} />
    ) : (
      React.Children.map(
        this.props.children,
        elem => React.cloneElement(elem, { data: dataToShow }))
    );
    return (
      <div>
        {elems}
        <PaginationContainer mountPoint={mountPoint} />
      </div>
    );
  };
}
const Paginated = connect(paginatedStateToProps)(PaginatedComponent);

export default Paginated;
