import { useState, useEffect } from "react";
import { Card, Typography } from "antd";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { donutChartData } from "../../../../data/mockData";
import styles from "../ChartCard.module.css";

const { Title, Text } = Typography;

interface DonutProps {
  data?: {
    series: number[];
    labels: string[];
  };
  title?: string;
}

export default function DonutChartCard({ data, title = "ÁREAS DO CONHECIMENTO" }: DonutProps) {
  const chartData = data || donutChartData; 
  
  // Detetive de Dark Mode
  const [isDarkMode, setIsDarkMode] = useState(document.body.classList.contains('dark-theme'));

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.body.classList.contains('dark-theme'));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Cores dinâmicas
  const textColor = isDarkMode ? "#E2E8F0" : "#1e3a5f";
  const subTextColor = isDarkMode ? "#A0AABF" : "#8c9bb5";
  const cardBg = isDarkMode ? "#1F1F1F" : "#ffffff";
  const strokeColor = isDarkMode ? "#1F1F1F" : "#ffffff";

  const options: ApexOptions = {
    chart: {
      width: 380,
      type: "donut",
      foreColor: textColor, // Força a cor dos textos do gráfico
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
    labels: chartData.labels, 
    legend: {
      position: "right",
      offsetY: 0,
      height: 230,
      labels: { colors: textColor } // Legenda dinâmica
    },
    stroke: {
      colors: [strokeColor] // Borda que separa as fatias
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            value: { color: textColor },
            total: { show: true, label: 'TOTAL', color: textColor }
          }
        }
      }
    },
    tooltip: {
      theme: isDarkMode ? "dark" : "light"
    }
  };

  return (
    <Card className={styles.card} bordered={false} style={{ backgroundColor: cardBg }}>
      <div className={styles.header}>
        <Title level={5} className={styles.title} style={{ color: textColor }}>
          {title}
        </Title>
        <Text className={styles.subtitle} style={{ color: subTextColor }}>Performance</Text>
      </div>
      <div className={styles.chartWrapper}>
        <Chart
          options={options}
          series={chartData.series} 
          type="donut"
          height={320}
        />
      </div>
    </Card>
  );
}