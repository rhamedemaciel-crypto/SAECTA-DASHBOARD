import { Select, Row, Col } from "antd";
import MetricCard from "../../components/ui/MetricCard/MetricCard";
import LineTrendChartCard from "../../components/ui/Charts/LineTrendChartCard/LineTrendChartCard";
import SubjectPerformanceCard from "../../components/ui/SubjectPerformanceCard/SubjectPerformanceCard";
import LearningLevelsCard from "../../components/ui/LearningLevelsCard/LearningLevelsCard";
import { metricsData, yearOptions } from "../../data/mockData";
import styles from "./HomeClient.module.css";
import RadarChartCard from "../../components/ui/Charts/RadarChartCard/RadarChartCard";

export default function HomeClient() {
  return (
    <div className={styles.page}>
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
            popupClassName={styles.selectDropdown}
          />
        </section>

        <section className={styles.chartsSection}>
          <Row gutter={[20, 20]}>
            <Col xs={24} lg={12}>
              <RadarChartCard />
              {/* <DonutChartCard /> */}
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
