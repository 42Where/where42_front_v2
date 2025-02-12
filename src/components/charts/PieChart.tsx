import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Chart.js 모듈 등록
ChartJS.register(ArcElement, Tooltip, Legend);

// Props 타입 정의
type PieChartProps = {
  data: [number, number]; // 딱 2개의 데이터만 받음
  labels: [string, string]; // 라벨도 2개만 받음
};

export default function PieChart({ data, labels }: PieChartProps) {
  const chartData = {
    labels,
    datasets: [
      {
        label: 'seats',
        data,
        backgroundColor: ['rgb(19, 39, 67)', 'rgb(136, 160, 195)'], // 두 개 색상만
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Two-Value Pie Chart' },
    },
  };

  return <Pie data={chartData} options={options} />;
}
