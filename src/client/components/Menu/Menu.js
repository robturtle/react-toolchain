import React from 'react';
import {
  Menu,
  Icon,
  message,
} from 'antd';
import s from './Menu.css';

const { Item, SubMenu, ItemGroup, Divider } = Menu;

class MainMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: '/',
    }
  }

  onClick = item => {
    message.info(`click ${item.key}`);
    this.setState({
      selected: item.key
    });
    this.props.onClick(item);
  }

  render() {
    return (
      <Menu
        onClick={this.onClick}
        selectedKeys={[this.state.selected]}
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
    );
  }
};

export default MainMenu;