import { useState, useEffect } from "react";
import {
  FloatButton,
  Pagination,
  ConfigProvider,
  Typography,
  Avatar,
  Divider,
  Button,
  Row,
  Col,
  List,
  Form,
  Input,
  InputNumber
} from "antd";
import {
  PlusOutlined,
  UserOutlined,
  BankOutlined,
  CloseOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ArrowLeftOutlined,
  GlobalOutlined,
  SaveOutlined,
  EditOutlined
} from "@ant-design/icons";

// IMPORTAÇÃO DOS NOVOS ÍCONES DA REACT-ICONS
import { MdSpaceDashboard } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { PiStudentFill } from "react-icons/pi"; 

import { useNavigate } from "react-router-dom";
import EntityCard from "../../components/ui/EntityCard";

// IMPORTAÇÃO DOS GRÁFICOS DINÂMICOS
import DonutChartCard from "../../components/ui/Charts/DonutChartCard/DonutChartCard";
import RadarChartCard from "../../components/ui/Charts/RadarChartCard/RadarChartCard";
import LineTrendChartCard from "../../components/ui/Charts/LineTrendChartCard/LineTrendChartCard";

import { clientData } from "../../data/mockData";
import styles from "./Units.module.css";
import "../../styles/forms.css"; // Trazendo o seu padrão de formulário

const { Title, Text } = Typography;

