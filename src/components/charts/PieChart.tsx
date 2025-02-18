import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { ClusterName } from '@/types/Cluster';

// Chart.js 모듈 등록
ChartJS.register(ArcElement, Tooltip, Legend);

// Props 타입 정의
type PieChartProps = {
  data: [number, number]; // 2개의 데이터만 받음
  labels: [string, string]; // 라벨도 2개만 받음
  clusterName?: ClusterName;
  rate?: [number, number];
};

export default function PieChart({ data, labels, clusterName, rate }: PieChartProps) {
  const chartData = {
    labels,
    datasets: [
      {
        label: 'seats',
        data,
        backgroundColor: ['rgb(19, 39, 67)', 'rgb(136, 160, 195)'], // 두 개 색상만
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Two-Value Pie Chart' },
    },
    display: false,
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="size-40">
        <Pie data={chartData} options={options} />
      </div>
      <span className="flex flex-col items-center justify-center">
        {clusterName && <h4 className="text-2xl text-darkblue">{clusterName}</h4>}
        <p>
          {!rate && `(${data[0]} / ${data[1]})`}
          {rate && `(${rate[0]} / ${rate[1]})`}
        </p>
      </span>
    </div>
  );
}
