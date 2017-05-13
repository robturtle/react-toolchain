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
import Like from './Like';

import ProjectCards from '../components/ProjectCards';

const mountPoint = 'projects';
const url = targets['projects'];

export default ({ authUser }) => (
  <div>
    <Paginated url={url} mountPoint={mountPoint}>
      <ProjectCards Like={Like} />
    </Paginated>
    <Fetcher url={url} mountPoint={mountPoint} />
    {
      authUser ? (
        <Fetcher url={targets['likes']} mountPoint='likes' />
      ) : <span />
    }
  </div>
);
