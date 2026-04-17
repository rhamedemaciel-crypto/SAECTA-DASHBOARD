import React, { useState } from 'react';
import { FloatButton, Pagination, ConfigProvider } from 'antd';
import { PlusOutlined, UserOutlined, BankOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import EntityCard from '../../components/ui/EntityCard';

export default function Home() {
  const navigate = useNavigate();

  // Estado pra controlar em qual página estamos
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Mantém a grade bonitinha

  const mockData = [
    { id: 1, titulo: 'SAECT EDUCAÇÃO', endereco: 'ILHA DO SORRISO, CIDADE DO SOL', salas: 4, codigo: '123346535', dataCriacao: '10/02/2026', logo: 'https://cdn-icons-png.flaticon.com/512/2941/2941658.png', alturaMinima: 300, avatares: ['https://i.pravatar.cc/150?img=11', 'https://i.pravatar.cc/150?img=12'] },
    { id: 2, titulo: 'SESI PB', endereco: 'ILHA DO SORRISO, CIDADE DO SOL', salas: 4, codigo: '123346535', dataCriacao: '10/02/2026', logo: 'https://cdn-icons-png.flaticon.com/512/2436/2436655.png', alturaMinima: 350, avatares: ['https://i.pravatar.cc/150?img=33', 'https://i.pravatar.cc/150?img=44', 'https://i.pravatar.cc/150?img=55'] },
    { id: 3, titulo: 'SESC SC', endereco: 'ILHA DO SORRISO, CIDADE DO SOL', salas: 4, codigo: '123346535', dataCriacao: '10/02/2026', logo: 'https://cdn-icons-png.flaticon.com/512/3106/3106144.png', alturaMinima: 380, avatares: ['https://i.pravatar.cc/150?img=60'] },
    { id: 4, titulo: 'NORMAL RURAL', endereco: 'ILHA DO SORRISO, CIDADE DO SOL', salas: 4, codigo: '123346535', dataCriacao: '10/02/2026', logo: 'https://cdn-icons-png.flaticon.com/512/167/167707.png', alturaMinima: 360, avatares: ['https://i.pravatar.cc/150?img=15', 'https://i.pravatar.cc/150?img=16'] },
    { id: 5, titulo: 'CIDADE ESCOLA', endereco: 'ILHA DO SORRISO, CIDADE DO SOL', salas: 4, codigo: '123346535', dataCriacao: '10/02/2026', logo: 'https://cdn-icons-png.flaticon.com/512/1940/1940611.png', alturaMinima: 310, avatares: ['https://i.pravatar.cc/150?img=68', 'https://i.pravatar.cc/150?img=69'] },
    { id: 6, titulo: 'SAECTA PB', endereco: 'ILHA DO SORRISO, CIDADE DO SOL', salas: 4, codigo: '123346535', dataCriacao: '10/02/2026', logo: 'https://cdn-icons-png.flaticon.com/512/2232/2232688.png', alturaMinima: 340, avatares: ['https://i.pravatar.cc/150?img=32'] },
    { id: 7, titulo: 'COLÉGIO PADRÃO', endereco: 'ILHA DO SORRISO, CIDADE DO SOL', salas: 4, codigo: '123346535', dataCriacao: '10/02/2026', logo: 'https://cdn-icons-png.flaticon.com/512/2436/2436873.png', alturaMinima: 320, avatares: ['https://i.pravatar.cc/150?img=47'] },
    { id: 8, titulo: 'INSTITUTO FÊNIX', endereco: 'ILHA DO SORRISO, CIDADE DO SOL', salas: 4, codigo: '123346535', dataCriacao: '10/02/2026', logo: 'https://cdn-icons-png.flaticon.com/512/2097/2097725.png', alturaMinima: 370, avatares: ['https://i.pravatar.cc/150?img=13', 'https://i.pravatar.cc/150?img=14'] },
    { id: 9, titulo: 'ESCOLA AVANÇO', endereco: 'CENTRO, RECIFE', salas: 6, codigo: '123346536', dataCriacao: '12/03/2026', logo: 'https://cdn-icons-png.flaticon.com/512/3556/3556183.png', alturaMinima: 330, avatares: ['https://i.pravatar.cc/150?img=20', 'https://i.pravatar.cc/150?img=21'] },
    { id: 10, titulo: 'LICEU ESTADUAL', endereco: 'BAIRRO NOVO, JOÃO PESSOA', salas: 5, codigo: '123346537', dataCriacao: '14/01/2026', logo: 'https://cdn-icons-png.flaticon.com/512/2452/2452597.png', alturaMinima: 350, avatares: ['https://i.pravatar.cc/150?img=25'] },
    { id: 11, titulo: 'ACADEMIA DOMUS', endereco: 'RUA DAS FLORES, BRASÍLIA', salas: 8, codigo: '123346538', dataCriacao: '20/02/2026', logo: 'https://cdn-icons-png.flaticon.com/512/1995/1995505.png', alturaMinima: 340, avatares: ['https://i.pravatar.cc/150?img=30', 'https://i.pravatar.cc/150?img=31', 'https://i.pravatar.cc/150?img=32'] },
    { id: 12, titulo: 'ESCOLA CRIATIVA', endereco: 'PRAIA, SALVADOR', salas: 7, codigo: '123346539', dataCriacao: '05/03/2026', logo: 'https://cdn-icons-png.flaticon.com/512/2500/2500593.png', alturaMinima: 360, avatares: ['https://i.pravatar.cc/150?img=40', 'https://i.pravatar.cc/150?img=41'] }
  ];

  // Lógica marota pra fatiar os dados dependendo da página
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = mockData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      <div className="masonry-grid">
        {/* Renderiza só os itens fatiados */}
        {currentItems.map((item) => (
          <div className="masonry-item" key={item.id}>
            <EntityCard 
              titulo={item.titulo}
              endereco={item.endereco}
              salas={item.salas}
              codigo={item.codigo}
              dataCriacao={item.dataCriacao}
              logo={item.logo}
              avatares={item.avatares}
              alturaMinima={item.alturaMinima}
              onEdit={() => navigate('/admin/cliente', { state: { clientData: item } })}
            />
          </div>
        ))}
      </div>

      <div style={{ marginTop: '12px', marginBottom: '24px' }}>
        {/* Paginação conectada com o estado */}
        <Pagination 
          current={currentPage} 
          pageSize={itemsPerPage} 
          total={mockData.length} 
          onChange={(page) => setCurrentPage(page)} 
        />
      </div>
      
      {/* O FloatButton blindado continua intacto aqui */}
      <ConfigProvider
        theme={{
          components: {
            FloatButton: {
              colorBgElevated: '#122A4C', /* Fundo Azul Escuro Padrão */
              colorPrimary: '#122A4C',    /* Fundo Azul Escuro Primário */
              colorPrimaryHover: '#0f223d', /* Azul Escuro no Hover */
              colorText: '#FFFFFF',       /* Força Ícones Brancos */
            },
          },
        }}
      >
        <FloatButton.Group
          trigger="click"
          style={{ right: 40, bottom: 40 }}
          icon={<PlusOutlined />}
          className="custom-float-group"
        >
          <FloatButton 
            icon={<UserOutlined />} 
            className="custom-float-btn-admin"
            onClick={() => navigate('/admin/novo-admin')}
          />
          <FloatButton 
            icon={<BankOutlined />} 
            className="custom-float-btn-cliente"
            onClick={() => navigate('/admin/cliente')}
          />
        </FloatButton.Group>
      </ConfigProvider>
    </div>
  );
}