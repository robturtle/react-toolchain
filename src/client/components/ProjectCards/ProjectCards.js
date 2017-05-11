import React from 'react';
import {
  Row,
  Col,
} from 'antd';
import Card from './ProjectCard';
import s from './ProjectCards.css';

const CARDS_PER_ROW = 3;
const CARD_SPAN = 24 / CARDS_PER_ROW;

const ProjectRow = ({ loading, projects }) => (
  <Row gutter={16} className={s.row}>
    {projects.map((p, i) => (
      <Col span={CARD_SPAN} key={i}>
        <Card loading={loading} project={p}/>
      </Col>
    ))}
  </Row>
);

const GridCards = ({ loading, projects }) => {
  const rows = [];
  const len = projects ? projects.length : 30;
  for (let i = 0; i < len; i += CARDS_PER_ROW) {
    const slice = [];
    for (let j = 0; j < 3; j++) {
      if (i + j < len) {
        if (projects) {
          slice.push(projects[i + j]);
        } else {
          slice.push({
            title: 'loading...'
          })
        }
      }
    }
    rows.push(<ProjectRow loading={loading} projects={slice}/>);
  }
  return (
    <div>
      {rows.map((r, i) => (
        <div key={i}>{r}</div>
      ))}
    </div>
  );
};

const SingleColumnCards = ({ loading, projects }) => (
  <div>
    {projects.map((p, i) => (
      <Card loading={loading} project={p} key={i} className={s.row}/>
    ))}
  </div>
);

const ProjectCards = ({ projects, windowWidth }) => {
  return (
    windowWidth && windowWidth < 700 ? (
      <SingleColumnCards
        loading={projects === undefined}
        projects={projects}
      />
    ) : (
      <GridCards
        loading={projects === undefined}
        projects={projects}
      />
    )
  )
};

export default ProjectCards;
