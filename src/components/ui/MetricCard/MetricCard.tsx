import { useContext } from "react"; // 👇 Adicionado
import { Card, Typography } from "antd";
import {
  BankOutlined,
  FileTextOutlined,
  SolutionOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import styles from "./MetricCard.module.css";
import { ThemeContext } from "../../layout/AdminLayout"; // 👇 Importa o contexto

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
  const { isDarkMode } = useContext(ThemeContext);
  const IconComponent = iconMap[icon];

  return (

    <Card 
      className={styles.card} 
      bordered={false}
      style={{ backgroundColor: isDarkMode ? '#1F1F1F' : '#ffffff' }}
    >
      <div className={styles.content}>
        <div className={styles.info}>
          <Text className={styles.title} style={{ color: isDarkMode ? '#A0AABF' : '#8c9bb5' }}>
            {title}
          </Text>
          <div className={styles.valueRow}>
            <Title level={2} className={styles.value} style={{ color: isDarkMode ? '#E2E8F0' : '#1e3a5f', margin: 0 }}>
              {value.toLocaleString("pt-BR")}
            </Title>
          </div>
        </div>
        <div 
          className={styles.iconWrapper}

          style={{ backgroundColor: isDarkMode ? '#2A374E' : '#f0f5ff' }}
        >
          <IconComponent 
            className={styles.icon} 
            style={{ color: isDarkMode ? '#3B82F6' : '#1e3a5f' }} 
          />
        </div>
      </div>
    </Card>
  );
}