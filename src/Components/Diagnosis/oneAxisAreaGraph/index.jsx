import React from 'react';
import ReactApexChart from 'react-apexcharts';

function AreaGraph() {
  const series = {
    data: [100, 120, 110, 130, 140, 120, 130, 150, 160, 140],
    time: [
      '2021-01-01T00:00:00.000Z',
      '2021-01-01T01:30:00.000Z',
      '2021-01-01T02:30:00.000Z',
      '2021-01-01T03:30:00.000Z',
      '2021-01-01T04:30:00.000Z',
      '2021-01-01T05:30:00.000Z',
      '2021-01-01T06:30:00.000Z',
      '2021-01-01T07:30:00.000Z',
      '2021-01-01T08:30:00.000Z',
      '2021-01-01T09:30:00.000Z',
    ],
  };

  const state = {
    series: [
      {
        name: 'Hertz',
        data: series.data,
      },
    ],
    options: {
      labels: series.time,
      chart: {
        type: 'area',
        height: 350,
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
        text: 'Frequency',
        align: 'left',
      },
      subtitle: {
        text: 'Hertz',
        align: 'left',
      },
      xaxis: {
        type: 'datetime',
      },
      yaxis: {
        opposite: true,
      },
      legend: {
        horizontalAlign: 'left',
      },
    },
  };

  return (
    <div id='chart'>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type='area'
        height={350}
        width={'100%'}
      />
    </div>
  );
}

export default AreaGraph;
