import React from 'react';
import { Button, Form, Input, Carousel, Typography, Row, Col, Space } from 'antd';
import { MailOutlined, ArrowLeftOutlined, InstagramOutlined, YoutubeOutlined, WhatsAppOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './Login.css'; 


import logoSaecta from '../../assets/logo.png';
import intro1 from '../../assets/intro.png';
import intro2 from '../../assets/intro2.png';
import intro3 from '../../assets/intro3.png';

const { Text } = Typography;

export default function ForgotPassword() {
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    console.log('Solicitar recuperação para o email:', values.email);
  };

  return (
    <div className="login-wrapper">
      <Row className="login-container" align="middle" justify="center">
        <Col xs={0} md={12} className="login-left-col">
          <div className="login-left-content">
            <div className="logo-container">
              <img src={logoSaecta} alt="SAECTA" className="saecta-logo" />
            </div>

            <div className="carousel-wrapper">
              <Carousel autoplay effect="fade" autoplaySpeed={5000}>
                <div className="carousel-slide">
                  <img src={intro1} alt="Introdução 1" className="carousel-image" />
                </div>
                <div className="carousel-slide">
                  <img src={intro2} alt="Introdução 2" className="carousel-image" />
                </div>
                <div className="carousel-slide">
                  <img src={intro3} alt="Introdução 3" className="carousel-image" />
                </div>
              </Carousel>
            </div>

            <p className="carousel-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>

            <div className="partners-container">
              <Text style={{ color: '#EBEBEB', marginBottom: '8px', display: 'block', fontSize: '12px' }}>Parceiros</Text>
              <div className="partners-box">
                <span style={{ color: '#FFF', fontWeight: 600 }}>Google Cloud | KXP | ABES | Cirion</span>
              </div>
            </div>
          </div>
        </Col>
        <Col xs={24} md={12} className="login-right-col">
          <div className="login-form-wrapper">

            <div className="client-logo-container" style={{ marginBottom: '32px' }}>
              <h2 style={{ color: '#193051', margin: 0, marginBottom: '8px' }}>
                <span style={{ fontSize: '30px', fontWeight: 'bold' }}>Recuperar Senha</span>
              </h2>
              <Text style={{ color: '#010203', fontSize: '14px', display: 'block', maxWidth: '300px', margin: '0 auto' }}>
                Digite seu e-mail cadastrado. Enviaremos as instruções para você redefinir sua senha.
              </Text>
            </div>

            <Form
              name="forgot_password_form"
              layout="vertical"
              onFinish={onFinish}
              size="large"
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: 'Insira seu e-mail!' },
                  { type: 'email', message: 'Insira um formato de e-mail válido!' }
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder="Digite seu e-mail" className="login-input" />
              </Form.Item>

              <Form.Item style={{ marginTop: '32px' }}>
                <Button type="primary" htmlType="submit" className="login-button" block style={{ height: '48px', borderRadius: '8px', backgroundColor: '#3B82F6' }}>
                  Enviar Instruções
                </Button>
              </Form.Item>
            </Form>

            <div style={{ textAlign: 'center', marginTop: '16px', marginBottom: '40px' }}>
              <Button type="link" icon={<ArrowLeftOutlined />} onClick={() => navigate('/login')} style={{ color: '#003994' }}>
                Voltar para o Login
              </Button>
            </div>

            <div className="login-footer">
              <Space size="large">
                <div className="footer-icon-group">
                  <Text className="footer-text">Redes Sociais</Text>
                  <Space>
                    <InstagramOutlined className="footer-icon" />
                    <YoutubeOutlined className="footer-icon" />
                  </Space>
                </div>
                <div className="footer-icon-group">
                  <Text className="footer-text">Contato Suporte</Text>
                  <Space>
                    <WhatsAppOutlined className="footer-icon" />
                    <MailOutlined className="footer-icon" />
                  </Space>
                </div>
              </Space>
            </div>

          </div>
        </Col>
      </Row>
    </div>
  );
}