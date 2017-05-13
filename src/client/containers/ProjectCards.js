import React from 'react';
import { connect } from 'react-redux';
import {
  host,
  targets,
  likeProject,
} from '../states/api';
import { sendFetch } from '../states/fetch';

import Paginated from './Pagination';
import Fetcher from './Fetcher';

import ProjectCards from '../components/ProjectCards';

const mountPoint = 'projects';
const url = targets['projects'];

const dispatchToStates = dispatch => ({
  onLiked: likeProject(dispatch),
});

const Cards = connect(null, dispatchToStates)(ProjectCards);

export default (props) => (
  <div>
    <Paginated url={url} mountPoint={mountPoint}>
      <Cards />
    </Paginated>
    <Fetcher url={url} mountPoint={mountPoint} />
  </div>
);
