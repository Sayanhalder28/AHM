//npm install react-apexcharts apexcharts

import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import PropTypes from 'prop-types';

function VibratiionChart({ sensorData }) {
  const XAxis = [];
  const YAxis = [];
  const ZAxis = [];
  // const Acceleration = [];

  for (let index = 0; index < sensorData.length; index++) {
    XAxis.push(sensorData[index].A.Vibration_X);
    YAxis.push(sensorData[index].A.Vibration_Y);
    ZAxis.push(sensorData[index].A.Vibration_Z);
  }

  const series = [
    [
      {
        name: 'X-axis',
        data: XAxis,
      },
    ],
    [
      {
        name: 'Y-axis',
        data: YAxis,
      },
    ],
    [
      {
        name: 'Z-axis',
        data: ZAxis,
      },
    ],
  ];

  // eslint-disable-next-line no-unused-vars
  const [options, setOptions] = useState([
    {
      chart: {
        id: 'xyz',
        background: '#F6F8FA',
        toolbar: {
          show: false, // Disable toolbar
        },
      },
      title: {
        text: 'X-Axis', // Name of the chart
        align: 'left', // Align the title to the right
        floating: false, // Allow the title to float above the chart
      },
      colors: ['#7BD39A'],
      dataLabels: {
        enabled: false,
      },
      fill: {
        opacity: 1,
        type: 'solid',
      },
      stroke: {
        width: 0,
        curve: 'smooth',
      },
      xaxis: {
        categories: [
          '10:00',
          '10:01',
          '10:02',
          '10:03',
          '10:04',
          '10:05',
          '10:06',
          '10:07',
          '10:08',
        ],
      },
      yaxis: {
        tickAmount: 2,
      },
    },
    {
      chart: {
        id: 'xyz',
        background: '#F6F8FA',
        toolbar: {
          show: false, // Disable toolbar
        },
      },
      title: {
        text: 'Y-Axis', // Name of the chart
        align: 'left', // Align the title to the right
        floating: false, // Allow the title to float above the chart
      },
      colors: ['#7BD39A'],
      dataLabels: {
        enabled: false,
      },
      fill: {
        opacity: 1,
        type: 'solid',
      },
      stroke: {
        width: 0,
        curve: 'smooth',
      },
      xaxis: {
        categories: [
          '10:00',
          '10:01',
          '10:02',
          '10:03',
          '10:04',
          '10:05',
          '10:06',
          '10:07',
          '10:08',
        ],
      },
      yaxis: {
        tickAmount: 2,
      },
    },
    {
      chart: {
        id: 'xyz',
        background: '#F6F8FA',
        toolbar: {
          show: false, // Disable toolbar
        },
      },
      title: {
        text: 'Z-Axis', // Name of the chart
        align: 'left', // Align the title to the right
        floating: false, // Allow the title to float above the chart
      },
      colors: ['#7BD39A'],
      dataLabels: {
        enabled: false,
      },
      fill: {
        opacity: 1,
        type: 'solid',
      },
      stroke: {
        width: 0,
        curve: 'smooth',
      },
      xaxis: {
        categories: [
          '10:00',
          '10:01',
          '10:02',
          '10:03',
          '10:04',
          '10:05',
          '10:06',
          '10:07',
          '10:08',
        ],
      },
      yaxis: {
        tickAmount: 2,
      },
    },
  ]);

  return (
    <div className='flex flex-col m-5 gap-2 w-full h-full'>
      <Chart options={options[0]} series={series[0]} height={110} type='area' />
      <Chart options={options[1]} series={series[1]} height={110} type='area' />
      <Chart options={options[2]} series={series[2]} height={110} type='area' />
    </div>
  );
}

VibratiionChart.propTypes = {
  sensorData: PropTypes.arrayOf(
    PropTypes.shape({
      A: PropTypes.shape({
        Vibration_X: PropTypes.number,
        Vibration_Y: PropTypes.number,
        Vibration_Z: PropTypes.number,
      }),
    }),
  ).isRequired,
};

export default VibratiionChart;
