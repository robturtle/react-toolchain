import React from 'react';
import {
  Card,
} from 'antd';
import s from './ProjectCard.css';
import Like from './Like';
import Thumbnail from './Thumbnail';
import Status from './Status';

const ProjectCard = ({ loading, project }) => {
  return (
        <Card loading={loading} className={s.card}>
          <Thumbnail title={project.title} contents={project.contents}/>
          <Like className={s.like} like={false}/>
          <Status
            user={{home: "/", username: "Annoymous"}}
            project={{home: "/", due: "2017-05-12", city: "NYC"}}
          />
        </Card>
  );
};

export default ProjectCard;