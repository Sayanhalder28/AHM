/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Loading from '../../../Utils/Loading';
// import { generateDumy } from '../../../Utils/DummyDataGenerate';
import Gauge from './Gauge';
import { InformationCircleIcon } from '@heroicons/react/24/solid';

function AnalogView({ sensorData, thresholdData }) {
  return (
    <div className='flex flex-col gap-2'>
      <div className='text-center text-lg font-bold absolute top-24 right-[40rem]'></div>
      {/* top half  */}
      <div className='flex flex-col sm:flex-row gap-3'>
        {/* temperature  */}
        <div className='w-full h-max sm:w-2/6  text-center rounded-lg shadow-lg bg-slate-200'>
          {/* heading secton with pop up  */}
          <div className='flex justify-center items-center text-white text-base 2xl:text-xl font-bold tracking-wider bg-grad bg-gradient-to-r from-red-500 to-blue-500 rounded-t-md relative'>
            TEMPERATURE (°C)
            <InformationCircleIcon className='peer h-5 text-white opacity-50 right-0 top-0 ml-2 m-1  shadow-inner hover:opacity-100' />
            {/* pop up massamge  */}
            <div className='bg-sky-900 text-white rounded-md px-14 py-1 mx-auto shadow-md w-max absolute inset-x-0 -top-8 hidden peer-hover:block z-50'>
              <p className='font-medium'>As per IEEE 841 Standard</p>
            </div>
          </div>
          <div className='flex flex-row flex-wrap gap-3 items-center p-4 justify-center w-full h-full border-x-2 border-b-2 border-slate-300 rounded-b-md'>
            <Gauge
              value={
                sensorData.temperature
                  ? sensorData.temperature > thresholdData.temperature_max
                    ? thresholdData.temperature_max
                    : sensorData.temperature
                  : 0
              }
              minValue={thresholdData.temperature_min}
              maxValue={thresholdData.temperature_max}
              breaks={[thresholdData.temperature_healthy, thresholdData.temperature_warning]}
              timeStamps={sensorData.timeStamps}
              unit='°'
              name='Skin'
            />
            <Gauge
              value={
                sensorData.temperature
                  ? sensorData.temperature > thresholdData.temperature_max
                    ? thresholdData.temperature_max
                    : sensorData.temperature
                  : 0
              }
              minValue={thresholdData.temperature_min}
              maxValue={thresholdData.temperature_max}
              breaks={[thresholdData.temperature_healthy, thresholdData.temperature_warning]}
              timeStamps={sensorData.timeStamps}
              unit='°'
              name='Bearing'
            />
          </div>
        </div>
        {/* vibration  */}
        <div className='w-full h-max sm:w-4/6 text-center rounded-lg shadow-lg bg-slate-200 '>
          <div className='flex justify-center items-center text-white text-base 2xl:text-xl font-bold tracking-wider bg-grad bg-gradient-to-r from-green-500 to-blue-500 rounded-t-md relative'>
            VIBRATION (mm/Sec)
            <InformationCircleIcon className='peer h-5 text-white opacity-50 right-0 top-0 ml-2 m-1 shadow-inner hover:opacity-100' />
            {/* pop up massamge  */}
            <div className='bg-sky-900 text-white rounded-md px-14 py-1 mx-auto shadow-md w-max absolute inset-x-0 -top-8 hidden peer-hover:block z-50'>
              <p className='font-medium'>As per IEEE 841 Standard</p>
            </div>
          </div>
          <div className='flex flex-row flex-wrap gap-3 items-center p-4 justify-center w-full h-full border-x-2 border-b-2 border-slate-300 rounded-b-md'>
            <Gauge
              value={
                sensorData.vibration_x
                  ? sensorData.vibration_x > thresholdData.vibration_max
                    ? thresholdData.vibration_max
                    : sensorData.vibration_x
                  : 0
              }
              minValue={thresholdData.vibration_min}
              maxValue={thresholdData.vibration_max}
              breaks={[thresholdData.vibration_healthy, thresholdData.vibration_warning]}
              timeStamps={sensorData.timeStamps}
              unit=''
              name='Radial'
            />
            <Gauge
              value={
                sensorData.vibration_y
                  ? sensorData.vibration_y > thresholdData.vibration_max
                    ? thresholdData.vibration_max
                    : sensorData.vibration_y
                  : 0
              }
              minValue={thresholdData.vibration_min}
              maxValue={thresholdData.vibration_max}
              breaks={[thresholdData.vibration_healthy, thresholdData.vibration_warning]}
              timeStamps={sensorData.timeStamps}
              unit=''
              name='Axial'
            />
            <Gauge
              value={
                sensorData.vibration_z
                  ? thresholdData.vibration_z > thresholdData.vibration_max
                    ? thresholdData.vibration_max
                    : sensorData.vibration_z
                  : 0
              }
              minValue={thresholdData.vibration_min}
              maxValue={thresholdData.vibration_max}
              breaks={[thresholdData.vibration_healthy, thresholdData.vibration_warning]}
              timeStamps={sensorData.timeStamps}
              unit=''
              name='Tangential'
            />
            <Gauge
              value={
                sensorData.vibration_peak
                  ? sensorData.vibration_peak > thresholdData.vibration_max
                    ? thresholdData.vibration_max
                    : sensorData.vibration_peak
                  : 0
              }
              minValue={thresholdData.vibration_min}
              maxValue={thresholdData.vibration_max}
              breaks={[thresholdData.vibration_healthy, thresholdData.vibration_warning]}
              timeStamps={sensorData.timeStamps}
              unit=''
              name='Peak'
            />
            {/* <MeterComponent value={Math.abs(data[data.length-1].A.Vibration_Y)} minValue={0} maxValue={11} breaks={[5,8]} unit="mm/sec²" name="Peak"/> */}
          </div>
        </div>
      </div>
      {/* bottom half */}
      <div className='flex flex-col-reverse sm:flex-row gap-2 '>
        {/* microphonics  */}
        <div className='w-full h-max sm:w-2/6  text-center rounded-lg shadow-lg bg-slate-200'>
          <div className='flex justify-center items-center text-white text-base 2xl:text-xl font-bold tracking-wider bg-grad bg-gradient-to-r from-orange-500 to-red-500 rounded-t-md relative'>
            ACOUSTICS (Db)
            <InformationCircleIcon className='peer h-5 text-white opacity-50 right-0 top-0 ml-2 m-1 shadow-inner hover:opacity-100' />
            {/* pop up massamge  */}
            <div className='bg-sky-900 text-white rounded-md px-14 py-1 mx-auto shadow-md w-max absolute inset-x-0 -top-8 hidden peer-hover:block z-50'>
              <p className='font-medium'>As per IEEE 841 Standard</p>
            </div>
          </div>
          <div className='peer flex flex-wrap gap-3 items-center p-4 justify-center w-full h-full border-x-2 border-b-2 border-slate-300 rounded-b-md'>
            <Gauge
              value={
                sensorData.ultrasound
                  ? sensorData.ultrasound > thresholdData.ultrasound_max
                    ? thresholdData.ultrasound_max
                    : sensorData.ultrasound
                  : 0
              }
              minValue={thresholdData.ultrasound_min}
              maxValue={thresholdData.ultrasound_max}
              breaks={[thresholdData.ultrasound_healthy, thresholdData.ultrasound_warning]}
              timeStamps={sensorData.timeStamps}
              unit='dB'
              name='Ultra Sound'
            />
            <Gauge
              value={
                sensorData.ultrasound_delta
                  ? sensorData.ultrasound_delta > thresholdData.ultrasound_max
                    ? thresholdData.ultrasound_max
                    : sensorData.ultrasound_delta
                  : 0
              }
              minValue={thresholdData.ultrasound_min}
              maxValue={thresholdData.ultrasound_max}
              breaks={[thresholdData.ultrasound_healthy, thresholdData.ultrasound_warning]}
              timeStamps={sensorData.timeStamps}
              unit='dB'
              name='Noise'
            />
          </div>
        </div>
        {/* magnetic flux  */}
        <div className='w-full h-max sm:w-4/6 text-center rounded-lg shadow-lg bg-slate-200'>
          <div className='flex justify-center items-center text-white text-base 2xl:text-xl font-bold tracking-wider bg-grad bg-gradient-to-r from-sky-500 to-indigo-500 rounded-t-md relative'>
            MAGNETIC FLUX (Gauss)
            <InformationCircleIcon className='peer h-5 text-white opacity-50 right-0 top-0 ml-2 m-1 shadow-inner hover:opacity-100' />
            {/* pop up massamge  */}
            <div className='bg-sky-900 text-white rounded-md px-14 py-1 mx-auto shadow-md w-max absolute inset-x-0 -top-8 hidden peer-hover:block z-50'>
              <p className='font-medium'>As per IEEE 841 Standard</p>
            </div>
          </div>
          <div className='peer flex flex-row flex-wrap gap-3 items-center p-4 justify-center w-full h-full border-x-2 border-b-2 border-slate-300 rounded-b-md'>
            <Gauge
              value={
                sensorData.magnetic_flux_x
                  ? sensorData.magnetic_flux_x > thresholdData.magnetic_flux_max
                    ? thresholdData.magnetic_flux_max
                    : sensorData.magnetic_flux_x
                  : 0
              }
              minValue={thresholdData.magnetic_flux_min}
              maxValue={thresholdData.magnetic_flux_max}
              breaks={[thresholdData.magnetic_flux_healthy, thresholdData.magnetic_flux_warning]}
              timeStamps={sensorData.timeStamps}
              unit=''
              name='X Axis'
            />
            <Gauge
              value={
                sensorData.magnetic_flux_y
                  ? sensorData.magnetic_flux_y > thresholdData.magnetic_flux_max
                    ? thresholdData.magnetic_flux_max
                    : sensorData.magnetic_flux_y
                  : 0
              }
              minValue={thresholdData.magnetic_flux_min}
              maxValue={thresholdData.magnetic_flux_max}
              breaks={[thresholdData.magnetic_flux_healthy, thresholdData.magnetic_flux_warning]}
              timeStamps={sensorData.timeStamps}
              unit=''
              name='Y Axis'
            />
            <Gauge
              value={
                sensorData.magnetic_flux_z
                  ? sensorData.magnetic_flux_z > thresholdData.magnetic_flux_max
                    ? thresholdData.magnetic_flux_max
                    : sensorData.magnetic_flux_z
                  : 0
              }
              minValue={thresholdData.magnetic_flux_min}
              maxValue={thresholdData.magnetic_flux_max}
              breaks={[thresholdData.magnetic_flux_healthy, thresholdData.magnetic_flux_warning]}
              timeStamps={sensorData.timeStamps}
              unit=''
              name='Z Axis'
            />
            <Gauge
              value={
                sensorData.magnetic_flux_peak
                  ? sensorData.magnetic_flux_peak > thresholdData.magnetic_flux_max
                    ? thresholdData.magnetic_flux_max
                    : sensorData.magnetic_flux_peak
                  : 0
              }
              minValue={thresholdData.magnetic_flux_min}
              maxValue={thresholdData.magnetic_flux_max}
              breaks={[thresholdData.magnetic_flux_healthy, thresholdData.magnetic_flux_warning]}
              timeStamps={sensorData.timeStamps}
              unit=''
              name='Peak'
            />
            {/* <MeterComponent value={data[data.length-1].A.EMF_Y} minValue={0} maxValue={50} breaks={[20,40]} unit="gauss " name="Peak"/> */}
          </div>
        </div>
      </div>
    </div>
  );
}

AnalogView.propTypes = {
  assetId: PropTypes.string,
  sensorType: PropTypes.string,
  sensorId: PropTypes.string,
  sensorData: PropTypes.object,
  thresholdData: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default AnalogView;
