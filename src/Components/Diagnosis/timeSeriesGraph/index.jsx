import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const data = [
  [new Date('2022-01-01').getTime(), 10],
  [new Date('2022-01-02').getTime(), 20],
  [new Date('2022-01-03').getTime(), 15],
  [new Date('2022-01-04').getTime(), 30],
  [new Date('2022-01-05').getTime(), 20],
  [new Date('2022-01-06').getTime(), 10],
  [new Date('2022-01-07').getTime(), 5],
  [new Date('2022-01-08').getTime(), 15],
  [new Date('2022-01-09').getTime(), 20],
  [new Date('2022-01-10').getTime(), 25],
  [new Date('2022-01-11').getTime(), 30],
  [new Date('2022-01-12').getTime(), 35],
  [new Date('2022-01-13').getTime(), 40],
  [new Date('2022-01-14').getTime(), 45],
  [new Date('2022-01-15').getTime(), 50],
  [new Date('2022-01-16').getTime(), 55],
  [new Date('2022-01-17').getTime(), 60],
  [new Date('2022-01-18').getTime(), 65],
];

const ApexChart = () => {
  // eslint-disable-next-line no-unused-vars
  const [state, setState] = useState({
    series: [
      {
        data: data,
      },
    ],
    options: {
      chart: {
        id: 'chart2',
        type: 'line',
        height: 230,
        toolbar: {
          autoSelected: 'pan',
          show: false,
        },
      },
      colors: ['#546E7A'],
      stroke: {
        width: 3,
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        opacity: 1,
      },
      markers: {
        size: 0,
      },
      xaxis: {
        type: 'datetime',
      },
    },
    seriesLine: [
      {
        data: data,
      },
    ],
    optionsLine: {
      chart: {
        id: 'chart1',
        height: 130,
        type: 'area',
        brush: {
          target: 'chart2',
          enabled: true,
        },
        selection: {
          enabled: true,
          xaxis: {
            min: new Date('2022-01-03').getTime(),
            max: new Date('2022-01-14').getTime(),
          },
        },
      },
      colors: ['#008FFB'],
      fill: {
        type: 'gradient',
        gradient: {
          opacityFrom: 0.91,
          opacityTo: 0.1,
        },
      },
      xaxis: {
        type: 'datetime',
        tooltip: {
          enabled: false,
        },
      },
      yaxis: {
        tickAmount: 2,
      },
    },
  });

  return (
    <div id='wrapper'>
      <div id='chart-line2'>
        <ReactApexChart options={state.options} series={state.series} type='line' height={230} />
      </div>
      <div id='chart-line'>
        <ReactApexChart
          options={state.optionsLine}
          series={state.seriesLine}
          type='area'
          height={130}
        />
      </div>
    </div>
  );
};

export default ApexChart;
