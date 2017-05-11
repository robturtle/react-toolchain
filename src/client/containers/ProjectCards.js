import React from 'react';
import { connect } from 'react-redux';
import fetch from '../reducers/actions/fetch';
import { Pagination } from 'antd';
import ProjectCards from '../components/ProjectCards';
import { asyncFetch } from '../store';

const stateToProps = state => ({
  windowWidth: state.windowSize.windowWidth,
  projects: state.projects.data,
  page: state.projects.current,
  pageSize: state.projects.pageSize,
  pageTotal: state.projects.total,
});

const loadPage = page => asyncFetch(
  window.location.host,
  `/api/projects/${page}`,
  'projects'
);

class PagedProjectCards extends React.Component {
  componentDidMount = () => {
    loadPage(1);
  };

  render = () => {
    return (
      <div>
        <ProjectCards
          projects={this.props.projects}
          windowWidth={this.props.projects}
        />
        <Pagination
          onChange={loadPage}
          current={this.props.page}
          pageSize={this.props.pageSize}
          total={this.props.pageTotal}
        />
      </div>
    );
  }
};

const ResponsiveProjectCards = connect(
  stateToProps,
)(PagedProjectCards);

export default ResponsiveProjectCards;