import React from 'react';
import s from './Status.css';
import Href from './Href';
import {
  Icon,
  Progress,
} from 'antd';

const Status = ({ user, project }) => {
  return (
      <div className={s.container}>
        <ul className={s.footer}>
          <li>
            <Icon type="user" className={s.icon} />
            <Href to={user.home}>
              {user.username}
            </Href>
          </li>

          <li>
            <Icon type="environment" className={s.icon} />
            <Href to={`/city/${project.city}`}>
              {project.city}
            </Href>
          </li>

          <li>
            <Icon type="clock-circle" className={s.icon} />
            <Href to={`/due/${project.due}`}>
              {project.due}
            </Href>
          </li>

          <li>
            <Progress percent={50} status="active" format={() => "3.2k/6.5k"} />
          </li>
        </ul>
      </div>
  );
};

export default Status;