import React from 'react';
import s from './Thumbnail.css';

const Thumbnail = ({ pid, title, image, contents }) => {
    return image ? (
      <div>
        <div className={s.img}>
          <img src={image}/>
        </div>
        <div className={s.imgLeft}>
          <p className={s.titleText}>{title}</p>
          {contents}
        </div>
      </div>
    ) : (
      <div>
        <div className={s.title}>
          <a href={`/project/${pid}`}>{title}</a>
        </div>
        <div className={s.titleLeft}>
          {contents}
        </div>
      </div>
    );
};

export default Thumbnail;