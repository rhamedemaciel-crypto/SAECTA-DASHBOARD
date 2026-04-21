import { Card, Typography, Progress } from "antd";
import { subjectPerformanceData } from "../../../data/mockData";
import styles from "./SubjectPerformanceCard.module.css";

const { Title, Text } = Typography;

export default function SubjectPerformanceCard() {
  return (
    <Card className={styles.card} bordered={false}>
      <div className={styles.header}>
        <Title level={5} className={styles.title}>
          DESEMPENHO POR DISCIPLINA
        </Title>
      </div>
      <div className={styles.list}>
        {subjectPerformanceData.map((item) => (
          <div key={item.subject} className={styles.item}>
            <div className={styles.itemHeader}>
              <Text className={styles.subjectName}>{item.subject}</Text>
              <Text className={styles.score}>{item.score.toFixed(1)}</Text>
            </div>
            <Progress
              percent={(item.score / item.maxScore) * 100}
              showInfo={false}
              strokeColor={{
                "0%": "#1e3a5f",
                "100%": "#4a6fa5",
              }}
              trailColor="#e8eef5"
              strokeLinecap="round"
              size={{ height: 8 }}
            />
          </div>
        ))}
      </div>
    </Card>
  );
}
