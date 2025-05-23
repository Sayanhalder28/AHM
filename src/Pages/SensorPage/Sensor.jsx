import React, { useState, useEffect } from 'react';
import HealthBar from '../../Components/SensorPage/HealthBar/HealthBar';
import ThresholdForm from '../../Components/Forms/ThresholdForm';
import AnalogView from '../../Components/SensorPage/AnalogView/AnalogView';
import GraphView from '../../Components/SensorPage/GraphView/GraphView';
import { useParams } from 'react-router-dom';
import Loading from '../../Utils/Loading';
import { useQuery } from 'react-query';
import API_URL from '../../config';
import MachineStatus from '../../Components/SensorPage/MachineStatus/MachineStatus';
import ActivityInsights from '../../Components/SensorPage/ActivityInsights/ActivityInsights';
import AlertSummery from '../../Components/SensorPage/AlertSummery/AlertSummery';
import OperatingParameters from '../../Components/SensorPage/OperatingParameters/OperatingParameters';
import Modal from '../../Utils/Modal';
import {
  AdjustmentsVerticalIcon,
  ShieldCheckIcon,
  ArrowTrendingUpIcon,
  ClockIcon,
} from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import PageHeading from '../../app/PageHeading';
import FloatingMenu from '../../app/FloatingMenu';

