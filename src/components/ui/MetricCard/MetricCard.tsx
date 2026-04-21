import { Card, Typography, Tag } from "antd";
import {
  BankOutlined,
  FileTextOutlined,
  SolutionOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import styles from "./MetricCard.module.css";

const { Title, Text } = Typography;

interface MetricCardProps {
  title: string;
  value: number;
  icon: "bank" | "file" | "solution" | "team";
}

const iconMap = {
  bank: BankOutlined,
  file: FileTextOutlined,
  solution: SolutionOutlined,
  team: TeamOutlined,
};

export default function MetricCard({ title, value, icon }: MetricCardProps) {
  const IconComponent = iconMap[icon];

  return (
    <Card className={styles.card} bordered={false}>
      <div className={styles.content}>
        <div className={styles.info}>
          <Text className={styles.title}>{title}</Text>
          <div className={styles.valueRow}>
            <Title level={2} className={styles.value}>
              {value.toLocaleString("pt-BR")}
            </Title>
          </div>
        </div>
        <div className={styles.iconWrapper}>
          <IconComponent className={styles.icon} />
        </div>
      </div>
    </Card>
  );
}
