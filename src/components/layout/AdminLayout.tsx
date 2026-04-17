import React, { useState, useEffect, useRef } from 'react';
import { Layout, Button, Space, Avatar, Dropdown, Input, type MenuProps } from 'antd';
import { SearchOutlined, SettingOutlined, BellOutlined, SunOutlined, MoonOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import logoSaecta from '../../assets/logo.png'; 

const { Header, Content } = Layout;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  // Estado para controlar o modo escuro
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Estados e Referência para controlar a pesquisa expansível
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const searchInputRef = useRef<any>(null);

  // Efeito que adiciona ou remove a classe 'dark-theme' do HTML dependendo do estado
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [isDarkMode]);

  // --- Funções da Barra de Pesquisa Animada ---
  const handleSearchClick = () => {
    setIsSearchExpanded(true);
    // Pequeno delay para garantir que a animação CSS começou antes de focar
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 100);
  };

  const handleSearchBlur = () => {
    // Só fecha a barra se o usuário clicar fora E não tiver digitado nada
    if (!searchValue) {
      setIsSearchExpanded(false);
    }
  };

  // Configuração do Menu Suspenso (Dropdown)
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
          
          {/* PESQUISA ANIMADA (AGORA ENVOLVIDA NUMA DIV QUE NÃO FALHA O CLIQUE) */}
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