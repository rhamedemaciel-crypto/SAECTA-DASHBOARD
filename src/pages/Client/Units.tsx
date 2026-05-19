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
  InputNumber,
  Spin,
  message
} from "antd";
import {
  PlusOutlined,
  BankOutlined,
  CloseOutlined,
  ArrowLeftOutlined,
  GlobalOutlined,
  SaveOutlined,
  EditOutlined
} from "@ant-design/icons";

import { MdSpaceDashboard } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { PiStudentFill } from "react-icons/pi"; 

import { useNavigate } from "react-router-dom";
import EntityCard from "../../components/ui/EntityCard";

import DonutChartCard from "../../components/ui/Charts/DonutChartCard/DonutChartCard";
import RadarChartCard from "../../components/ui/Charts/RadarChartCard/RadarChartCard";
import LineTrendChartCard from "../../components/ui/Charts/LineTrendChartCard/LineTrendChartCard";

import { clientData } from "../../data/mockData";
import styles from "./Units.module.css";
import "../../styles/forms.css";

import { subjectService } from "../../services/subjectService";
import { skillService } from "../../services/skillService";
import { classService } from "../../services/classService"; // NOVO: Serviço de Turmas

const { Title, Text } = Typography;

export default function Units() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  
  const [isDarkMode, setIsDarkMode] = useState(document.body.classList.contains('dark-theme'));

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.body.classList.contains('dark-theme'));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUnit, setSelectedUnit] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'turmas'>('dashboard');
  const [selectedTurma, setSelectedTurma] = useState<any>(null);
  const [selectedAluno, setSelectedAluno] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'view' | 'edit'>('view');

  const [turmas, setTurmas] = useState<any[]>([]);
  const [loadingTurmas, setLoadingTurmas] = useState(false);

  useEffect(() => {
    async function runTests() {
      try {
        console.log("Iniciando busca de Disciplinas...");
        const subjects = await subjectService.getAll();
        console.log("✅ Disciplinas do Banco:", subjects);

        console.log("Iniciando busca de Habilidades...");
        const skills = await skillService.getAll();
        console.log("✅ Habilidades do Banco:", skills);
      } catch (error) {
        console.error("❌ Falha no teste de conexão com Disciplinas/Habilidades:", error);
      }
    }
    runTests();
  }, []);

  useEffect(() => {
    if (selectedUnit && activeTab === 'turmas') {
      fetchTurmasDoBanco(selectedUnit._id || selectedUnit.id);
    }
  }, [selectedUnit, activeTab]);

  const fetchTurmasDoBanco = async (unitId: string) => {
    setLoadingTurmas(true);
    try {
      const data = await classService.getAll();
      if (Array.isArray(data)) {
        const filtradas = data.filter((t: any) => t.client === unitId || t.clientId === unitId || t.unit === unitId);
        setTurmas(filtradas.length > 0 ? filtradas : data); // Fallback: mostra todas se não houver vínculo explícito mapeado ainda
      } else {
        setTurmas([]);
      }
    } catch (error) {
      console.error("Erro ao buscar turmas do backend:", error);
      message.error("Não foi possível carregar as turmas reais do servidor.");
      setTurmas([]); // Garante que limpa o estado de mock antigo se falhar
    } finally {
      setLoadingTurmas(false);
    }
  };

  const itemsPerPage = selectedUnit ? 6 : 8;
  const currentItems = clientData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const bgColor = isDarkMode ? "#141414" : "transparent";
  const panelBg = isDarkMode ? "#1F1F1F" : "#ffffff";
  const textColor = isDarkMode ? "#E2E8F0" : "#1e3a5f";
  const subTextColor = isDarkMode ? "#A0AABF" : "#8c9bb5";
  const borderColor = isDarkMode ? "#334155" : "#e8eef5";
  const miniNavBg = isDarkMode ? "#1E293B" : "#122A4C";

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
    setViewMode('view');
    setTurmas([]);
  };

  const handleTabChange = (tab: 'dashboard' | 'turmas') => {
    setActiveTab(tab);
    setSelectedTurma(null);
    setSelectedAluno(null);
  };

  const handleSave = (values: any) => {
    console.log("Dados prontos para salvar:", values);
    setViewMode('view');
  };

  return (
    <div className={styles.pageContainer} style={{ backgroundColor: bgColor }}>
      <Row gutter={[24, 24]} className={styles.rowContainer}>

        <Col xs={24} lg={selectedUnit ? 8 : 24} className={styles.listTransition}>
          <div className={styles.listColInner}>
            <div className={selectedUnit ? styles.masonryCompact : styles.masonryFull}>
              {currentItems.map((item) => (
                <div className={styles.masonryItem} key={item.id}>
                  <EntityCard
                    titulo={item.titulo}
                    endereco={item.endereco}
                    salas={item.salas}
                    codigo={item.codigo}
                    dataCriacao={item.dataCriacao}
                    logo={item.logo}
                    avatares={item.avatares}
                    alturaMinima={item.alturaMinima}
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

        {selectedUnit && (
          <Col xs={24} lg={16} className={styles.detailSlideIn}>
            <div className={styles.splitPanelContainer}>

              {viewMode === 'view' && (
                <div className={styles.miniVerticalNav} style={{ backgroundColor: miniNavBg, borderColor }}>
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
                    <SiGoogleclassroom className={styles.icon18} />
                  </div>
                </div>
              )}

              <div 
                className={`form-section-card ${styles.detailContent}`}
                style={{ backgroundColor: panelBg, borderColor, transition: 'all 0.3s ease' }}
              >
                <Button
                  type="text"
                  icon={<CloseOutlined />}
                  onClick={handleClosePanel}
                  className={styles.closeBtn}
                  style={{ color: textColor }}
                />

                <div className={styles.unitHeaderBlock}>
                  {selectedAluno && viewMode === 'view' ? (
                    <Avatar size={64} src={selectedAluno.avatar} icon={<PiStudentFill />} />
                  ) : selectedTurma && viewMode === 'view' ? (
                    <Avatar size={64} className={styles.avatarDarkBlue} icon={<SiGoogleclassroom />} />
                  ) : (
                    <Avatar size={64} src={selectedUnit.logo} className={styles.unitAvatar} />
                  )}
                  <div>
                    <Title level={4} className={styles.unitName} style={{ color: textColor, margin: 0 }}>
                      {viewMode === 'edit' ? `A editar: ${selectedUnit.titulo}` 
                        : selectedAluno ? selectedAluno.nome 
                        : selectedTurma ? selectedTurma.nome 
                        : selectedUnit.titulo}
                    </Title>
                    
                    <Text className={styles.unitLocation} style={{ color: subTextColor }}>
                      {selectedAluno && viewMode === 'view' ? (
                        <>MATRÍCULA: {selectedAluno.matricula} | TURMA: {selectedTurma.nome}</>
                      ) : selectedTurma && viewMode === 'view' ? (
                        <>TURNO: {selectedTurma.turno ? selectedTurma.turno.toUpperCase() : 'N/A'}</>
                      ) : (
                        <><GlobalOutlined /> {selectedUnit.endereco}</>
                      )}
                    </Text>
                  </div>
                  
                  {viewMode === 'view' && !selectedTurma && !selectedAluno && (
                    <Button 
                      type="text" 
                      icon={<EditOutlined />} 
                      onClick={() => setViewMode('edit')}
                      className={styles.btnEditUnit}
                      style={{ color: isDarkMode ? '#60A5FA' : '#1890ff' }}
                    >
                      Editar Unidade
                    </Button>
                  )}
                </div>

                <Divider className={styles.dividerMargin} style={{ borderColor }} />

                {viewMode === 'edit' ? (
                  <div className={`${styles.tabAnimation} ${styles.editFormContainer}`}>
                    <Form form={form} layout="vertical" onFinish={handleSave} requiredMark={false}>
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
                            <InputNumber size="large" className={styles.fullWidth} min={1} />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="Código INEP" name="codigo">
                            <Input size="large" placeholder="Digite o código" />
                          </Form.Item>
                        </Col>
                      </Row>
                      
                      <div className={styles.editActions}>
                        <Button size="large" className={styles.btnCancelar} onClick={() => setViewMode('view')}>Cancelar</Button>
                        <Button size="large" type="primary" htmlType="submit" icon={<SaveOutlined />} className={styles.btnSalvar}>Salvar Alterações</Button>
                      </div>
                    </Form>
                  </div>
                ) : (
                  <>
                    {activeTab === 'dashboard' && !selectedTurma && !selectedAluno && (
                      <div className={styles.tabAnimation}>
                        <Text className={styles.sectionTitle} style={{ color: textColor }}>Visão Geral da Unidade</Text>

                        <div className={styles.statsContainer} style={{ borderColor, backgroundColor: panelBg }}>
                          <div className={styles.statItem} style={{ borderRight: `1px solid ${borderColor}` }}>
                            <Text className={styles.statCount} style={{ color: textColor }}>{selectedUnit.dashboardGeral?.metrics.alunos || 0}</Text>
                            <Text className={styles.statDesc} style={{ color: subTextColor }}>ALUNOS</Text>
                          </div>
                          <div className={styles.statItem} style={{ borderRight: `1px solid ${borderColor}` }}>
                            <Text className={styles.statCount} style={{ color: textColor }}>{selectedUnit.dashboardGeral?.metrics.avaliacoes || 0}</Text>
                            <Text className={styles.statDesc} style={{ color: subTextColor }}>AVALIAÇÕES</Text>
                          </div>
                          <div className={styles.statItem}>
                            <Text className={styles.statCount} style={{ color: textColor }}>{selectedUnit.dashboardGeral?.metrics.aptos || 0}</Text>
                            <Text className={styles.statDesc} style={{ color: subTextColor }}>APTOS</Text>
                          </div>
                        </div>

                        <div className={styles.chartsContainer}>
                          <Row gutter={[16, 16]}>
                            <Col span={12}><RadarChartCard data={selectedUnit.dashboardGeral?.radar} /></Col>
                            <Col span={12}><DonutChartCard data={selectedUnit.dashboardGeral?.donut} title="NÍVEL DE APRENDIZAGEM" /></Col>
                          </Row>
                          <Row gutter={[16, 16]} className={styles.trendChartRow}>
                            <Col span={24}><LineTrendChartCard data={selectedUnit.dashboardGeral?.trend} /></Col>
                          </Row>
                        </div>
                      </div>
                    )}

                    {activeTab === 'turmas' && !selectedTurma && !selectedAluno && (
                      <div className={styles.tabAnimation}>
                        <div className={styles.tabHeader}>
                          <Text className={styles.sectionTitle} style={{ color: textColor }}>Turmas Vinculadas</Text>
                          <Button type="primary" size="small" icon={<PlusOutlined />} className={styles.btnNovaTurma}>NOVA TURMA</Button>
                        </div>

                        {loadingTurmas ? (
                          <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
                            <Spin size="medium" tip="Buscando turmas reais..." />
                          </div>
                        ) : turmas && turmas.length > 0 ? (
                          <List
                            itemLayout="horizontal"
                            dataSource={turmas} // MODIFICADO: Usa as turmas dinâmicas da API
                            renderItem={(turma: any) => (
                              <List.Item className={styles.turmaListItem} onClick={() => setSelectedTurma(turma)}>
                                <List.Item.Meta
                                  avatar={<Avatar icon={<SiGoogleclassroom />} className={styles.avatarDarkBlue} />}
                                  title={<Text className={styles.listTitleBold} style={{ color: textColor }}>{turma.nome || turma.name}</Text>}
                                  description={<span style={{ color: subTextColor }}>Turno: {turma.turno || 'Não definido'} | Alunos: {turma.dashboardTurma?.metrics.alunos || 0}</span>}
                                />
                              </List.Item>
                            )}
                          />
                        ) : (
                          <div className={styles.emptyState} style={{ color: subTextColor }}>Nenhuma turma cadastrada no banco de dados.</div>
                        )}
                      </div>
                    )}

                    {selectedTurma && !selectedAluno && (
                      <div className={styles.tabAnimation}>
                        <Button type="link" icon={<ArrowLeftOutlined />} onClick={() => setSelectedTurma(null)} className={styles.btnBack} style={{ color: isDarkMode ? '#60A5FA' : '#1890ff' }}>
                          Voltar para Lista de Turmas
                        </Button>

                        <div className={styles.statsContainer} style={{ borderColor, backgroundColor: panelBg }}>
                          <div className={styles.statItem} style={{ borderRight: `1px solid ${borderColor}` }}>
                            <Text className={styles.statCount} style={{ color: textColor }}>{selectedTurma.dashboardTurma?.metrics.alunos || 0}</Text>
                            <Text className={styles.statDesc} style={{ color: subTextColor }}>ALUNOS</Text>
                          </div>
                          <div className={styles.statItem}>
                            <Text className={styles.statCount} style={{ color: textColor }}>{selectedTurma.dashboardTurma?.metrics.avaliacoes || 0}</Text>
                            <Text className={styles.statDesc} style={{ color: subTextColor }}>AVALIAÇÕES</Text>
                          </div>
                        </div>

                        <div className={styles.chartsContainer}>
                          <Row gutter={[16, 16]}>
                            <Col span={12}><RadarChartCard data={selectedTurma.dashboardTurma?.radar} /></Col>
                            <Col span={12}><DonutChartCard data={selectedTurma.dashboardTurma?.donut} title="NÍVEL DA TURMA" /></Col>
                          </Row>
                          <Row gutter={[16, 16]} className={styles.trendChartRow}>
                            <Col span={24}><LineTrendChartCard data={selectedTurma.dashboardTurma?.trend} /></Col>
                          </Row>
                        </div>

                        <Divider className={styles.dividerSpaced} style={{ borderColor }} />
                        <Text className={styles.sectionTitle} style={{ color: textColor }}>Alunos da Turma</Text>
                        
                        {selectedTurma.alunos && selectedTurma.alunos.length > 0 ? (
                          <List
                            itemLayout="horizontal"
                            dataSource={selectedTurma.alunos}
                            renderItem={(aluno: any) => (
                              <List.Item className={styles.turmaListItem} onClick={() => setSelectedAluno(aluno)}>
                                <List.Item.Meta
                                  avatar={<Avatar src={aluno.avatar} icon={<PiStudentFill />} />}
                                  title={<Text className={styles.listTitleBold} style={{ color: textColor }}>{aluno.nome}</Text>}
                                  description={<span style={{ color: subTextColor }}>Média Geral: {aluno.dashboardAluno?.metrics.media || '-'} | Matrícula: {aluno.matricula}</span>}
                                />
                              </List.Item>
                            )}
                          />
                        ) : (
                          <div className={styles.emptyState} style={{ color: subTextColor }}>Nenhum aluno cadastrado nesta turma.</div>
                        )}
                      </div>
                    )}

                    {selectedAluno && (
                      <div className={styles.tabAnimation}>
                        <Button type="link" icon={<ArrowLeftOutlined />} onClick={() => setSelectedAluno(null)} className={styles.btnBack} style={{ color: isDarkMode ? '#60A5FA' : '#1890ff' }}>
                          Voltar para {selectedTurma.nome || selectedTurma.name}
                        </Button>

                        <div className={styles.statsContainer} style={{ borderColor, backgroundColor: panelBg }}>
                          <div className={styles.statItem} style={{ borderRight: `1px solid ${borderColor}` }}>
                            <Text className={styles.statCount} style={{ color: textColor }}>{selectedAluno.dashboardAluno?.metrics.media || 0}</Text>
                            <Text className={styles.statDesc} style={{ color: subTextColor }}>MÉDIA GERAL</Text>
                          </div>
                          <div className={styles.statItem} style={{ borderRight: `1px solid ${borderColor}` }}>
                            <Text className={styles.statCount} style={{ color: textColor }}>{selectedAluno.dashboardAluno?.metrics.faltas || 0}</Text>
                            <Text className={styles.statDesc} style={{ color: subTextColor }}>FALTAS</Text>
                          </div>
                          <div className={styles.statItem}>
                            <Text className={styles.statCount} style={{ color: textColor }}>{selectedAluno.dashboardAluno?.metrics.posicao || "-"}</Text>
                            <Text className={styles.statDesc} style={{ color: subTextColor }}>POSIÇÃO NA TURMA</Text>
                          </div>
                        </div>

                        <div className={styles.chartsContainer}>
                          <Row gutter={[16, 16]}>
                            <Col span={12}><RadarChartCard data={selectedAluno.dashboardAluno?.radar} /></Col>
                            <Col span={12}><DonutChartCard data={selectedAluno.dashboardAluno?.donut} title="PERFIL DE APRENDIZADO" /></Col>
                          </Row>
                          <Row gutter={[16, 16]} className={styles.trendChartRow}>
                            <Col span={24}><LineTrendChartCard data={selectedAluno.dashboardAluno?.trend} /></Col>
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
          type="primary"
          className={`custom-float-group ${styles.floatGroup} ${selectedUnit ? styles.floatGroupShifted : ''}`}
          icon={<PlusOutlined className={styles.floatGroupButtonOpen} />}
          closeIcon={<CloseOutlined className={styles.floatGroupButtonClose} />}
        >
          <FloatButton 
            type="primary"
            className="custom-float-btn-admin" 
            onClick={() => navigate("/admin/novo-admin")}
          >
            <div className={styles.iconCentered}>
              <MdSpaceDashboard size={22} color="#ffffff" />
            </div>
          </FloatButton>
          
          <FloatButton 
            type="primary"
            icon={<BankOutlined className={styles.floatButton} />} 
            className="custom-float-btn-cliente" 
            onClick={() => navigate("/admin/cliente")} 
          />
        </FloatButton.Group>
      </ConfigProvider>
    </div>
  );
}