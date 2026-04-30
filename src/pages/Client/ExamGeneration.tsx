import { useState } from "react";
import { 
  Typography, Divider, Button, Row, Col, Form, Select, 
  Input, DatePicker, List, Tag, Avatar, message, Card, Space, InputNumber
} from "antd";
import { 
  SaveOutlined, FileAddOutlined, CloseOutlined, FileTextOutlined,
  PrinterOutlined, PlusOutlined, DeleteOutlined, BlockOutlined
} from "@ant-design/icons";

import layoutStyles from "./Units.module.css"; 
import examStyles from "./ExamGeneration.module.css"; 
import "../../styles/forms.css";

const { Title, Text } = Typography;
const { Option } = Select;

const provasGeradas = [
  { id: 1, titulo: "Simulado de Matemática - 1º Bim", data: "15/05/2026", disciplina: "Matemática", questoes: 45, status: "Pronta", ano: "1º Ano Médio" },
  { id: 2, titulo: "Avaliação Diagnóstica - Português", data: "22/05/2026", disciplina: "Língua Portuguesa", questoes: 20, status: "Aguardando", ano: "9º Ano Fundamental" },
  { id: 3, titulo: "Teste de Ciências - 9º Ano", data: "10/06/2026", disciplina: "Ciências", questoes: 15, status: "Pronta", ano: "9º Ano Fundamental" },
];

