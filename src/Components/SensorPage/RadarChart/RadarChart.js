import React from 'react';
import ReactApexChart from 'react-apexcharts';

function RadarChart() {
  const series = [65];
  const options = {
    chart: {
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        dataLabels: {
          value: {
            fontSize: '20px',
            color: undefined,
            formatter: function (val) {
              return val + '%';
            },
          },
        },
      },
    },
    stroke: {
      dashArray: 4,
    },
    labels: ['Health'],
  };

  return (
    <>
      <ReactApexChart options={options} series={series} type='radialBar' height={250} />
    </>
  );
}

export default RadarChart;
