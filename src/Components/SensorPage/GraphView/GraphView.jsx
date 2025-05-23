/* eslint-disable react/prop-types */
import React, { useRef, useEffect } from 'react';
import Graph from './Graph';
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import { useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import API_URL from '../../../config';

// eslint-disable-next-line no-unused-vars, react/prop-types
function GraphView({ thresholdData }) {
  const { assetId, sensorType } = useParams();

  // eslint-disable-next-line no-unused-vars, react/prop-types
  const sensorData = useRef({
    asset_id: 'SMS_60505',
    health_status: 'warning',
    id: 65279,
    magnetic_flux_peak: 6,
    magnetic_flux_x: 4,
    magnetic_flux_y: 4,
    magnetic_flux_z: 4,
    sensor_type: 'NDE',
    temperature: 20,
    time_stamp: '2024-01-02T18:11:18.000Z',
    ultrasound: 3,
    ultrasound_delta: 7,
    vibration_peak: 6,
    vibration_x: 4,
    vibration_y: 6,
    vibration_z: 4,
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${API_URL}/data/sensor/sensor-data?assetId=${assetId}&sensorType=${sensorType}`,
      );
      const data = await response.json();

      return data.data;
    };

    fetchData();
    const interval = setInterval(() => {
      // Manually fetch the data using queryClient and update the 'data' state
      queryClient.fetchQuery('sensor-graph-data', fetchData).then((response) => {
        sensorData.current = response;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [queryClient]);

  return (
    <div className='flex flex-col gap-3 w-full'>
      {/* upper half  */}
      <div className='flex h-1/2 flex-col sm:flex-row justify-between items-center gap-2 w-full'>
        {/* temperature */}
        <div className='w-full sm:w-2/6 text-center rounded-lg shadow-inner bg-violet-300 '>
          {/* heading section with pop-up message */}
          <div className='flex justify-center items-center text-white text-base 2xl:text-xl font-bold tracking-wider bg-grad bg-gradient-to-r from-red-500 to-blue-500 rounded-t-md relative'>
            TEMPERATURE
            <InformationCircleIcon className='peer h-5 text-white opacity-50 right-0 top-0 ml-2 m-1  shadow-inner hover:opacity-100' />
            {/* pop up massamge  */}
            <div className='bg-sky-900 text-white rounded-md px-14 py-1 mx-auto shadow-md w-max absolute inset-x-0 -top-7 hidden peer-hover:block z-50'>
              <p className='font-bold'>As per IEEE 841 Standard</p>
            </div>
          </div>
          <div className='grid grid-cols-2 justify-between items-center w-full border-x-2 border-b-2 border-violet-500 rounded-b-md'>
            <Graph
              sensorData={sensorData}
              name='SKIN'
              atributeName='temperature'
              min={thresholdData.temperature_min}
              healthy={thresholdData.temperature_healthy}
              warning={thresholdData.temperature_warning}
              max={thresholdData.temperature_max}
            />
            <Graph
              sensorData={sensorData}
              name='DE'
              atributeName='temperature'
              min={thresholdData.temperature_min}
              healthy={thresholdData.temperature_healthy}
              warning={thresholdData.temperature_warning}
              max={thresholdData.temperature_max}
            />
          </div>
        </div>
        {/* vibration section with pop-up message*/}
        <div className='w-full sm:w-4/6 text-center rounded-lg shadow-inner bg-green-300 '>
          <div className='flex justify-center items-center text-white text-base 2xl:text-xl font-bold tracking-wider bg-grad bg-gradient-to-r from-green-500 to-blue-500 rounded-t-md relative'>
            VIBRATION
            <InformationCircleIcon className='peer h-5 text-white opacity-50 right-0 top-0 ml-2 m-1  shadow-inner hover:opacity-100' />
            {/* pop up massamge  */}
            <div className='bg-sky-900 text-white rounded-md px-14 py-1 mx-auto shadow-md w-max absolute inset-x-0 -top-7 hidden peer-hover:block z-50'>
              <p className='font-bold'>As per IEEE 841 Standard</p>
            </div>
          </div>
          <div className='grid grid-cols-2 sm:grid-cols-4 justify-between items-center w-full border-x-2 border-b-2 border-green-500 rounded-b-md'>
            <Graph
              sensorData={sensorData}
              name='X AXIS'
              atributeName='vibration_x'
              min={thresholdData.vibration_min}
              healthy={thresholdData.vibration_healthy}
              warning={thresholdData.vibration_warning}
              max={thresholdData.vibration_max}
            />
            <Graph
              sensorData={sensorData}
              name='Y AXIS'
              atributeName='vibration_x'
              min={thresholdData.vibration_min}
              healthy={thresholdData.vibration_healthy}
              warning={thresholdData.vibration_warning}
              max={thresholdData.vibration_max}
            />
            <Graph
              sensorData={sensorData}
              name='Z AXIS'
              atributeName='vibration_y'
              min={thresholdData.vibration_min}
              healthy={thresholdData.vibration_healthy}
              warning={thresholdData.vibration_warning}
              max={thresholdData.vibration_max}
            />
            <Graph
              sensorData={sensorData}
              name='PEAK'
              atributeName='vibration_peak'
              min={thresholdData.vibration_min}
              healthy={thresholdData.vibration_healthy}
              warning={thresholdData.vibration_warning}
              max={thresholdData.vibration_max}
            />
          </div>
        </div>
      </div>
      {/* lower half */}
      <div className='flex h-1/2 flex-col sm:flex-row justify-between items-center gap-2'>
        {/* magnetic flux section with pop-up message*/}
        <div className='w-full sm:w-4/6 text-center rounded-lg shadow-inner bg-blue-300 '>
          <div className='flex justify-center items-center text-white text-xs md:text-base 2xl:text-xl font-bold tracking-wider bg-gradient-to-r from-sky-500 to-indigo-500 rounded-t-md relative'>
            MAGNETIC FLUX
            <InformationCircleIcon className='peer h-5 text-white opacity-50 right-0 top-0 ml-2 m-1  shadow-inner hover:opacity-100' />
            {/* pop up massamge  */}
            <div className='bg-sky-900 text-white rounded-md px-14 py-1 mx-auto shadow-md w-max absolute inset-x-0 -top-7 hidden peer-hover:block z-50'>
              <p className='font-bold'>As per IEEE 841 Standard</p>
            </div>
          </div>
          <div className='grid grid-cols-2 sm:grid-cols-4 justify-between items-center border-x-2 border-b-2 border-sky-500 rounded-b-md'>
            <Graph
              sensorData={sensorData}
              name='X AXIS'
              atributeName='magnetic_flux_x'
              min={thresholdData.magnetic_flux_min}
              healthy={thresholdData.magnetic_flux_healthy}
              warning={thresholdData.magnetic_flux_warning}
              max={thresholdData.magnetic_flux_max}
            />
            <Graph
              sensorData={sensorData}
              name='Y AXIS'
              atributeName='magnetic_flux_y'
              min={thresholdData.magnetic_flux_min}
              healthy={thresholdData.magnetic_flux_healthy}
              warning={thresholdData.magnetic_flux_warning}
              max={thresholdData.magnetic_flux_max}
            />
            <Graph
              sensorData={sensorData}
              name='Z AXIS'
              atributeName='magnetic_flux_z'
              min={thresholdData.magnetic_flux_min}
              healthy={thresholdData.magnetic_flux_healthy}
              warning={thresholdData.magnetic_flux_warning}
              max={thresholdData.magnetic_flux_max}
            />
            <Graph
              sensorData={sensorData}
              name='PEAK'
              atributeName='magnetic_flux_peak'
              min={thresholdData.magnetic_flux_min}
              healthy={thresholdData.magnetic_flux_healthy}
              warning={thresholdData.magnetic_flux_warning}
              max={thresholdData.magnetic_flux_max}
            />
          </div>
        </div>
        {/* microphonics section with pop-up message*/}
        <div className='w-full sm:w-2/6 text-center rounded-lg shadow-inner bg-orange-300 '>
          <div className='flex justify-center items-center text-white text-xs md:text-base 2xl:text-xl font-bold  tracking-wider bg-gradient-to-r from-orange-500 to-red-500 rounded-t-md relative'>
            ACOUSTICS
            <InformationCircleIcon className='peer h-5 text-white opacity-50 right-0 top-0 ml-2 m-1  shadow-inner hover:opacity-100' />
            {/* pop up massamge  */}
            <div className='bg-sky-900 text-white rounded-md px-14 py-1 mx-auto shadow-md w-max absolute inset-x-0 -top-7 hidden peer-hover:block z-50'>
              <p className='font-bold'>As per IEEE 841 Standard</p>
            </div>
          </div>
          <div className='grid grid-cols-2 justify-between items-center w-full border-x-2 border-b-2 border-orange-500 rounded-b-md'>
            <Graph
              sensorData={sensorData}
              name='ULTRA_SOUND'
              atributeName='ultrasound'
              min={thresholdData.ultrasound_min}
              healthy={thresholdData.ultrasound_healthy}
              warning={thresholdData.ultrasound_warning}
              max={thresholdData.ultrasound_max}
            />
            <Graph
              sensorData={sensorData}
              name='SPL'
              atributeName='ultrasound_delta'
              min={thresholdData.ultrasound_min}
              healthy={thresholdData.ultrasound_healthy}
              warning={thresholdData.ultrasound_warning}
              max={thresholdData.ultrasound_max}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GraphView;
