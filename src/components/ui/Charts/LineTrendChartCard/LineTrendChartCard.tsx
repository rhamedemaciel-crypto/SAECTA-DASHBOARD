import { useState, useEffect } from "react";
import { Card, Typography } from "antd";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { trendChartData } from "../../../../data/mockData";
import styles from "../ChartCard.module.css";

const { Title } = Typography;

interface LineProps {
  data?: {
    series: { name: string; data: number[] }[];
    categories: string[];
  };
}

export default function LineTrendChartCard({ data }: LineProps) {
  const chartData = data || trendChartData;


  const [isDarkMode, setIsDarkMode] = useState(document.body.classList.contains('dark-theme'));

  useEffect(() => {

    const observer = new MutationObserver(() => {
      setIsDarkMode(document.body.classList.contains('dark-theme'));
    });
    
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  }, []);


  const textColor = isDarkMode ? "#E2E8F0" : "#8c9bb5";
  const gridColor = isDarkMode ? "#334155" : "#e8eef5";
  const titleColor = isDarkMode ? "#E2E8F0" : "#1e3a5f";

  const options: ApexOptions = {
    chart: {
      type: "area",
      toolbar: { show: false },
      fontFamily: "'Inter', sans-serif",
      zoom: { enabled: false },
      foreColor: textColor, 
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
      categories: chartData.categories, 
      labels: {
        style: { colors: textColor, fontSize: "12px", fontWeight: 500 }, 
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: { colors: textColor, fontSize: "12px" }, 
        formatter: (val: number) => val.toFixed(0),
      },
    },
    grid: {
      borderColor: gridColor, 
      strokeDashArray: 4,
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      labels: { colors: titleColor }, 
    },
    tooltip: {
      theme: isDarkMode ? "dark" : "light", 
      y: { formatter: (val: number) => `${val}%` },
    },
  };

  return (
    <Card className={styles.card} bordered={false}>
      <div className={styles.header}>
        <Title level={5} className={styles.title} style={{ color: titleColor }}>
          TENDÊNCIA DE DESEMPENHO MENSAL
        </Title>
      </div>
      <div className={styles.chartWrapper}>
        <Chart
          options={options}
          series={chartData.series} 
          type="area"
          height={280}
        />
      </div>
    </Card>
  );
}