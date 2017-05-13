import React from 'react';
import s from './Footer.css';
import { Layout } from 'antd';

const { Footer } = Layout;

export default () => (
  <Footer className={s.footer}>
    <p>footer</p>
  </Footer>
);
