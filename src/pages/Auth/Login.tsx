import React from 'react';
import { Button, Form, Input, Carousel, Typography, Row, Col, Space, message } from 'antd';
import { LockOutlined, UserOutlined, InstagramOutlined, YoutubeOutlined, WhatsAppOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './Login.css';

import { setAuthCookie } from '../../utils/cookies';

import logoSaecta from '../../assets/logo.png';
import intro1 from '../../assets/intro.png';
import intro2 from '../../assets/intro2.png';
import intro3 from '../../assets/intro3.png';

const { Text } = Typography;

export default function Login() {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
     
      
      setAuthCookie('token-falso-para-teste-12345');
      message.success('Passagem livre! Entrando no painel...');
      navigate('/admin');
      
      return; 
      

    } catch (erro) {
      console.error('Erro de autenticação:', erro);
      message.error('Erro ao tentar forçar o login.');
    }
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
                
                <span style={{ color: '#FFF', fontWeight: 600 }}>Google Cloud | KXP | ABES | Cirion</span>
              </div>
            </div>
          </div>
        </Col>

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
                
                <Input prefix={<UserOutlined />} placeholder="Digite seu usuário" className="login-input" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Insira sua senha!' }]}
              >
                
                <Input.Password prefix={<LockOutlined />} placeholder="Digite sua senha" className="login-input" />
              </Form.Item>

              <div className="forgot-password-container">
                <a 
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/esqueci-senha');
                  }} 
                  href="/esqueci-senha" 
                  className="forgot-password-link"
                >
                  Esqueci minha senha
                </a>
              </div>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-button" block>
                  Entrar
                </Button>
              </Form.Item>
            </Form>

            
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