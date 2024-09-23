import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProductOutlined,
  AppstoreOutlined,
  AppstoreAddOutlined,
  SettingOutlined,
  StockOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';

const { Header, Sider, Content } = Layout;

const Index = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <div className="flex">
          <img className="w-1/3" src={logo} alt="Logo" />
          <h1 className="w-2/3 text-white p-6 bg-dark-blue font-bold text-lg">TechnoArt</h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['2']}
          items={[
            { key: '1', icon: <ProductOutlined />, label: 'Products' },
            { key: '2', icon: <AppstoreOutlined />, label: 'Categories' },
            { key: '3', icon: <AppstoreOutlined />, label: 'Brands' },
            { key: '4', icon: <AppstoreAddOutlined />, label: 'Brand Category' },
            { key: '5', icon: <AppstoreOutlined />, label: 'Ads' },
            { key: '6', icon: <StockOutlined />, label: 'Stock' },
            { key: '7', icon: <SettingOutlined />, label: 'Settings' },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
          className="flex justify-between px-10"
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <button className="flex gap-3 items-center mx-6 text-base" onClick={handleClick}>
            <LogoutOutlined />
            <h3>Logout</h3>
          </button>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: '85vh',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Index;
