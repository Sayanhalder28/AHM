import React from 'react';
import StreamingPlugin from 'chartjs-plugin-streaming';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-luxon';
import { Chart as ChartJS } from 'chart.js';
import 'chart.js/auto';
import PropTypes from 'prop-types';
// import { generateDumy } from '../../../Utils/DummyDataGenerate';

ChartJS.register(StreamingPlugin);

// eslint-disable-next-line react/prop-types, no-unused-vars
const Graph = React.memo(({ sensorData, name, atributeName, min, healthy, warning, max }) => {
  const colourPicker = (data) => {
    return data < healthy
      ? 'rgba(92, 235, 0, 0.5)'
      : data < warning
      ? 'rgba(255,200,0,0.5)'
      : 'rgba(236, 20, 0, 0.5)';
  };

  return (
    <div className='text-center m-2 sm:m-3 py-2 bg-slate-50 rounded-lg'>
      <Line
        className='flex-1 w-full'
        data={{
          datasets: [
            {
              label: 'Dataset 1',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgb(255, 99, 132)',
              borderDash: [0, 0],
              fill: true,
              data: [],
              lineTension: 0.3,
              spanGaps: false,
            },
          ],
        }}
        options={{
          scales: {
            x: {
              type: 'realtime',
              realtime: {
                delay: 1800,
                onRefresh: (chart) => {
                  setTimeout(() => {
                    // variables
                    const dataset = chart.data.datasets[0];
                    const latestData = sensorData.current[atributeName];
                    const statusColour = colourPicker(latestData);
                    // changing data
                    dataset.backgroundColor = statusColour;
                    dataset.borderColor = statusColour;
                    dataset.data.push({
                      x: Date.now(),
                      y: latestData,
                    });
                    //clear old data to save RAM
                    if (dataset.data.length > 13) {
                      dataset.data.shift();
                    }
                  }, 150);
                },
              },
            },
            y: {
              max: max,
              min: min,
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        }}
      />
      <div className='text-xs sm:text-base text-slate-700 font-bold text-center mt-1'>{name}</div>
    </div>
  );
});

Graph.propTypes = {
  sensorData: PropTypes.shape({
    current: PropTypes.shape({
      asset_id: PropTypes.string.isRequired,
      health_status: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      magnetic_flux_peak: PropTypes.number.isRequired,
      magnetic_flux_x: PropTypes.number.isRequired,
      magnetic_flux_y: PropTypes.number.isRequired,
      magnetic_flux_z: PropTypes.number.isRequired,
      sensor_type: PropTypes.string.isRequired,
      temperature: PropTypes.number.isRequired,
      time_stamp: PropTypes.string.isRequired,
      ultrasound: PropTypes.number.isRequired,
      ultrasound_delta: PropTypes.number.isRequired,
      vibration_peak: PropTypes.number.isRequired,
      vibration_x: PropTypes.number.isRequired,
      vibration_y: PropTypes.number.isRequired,
      vibration_z: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
};

Graph.displayName = 'Graph';

export default Graph;
