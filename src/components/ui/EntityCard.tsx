import React from 'react';
import { Avatar } from 'antd';
import { EnvironmentOutlined, MoreOutlined, LayoutOutlined } from '@ant-design/icons';

// Adicionamos as novas propriedades que o card vai receber
interface EntityCardProps {
  titulo: string;
  endereco: string;
  salas: number;
  codigo: string;
  dataCriacao: string;
  logo: string;
  avatares: string[];
  alturaMinima: number; // Isso vai forçar o efeito Masonry
  onEdit?: () => void;
}

export default function EntityCard({ 
  titulo, endereco, salas, codigo, dataCriacao, logo, avatares, alturaMinima, onEdit
}: EntityCardProps) {
  return (
    <div className="saecta-card" style={{ minHeight: `${alturaMinima}px` }}>
      <div className="card-gradient-bg"></div>
      
      <div className="card-floating-avatar">
        {/* Logo dinâmica recebida via props */}
        <img src={logo} alt={`Logo ${titulo}`} style={{ opacity: 0.9 }} />
      </div>

      {/* A DIV BLINDADA QUE GARANTE O CLIQUE */}
      <div 
        className="card-options-btn" 
        onClick={(e) => {
          e.stopPropagation(); // Impede que outras divs roubem o clique
          if (onEdit) onEdit();
        }}
      >
        <MoreOutlined />
      </div>

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