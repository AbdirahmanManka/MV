import React, { useState } from 'react';
import { Layout as AntLayout, Input, Button, Space, Typography } from 'antd';
import { SearchOutlined, HomeOutlined, FireOutlined, StarOutlined, CalendarOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import './Layout.css';

const { Header, Content } = AntLayout;
const { Title } = Typography;

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (value) => {
    if (value.trim()) {
      navigate(`/search?q=${encodeURIComponent(value.trim())}`);
      setSearchQuery('');
    }
  };

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <AntLayout className="app-layout">
      <Header className="app-header">
        <div className="header-content">
          <div className="header-left">
            <Title level={3} className="app-title" onClick={() => navigate('/')}>
              🎬 MovieHub
            </Title>
            <Space className="nav-buttons" size="middle">
              <Button
                type={isActive('/') ? 'primary' : 'text'}
                icon={<HomeOutlined />}
                onClick={() => navigate('/')}
                className="nav-button"
              >
                Home
              </Button>
              <Button
                type={isActive('/popular') ? 'primary' : 'text'}
                icon={<FireOutlined />}
                onClick={() => navigate('/popular')}
                className="nav-button"
              >
                Popular
              </Button>
              <Button
                type={isActive('/top-rated') ? 'primary' : 'text'}
                icon={<StarOutlined />}
                onClick={() => navigate('/top-rated')}
                className="nav-button"
              >
                Top Rated
              </Button>
              <Button
                type={isActive('/upcoming') ? 'primary' : 'text'}
                icon={<CalendarOutlined />}
                onClick={() => navigate('/upcoming')}
                className="nav-button"
              >
                Upcoming
              </Button>
            </Space>
          </div>
          <div className="header-right">
            <Input.Search
              placeholder="Search movies..."
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onSearch={handleSearch}
              className="search-input"
              style={{ width: 300 }}
            />
          </div>
        </div>
      </Header>
      <Content className="app-content">
        {children}
      </Content>
    </AntLayout>
  );
};

export default Layout;


