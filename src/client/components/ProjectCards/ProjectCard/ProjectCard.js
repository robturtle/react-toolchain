import React from 'react';
import {
  Card,
} from 'antd';
import s from './ProjectCard.css';

const ProjectCard = ({ project }) => (
  project ? (
    <Card title={project.title} className={s.card}>
      {project.contents}
    </Card>
  ) : (
    <Card loading title="loading..." className={s.card}/>
  )
);

export default ProjectCard;