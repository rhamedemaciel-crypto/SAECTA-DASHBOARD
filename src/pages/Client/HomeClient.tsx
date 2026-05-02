import { useContext } from "react"; // 👇 Adicionado
import { Select, Row, Col } from "antd";
import MetricCard from "../../components/ui/MetricCard/MetricCard";
import LineTrendChartCard from "../../components/ui/Charts/LineTrendChartCard/LineTrendChartCard";
import SubjectPerformanceCard from "../../components/ui/SubjectPerformanceCard/SubjectPerformanceCard";
import LearningLevelsCard from "../../components/ui/LearningLevelsCard/LearningLevelsCard";
import { metricsData, yearOptions } from "../../data/mockData";
import styles from "./HomeClient.module.css";
import RadarChartCard from "../../components/ui/Charts/RadarChartCard/RadarChartCard";
import { ThemeContext } from "../../components/layout/AdminLayout"; // 👇 Importa o contexto

export default function HomeClient() {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    // 👇 Mudança: Injetamos o background dinâmico para matar a "parede branca"
    <div className={styles.page} style={{ backgroundColor: isDarkMode ? '#141414' : '#f0f2f5', minHeight: '100%' }}>
      <div className={styles.container}>
        <section className={styles.metricsSection}>
          <Row gutter={[20, 20]}>
            {metricsData.map((metric) => (
              <Col xs={24} sm={12} lg={6} key={metric.id}>
                <MetricCard
                  title={metric.title}
                  value={metric.value}
                  icon={metric.icon as "bank" | "file" | "solution" | "team"}
                />
              </Col>
            ))}
          </Row>
        </section>

        <section className={styles.filterSection}>
          <Select
            defaultValue="2024"
            options={yearOptions}
            className={styles.yearSelect}
            // 👇 Mudança: Garante que o dropdown do topo também fique escuro
            getPopupContainer={(triggerNode) => triggerNode.parentNode}
            popupClassName={styles.selectDropdown}
          />
        </section>

        <section className={styles.chartsSection}>
          <Row gutter={[20, 20]}>
            <Col xs={24} lg={12}>
              <RadarChartCard />
            </Col>
            <Col xs={24} lg={12}>
              <LineTrendChartCard />
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
      </div>
    </div>
  );
}