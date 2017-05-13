import React, { PropTypes } from 'react';
import {
  Row,
  Col,
} from 'antd';
import Card from '../ProjectCard';
import s from './ProjectCards.css';

const CARDS_PER_ROW = 3;
const CARD_SPAN = 24 / CARDS_PER_ROW;

const ProjectRow = ({ data, Like, authUser }) => (
  <Row gutter={16} className={s.row}>
    {data.map((p, i) => (
      <Col span={CARD_SPAN} key={p.pid}>
        <Card project={p} Like={Like} authUser={authUser} />
      </Col>
    ))}
  </Row>
);

const GridCards = ({ data, Like, authUser }) => {
  const rows = [];
  const len = data.length;
  for (let i = 0; i < len; i += CARDS_PER_ROW) {
    const slice = [];
    for (let j = 0; j < 3; j++) {
      if (i + j < len) {
        slice.push(data[i + j]);
      }
    }
    rows.push(
      <ProjectRow data={slice} Like={Like} authUser={authUser} />
    );
  }
  return (
    <div>
      {rows.map((r, i) => (
        <div key={i}>{r}</div>
      ))}
    </div>
  );
};

const SingleColumnCards = ({ data, Like }) => (
  <div>
    {data.map((p, i) => (
      <Card project={p} key={p.pid} className={s.row} Like={Like}/>
    ))}
  </div>
);

const ProjectCards = ({ data, windowWidth, Like, authUser }) => {
  const showData = data || [];
  return (
    windowWidth && windowWidth < 700 ? (
      <SingleColumnCards
        data={showData} Like={Like}
        authUser={authUser}
      />
    ) : (
      <GridCards
        data={showData} Like={Like}
        authUser={authUser}
      />
    )
  )
};

ProjectCards.propTypes = {
  data: PropTypes.array,
  windowWidth: PropTypes.number,
};

export default ProjectCards;
