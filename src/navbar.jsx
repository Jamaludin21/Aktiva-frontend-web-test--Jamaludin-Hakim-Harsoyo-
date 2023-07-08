import React from "react";
import {
  Breadcrumb,
  Layout,
  Menu,
  theme,
  Image,
  Badge,
  Avatar,
  Space,
} from "antd";
import { BellOutlined, UserOutlined } from "@ant-design/icons";
import { Container } from "reactstrap";
const { Header, Content, Footer } = Layout;
const logo = require("./1595842352696.jpeg");

const Navbar = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className="layout">
      <Container fluid>
        <Menu theme="dark" mode="horizontal" className="navbar">
          <Menu.Item key="logo" className="navbar-item">
            <img src={logo} alt="Logo" className="navbar-logo-image" />
          </Menu.Item>
          <Space>
            <Menu.Item key="notifications" className="navbar-item-right">
              <Badge dot>
                <Avatar icon={<BellOutlined />} />
              </Badge>
            </Menu.Item>
            <Menu.Item key="user" className="navbar-item">
              <Avatar icon={<UserOutlined />} />
            </Menu.Item>
          </Space>
        </Menu>
      </Container>
    </Layout>
  );
};

export default Navbar;
