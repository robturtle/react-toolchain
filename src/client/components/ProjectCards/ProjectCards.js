import React from 'react';
import {
  Row,
  Col,
} from 'antd';
import Card from './ProjectCard';
import s from './ProjectCards.css';

const CARDS_PER_ROW = 3;
const CARD_SPAN = 24 / CARDS_PER_ROW;

const ProjectRow = ({ projects }) => (
  <Row gutter={16} className={s.row}>
    {projects.map((p, i) => (
      <Col span={CARD_SPAN} key={i}>
        <Card project={p}/>
      </Col>
    ))}
  </Row>
);

const GridCards = ({ projects }) => {
  const rows = [];
  const len = projects.length;
  for (let i = 0; i < len; i += CARDS_PER_ROW) {
    const slice = [];
    for (let j = 0; j < 3; j++) {
      if (i + j < len) {
        slice.push(projects[i + j]);
      }
    }
    rows.push(<ProjectRow projects={slice}/>);
  }
  return (
    <div>
      {rows.map((r, i) => (
        <div key={i}>{r}</div>
      ))}
    </div>
  );
};

const SingleColumnCards = ({ projects }) => (
  <div>
    {projects.map((p, i) => (
      <Card project={p} key={i} className={s.row}/>
    ))}
  </div>
);

const ProjectCards = ({ projects, windowWidth }) => (
  windowWidth && windowWidth < 700 ? (
    <SingleColumnCards projects={projects}/>
  ) : (
    <GridCards projects={projects}/>
  )
);

export default ProjectCards;
