import React from 'react';
import s from './Header.css';
import {
  Layout,
  Affix,
  Row,
  Col,
} from 'antd';

import Logo from '../../components/Logo';
import Menu from '../Menu';
// TODO Search Bar

const { Header } = Layout;

export default () => (
  <Affix>
    <Header className={s.header}>
      <Row>
        <Col xs={24} sm={8} md={8}>
          <Logo />
        </Col>
        <Col xs={0} sm={15} md={15}>
          <Menu />
        </Col>
      </Row>
    </Header>
  </Affix>
);
