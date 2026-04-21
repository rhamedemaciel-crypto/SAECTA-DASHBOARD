import { Card, Typography } from "antd";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { trendChartData } from "../../../../data/mockData";
import styles from "../ChartCard.module.css";

const { Title } = Typography;

export default function LineTrendChartCard() {
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
    markers: {
      size: 0,
      hover: {
        size: 6,
      },
    },
    xaxis: {
      categories: trendChartData.categories,
      labels: {
        style: {
          colors: "#8c9bb5",
          fontSize: "12px",
          fontWeight: 500,
        },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#8c9bb5",
          fontSize: "12px",
        },
        formatter: (val: number) => val.toFixed(0),
      },
    },
    grid: {
      borderColor: "#e8eef5",
      strokeDashArray: 4,
      xaxis: { lines: { show: false } },
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "13px",
      fontWeight: 500,
      labels: {
        colors: "#1e3a5f",
      },
      markers: {
        size: 8,
        shape: "circle",
      },
      itemMargin: {
        horizontal: 16,
      },
    },
    tooltip: {
      theme: "light",
      y: {
        formatter: (val: number) => `${val}%`,
      },
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
          series={trendChartData.series}
          type="area"
          height={320}
        />
      </div>
    </Card>
  );
}
