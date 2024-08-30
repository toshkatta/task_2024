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
  rateToLocaleMapping,
  supportedTimeIntervals,
} from '@/domain/Rates';

import {
  selectCandles,
  selectSelectedInterval,
} from '@/store/candles/selectors';
import { selectSelectedRate } from '@/store/rates/selectors';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const candleToGraphCandle = (c) => ({
  x: c.date,
  o: c.open,
  c: c.close,
  s: [c.open, c.close],
});

const CandleGraph = () => {
  const candles  = useSelector(selectCandles);
  const interval = useSelector(selectSelectedInterval);
  const rate     = useSelector(selectSelectedRate);

  if (!rate) return null;

  const localizedCandles = candles.map((c) => ({
    ...c,
    open: c.open / rate.rateUsd,
    close: c.close / rate.rateUsd,
  }))

  const minPrice = Math.min(...localizedCandles.map((c) => Math.min(c. open, c.close)));
  const maxPrice = Math.max(...localizedCandles.map((c) => Math.max(c. open, c.close)));

  const locale = rateToLocaleMapping[rate.id];

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => new Intl.NumberFormat(
            locale, {
              style: 'currency',
              currency: rate.symbol,
            },
          ).format(context.parsed.y),
        },
      },
    },
    scales: {
      y: {
        min: minPrice * 0.995,
        max: maxPrice * 1.005,
      },
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
  };

  const candleDateToString = (ms) => {
    const date = new Date(ms);
    const time = date.toLocaleTimeString(defaultLocale, { hour: 'numeric', minute: 'numeric', hour12: true })

    if (interval === supportedTimeIntervals.DAY) return time;

    const weekDay = date.toLocaleDateString(defaultLocale, { weekday: 'long' });
    if (interval === supportedTimeIntervals.FIVE_DAYS) return `${weekDay} at ${time}`;

    return date.toLocaleDateString(defaultLocale, { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const data = {
    labels: localizedCandles.map((c) => candleDateToString(c.date)),
    datasets: [
      {
        label: '',
        data: localizedCandles.map(candleToGraphCandle),
        parsing: {
          yAxisKey: 's',
        },
        backgroundColor: 'rgb(42 63 252)',
      },
    ],
  };

  return (
    <Bar options={options} data={data} />
  );
};

export default CandleGraph;
