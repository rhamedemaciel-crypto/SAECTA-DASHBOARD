import { Card, Typography } from "antd";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { donutChartData } from "../../../../data/mockData";
import styles from "../ChartCard.module.css";

const { Title, Text } = Typography;

// NOVO: Interface para receber dados dinâmicos
interface DonutProps {
  data?: {
    series: number[];
    labels: string[];
  };
  title?: string;
}

export default function DonutChartCard({ data, title = "ÁREAS DO CONHECIMENTO" }: DonutProps) {
  // MÁGICA: Se receber 'data', usa ela. Se não, usa o donutChartData original (não quebra a Home)
  const chartData = data || donutChartData; 

  const options: ApexOptions = {
    chart: {
      width: 380,
      type: "donut",
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: { width: 200 },
          legend: { show: false },
        },
      },
    ],
    labels: chartData.labels, // Usa a variável dinâmica
    legend: {
      position: "right",
      offsetY: 0,
      height: 230,
    },
  };

  return (
    <Card className={styles.card} bordered={false}>
      <div className={styles.header}>
        <Title level={5} className={styles.title}>
          {title}
        </Title>
        <Text className={styles.subtitle}>Performance</Text>
      </div>
      <div className={styles.chartWrapper}>
        <Chart
          options={options}
          series={chartData.series} // Usa a variável dinâmica
          type="donut"
          height={320}
        />
      </div>
    </Card>
  );
}