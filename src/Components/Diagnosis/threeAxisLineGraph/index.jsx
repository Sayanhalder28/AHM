import React from 'react';
import ReactApexChart from 'react-apexcharts';
import PropTypes from 'prop-types';

function LineGraph({ name }) {
  const generateDummyDataWithPeaks = (startValue, endValue, step, peakIndices, peakHeight) => {
    const data = [];
    for (let i = startValue; i <= endValue; i += step) {
      let value = Math.random() * 100;

      // Introduce high peaks at specific indices
      if (peakIndices.includes(i)) {
        value += peakHeight;
      }

      const roundedValue = Math.round(value * 100) / 100; // Round to two decimal places
      data.push(roundedValue);
    }
    return data;
  };

  const state = {
    series: [
      {
        name: 'Radial',
        data: generateDummyDataWithPeaks(10, 1048, 10, [300, 700, 1100], 50),
        color: '#008FFB',
      },
      {
        name: 'Axial',
        data: generateDummyDataWithPeaks(20, 1068, 10, [500, 900, 1030], 60),
        color: '#00E396',
      },
      {
        name: 'Tangential',
        data: generateDummyDataWithPeaks(30, 1088, 10, [400, 800, 1020], 70),
        color: '#FEB019',
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
      },
      title: {
        text: name,
        align: 'left',
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      },
    },
  };

  return (
    <div id='chart'>
      <ReactApexChart options={state.options} series={state.series} type='line' height={350} />
    </div>
  );
}

export default LineGraph;

LineGraph.propTypes = {
  data: PropTypes.array,
  name: PropTypes.string,
};
