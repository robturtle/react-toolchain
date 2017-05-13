import React from 'react';
import s from './Status.css';
import {
  Icon,
  Progress,
} from 'antd';

function abbrev(number, decPlaces) {
  let x = (''+number).length;
  const d = Math.pow(10, decPlaces);
  x -= x % 3;
  return Math.round(number*d/Math.pow(10,x))/d+" kMGTPE"[x/3];
}

const Status = ({ user, project, current, goal }) => {
  const progress = 100 * parseInt(current) / parseInt(goal);
  const format = `${abbrev(current, 1)}/${abbrev(goal, 1)}`;
  return (
      <div className={s.container}>
        <ul className={s.footer}>
          <li>
            <Icon type="user" className={s.icon} />
            <a href={user.home}>
              {user.owner}
            </a>
          </li>

          <li>
            <Icon type="environment" className={s.icon} />
            <a href={`/city/${project.city}`}>
              {project.city}
            </a>
          </li>

          <li>
            <Icon type="clock-circle" className={s.icon} />
            <a href={`/due/${project.due}`}>
              {project.due}
            </a>
          </li>

          <li>
            <Progress percent={progress} status="active" format={() => format} />
          </li>
        </ul>
      </div>
  );
};

export default Status;
