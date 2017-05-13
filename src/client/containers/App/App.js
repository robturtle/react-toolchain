import React from 'react';
import s from './App.css';
import {
  Layout,
  BackTop,
} from 'antd';

import Header from '../Header';
import Footer from '../../components/Footer';

const { Content } = Layout;

const MainLayout = props => (
  <Layout>
    <Header />
    <Content className={s.content}>
      <div className={s.container}>
        {props.children}
      </div>
    </Content>
    <Footer />
    <BackTop />
  </Layout>
);

export default MainLayout;
