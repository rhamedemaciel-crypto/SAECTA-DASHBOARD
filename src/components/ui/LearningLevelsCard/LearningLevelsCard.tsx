import { Card, Typography } from "antd";
import { learningLevelsData } from "../../../data/mockData";
import styles from "./LearningLevelsCard.module.css";

const { Title, Text } = Typography;

export default function LearningLevelsCard() {
  const { levels } = learningLevelsData;

  return (
    <Card className={styles.card} bordered={false}>
      <div className={styles.header}>
        <Title level={5} className={styles.title}>
          NÍVEIS DE APRENDIZAGEM
        </Title>
      </div>

      <div className={styles.barContainer}>
        <div className={styles.stackedBar}>
          {levels.map((level) => (
            <div
              key={level.name}
              className={styles.barSegment}
              style={{
                width: `${level.percentage}%`,
                backgroundColor: level.color,
              }}
            >
              <span className={styles.barLabel}>{level.percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.legend}>
        {levels.map((level) => (
          <div key={level.name} className={styles.legendItem}>
            <div
              className={styles.legendColor}
              style={{ backgroundColor: level.color }}
            />
            <div className={styles.legendInfo}>
              <Text className={styles.legendName}>{level.name}</Text>
              <Text className={styles.legendCount}>
                {level.count.toLocaleString("pt-BR")}
              </Text>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
