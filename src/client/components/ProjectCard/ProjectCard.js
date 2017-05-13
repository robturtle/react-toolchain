import React, { PropTypes } from 'react';
import s from './ProjectCard.css';
import {
  Card,
} from 'antd';
import Thumbnail from './Thumbnail';
import Status from './Status';

const ProjectCard = ({ project, authUser, Like }) => {
  const {
    pid,
    title,
    description,
    owner,
    city,
    due,
    fund,
    maxFund,
  } = project;
  return project ? (
        <Card className={s.card}>
          <Thumbnail title={title} contents={description} pid={pid} />
          {
            authUser ? (
              <Like />
            ) : <span/>
          }
          <Status
            user={{home: `/users/${owner}`, owner }}
            project={{home: `/city/${city}`, due, city }}
            current={fund}
            goal={maxFund}
          />
        </Card>
  ) : (
    <Card loading title="loading..."/>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.object,
};

export default ProjectCard;