export default function Units() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUnit, setSelectedUnit] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'turmas'>('dashboard');
  const [selectedTurma, setSelectedTurma] = useState<any>(null);
  const [selectedAluno, setSelectedAluno] = useState<any>(null); // NOVO: Controle do Aluno

  // Controle se estamos apenas vendo os gráficos ou editando os dados
  const [viewMode, setViewMode] = useState<'view' | 'edit'>('view');

  const itemsPerPage = selectedUnit ? 6 : 8;
  const currentItems = clientData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Preenche os dados automaticamente quando entra em modo de edição
  useEffect(() => {
    if (selectedUnit && viewMode === 'edit') {
      form.setFieldsValue({
        titulo: selectedUnit.titulo,
        endereco: selectedUnit.endereco,
        salas: selectedUnit.salas,
        codigo: selectedUnit.codigo
      });
    }
  }, [selectedUnit, viewMode, form]);

  const handleClosePanel = () => {
    setSelectedUnit(null);
    setActiveTab('dashboard');
    setSelectedTurma(null);
    setSelectedAluno(null);
    setViewMode('view'); // Reseta para view ao fechar
  };

  const handleTabChange = (tab: 'dashboard' | 'turmas') => {
    setActiveTab(tab);
    setSelectedTurma(null);
    setSelectedAluno(null);
  };

  // Função fake de salvamento (para ligar a API depois)
  const handleSave = (values: any) => {
    console.log("Dados prontos para salvar:", values);
    // TODO: Disparar requisição aqui
    setViewMode('view'); // Volta para os gráficos após salvar
  };

  return (
    <div className={styles.pageContainer} style={{ position: 'relative' }}>
      <Row gutter={[24, 24]} style={{ margin: 0, width: '100%' }}>

        {/* === LADO ESQUERDO: LISTA MASONRY COMPACTA === */}
        <Col xs={24} lg={selectedUnit ? 8 : 24} className={styles.listTransition}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>

            <div className={selectedUnit ? styles.masonryCompact : "masonry-grid"} style={{ width: "100%" }}>
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
                    // Abre a edição no painel lateral!
                    onEdit={() => {
                      setSelectedUnit(item);
                      setViewMode('edit');
                      setSelectedTurma(null);
                      setSelectedAluno(null);
                    }}
                    onView={() => {
                      setSelectedUnit(item);
                      setViewMode('view');
                    }}
                  />
                </div>
              ))}
            </div>

            <div className={styles.paginationWrapper}>
              <Pagination
                current={currentPage}
                pageSize={itemsPerPage}
                total={clientData.length}
                onChange={(page) => setCurrentPage(page)}
              />
            </div>
          </div>
        </Col>

        {/* === LADO DIREITO: DASHBOARD OU FORMULÁRIO DE EDIÇÃO === */}
        {selectedUnit && (
          <Col xs={24} lg={16} className={styles.detailSlideIn}>
            <div className={styles.splitPanelContainer}>

              {/* O menu lateral de navegação desaparece se estiver a editar para não confundir */}
              {viewMode === 'view' && (
                <div className={styles.miniVerticalNav}>
                  <div
                    className={`${styles.miniNavItem} ${activeTab === 'dashboard' ? styles.miniNavActive : ''}`}
                    onClick={() => handleTabChange('dashboard')}
                  >
                    <MdSpaceDashboard />
                  </div>
                  <div
                    className={`${styles.miniNavItem} ${activeTab === 'turmas' ? styles.miniNavActive : ''}`}
                    onClick={() => handleTabChange('turmas')}
                  >
                    <SiGoogleclassroom style={{ fontSize: '18px' }} />
                  </div>
                </div>
              )}

              <div className={`form-section-card ${styles.detailContent}`}>
                <Button
                  type="text"
                  icon={<CloseOutlined />}
                  onClick={handleClosePanel}
                  className={styles.closeBtn}
                />

                <div className={styles.unitHeaderBlock}>
                  {selectedAluno && viewMode === 'view' ? (
                    <Avatar size={64} src={selectedAluno.avatar} icon={<PiStudentFill />} />
                  ) : selectedTurma && viewMode === 'view' ? (
                    <Avatar size={64} style={{ backgroundColor: '#1e3a5f' }} icon={<SiGoogleclassroom />} />
                  ) : (
                    <Avatar size={64} src={selectedUnit.logo} className={styles.unitAvatar} />
                  )}
                  <div>
                    <Title level={4} className={styles.unitName}>
                      {viewMode === 'edit' ? `A editar: ${selectedUnit.titulo}` 
                        : selectedAluno ? selectedAluno.nome 
                        : selectedTurma ? selectedTurma.nome 
                        : selectedUnit.titulo}
                    </Title>
                    <Text className={styles.unitLocation}>
                      {selectedAluno && viewMode === 'view' ? (
                        <>MATRÍCULA: {selectedAluno.matricula} | TURMA: {selectedTurma.nome}</>
                      ) : selectedTurma && viewMode === 'view' ? (
                        <>TURNO: {selectedTurma.turno.toUpperCase()}</>
                      ) : (
                        <><GlobalOutlined style={{ marginRight: '4px' }} /> {selectedUnit.endereco}</>
                      )}
                    </Text>
                  </div>
                  
                  {/* Botão de atalho para editar direto do painel aberto */}
                  {viewMode === 'view' && !selectedTurma && !selectedAluno && (
                    <Button 
                      type="text" 
                      icon={<EditOutlined />} 
                      onClick={() => setViewMode('edit')}
                      style={{ marginLeft: 'auto', color: '#8D99AE' }}
                    >
                      Editar Unidade
                    </Button>
                  )}
                </div>

                <Divider style={{ margin: '16px 0' }} />

                {/* === COMUTAÇÃO: MOSTRA O FORMULÁRIO OU OS GRÁFICOS === */}
                {viewMode === 'edit' ? (
                  <div className={`${styles.tabAnimation} ${styles.editFormContainer}`}>
                    <Form
                      form={form}
                      layout="vertical"
                      onFinish={handleSave}
                      requiredMark={false}
                    >
                      <Row gutter={16}>
                        <Col span={24}>
                          <Form.Item label="Nome da Unidade" name="titulo" rules={[{ required: true, message: 'O nome é obrigatório' }]}>
                            <Input size="large" placeholder="Ex: Escola Anita Garibaldi" />
                          </Form.Item>
                        </Col>
                        <Col span={24}>
                          <Form.Item label="Endereço Completo" name="endereco">
                            <Input size="large" placeholder="Rua, Bairro, Cidade..." />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="Qtd. de Salas" name="salas">
                            <InputNumber size="large" style={{ width: '100%' }} min={1} />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="Código INEP" name="codigo">
                            <Input size="large" placeholder="Digite o código" />
                          </Form.Item>
                        </Col>
                      </Row>
                      
                      <div style={{ display: 'flex', gap: '12px', marginTop: '16px', justifyContent: 'flex-end' }}>
                        <Button size="large" className={styles.btnCancelar} onClick={() => setViewMode('view')}>
                          Cancelar
                        </Button>
                        <Button size="large" type="primary" htmlType="submit" icon={<SaveOutlined />} className={styles.btnSalvar}>
                          Salvar Alterações
                        </Button>
                      </div>
                    </Form>
                  </div>
                ) : (
                  <>
                    {/* --- ABA: DASHBOARD GERAL DA UNIDADE --- */}
                    {activeTab === 'dashboard' && !selectedTurma && !selectedAluno && (
                      <div className={styles.tabAnimation}>
                        <Text className={styles.sectionTitle}>Visão Geral da Unidade</Text>

                        <div className={styles.statsContainer}>
                          <div className={styles.statItem}>
                            <Text className={styles.statCount}>{selectedUnit.dashboardGeral?.metrics.alunos || 0}</Text>
                            <Text className={styles.statDesc}>ALUNOS</Text>
                          </div>
                          <div className={styles.statItem}>
                            <Text className={styles.statCount}>{selectedUnit.dashboardGeral?.metrics.avaliacoes || 0}</Text>
                            <Text className={styles.statDesc}>AVALIAÇÕES</Text>
                          </div>
                          <div className={styles.statItem}>
                            <Text className={styles.statCount}>{selectedUnit.dashboardGeral?.metrics.aptos || 0}</Text>
                            <Text className={styles.statDesc}>APTOS</Text>
                          </div>
                        </div>

                        <div style={{ marginTop: '24px' }}>
                          <Row gutter={[16, 16]}>
                            <Col span={12}>
                              <RadarChartCard data={selectedUnit.dashboardGeral?.radar} />
                            </Col>
                            <Col span={12}>
                              <DonutChartCard data={selectedUnit.dashboardGeral?.donut} title="NÍVEL DE APRENDIZAGEM" />
                            </Col>
                          </Row>
                          <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
                            <Col span={24}>
                              <LineTrendChartCard data={selectedUnit.dashboardGeral?.trend} />
                            </Col>
                          </Row>
                        </div>
                      </div>
                    )}

                    {/* --- ABA: LISTA DE TURMAS --- */}
                    {activeTab === 'turmas' && !selectedTurma && !selectedAluno && (
                      <div className={styles.tabAnimation}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                          <Text className={styles.sectionTitle}>Turmas Vinculadas</Text>
                          <Button type="primary" size="small" icon={<PlusOutlined />} className="btn-salvar">NOVA TURMA</Button>
                        </div>

                        {selectedUnit.turmas && selectedUnit.turmas.length > 0 ? (
                          <List
                            itemLayout="horizontal"
                            dataSource={selectedUnit.turmas}
                            renderItem={(turma: any) => (
                              <List.Item className={styles.turmaListItem} onClick={() => setSelectedTurma(turma)}>
                                <List.Item.Meta
                                  avatar={<Avatar icon={<SiGoogleclassroom />} style={{ backgroundColor: '#122A4C' }} />}
                                  title={<Text style={{ fontWeight: 700, color: '#122A4C' }}>{turma.nome}</Text>}
                                  description={`Turno: ${turma.turno} | Alunos: ${turma.dashboardTurma?.metrics.alunos || 0}`}
                                />
                              </List.Item>
                            )}
                          />
                        ) : (
                          <div style={{ textAlign: 'center', padding: '40px 20px', color: '#8D99AE' }}>Nenhuma turma cadastrada.</div>
                        )}
                      </div>
                    )}

                    {/* --- ABA: DASHBOARD DA TURMA E LISTA DE ALUNOS (DRILL-DOWN) --- */}
                    {selectedTurma && !selectedAluno && (
                      <div className={styles.tabAnimation}>
                        <Button type="link" icon={<ArrowLeftOutlined />} onClick={() => setSelectedTurma(null)} style={{ padding: 0, marginBottom: '16px', fontWeight: 600 }}>
                          Voltar para Lista de Turmas
                        </Button>

                        <div className={styles.statsContainer}>
                          <div className={styles.statItem}>
                            <Text className={styles.statCount}>{selectedTurma.dashboardTurma?.metrics.alunos || 0}</Text>
                            <Text className={styles.statDesc}>ALUNOS</Text>
                          </div>
                          <div className={styles.statItem}>
                            <Text className={styles.statCount}>{selectedTurma.dashboardTurma?.metrics.avaliacoes || 0}</Text>
                            <Text className={styles.statDesc}>AVALIAÇÕES</Text>
                          </div>
                        </div>

                        <div style={{ marginTop: '24px' }}>
                          <Row gutter={[16, 16]}>
                            <Col span={12}>
                              <RadarChartCard data={selectedTurma.dashboardTurma?.radar} />
                            </Col>
                            <Col span={12}>
                              <DonutChartCard data={selectedTurma.dashboardTurma?.donut} title="NÍVEL DA TURMA" />
                            </Col>
                          </Row>
                          <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
                            <Col span={24}>
                              <LineTrendChartCard data={selectedTurma.dashboardTurma?.trend} />
                            </Col>
                          </Row>
                        </div>

                        {/* LISTA DE ALUNOS DA TURMA */}
                        <Divider style={{ margin: '32px 0 16px 0' }} />
                        <Text className={styles.sectionTitle}>Alunos da Turma</Text>
                        
                        {selectedTurma.alunos && selectedTurma.alunos.length > 0 ? (
                          <List
                            itemLayout="horizontal"
                            dataSource={selectedTurma.alunos}
                            renderItem={(aluno: any) => (
                              <List.Item className={styles.turmaListItem} onClick={() => setSelectedAluno(aluno)}>
                                <List.Item.Meta
                                  avatar={<Avatar src={aluno.avatar} icon={<PiStudentFill />} />}
                                  title={<Text style={{ fontWeight: 700, color: '#122A4C' }}>{aluno.nome}</Text>}
                                  description={`Média Geral: ${aluno.dashboardAluno?.metrics.media || '-'} | Matrícula: ${aluno.matricula}`}
                                />
                              </List.Item>
                            )}
                          />
                        ) : (
                          <div style={{ textAlign: 'center', padding: '40px 20px', color: '#8D99AE' }}>Nenhum aluno cadastrado nesta turma.</div>
                        )}
                      </div>
                    )}

                    {/* --- NÍVEL 3: DASHBOARD DO ALUNO --- */}
                    {selectedAluno && (
                      <div className={styles.tabAnimation}>
                        <Button type="link" icon={<ArrowLeftOutlined />} onClick={() => setSelectedAluno(null)} style={{ padding: 0, marginBottom: '16px', fontWeight: 600 }}>
                          Voltar para {selectedTurma.nome}
                        </Button>

                        <div className={styles.statsContainer}>
                          <div className={styles.statItem}>
                            <Text className={styles.statCount}>{selectedAluno.dashboardAluno?.metrics.media || 0}</Text>
                            <Text className={styles.statDesc}>MÉDIA GERAL</Text>
                          </div>
                          <div className={styles.statItem}>
                            <Text className={styles.statCount}>{selectedAluno.dashboardAluno?.metrics.faltas || 0}</Text>
                            <Text className={styles.statDesc}>FALTAS</Text>
                          </div>
                          <div className={styles.statItem}>
                            <Text className={styles.statCount}>{selectedAluno.dashboardAluno?.metrics.posicao || "-"}</Text>
                            <Text className={styles.statDesc}>POSIÇÃO NA TURMA</Text>
                          </div>
                        </div>

                        <div style={{ marginTop: '24px' }}>
                          <Row gutter={[16, 16]}>
                            <Col span={12}>
                              <RadarChartCard data={selectedAluno.dashboardAluno?.radar} />
                            </Col>
                            <Col span={12}>
                              <DonutChartCard data={selectedAluno.dashboardAluno?.donut} title="PERFIL DE APRENDIZADO" />
                            </Col>
                          </Row>
                          <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
                            <Col span={24}>
                              <LineTrendChartCard data={selectedAluno.dashboardAluno?.trend} />
                            </Col>
                          </Row>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </Col>
        )}
      </Row>

      <ConfigProvider theme={{ components: { FloatButton: { colorBgBase: "#fff", colorBgElevated: "#122A4C", colorPrimary: "#122A4C", colorPrimaryHover: "#0f223d", colorText: "#FFFFFF" } } }}>
        <FloatButton.Group
          trigger="click"
          style={{
            /* Se o painel abrir, o botão recua para o lado dos cartões */
            right: selectedUnit ? 'calc(66% + 40px)' : '40px',
            bottom: 40,
            position: 'fixed',
            zIndex: 1000,
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)' 
          }}
          icon={<PlusOutlined className={styles.floatGroupButtonOpen} />}
          closeIcon={<CloseOutlined className={styles.floatGroupButtonClose} />}
          className="custom-float-group"
        >
          {/* 👇 TRUQUE FINAL: Ícone passado como "filho" em vez de propriedade "icon" 👇 */}
          <FloatButton 
            className="custom-float-btn-admin" 
            onClick={() => navigate("/admin/novo-admin")}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
              <MdSpaceDashboard size={22} color="#ffffff" />
            </div>
          </FloatButton>
          
          <FloatButton 
            icon={<BankOutlined className={styles.floatButton} />} 
            className="custom-float-btn-cliente" 
            onClick={() => navigate("/admin/cliente")} 
          />
        </FloatButton.Group>
      </ConfigProvider>
    </div>
  );
}