export default function ExamGeneration() {
  const [form] = Form.useForm();
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedExam, setSelectedExam] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const values = Form.useWatch([], form);
  const isPanelOpen = isGenerating || selectedExam;

  const handleClosePanel = () => {
    setIsGenerating(false);
    setSelectedExam(null);
  };

  const handleOpenNew = () => {
    form.resetFields();
    setSelectedExam(null);
    setIsGenerating(true);
  };

  const handleGenerate = (values: any) => {
    setIsLoading(true);
    
    const payloadParaIA = {
      cabecalho: {
        titulo: values.titulo,
        data: values.data_aplicacao?.format("YYYY-MM-DD")
      },
      areas_tematicas: values.areas?.map((area: any) => ({
        area: area.area_tematica,
        disciplinas_vinculadas: area.disciplinas_selecionadas, 
        blocos_questoes: area.blocos_list?.map((q: any) => ({
          disciplina: q.disciplina_questao, 
          quantidade: q.qtd,
          tipo: q.tipo,
          complexidade: q.nivel,
          bncc: q.bncc || []
        }))
      }))
    };

    console.log("🚀 Payload Dinâmico Gerado:", JSON.stringify(payloadParaIA, null, 2));
    message.loading({ content: 'IA estruturando questões...', key: 'ia-gen', duration: 0 });

    setTimeout(() => {
      setIsLoading(false);
      setIsGenerating(false);
      message.success({ content: 'Caderno de prova gerado com sucesso!', key: 'ia-gen' });
    }, 3000);
  };

  return (
    <div className={layoutStyles.pageContainer}>
      <Row gutter={[24, 24]} className={examStyles.rowContainer}>

        {/* ==================== LADO ESQUERDO: LISTAGEM ==================== */}
        <Col 
          xs={isPanelOpen ? 0 : 24} 
          lg={isPanelOpen ? 8 : 24} 
          className={`${layoutStyles.listTransition} ${isPanelOpen ? examStyles.hideOnMobileWhenPanelOpen : ''}`}
        >
          <div className={examStyles.leftPanel}>
            <div className={examStyles.leftPanelHeader}>
              <Title level={4} className={examStyles.listTitle}>
                <FileTextOutlined style={{ marginRight: '8px' }} /> Provas
              </Title>
              <Button type="primary" icon={<FileAddOutlined />} onClick={handleOpenNew} className={examStyles.btnNew}>
                NOVA
              </Button>
            </div>

            <List
              itemLayout="horizontal"
              dataSource={provasGeradas}
              renderItem={(prova) => (
                <List.Item 
                  onClick={() => setSelectedExam(prova)}
                  className={`${examStyles.listItem} ${selectedExam?.id === prova.id ? examStyles.listItemSelected : ''}`}
                >
                  <List.Item.Meta
                    avatar={<Avatar icon={<FileTextOutlined />} className={examStyles.avatarIcon} />}
                    title={<Text className={examStyles.listItemTitle}>{prova.titulo}</Text>}
                    description={`${prova.disciplina} | ${prova.ano}`}
                  />
                  <Tag color={prova.status === "Pronta" ? "green" : "orange"}>{prova.status}</Tag>
                </List.Item>
              )}
            />
          </div>
        </Col>

        {/* ==================== LADO DIREITO: FORMULÁRIO EM CASCATA ==================== */}
        {isPanelOpen && (
          <Col xs={24} lg={16} className={layoutStyles.detailSlideIn}>
            <div className={layoutStyles.splitPanelContainer}>
              <div className={`form-section-card ${layoutStyles.detailContent}`}>
                <Button type="text" icon={<CloseOutlined />} onClick={handleClosePanel} className={layoutStyles.closeBtn} />

                {isGenerating ? (
                  <div className={layoutStyles.tabAnimation}>
                    <Title level={3} className={examStyles.pageTitle}>Criar Nova Prova IA</Title>
                    <Text className={examStyles.pageDescription}>Preencha as etapas para compor o caderno.</Text>
                    <Divider />

                    <Form form={form} layout="vertical" onFinish={handleGenerate} className="saecta-exam-form">
                      
                      {/* --- NÍVEL 1: CABEÇALHO --- */}
                      <div className={examStyles.infoSection}>
                        <Text className={examStyles.sectionTitle}>1. Cabeçalho da Prova</Text>
                        <Row gutter={16}>
                          <Col span={16}>
                            <Form.Item label="Título da Prova" name="titulo" rules={[{ required: true }]}>
                              <Input size="large" placeholder="Ex: Avaliação Bimestral" />
                            </Form.Item>
                          </Col>
                          <Col span={8}>
                            <Form.Item label="Data de Aplicação" name="data_aplicacao" rules={[{ required: true }]}>
                              <DatePicker size="large" className={examStyles.fullWidth} format="DD/MM/YYYY" />
                            </Form.Item>
                          </Col>
                        </Row>
                      </div>

                      {/* --- NÍVEL 2: ÁREAS TEMÁTICAS --- */}
                      {values?.titulo && values?.data_aplicacao && (
                        <Form.List name="areas">
                          {(areaFields, { add: addArea, remove: removeArea }) => (
                            <div className={examStyles.areaSection}>
                              <Text className={examStyles.sectionTitle}>2. Estrutura do Caderno</Text>
                              
                              {areaFields.map((areaField) => {
                                const disciplinasDestaArea = values?.areas?.[areaField.name]?.disciplinas_selecionadas || [];

                                return (
                                  <Card 
                                    key={areaField.key} 
                                    className={examStyles.areaCard}
                                    title={<Space><BlockOutlined /> ÁREA TEMÁTICA {areaField.name + 1}</Space>}
                                    extra={<DeleteOutlined onClick={() => removeArea(areaField.name)} className={examStyles.deleteIcon} />}
                                  >
                                    <Row gutter={16}>
                                      <Col span={10}>
                                        <Form.Item {...areaField} name={[areaField.name, 'area_tematica']} label="Grande Área" rules={[{ required: true }]}>
                                          <Select size="large" placeholder="Ex: Ciências da Natureza">
                                            <Option value="Linguagens">Linguagens e Códigos</Option>
                                            <Option value="Matematica">Matemática e suas Tecnologias</Option>
                                            <Option value="Natureza">Ciências da Natureza</Option>
                                            <Option value="Humanas">Ciências Humanas</Option>
                                          </Select>
                                        </Form.Item>
                                      </Col>
                                      
                                      <Col span={14}>
                                        <Form.Item {...areaField} name={[areaField.name, 'disciplinas_selecionadas']} label="Disciplinas desta Área" rules={[{ required: true, message: 'Selecione pelo menos uma' }]}>
                                          <Select mode="multiple" size="large" placeholder="Selecione as disciplinas" maxTagCount="responsive">
                                            <Option value="Portugues">Língua Portuguesa</Option>
                                            <Option value="Matematica">Matemática</Option>
                                            <Option value="Fisica">Física</Option>
                                            <Option value="Quimica">Química</Option>
                                            <Option value="Biologia">Biologia</Option>
                                            <Option value="Historia">História</Option>
                                            <Option value="Geografia">Geografia</Option>
                                          </Select>
                                        </Form.Item>
                                      </Col>
                                    </Row>

                                    {/* --- NÍVEL 3: BLOCOS DE QUESTÕES --- */}
                                    {disciplinasDestaArea.length > 0 && (
                                      <div className={examStyles.blocksContainer}>
                                        <Text className={examStyles.blocksTitle}>
                                          COMPOSIÇÃO DOS BLOCOS DE QUESTÕES
                                        </Text>
                                        
                                        <Form.List name={[areaField.name, 'blocos_list']}>
                                          {(blocoFields, { add: addBloco, remove: removeBloco }) => (
                                            <>
                                              {blocoFields.map((blocoField) => (
                                                <div key={blocoField.key} className={examStyles.blockItem}>
                                                  <Row gutter={12}>
                                                    <Col span={3}>
                                                      <Form.Item {...blocoField} label="Qtd" name={[blocoField.name, 'qtd']} rules={[{ required: true }]}>
                                                        <InputNumber min={1} className={examStyles.fullWidth} size="large" />
                                                      </Form.Item>
                                                    </Col>
                                                    
                                                    <Col span={5}>
                                                      <Form.Item {...blocoField} label="Disciplina" name={[blocoField.name, 'disciplina_questao']} rules={[{ required: true }]}>
                                                        <Select placeholder="Disciplina" size="large">
                                                          {disciplinasDestaArea.map((disc: string) => (
                                                            <Option key={disc} value={disc}>{disc}</Option>
                                                          ))}
                                                        </Select>
                                                      </Form.Item>
                                                    </Col>
                                                    
                                                    <Col span={5}>
                                                      <Form.Item {...blocoField} label="Tipo" name={[blocoField.name, 'tipo']} rules={[{ required: true }]}>
                                                        <Select placeholder="Tipo" size="large">
                                                          <Option value="Objetiva">Objetiva</Option>
                                                          <Option value="Discursiva">Discursiva</Option>
                                                        </Select>
                                                      </Form.Item>
                                                    </Col>
                                                    <Col span={4}>
                                                      <Form.Item {...blocoField} label="Nível" name={[blocoField.name, 'nivel']} rules={[{ required: true }]}>
                                                        <Select placeholder="Nível" size="large">
                                                          <Option value="Facil">Fácil</Option>
                                                          <Option value="Medio">Médio</Option>
                                                          <Option value="Dificil">Difícil</Option>
                                                        </Select>
                                                      </Form.Item>
                                                    </Col>
                                                    <Col span={5}>
                                                      <Form.Item {...blocoField} label="BNCC" name={[blocoField.name, 'bncc']}>
                                                        <Select mode="multiple" placeholder="Opcional" size="large" maxTagCount="responsive">
                                                          <Option value="EF09MA01">EF09MA01</Option>
                                                          <Option value="EM13CNT101">EM13CNT101</Option>
                                                        </Select>
                                                      </Form.Item>
                                                    </Col>
                                                    <Col span={2} className={examStyles.centerCol}>
                                                      <Button type="text" danger icon={<DeleteOutlined />} onClick={() => removeBloco(blocoField.name)} />
                                                    </Col>
                                                  </Row>
                                                </div>
                                              ))}
                                              <Button type="dashed" onClick={() => addBloco()} icon={<PlusOutlined />} className={examStyles.btnAddBlock}>
                                                Adicionar Bloco de Questões
                                              </Button>
                                            </>
                                          )}
                                        </Form.List>
                                      </div>
                                    )}
                                  </Card>
                                );
                              })}
                              
                              <Button type="dashed" onClick={() => addArea()} block icon={<PlusOutlined />} className={examStyles.btnAddArea}>
                                + NOVA ÁREA TEMÁTICA
                              </Button>
                            </div>
                          )}
                        </Form.List>
                      )}

                      {/* --- AÇÃO FINAL --- */}
                      {values?.areas?.length > 0 && (
                        <div className={examStyles.actionButtons}>
                          <Button 
                            type="primary" size="large" htmlType="submit" block
                            icon={<SaveOutlined />} loading={isLoading} className={examStyles.btnSubmit}
                          >
                            {isLoading ? "ESTRUTURANDO CADERNO..." : "GERAR PROVA COMPLETA"}
                          </Button>
                        </div>
                      )}
                    </Form>
                  </div>
                ) : (
                  /* VISUALIZAÇÃO ORIGINAL MANTIDA */
                  <div className={layoutStyles.tabAnimation}>
                     <div className={layoutStyles.unitHeaderBlock}>
                        <Avatar size={64} className={examStyles.avatarLarge} icon={<FileTextOutlined />} />
                        <div>
                          <Title level={4} className={examStyles.detailTitle}>{selectedExam.titulo}</Title>
                          <Text type="secondary">{selectedExam.disciplina} | {selectedExam.ano}</Text>
                        </div>
                        <Button type="primary" icon={<PrinterOutlined />} className={examStyles.btnPrint}>IMPRIMIR</Button>
                      </div>
                      <Divider />
                      <div className={examStyles.statsContainer}>
                        <div className={examStyles.statBox}>
                          <Title level={2} className={examStyles.statValue}>{selectedExam.questoes}</Title>
                          <Text type="secondary">QUESTÕES</Text>
                        </div>
                        <div className={examStyles.statBox}>
                          <Title level={2} className={examStyles.statValue}>{selectedExam.data}</Title>
                          <Text type="secondary">DATA</Text>
                        </div>
                      </div>
                  </div>
                )}
              </div>
            </div>
          </Col>
        )}
      </Row>
    </div>
  );
}