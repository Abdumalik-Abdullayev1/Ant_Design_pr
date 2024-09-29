import React, { useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { user } from '../../router/routes'

const { Header, Sider, Content } = Layout;

const Index = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("")
  const { pathname } = useLocation()
  const navigate = useNavigate();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    let index = user.findIndex((item) => item.path === pathname)
    setSelectedKey(index.toString())
  }, [pathname])

  const handleClick = () => {
    localStorage.clear()
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
            selectedKeys={[selectedKey]}
            items={user.map((item, index) => ({
              key: index.toString(),
              icon: item.icon,
              label: <NavLink to={item.path} className='text-white'>{item.content}</NavLink>
            }))}
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
            <LogoutOutlined/>
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
