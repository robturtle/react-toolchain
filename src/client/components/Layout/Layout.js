import React from 'react';
import {
  Layout,
  Affix,
  BackTop,
  Row,
  Col,
} from 'antd';
import Menu from '../Menu';
import s from './Layout.css';

const { Header, Footer, Sider, Content } = Layout;
const MainLayout = props => (
  <Layout>
    <Affix>
      <Header className={s.header}>
        <Row>
          <Col xs={24} sm={8} md={8}>
            <span className={s.logo}>Crowd Finding</span>
          </Col>
          <Col xs={0} sm={15} md={15}>
            {props.header}
          </Col>
        </Row>
      </Header>
    </Affix>
    <Content className={s.content}>
      <div className={s.container}>
        {props.content}
      </div>
    </Content>
    <Footer className={s.footer}>
      {props.footer}
    </Footer>
    <BackTop />
  </Layout>
);

export default MainLayout;