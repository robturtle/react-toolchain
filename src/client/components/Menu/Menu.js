import React from 'react';
import s from './Menu.css';
import {
  Menu,
  Icon,
  message,
} from 'antd';

const { Item, SubMenu, ItemGroup, Divider } = Menu;

export default ({
  onClick,
  authUser,
  // responsive
}) => {
  return authUser ? (
    <Menu
      onClick={onClick}
      mode="horizontal"
      className={s.menu}
    >
      <Item key="/">
        Home
      </Item>

      <SubMenu title={<span><Icon type="setting" />Account</span>}>
        <Item key="/signout">Signout</Item>
        <Divider />
        <Item key="/followed-users">Followed users</Item>
        <Item key="/followed-projects">Followed projects</Item>
        <Item key="/likes">Likes</Item>
        <Divider />
        <Item key="/account">Account</Item>
        <Item key="/profile">Profile</Item>
      </SubMenu>
    </Menu>
  ) : (
    <Menu
      onClick={onClick}
      mode="horizontal"
      className={s.menu}
    >
      <Item key="/">
        Home
      </Item>
      <Item key="/login">
        Login
      </Item>
      <Item key="/signup">
        Signup
      </Item>
    </Menu>
  );
}
