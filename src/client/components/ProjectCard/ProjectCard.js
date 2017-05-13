import React, { PropTypes } from 'react';
import s from './ProjectCard.css';
import {
  Card,
} from 'antd';
import Like from './Like';
import Thumbnail from './Thumbnail';
import Status from './Status';

const ProjectCard = ({ project, onLiked }) => {
  const {
    pid,
    title,
    description,
    liked,
    username,
    city,
    due,
    fund,
    maxFund,
  } = project;
  return project ? (
        <Card className={s.card}>
          <Thumbnail title={title} contents={description} pid={pid} />
          <Like liked={liked} onLiked={onLiked} pid={pid} />
          <Status
            user={{home: `/users/${username}`, username }}
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
  onLiked: PropTypes.func,
};

export default ProjectCard;