function Sensor() {
  const { workshopCode, assetId, sensorType, sensorId } = useParams();
  const navigate = useNavigate();

  const [graphView, setGrapgView] = useState(false);
  const [thresholdData, setThresholdData] = React.useState({
    temperature_min: 0,
    temperature_healthy: 75,
    temperature_warning: 85,
    temperature_max: 100,
    vibration_min: 0,
    vibration_healthy: 5,
    vibration_warning: 8,
    vibration_max: 11,
    ultrasound_min: 0,
    ultrasound_healthy: 5,
    ultrasound_warning: 8,
    ultrasound_max: 11,
    magnetic_flux_min: 0,
    magnetic_flux_healthy: 5,
    magnetic_flux_warning: 8,
    magnetic_flux_max: 11,
  });
  const [AnalogData, setAnalogData] = React.useState({
    temperature: 0,
    vibration_x: 0,
    vibration_y: 0,
    vibration_z: 0,
    vibration_peak: 0,
    magnetic_flux_x: 0,
    magnetic_flux_y: 0,
    magnetic_flux_z: 0,
    magnetic_flux_peak: 0,
    ultrasound: 0,
    ultrasound_delta: 0,
    time_stamp: 0,
    health: '',
  });
  const [dataFetchClock, setDataFetchClock] = useState(0);

  //fetch sensor threshold values from database
  useEffect(() => {
    const fetchAnalogThreshold = async () => {
      const res = await fetch(`${API_URL}/data/sensor/sensor-threshold?sensorId=${sensorId}`).then(
        (res) => res.json(),
      );
      const data = await res;
      return data.data;
    };

    fetchAnalogThreshold().then((data) => {
      console.log('threshold updated');
      if (data) {
        setThresholdData({
          temperature_min: data[0].temperature_min,
          temperature_healthy: data[0].temperature_healthy,
          temperature_warning: data[0].temperature_warning,
          temperature_max: data[0].temperature_max,
          vibration_min: data[0].vibration_min,
          vibration_healthy: data[0].vibration_healthy,
          vibration_warning: data[0].vibration_warning,
          vibration_max: data[0].vibration_max,
          ultrasound_min: data[0].ultrasound_min,
          ultrasound_healthy: data[0].ultrasound_healthy,
          ultrasound_warning: data[0].ultrasound_warning,
          ultrasound_max: data[0].ultrasound_max,
          magnetic_flux_min: data[0].magnetic_flux_min,
          magnetic_flux_healthy: data[0].magnetic_flux_healthy,
          magnetic_flux_warning: data[0].magnetic_flux_warning,
          magnetic_flux_max: data[0].magnetic_flux_max,
        });
      }
    });
  }, []);

  //fetch sensor readings  from database
  const fetchAnalogData = async () => {
    const res = await fetch(
      `${API_URL}/data/sensor/sensor-data?assetId=${assetId}&sensorType=${sensorType}`,
    );
    // console.log('data fetched', dataFetchClock);
    const data = await res.json();
    if (data.status == 'success') return data.data;
    else throw new Error('Failed to fetch data');
  };

  const { isLoading } = useQuery('sensorData', fetchAnalogData, {
    refetchInterval: 2000,
    onSuccess: (data) => {
      if (data) {
        console.log('data fetched');
        setAnalogData({
          temperature: data.temperature,
          vibration_x: data.vibration_x,
          vibration_y: data.vibration_y,
          vibration_z: data.vibration_z,
          vibration_peak: data.vibration_peak,
          magnetic_flux_x: data.magnetic_flux_x,
          magnetic_flux_y: data.magnetic_flux_y,
          magnetic_flux_z: data.magnetic_flux_z,
          magnetic_flux_peak: data.magnetic_flux_peak,
          ultrasound: data.ultrasound,
          ultrasound_delta: data.ultrasound_delta,
          time_stamp: data.time_stamp,
          // time_stamp: '2024-01-19T10:34:56.000Z',
          health: data.health_status,
        });
        setDataFetchClock((prev) => +!prev);
      }
    },
    onError: (error) => {
      console.log(error);
    },
    cacheTime: 0,
  });

  const handleToggle = () => {
    if (graphView) {
      setGrapgView(false);
    } else if (!graphView) {
      setGrapgView(true);
    }
  };

  const handleDiagonisisToggle = () => {
    navigate(`/client/${workshopCode}/asset/${assetId}/${sensorId}/${sensorType}/diagnosis`);
  };

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='flex flex-col items-center'>
          <Loading />
          <div className='text-gray-900 font-bold text-xl mt-4'>Loading...</div>
        </div>
      </div>
    );
  }
  return (
    <div className='px-4 md:px-10 pt-3 '>
      <PageHeading name={'Sensor'}>
        <div className='hidden sm:flex gap-3 w-full justify-between items-center sm:justify-end '>
          {/* other options */}
          <Modal>
            <AdjustmentsVerticalIcon
              className='w-12 h-12 rounded-full p-2 bg-slate-100 text-gray-500 shadow-md border border-slate-300 border-opacity-60'
              id='ButtonIcon'
            />
            <ThresholdForm id='ModalBody' thresholdData={thresholdData} />
          </Modal>

          <div className='flex gap-3'>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-max h-max my-auto'
              onClick={handleDiagonisisToggle}
            >
              Diagnosis
            </button>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-max h-max my-auto'
              onClick={handleToggle}
            >
              {graphView ? 'Dial View' : 'Graph View'}
            </button>
          </div>
        </div>
      </PageHeading>

      <FloatingMenu className='sm:hidden'>
        <div className='flex flex-col gap-1'>
          <Modal>
            <AdjustmentsVerticalIcon
              className='w-12 h-12 rounded-full p-2 bg-slate-100 text-gray-500 shadow-md border border-slate-300 border-opacity-60'
              id='ButtonIcon'
            />
            <ThresholdForm id='ModalBody' thresholdData={thresholdData} />
          </Modal>
          <ShieldCheckIcon
            className='w-12 h-12 rounded-full p-2 bg-blue-500 text-slate-200 shadow-2xl'
            onClick={handleDiagonisisToggle}
          />
          <div onClick={handleToggle}>
            {graphView ? (
              <ClockIcon className='w-12 h-12 rounded-full p-2 bg-blue-500 text-slate-100 shadow-2xl' />
            ) : (
              <ArrowTrendingUpIcon className='w-12 h-12 rounded-full p-2 bg-blue-500 text-slate-100 shadow-2xl' />
            )}
          </div>
        </div>
      </FloatingMenu>
      {/* sensor details section  */}
      <section className='w-full pb-3 sm:sticky top-16 z-40 bg-slate-50 bg-opacity-40 backdrop-blur-sm'>
        {/* device description */}
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-center'>
          <div className='rounded-lg w-full h-full m-auto shadow bg-gray-200'>
            <div className='text-white h-6 rounded-t-lg border-blue-600 font-semibold sm:text-sm block bg-blue-600'>
              Address
            </div>
            <div className='text-gray-800 w-full text-lg font-bold tracking-widest p-1 lg:h-fit truncate hover:overflow-visible hover:whitespace-normal'>
              Section-A
            </div>
          </div>

          <div className='rounded-lg w-full h-full m-auto shadow bg-gray-200'>
            <div className='text-white h-6 rounded-t-lg border-blue-600 font-semibold sm:text-sm block bg-blue-600'>
              Application
            </div>
            <div className='text-gray-800 w-full text-lg font-bold tracking-widest p-1 lg:h-fit truncate hover:overflow-visible hover:whitespace-normal'>
              Cooling Tower
            </div>
          </div>
          <div className='rounded-lg w-full h-full m-auto shadow bg-gray-200'>
            <div className='text-white h-6 rounded-t-lg border-blue-600 font-semibold sm:text-sm block bg-blue-600'>
              Asset
            </div>
            <div className='text-gray-800 w-full text-lg font-bold tracking-widest p-1 lg:h-fit truncate hover:overflow-visible hover:whitespace-normal'>
              Spiral Fan
            </div>
          </div>
          <div className='rounded-lg w-full h-full m-auto shadow bg-gray-200'>
            <div className='text-white h-6 rounded-t-lg border-blue-600 font-semibold sm:text-sm block bg-blue-600'>
              MUID
            </div>
            <div className='text-gray-800 w-full text-lg font-bold tracking-widest p-1 lg:h-fit truncate hover:overflow-visible hover:whitespace-normal'>
              XYZ-1232323
            </div>
          </div>
          <div className='rounded-lg w-full h-full col-span-2 lg:col-span-1 m-auto shadow bg-gray-200'>
            <div className='text-white h-6 rounded-t-lg border-blue-600 font-semibold sm:text-sm block bg-blue-600'>
              Health status
            </div>
            <div className='text-gray-800 w-full text-lg font-bold tracking-widest p-1 lg:h-fit truncate hover:overflow-visible hover:whitespace-normal'>
              <HealthBar assetId={assetId} sensorType={sensorType} />
            </div>
          </div>
        </div>
      </section>
      {/* monitor section */}
      <section className='w-full'>
        {/* analogue dials for displaying sensor data */}
        {/* {graphView ? <GraphView/>: <AnalogView />} */}
        {/* {graphView ? <GraphView/>: <AnalogView />} */}
        {/* {graphView ? <GraphView /> : <AnalogView />} */}
        {graphView ? (
          <GraphView thresholdData={thresholdData} />
        ) : (
          <AnalogView sensorData={AnalogData} thresholdData={thresholdData} />
        )}
      </section>
      {/* alert summery, operating parameters, asset health  */}
      <section className='w-full my-5'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-2'>
          {/* operating parameters  */}
          <div className='w-full'>
            <OperatingParameters />
          </div>

          {/* MACHINE health  */}
          <div className='w-full'>
            <MachineStatus AnalogData={AnalogData} dataFetchClock={dataFetchClock} />
          </div>

          {/* Activity Insights  */}
          <div className='w-full'>
            <ActivityInsights />
          </div>

          {/* alert summery  */}
          <div className='w-full'>
            <AlertSummery />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Sensor;
