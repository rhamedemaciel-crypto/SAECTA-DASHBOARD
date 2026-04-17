import React from 'react';
import { Form, Input, Select, Button, Row, Col, Upload, Avatar } from 'antd';
import {
  LeftOutlined, EditOutlined, MailOutlined, IdcardOutlined, 
  UserOutlined, LockOutlined, ArrowUpOutlined, BankOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export default function CadastroAdmin() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '40px' }}>
      
      {/* HEADER DA PÁGINA (Botão Voltar e Título) */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
        <Button
          type="text"
          icon={<LeftOutlined style={{ color: '#8D99AE' }} />}
          onClick={() => navigate('/admin')}
          className="header-action-btn"
          style={{ marginRight: '16px' }}
        />
        <h2 className="page-title" style={{ margin: 0, color: '#122A4C', fontSize: '20px', fontWeight: 800, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
          CADASTRAR ADMINISTRADOR
        </h2>
      </div>

      <Form form={form} layout="vertical" requiredMark={false}>
        
        {/* UPLOAD DE AVATAR */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '48px' }}>
          <Upload name="avatar" listType="picture-circle" showUploadList={false}>
            <div style={{ position: 'relative', cursor: 'pointer' }}>
              {/* Usando um avatar realístico temporário parecido com o do print */}
              <Avatar size={120} src="https://i.pravatar.cc/150?img=11" style={{ border: '3px solid #E2E8F0', padding: '2px', backgroundColor: '#FFF' }} />
              
              {/* O botãozinho verde de edição que já estilizamos no CSS */}
              <div className="avatar-edit-badge">
                <EditOutlined />
              </div>
            </div>
          </Upload>
        </div>

        {/* SESSÃO ÚNICA: DADOS BÁSICOS */}
        <div className="form-section-card">
          <h3 className="form-section-title">DADOS BÁSICOS</h3>
          <Row gutter={24}>
            
            <Col xs={24} md={8}>
              <Form.Item name="email">
                <Input size="large" placeholder="Email" prefix={<MailOutlined className="input-icon" />} className="custom-input" />
              </Form.Item>
            </Col>
            
            <Col xs={24} md={8}>
              <Form.Item name="codigo">
                <Input size="large" placeholder="Código" prefix={<IdcardOutlined className="input-icon" />} className="custom-input" />
              </Form.Item>
            </Col>
            
            <Col xs={24} md={8}>
              <Form.Item name="nome">
                <Input size="large" placeholder="Nome" prefix={<UserOutlined className="input-icon" />} className="custom-input" />
              </Form.Item>
            </Col>
            
            <Col xs={24} md={8}>
              <Form.Item name="senha">
                <Input.Password size="large" placeholder="Senha" prefix={<LockOutlined className="input-icon" />} className="custom-input" />
              </Form.Item>
            </Col>
            
            <Col xs={24} md={8}>
              <Form.Item name="nivelAcesso">
                <Select size="large" placeholder="Nível De Acesso" className="custom-select" suffixIcon={<ArrowUpOutlined className="input-icon"/>}>
                  <Select.Option value="master">Master</Select.Option>
                  <Select.Option value="gerente">Gerente</Select.Option>
                  <Select.Option value="suporte">Suporte</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            
            <Col xs={24} md={8}>
              <Form.Item name="clientes">
                <Select size="large" placeholder="Clientes" className="custom-select" suffixIcon={<BankOutlined className="input-icon"/>}>
                  <Select.Option value="todos">Todos os Clientes</Select.Option>
                  <Select.Option value="saect">SAECT Educação</Select.Option>
                  <Select.Option value="sesi">SESI PB</Select.Option>
                </Select>
              </Form.Item>
            </Col>

          </Row>
        </div>

        {/* BOTÃO SALVAR */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
          <Button type="primary" htmlType="submit" size="large" className="btn-salvar">
            SALVAR
          </Button>
        </div>
      </Form>
    </div>
  );
}