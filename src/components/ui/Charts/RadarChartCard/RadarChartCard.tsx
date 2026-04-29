import { Card, Typography } from "antd";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { radarChartData } from "../../../../data/mockData";
import styles from "../ChartCard.module.css";

const { Title, Text } = Typography;

// NOVO: Interface para receber dados dinâmicos
interface RadarProps {
  data?: {
    series: { name: string; data: number[] }[];
    categories: string[];
  };
}

export default function RadarChartCard({ data }: RadarProps) {
  // MÁGICA: Proteção de retrocompatibilidade
  const chartData = data || radarChartData;

  const options: ApexOptions = {
    chart: {
      type: "radar",
      toolbar: { show: false },
      fontFamily: "'Inter', sans-serif",
    },
    colors: ["#1e3a5f", "#7eb8da"],
    fill: { opacity: 0.25 },
    stroke: { width: 2 },
    markers: { size: 4, strokeWidth: 0 },
    xaxis: {
      categories: chartData.categories, // Usa a variável dinâmica
      labels: {
        style: { colors: "#8c9bb5", fontSize: "12px", fontWeight: 500 },
      },
    },
    yaxis: { show: false },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "13px",
      fontWeight: 500,
      labels: { colors: "#1e3a5f" },
      markers: { size: 8, shape: "circle" },
      itemMargin: { horizontal: 16 },
    },
    plotOptions: {
      radar: {
        polygons: {
          strokeColors: "#e8eef5",
          connectorColors: "#e8eef5",
          fill: { colors: ["#fafbfc", "#ffffff"] },
        },
      },
    },
  };

  return (
    <Card className={styles.card} bordered={false}>
      <div className={styles.header}>
        <Title level={5} className={styles.title}>
          ÁREAS DO CONHECIMENTO
        </Title>
        <Text className={styles.subtitle}>Performance Radar</Text>
      </div>
      <div className={styles.chartWrapper}>
        <Chart
          options={options}
          series={chartData.series} // Usa a variável dinâmica
          type="radar"
          height={320}
        />
      </div>
    </Card>
  );
}