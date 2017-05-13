import React, { PropTypes } from 'react';
import { Icon } from 'antd';
import s from './Like.css';

const Like = ({ liked, onLiked, pid }) => (
    <Icon
      type="heart"
      className={liked ? s.liked : s.like}
      onClick={() => onLiked(pid, liked)}
    />
);

Like.propTypes = {
  pid: PropTypes.string.isRequired,
  liked: PropTypes.bool.isRequired,
  onLiked: PropTypes.func,
};

export default Like;
