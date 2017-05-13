import React, { PropTypes } from 'react';
import {
  Row,
  Col,
} from 'antd';
import Card from '../ProjectCard';
import s from './ProjectCards.css';

const CARDS_PER_ROW = 3;
const CARD_SPAN = 24 / CARDS_PER_ROW;

const ProjectRow = ({ data, onLiked }) => (
  <Row gutter={16} className={s.row}>
    {data.map((p, i) => (
      <Col span={CARD_SPAN} key={p.pid}>
        <Card project={p} onLiked={onLiked} />
      </Col>
    ))}
  </Row>
);

const GridCards = ({ data, onLiked }) => {
  const rows = [];
  const len = data.length;
  for (let i = 0; i < len; i += CARDS_PER_ROW) {
    const slice = [];
    for (let j = 0; j < 3; j++) {
      if (i + j < len) {
        slice.push(data[i + j]);
      }
    }
    rows.push(<ProjectRow data={slice} onLiked={onLiked} />);
  }
  return (
    <div>
      {rows.map((r, i) => (
        <div key={i}>{r}</div>
      ))}
    </div>
  );
};

const SingleColumnCards = ({ data, onLiked }) => (
  <div>
    {data.map((p, i) => (
      <Card project={p} key={p.pid} className={s.row} onLiked={onLiked}/>
    ))}
  </div>
);

const ProjectCards = ({ data, windowWidth, onLiked }) => {
  const showData = data || [];
  return (
    windowWidth && windowWidth < 700 ? (
      <SingleColumnCards
        data={showData} onLiked={onLiked}
      />
    ) : (
      <GridCards
        data={showData} onLiked={onLiked}
      />
    )
  )
};

ProjectCards.propTypes = {
  data: PropTypes.array,
  windowWidth: PropTypes.number,
  onLiked: PropTypes.func,
};

export default ProjectCards;
