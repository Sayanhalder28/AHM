import React from 'react';
import PropTypes from 'prop-types';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
// import faker from 'faker';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// const data = [];
// let prev = 0;
// for (let i = 0; i < 1700; i++) {
//   prev += 5 - Math.random() * 10;
//   data.push({ x: i, y: prev });
// }

const AccelerationSpectra = () => {
  const data = [];
  let prev = 100;
  for (let i = 0; i < 1000; i++) {
    prev += 5 - Math.random() * 10;
    data.push({ x: i, y: prev });
  }

  const totalDuration = 10000;
  const delayBetweenPoints = totalDuration / data.length;
  const previousY = (ctx) =>
    ctx.index === 0
      ? ctx.chart.scales.y.getPixelForValue(100)
      : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
  const animation = {
    x: {
      type: 'number',
      easing: 'linear',
      duration: delayBetweenPoints,
      from: NaN, // the point is initially skipped
      delay(ctx) {
        if (ctx.type !== 'data' || ctx.xStarted) {
          return 0;
        }
        ctx.xStarted = true;
        return ctx.index * delayBetweenPoints;
      },
    },
    y: {
      type: 'number',
      easing: 'linear',
      duration: delayBetweenPoints,
      from: previousY,
      delay(ctx) {
        if (ctx.type !== 'data' || ctx.yStarted) {
          return 0;
        }
        ctx.yStarted = true;
        return ctx.index * delayBetweenPoints;
      },
    },
  };

  const config = {
    type: 'line',
    data: {
      datasets: [
        {
          borderColor: 'rgb(255, 99, 132)',
          borderWidth: 1,
          radius: 0,
          data: data,
        },
      ],
    },
    options: {
      animation,
      interaction: {
        intersect: false,
      },
      plugins: {
        legend: false,
      },
      scales: {
        x: {
          type: 'linear',
        },
      },
    },
  };

  return (
    <div className=''>
      <Line data={config.data} options={config.options} />
    </div>
  );
};

AccelerationSpectra.propTypes = {
  XVibrationData: PropTypes.arrayOf(PropTypes.number).isRequired,
  YVibrationData: PropTypes.arrayOf(PropTypes.number).isRequired,
  ZVibrationData: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default AccelerationSpectra;
