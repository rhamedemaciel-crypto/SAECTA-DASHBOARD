import React, { useEffect } from 'react';
import { Form, Input, Select, Button, Row, Col, Upload, Avatar } from 'antd';
import {
  LeftOutlined, EditOutlined, IdcardOutlined, MailOutlined, UserOutlined,
  AppstoreOutlined, PhoneOutlined, FolderOutlined, EnvironmentOutlined,
  GlobalOutlined, HomeOutlined, NumberOutlined, CompassOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

export default function CadastroCliente() {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [form] = Form.useForm();

  
  const editData = location.state?.clientData;

  
  useEffect(() => {
    if (editData) {
      form.setFieldsValue({
        nome: editData.titulo,
        codigo: editData.codigo,
        logradouro: editData.endereco, 
      });
    }
  }, [editData, form]);

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '40px' }}>
      
      
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
        <Button
          type="text"
          icon={<LeftOutlined style={{ color: '#8D99AE' }} />}
          onClick={() => navigate('/admin')}
          className="header-action-btn"
          style={{ marginRight: '16px' }}
        />
        <h2 className="page-title" style={{ margin: 0, color: '#122A4C', fontSize: '20px', fontWeight: 800, letterSpacing: '0.5px' }}>
          
          {editData ? 'EDITAR CLIENTE' : 'CADASTRAR CLIENTE'}
        </h2>
      </div>

      <Form form={form} layout="vertical" requiredMark={false}>
        
        
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '48px' }}>
          <Upload name="logo" listType="picture-circle" showUploadList={false}>
            <div style={{ position: 'relative', cursor: 'pointer' }}>
              
              <Avatar 
                size={120} 
                src={editData ? editData.logo : "https://cdn-icons-png.flaticon.com/512/1940/1940611.png"} 
                style={{ border: '3px solid #E2E8F0', padding: '4px', backgroundColor: '#FFF' }} 
              />
              
              
              <div className="avatar-edit-badge">
                <EditOutlined />
              </div>
            </div>
          </Upload>
        </div>

        
        <div className="form-section-card">
          <h3 className="form-section-title">DADOS BÁSICOS</h3>
          <Row gutter={24}>
            <Col xs={24} md={8}>
              <Form.Item name="codigo">
                <Input size="large" placeholder="Código" prefix={<IdcardOutlined className="input-icon" />} className="custom-input" />
              </Form.Item>
            </Col>
            <Col xs={24} md={16}>
              <Form.Item name="email">
                <Input size="large" placeholder="Email" prefix={<MailOutlined className="input-icon" />} className="custom-input" />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item name="nome">
                <Input size="large" placeholder="Nome" prefix={<UserOutlined className="input-icon" />} className="custom-input" />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item name="tipo">
                <Select 
                  size="large" 
                  placeholder="Tipo" 
                  className="custom-select" 
                  suffixIcon={<AppstoreOutlined className="input-icon"/>}
                  getPopupContainer={(triggerNode) => triggerNode.parentNode} 
                >
                  <Select.Option value="escola">Escola</Select.Option>
                  <Select.Option value="universidade">Universidade</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item name="telefone">
                <Input size="large" placeholder="Telefone" prefix={<PhoneOutlined className="input-icon" />} className="custom-input" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="nomePasta">
                <Input size="large" placeholder="Nome Da Pasta" prefix={<FolderOutlined className="input-icon" />} className="custom-input" />
              </Form.Item>
            </Col>
          </Row>
        </div>

        
        <div className="form-section-card">
          <h3 className="form-section-title">ENDEREÇO</h3>
          <Row gutter={24}>
            <Col xs={24} md={8}>
              <Form.Item name="cep">
                <Input size="large" placeholder="CEP" prefix={<NumberOutlined className="input-icon" />} className="custom-input" />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item name="estado">
                <Input size="large" placeholder="Estado" prefix={<GlobalOutlined className="input-icon" />} className="custom-input" />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item name="cidade">
                <Input size="large" placeholder="Cidade" prefix={<EnvironmentOutlined className="input-icon" />} className="custom-input" />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item name="bairro">
                <Input size="large" placeholder="Bairro" prefix={<HomeOutlined className="input-icon" />} className="custom-input" />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item name="logradouro">
                <Input size="large" placeholder="Logradouro" prefix={<CompassOutlined className="input-icon" />} className="custom-input" />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item name="numero">
                <Input size="large" placeholder="Nº Numeração" prefix={<NumberOutlined className="input-icon" />} className="custom-input" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="complemento">
                <Input size="large" placeholder="Complemento" prefix={<EditOutlined className="input-icon" />} className="custom-input" />
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