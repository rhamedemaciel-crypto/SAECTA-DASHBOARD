import { Card, Typography } from "antd";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { donutChartData } from "../../../../data/mockData";
import styles from "../ChartCard.module.css";

const { Title, Text } = Typography;

export default function DonutChartCard() {
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
          chart: {
            width: 200,
          },
          legend: {
            show: false,
          },
        },
      },
    ],
    labels: donutChartData.labels,
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
          ÁREAS DO CONHECIMENTO
        </Title>
        <Text className={styles.subtitle}>Performance</Text>
      </div>
      <div className={styles.chartWrapper}>
        <Chart
          options={options}
          series={donutChartData.series}
          type="donut"
          height={320}
        />
      </div>
    </Card>
  );
}
