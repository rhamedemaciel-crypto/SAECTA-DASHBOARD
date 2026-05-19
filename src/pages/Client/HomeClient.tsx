import { useContext, useEffect, useState } from "react"; 
import { Select, Row, Col, Spin, message, Empty } from "antd";
import MetricCard from "../../components/ui/MetricCard/MetricCard";
import LineTrendChartCard from "../../components/ui/Charts/LineTrendChartCard/LineTrendChartCard";
import SubjectPerformanceCard from "../../components/ui/SubjectPerformanceCard/SubjectPerformanceCard";
import LearningLevelsCard from "../../components/ui/LearningLevelsCard/LearningLevelsCard";
import RadarChartCard from "../../components/ui/Charts/RadarChartCard/RadarChartCard";
import styles from "./HomeClient.module.css";
import { ThemeContext } from "../../components/layout/AdminLayout"; 

import { clientService } from "../../services/clientService";
import { yearOptions } from "../../data/mockData";

export default function HomeClient() {
  const { isDarkMode } = useContext(ThemeContext);

  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
  setLoading(true);
  try {
    setDashboardData(null); 
  } catch (err) {
    console.error('Erro ao carregar o dashboard do cliente:', err);
  } finally {
    setLoading(false);
  }
};

  if (loading) {
    return (
      <div className={styles.page} style={{ backgroundColor: isDarkMode ? '#141414' : '#f0f2f5', minHeight: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Spin size="large" description="Carregando o painel..." />
      </div>
    );
  }

  const hasValidChartData = dashboardData && 
                            Array.isArray(dashboardData.competencyData) && 
                            dashboardData.competencyData.length > 0;

  const displayMetrics = dashboardData?.metrics || [];

  return (
    <div className={styles.page} style={{ backgroundColor: isDarkMode ? '#141414' : '#f0f2f5', minHeight: '100%' }}>
      <div className={styles.container}>
        
               <section className={styles.metricsSection}>
          <Row gutter={[20, 20]}>
            {displayMetrics.length === 0 ? (
              <Col span={24}>
                <Empty description="Métricas de desempenho indisponíveis nesta branch." image={Empty.PRESENTED_IMAGE_SIMPLE} />
              </Col>
            ) : (
              displayMetrics.map((metric: any, index: number) => (
                <Col xs={24} sm={12} lg={6} key={metric.id || index}>
                  <MetricCard
                    title={metric.title}
                    value={metric.value}
                    icon={metric.icon as "bank" | "file" | "solution" | "team"}
                  />
                </Col>
              ))
            )}
          </Row>
        </section>

               <section className={styles.filterSection}>
          <Select
            defaultValue="2024"
            options={yearOptions}
            className={styles.yearSelect}
            getPopupContainer={(triggerNode) => triggerNode.parentNode}
          />
        </section>

               {hasValidChartData ? (
          <>
            <section className={styles.chartsSection}>
              <Row gutter={[20, 20]}>
                <Col xs={24} lg={12}>
                  <RadarChartCard data={dashboardData.competencyData} />
                </Col>
                <Col xs={24} lg={12}>
                  <LineTrendChartCard data={dashboardData.performanceTrendData} />
                </Col>
              </Row>
            </section>

            <section className={styles.dataSection}>
              <Row gutter={[20, 20]}>
                <Col xs={24} lg={12}>
                  <SubjectPerformanceCard />
                </Col>
                <Col xs={24} lg={12}>
                  <LearningLevelsCard />
                </Col>
              </Row>
            </section>
          </>
        ) : (
          <div style={{ marginTop: 30, padding: '20px', background: isDarkMode ? '#1f1f1f' : '#ffffff', borderRadius: '8px' }}>
            <Empty 
              description="Os indicadores gráficos não estão disponíveis para o seu nível de acesso atual ou não existem nesta branch de segurança." 
            />
          </div>
        )}

      </div>
    </div>
  );
}