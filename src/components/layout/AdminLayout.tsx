import React, { useState, useEffect, useRef } from 'react';
import { Layout, Button, Space, Avatar, Dropdown, Input, type MenuProps } from 'antd';
import { SearchOutlined, SettingOutlined, BellOutlined, SunOutlined, MoonOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import logoSaecta from '../../assets/logo.png'; 

const { Header, Content } = Layout;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const searchInputRef = useRef<any>(null);

 
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [isDarkMode]);

  const handleSearchClick = () => {
    setIsSearchExpanded(true);
    
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 100);
  };

  const handleSearchBlur = () => {
    
    if (!searchValue) {
      setIsSearchExpanded(false);
    }
  };

  
  const menuItems: MenuProps['items'] = [
    {
      key: 'light',
      icon: <SunOutlined />,
      label: (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '110px' }}>
          Tema claro {!isDarkMode && <div className="active-theme-dot" />}
        </div>
      ),
      onClick: () => setIsDarkMode(false),
    },
    {
      key: 'dark',
      icon: <MoonOutlined />,
      label: (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '110px' }}>
          Tema Escuro {isDarkMode && <div className="active-theme-dot" />}
        </div>
      ),
      onClick: () => setIsDarkMode(true),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Sair da conta',
      danger: true, 
      onClick: () => navigate('/login'),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: 'transparent' }}>
      <Header className="admin-header" style={{ 
        backgroundColor: '#FFFFFF',
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '0 40px',
        height: '80px',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ width: '150px' }}></div>
        
        <img src={logoSaecta} alt="SAECTA" className="header-logo" style={{ height: '60px', objectFit: 'contain' }} />

        <Space size="middle" style={{ display: 'flex', alignItems: 'center' }}>
          <div onClick={handleSearchClick} style={{ cursor: 'pointer', display: 'flex' }}>
            <Input
              ref={searchInputRef}
              className={`header-search-input ${isSearchExpanded ? 'expanded' : 'collapsed'}`}
              placeholder="Pesquisar..."
              prefix={<SearchOutlined className="header-icon" />}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onBlur={handleSearchBlur}
            />
          </div>

          <Button className="header-action-btn" icon={<BellOutlined className="header-icon" />} />
          
          <Dropdown menu={{ items: menuItems }} trigger={['click']} placement="bottomRight">
            <Button className="header-action-btn" icon={<SettingOutlined className="header-icon" />} />
          </Dropdown>
          
          <Avatar src="https://api.dicebear.com/7.x/faces/svg?seed=Admin" style={{ marginLeft: '12px', cursor: 'pointer', width: '44px', height: '44px' }} />
        </Space>
      </Header>

      <Content className="admin-content" style={{ padding: '40px 24px', minHeight: 'calc(100vh - 80px)' }}>
        {children}
      </Content>
    </Layout>
  );
}