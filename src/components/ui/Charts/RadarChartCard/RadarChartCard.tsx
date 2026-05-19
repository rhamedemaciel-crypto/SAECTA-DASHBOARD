import { useState, useEffect } from "react"; // 👇 Adicionado
import { Card, Typography } from "antd";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { radarChartData } from "../../../../data/mockData";
import styles from "../ChartCard.module.css";

const { Title, Text } = Typography;

interface RadarProps {
  data?: {
    series: { name: string; data: number[] }[];
    categories: string[];
  };
}

export default function RadarChartCard({ data }: RadarProps) {

  const chartData = data || radarChartData;


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
  const legendColor = isDarkMode ? "#E2E8F0" : "#1e3a5f";
  const polygonFill = isDarkMode ? ["#1F1F1F", "#262626"] : ["#fafbfc", "#ffffff"];

  const options: ApexOptions = {
    chart: {
      type: "radar",
      toolbar: { show: false },
      fontFamily: "'Inter', sans-serif",
      foreColor: textColor, // Força a cor do texto para o radar
    },
    colors: ["#1e3a5f", "#7eb8da"],
    fill: { opacity: 0.25 },
    stroke: { width: 2 },
    markers: { size: 4, strokeWidth: 0 },
    xaxis: {
      categories: chartData.categories, // 👇 Volta a usar as categorias dinâmicas
      labels: {
        style: { 
          colors: chartData.categories.map(() => textColor), // 👇 Aplica cor dinâmica em cada label
          fontSize: "12px", 
          fontWeight: 500 
        },
      },
    },
    yaxis: { show: false },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "13px",
      fontWeight: 500,
      labels: { colors: legendColor }, // 👇 Legenda dinâmica
      markers: { size: 8, shape: "circle" },
      itemMargin: { horizontal: 16 },
    },
    plotOptions: {
      radar: {
        polygons: {
          strokeColors: gridColor, // 👇 Teias dinâmicas
          connectorColors: gridColor,
          fill: { colors: polygonFill }, // 👇 Fundo das fatias dinâmico
        },
      },
    },
    tooltip: {
      theme: isDarkMode ? "dark" : "light",
    }
  };

  return (
    <Card 
      className={styles.card} 
      bordered={false}
      style={{ backgroundColor: isDarkMode ? '#1F1F1F' : '#ffffff' }}
    >
      <div className={styles.header}>
        <Title level={5} className={styles.title} style={{ color: legendColor }}>
          ÁREAS DO CONHECIMENTO
        </Title>
        <Text className={styles.subtitle} style={{ color: textColor }}>
          Performance Radar
        </Text>
      </div>
      <div className={styles.chartWrapper}>
        <Chart
          options={options}
          series={chartData.series} // 👇 Volta a usar as séries dinâmicas do banco/mock
          type="radar"
          height={320}
        />
      </div>
    </Card>
  );
}