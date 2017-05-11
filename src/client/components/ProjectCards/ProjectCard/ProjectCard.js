import React from 'react';
import {
  Card,
} from 'antd';
import s from './ProjectCard.css';

const ProjectCard = ({ loading, project }) => (
  project ? (
    <Card loading={loading} title={project.title} className={s.card}>
      {project.contents}
    </Card>
  ) : (
    <Card loading title="loading..." className={s.card}/>
  )
);

export default ProjectCard;