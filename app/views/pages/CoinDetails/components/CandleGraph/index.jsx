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
  Legend,
);

ChartJS.defaults.font.family = "'Roboto', Helvetica, Arial, sans-serif";

const candleToGraphCandle = (c) => ({
  x: c.date,
  o: c.open,
  c: c.close,
  s: [c.open, c.close],
});

const hoverLine = {
  id: 'hoverLine',
  defaults: {
      width: 1,
      color: '#FF4949',
      dash: [3, 3],
  },
  afterInit: (chart) => {
    chart.hoverLine = {
      x: 0,
      y: 0,
    };
  },
  afterEvent: (chart, args) => {
    const { inChartArea } = args;
    const { x, y } = args.event;

    chart.hoverLine = { x, y, draw: inChartArea };
    chart.draw();
  },
  beforeDatasetsDraw(chart) {
    const {
      ctx,
      chartArea: {
        top,
        bottom,
      },
    } = chart;

    const { x, draw } = chart.hoverLine;
    if (!draw) return;

    ctx.save();

    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgb(0 0 0 / 0.5)';
    ctx.setLineDash([3, 9]);
    ctx.moveTo(x, bottom);
    ctx.lineTo(x, top);
    ctx.stroke();

    ctx.restore();
  },
};

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
        displayColors: false,
        cornerRadius: 32,
        titleAlign: 'center',
        titleFont: {
          size: 10,
        },
        bodyFont: {
          size: 16,
          weight: 'bold',
        },
        padding: {
          left: 20,
          right: 20,
          top: 12,
          bottom: 12,
        },
        backgroundColor: 'rgb(0 0 0 / 0.9)',
        callbacks: {
          label: (context) => new Intl.NumberFormat(
            locale, {
              style: 'currency',
              currency: rate.symbol,
            },
          ).format(context.parsed.y),
        },
      },
      hoverLine: {
        color: 'black',
      },
    },
    scales: {
      y: {
        min: minPrice * 0.995,
        max: maxPrice * 1.005,
        grid: {
          display: false,
        },
      },
      x: {
        offsetAfterAutoskip: true,
        ticks: {
          autoSkip: true,
          autoSkipPadding: 28,
          maxRotation: 0,
          padding: 8,
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        border: {
          dash: [8, 8],
        },
        grid: {
          tickBorderDash: [8, 8],
          tickBorderDashOffset: 24,
          lineWidth: 2,
        },
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
        borderRadius: Number.MAX_VALUE,
        borderSkipped: false,
      },
    ],
  };

  return (
    <Bar options={options} data={data} plugins={[hoverLine]} />
  );
};

export default CandleGraph;
