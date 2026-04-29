import React from 'react';
import { Avatar, Dropdown, type MenuProps } from 'antd';
import {   EnvironmentOutlined,  MoreOutlined,  LayoutOutlined,  EyeOutlined,  EditOutlined} from '@ant-design/icons';

interface EntityCardProps {
  titulo: string;
  endereco: string;
  salas: number;
  codigo: string;
  dataCriacao: string;
  logo: string;
  avatares: string[];
  alturaMinima: number; 
  onEdit?: () => void;
  onView?: () => void; // NOVO: Propriedade para abrir o Drawer
}

export default function EntityCard({ 
  titulo, endereco, salas, codigo, dataCriacao, logo, avatares, alturaMinima, onEdit, onView
}: EntityCardProps) {
  
  // NOVO: Configuração do Menu Suspenso (Dropdown)
  const menuItems: MenuProps['items'] = [
    {
      key: 'view',
      icon: <EyeOutlined />,
      label: 'Visualizar informações',
      onClick: (e) => {
        e.domEvent.stopPropagation(); // Evita conflitos de clique na tela
        if (onView) onView(); // Aciona o Drawer
      }
    },
    {
      key: 'edit',
      icon: <EditOutlined />,
      label: 'Editar informações',
      onClick: (e) => {
        e.domEvent.stopPropagation(); // Evita conflitos de clique na tela
        if (onEdit) onEdit(); // Aciona a navegação para a tela de edição
      }
    }
  ];

  return (
    <div className="saecta-card" style={{ minHeight: `${alturaMinima}px` }}>
      <div className="card-gradient-bg"></div>
      
      <div className="card-floating-avatar">
        {/* Logo dinâmica recebida via props */}
        <img src={logo} alt={`Logo ${titulo}`} style={{ opacity: 0.9 }} />
      </div>

      {/* NOVO: Envelopamos o seu botão original com o Dropdown */}
      <Dropdown menu={{ items: menuItems }} trigger={['click']} placement="bottomRight">
        <div 
          className="card-options-btn" 
          onClick={(e) => e.stopPropagation()} // Mantém a proteção de clique do seu código original
        >
          <MoreOutlined />
        </div>
      </Dropdown>

      <div className="card-content" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        
        <div className="card-title">
          {titulo}
        </div>

        <div className="card-address">
          <EnvironmentOutlined />
          <span>{endereco}</span>
          <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <LayoutOutlined /> {salas}
          </span>
        </div>

        {/* O mt-auto joga os metadados lá pro fundo do card, preenchendo o espaço */}
        <div className="card-metadata" style={{ marginTop: 'auto' }}>
          <div className="meta-column">
            <span className="meta-label">Gerente(s)</span>
            <Avatar.Group size="small" maxCount={3}>
              {/* Renderiza as fotos reais dinamicamente */}
              {avatares.map((foto, index) => (
                <Avatar key={index} src={foto} />
              ))}
            </Avatar.Group>
          </div>
          
          <div className="meta-column">
            <span className="meta-label">Código</span>
            <span className="meta-value">{codigo}</span>
          </div>

          <div className="meta-column">
            <span className="meta-label">Data Criação</span>
            <span className="meta-value">{dataCriacao}</span>
          </div>
        </div>
      </div>
    </div>
  );
}