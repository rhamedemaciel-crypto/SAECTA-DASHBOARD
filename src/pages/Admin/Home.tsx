import React, { useState, useEffect } from 'react';
import { FloatButton, Pagination, ConfigProvider, Spin, message, Empty } from 'antd';
import { PlusOutlined, UserOutlined, BankOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import EntityCard from '../../components/ui/EntityCard';

import { adminService } from '../../services/adminService';

export default function Home() {
  const navigate = useNavigate();

  const [clients, setClients] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true);      
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; 

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true); 
      
      const data = await adminService.getRecentClients();
      
      if (Array.isArray(data)) {
        setClients(data);
      } else {
        setClients(data?.data || data?.clients || []);
      }

    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
      message.error('Não foi possível carregar a lista de clientes. Verifique a conexão com o servidor.');
    } finally {
      setLoading(false); 
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = clients.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '80vh' }}>
      
           {loading ? (
        <div style={{ marginTop: '100px' }}>
                   <Spin size="large" description="Carregando clientes..." />
        </div>
      ) : clients.length === 0 ? (
        <div style={{ marginTop: '100px' }}>
          <Empty description="Nenhum cliente encontrado no sistema." />
        </div>
      ) : (
        <>
          <div className="masonry-grid">
            {currentItems.map((item, index) => (
              <div className="masonry-item" key={item._id || item.id || index}>
                <EntityCard 
                  titulo={item.titulo || item.nomeFantasia || item.name || 'Nome não definido'}
                  endereco={item.endereco || item.address || 'Endereço não cadastrado'}
                  salas={item.salas || item.numberOfRooms || 0}
                  codigo={item.codigo || item.code || 'N/A'}
                  dataCriacao={item.dataCriacao || item.createdAt || 'N/A'}
                  logo={item.logo || 'https://cdn-icons-png.flaticon.com/512/2941/2941658.png'}
                  avatares={item.avatares || []}
                  alturaMinima={item.alturaMinima || (index % 2 === 0 ? 300 : 350)}
                  onEdit={() => navigate('/admin/cliente', { state: { clientData: item } })}
                />
              </div>
            ))}
          </div>

          <div style={{ marginTop: '12px', marginBottom: '24px' }}>
            <Pagination 
              current={currentPage} 
              pageSize={itemsPerPage} 
              total={clients.length} 
              onChange={(page) => setCurrentPage(page)} 
            />
          </div>
        </>
      )}
      
           <ConfigProvider
        theme={{
          components: {
            FloatButton: {
              colorBgElevated: '#122A4C', 
              colorPrimary: '#122A4C',    
              colorPrimaryHover: '#0f223d', 
              colorText: '#FFFFFF',       
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
            tooltip="Novo Administrador"
          />
          <FloatButton 
            icon={<BankOutlined />} 
            className="custom-float-btn-cliente"
            onClick={() => navigate('/admin/cliente')}
            tooltip="Novo Cliente"
          />
        </FloatButton.Group>
      </ConfigProvider>
    </div>
  );
}