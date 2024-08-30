import { useSelector } from 'react-redux';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import {
  defaultLocale,
  supportedTimeIntervals,
} from '@/domain/Rates';

import {
  selectCandles,
  selectSelectedInterval,
} from '@/store/candles/selectors';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
  interaction: {
    mode: 'index',
    intersect: true,
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const CandleGraph = () => {
  const candles          = useSelector(selectCandles);
  const selectedInterval = useSelector(selectSelectedInterval);

  const candleDateToString = (ms) => (
    [supportedTimeIntervals.DAY, supportedTimeIntervals.FIVE_DAYS].includes(selectedInterval)
      ? new Date(ms).toLocaleTimeString(defaultLocale, { hour: 'numeric', minute: 'numeric', hour12: true })
      : new Date(ms).toLocaleDateString(defaultLocale, { day: '2-digit', month: '2-digit', year: 'numeric' })
  );

  const data = {
    labels: candles.map((c) => candleDateToString(c.date)),
    datasets: [
      {
        label: 'High',
        data: candles.map((c) => c.high),
        backgroundColor: 'rgb(42 63 252 / 0.5)',
        stack: 'Stack 0',
      },
      {
        label: 'Open',
        data: candles.map((c) => c.open),
        backgroundColor: 'rgb(42 63 252)',
        stack: 'Stack 0',
      },
      {
        label: 'Close',
        data: candles.map((c) => c.close),
        backgroundColor: 'rgb(42 63 252)',
        stack: 'Stack 0',
      },
      {
        label: 'Low',
        data: candles.map((c) => c.low),
        backgroundColor: 'rgb(42 63 252 / 0.5)',
        stack: 'Stack 0',
      },
    ],
  };

  return (
    <Bar options={options} data={data} />
  );
};

export default CandleGraph;
