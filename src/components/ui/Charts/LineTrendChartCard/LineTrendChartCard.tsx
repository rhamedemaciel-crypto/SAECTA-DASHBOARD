import { Card, Typography } from "antd";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { trendChartData } from "../../../../data/mockData";
import styles from "../ChartCard.module.css";

const { Title } = Typography;

// NOVO: Interface para dados dinâmicos
interface LineProps {
  data?: {
    series: { name: string; data: number[] }[];
    categories: string[];
  };
}

export default function LineTrendChartCard({ data }: LineProps) {
  // MÁGICA: Se houver dados específicos da unidade/turma, usa eles
  const chartData = data || trendChartData;

  const options: ApexOptions = {
    chart: {
      type: "area",
      toolbar: { show: false },
      fontFamily: "'Inter', sans-serif",
      zoom: { enabled: false },
    },
    colors: ["#1e3a5f", "#b0c4de"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.05,
        stops: [0, 90, 100],
      },
    },
    stroke: {
      curve: "smooth",
      width: [3, 2],
      dashArray: [0, 5],
    },
    xaxis: {
      categories: chartData.categories, // Dinâmico
      labels: {
        style: { colors: "#8c9bb5", fontSize: "12px", fontWeight: 500 },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: { colors: "#8c9bb5", fontSize: "12px" },
        formatter: (val: number) => val.toFixed(0),
      },
    },
    grid: {
      borderColor: "#e8eef5",
      strokeDashArray: 4,
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      labels: { colors: "#1e3a5f" },
    },
    tooltip: {
      theme: "light",
      y: { formatter: (val: number) => `${val}%` },
    },
  };

  return (
    <Card className={styles.card} bordered={false}>
      <div className={styles.header}>
        <Title level={5} className={styles.title}>
          TENDÊNCIA DE DESEMPENHO MENSAL
        </Title>
      </div>
      <div className={styles.chartWrapper}>
        <Chart
          options={options}
          series={chartData.series} // Dinâmico
          type="area"
          height={280}
        />
      </div>
    </Card>
  );
}