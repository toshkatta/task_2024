import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

import { rateToLocaleMapping } from '@/domain/Rates';

import { selectCoinHistory } from '@/store/coinHistory/selectors';
import { selectSelectedRate } from '@/store/rates/selectors';

import { useWindowSize } from '@/views/hooks/useWindowSize';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
);

ChartJS.defaults.font.family = "'Lato', Helvetica, Arial, sans-serif";

const coinHistoryToGraphCoinHistory = (c) => ({
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

const CoinHistoryGraph = () => {
  const coinHistory = useSelector(selectCoinHistory);
  const rate        = useSelector(selectSelectedRate);

  const ref = useRef(null);

  const { width } = useWindowSize();

  useEffect(() => {
    if (ref.current?.update) ref.current.resize();
  }, [width]);

  if (!rate) return null;

  const localizedCoinHistory = coinHistory.map((c) => ({
    ...c,
    open: c.open / rate.rateUsd,
    close: c.close / rate.rateUsd,
  }))

  const minPrice = Math.min(...localizedCoinHistory.map((c) => Math.min(c. open, c.close)));
  const maxPrice = Math.max(...localizedCoinHistory.map((c) => Math.max(c. open, c.close)));

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
        bodyAlign: 'center',
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
              maximumFractionDigits: context.parsed.y < 2 ? 8 : 2,
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
        ticks: {
          callback: (value) => new Intl.NumberFormat(
            locale, {
              style: 'currency',
              currency: rate.symbol,
              maximumFractionDigits: value < 2 ? 8 : 2,
            },
          ).format(value),
        },
      },
      x: {
        type: 'time',
        time: {
          displayFormats: {
            month: 'MMM',
          },
          tooltipFormat: 'MMM dd, yyyy, h:mm a',
        },
        ticks: {
          major: {
            enabled: true,
          },
          maxRotation: 0,
          padding: 8,
          font: (context) => ({
            size: 14,
            weight: context?.tick?.major ? 'bold' : 'normal',
          }),
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
  const data = {
    labels: localizedCoinHistory.map((c) => c.date),
    datasets: [
      {
        label: '',
        data: localizedCoinHistory.map(coinHistoryToGraphCoinHistory),
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
    <Bar ref={ref} options={options} data={data} plugins={[hoverLine]} />
  );
};

export default CoinHistoryGraph;
