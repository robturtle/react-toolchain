import React from 'react';
import s from './Thumbnail.css';

const Thumbnail = ({ title, image, contents }) => {
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
          <p>{title}</p>
        </div>
        <div className={s.titleLeft}>
          {contents}
        </div>
      </div>
    );
};

export default Thumbnail;