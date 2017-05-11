import React from 'react';
import { Icon } from 'antd';
import s from './Like.css';

const Like = ({ like, ...rest }) => (
    <Icon
      {...rest}
      type="heart"
      className={s.like}
    />
);

export default Like;