import React from 'react';
import { Button, Form, Input, Carousel, Typography, Row, Col, Space } from 'antd';
import { LockOutlined, UserOutlined, InstagramOutlined, YoutubeOutlined, WhatsAppOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './Login.css';

// Importando as imagens diretamente da pasta assets
import logoSaecta from '../../assets/logo.png';
import intro1 from '../../assets/intro.png';
import intro2 from '../../assets/intro2.png';
import intro3 from '../../assets/intro3.png';

const { Text } = Typography;

export default function Login() {
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    console.log('Valores do formulário:', values);
    navigate('/admin');
  };

  return (
    <div className="login-wrapper">
      <Row className="login-container" align="middle" justify="center">

        {/* COLUNA ESQUERDA - Branding e Carrossel */}
        <Col xs={0} md={12} className="login-left-col">
          <div className="login-left-content">

            <div className="logo-container">
              {/* Logo real carregada do assets */}
              <img src={logoSaecta} alt="SAECTA" className="saecta-logo" />
            </div>

            <div className="carousel-wrapper">
              <Carousel
                autoplay
                effect="fade"
                autoplaySpeed={5000}
              >
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi in facilisis nunc.
            </p>

            <div className="partners-container">
              <Text style={{ color: '#EBEBEB', marginBottom: '8px', display: 'block', fontSize: '12px' }}>Parceiros</Text>
              <div className="partners-box">
                {/* Texto temporário até termos a imagem oficial dos parceiros */}
                <span style={{ color: '#FFF', fontWeight: 600 }}>Google Cloud | KXP | ABES | Cirion</span>
              </div>
            </div>
          </div>
        </Col>

        {/* COLUNA DIREITA - Formulário de Login */}
        <Col xs={24} md={12} className="login-right-col">
          <div className="login-form-wrapper">

            <div className="client-logo-container">
              <h2 style={{ color: '#193051', margin: 0 }}>
                <span style={{ fontSize: '30px', fontWeight: 'bold' }}>CL</span>
                <span style={{ color: '#3A4040', fontSize: '24px' }}> | LOGO CLIENTE</span>
              </h2>
            </div>

            <Form
              name="login_form"
              layout="vertical"
              onFinish={onFinish}
              size="large"
            >
              <Form.Item
                name="user"
                rules={[{ required: true, message: 'Insira seu usuário!' }]}
              >
                {/* Trocamos para login-input */}
                <Input prefix={<UserOutlined />} placeholder="Digite seu usuário" className="login-input" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Insira sua senha!' }]}
              >
                {/* Trocamos para login-input */}
                <Input.Password prefix={<LockOutlined />} placeholder="Digite sua senha" className="login-input" />
              </Form.Item>

              <div className="forgot-password-container">
                <a href="#!" className="forgot-password-link">Esqueci minha senha</a>
              </div>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-button" block>
                  Entrar
                </Button>
              </Form.Item>
            </Form>

            {/* Rodapé do Form - Redes Sociais */}
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