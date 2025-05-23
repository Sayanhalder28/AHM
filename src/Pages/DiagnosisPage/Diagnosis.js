/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowTrendingUpIcon,
  ListBulletIcon,
  ArrowDownTrayIcon,
  FunnelIcon,
  FilterIcon,
  AdjustmentsVerticalIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/solid';
import TableComponent from '../../Components/Diagnosis/TableComponent';
import AreaGraph from '../../Components/Diagnosis/oneAxisAreaGraph';
import LineGraph from '../../Components/Diagnosis/threeAxisLineGraph';
import TimeSeriesGraph from '../../Components/Diagnosis/timeSeriesGraph';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Modal from '../../Utils/Modal';
import HealthBar from '../../Components/SensorPage/HealthBar/HealthBar';

const tableData = [
  {
    frequency: '1X',
    radial: '0.1',
    tangential: '0.1',
    axial: '0.1',
  },
  {
    frequency: '1X',
    radial: '0.2',
    tangential: '0.3',
    axial: '0.4',
  },
  {
    frequency: '1.5X',
    radial: '0.2',
    tangential: '0.1',
    axial: '0.3',
  },
  {
    frequency: '1X',
    radial: '0.1',
    tangential: '0.1',
    axial: '0.1',
  },
  {
    frequency: '1X',
    radial: '0.1',
    tangential: '0.1',
    axial: '0.1',
  },
  {
    frequency: '1X',
    radial: '0.1',
    tangential: '0.1',
    axial: '0.1',
  },
  {
    frequency: '1X',
    radial: '0.1',
    tangential: '0.1',
    axial: '0.1',
  },
  {
    frequency: '1X',
    radial: '0.1',
    tangential: '0.1',
    axial: '0.1',
  },
];

function Diagnosis() {
  const { workshopCode, assetId, sensorId, sensorType } = useParams();

  const navigate = useNavigate();

  const generateReport = () => {
    navigate(`/client/${workshopCode}/asset/${assetId}/${sensorId}/${sensorType}/diagnosis/report`);
  };

  return (
    <div className='px-4 md:px-10 pt-3 pb-10'>
      <div className='flex flex-col sm:flex-row flex-nowrap'>
        <div className='w-full pb-3 sm:p-0'>
          <p className='text-gray-800 text-2xl font-bold'>Sensor</p>
          <p className='text-gray-600 text-base font-semibold hidden sm:block'>
            {window.location.pathname}
          </p>
        </div>
        <div className='flex gap-3 w-full justify-between sm:justify-end'>
          {/* other options */}
          {/* <Modal>
            <AdjustmentsVerticalIcon
              className='w-12 rounded-full p-2 bg-slate-100 text-gray-500 shadow-md'
              id='ButtonIcon'
            />
            <ThresholdForm id='ModalBody' />
          </Modal> */}

          {/* <div className='flex gap-3'>
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
          </div> */}
        </div>
      </div>
      {/* sensor details section  */}
      <section className='w-full py-3 sm:sticky top-16 z-40 bg-slate-50 bg-opacity-40 backdrop-blur-sm'>
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
              <HealthBar />
            </div>
          </div>
        </div>
      </section>
      {/* Diagnosys section */}
      <section className='w-full'>
        <div className=''>
          <div className='w-full bg-slate-300 mb-3 rounded-md flex p-2.5'>
            <div className='flex-1 flex justify-start items-center gap-5'>
              <div className='flex items-center space-x-1'>
                <div>
                  <input
                    type='text'
                    className='mb-0 text-blue-700 bg-white border rounded-full focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-2'
                    placeholder='Search Parameters'
                  />
                </div>
                <button className='bg-slate-600 rounded-md p-2 text-white'>
                  <MagnifyingGlassIcon height={20} />
                </button>
              </div>
              <button className='bg-slate-600 rounded-md p-2 text-white'>
                <FunnelIcon height={20} />
              </button>
              <button className='bg-slate-600 rounded-md p-2 text-white'>
                <AdjustmentsVerticalIcon height={20} />
              </button>
            </div>
            <div className='flex-1 flex justify-end gap-5'>
              <button className='bg-slate-600 rounded-md p-2 text-white flex gap-2'>
                <span>New Report</span>
              </button>
              <button
                className='bg-slate-600 rounded-md p-2 text-white flex gap-2'
                onClick={generateReport}
              >
                <span>Download Report</span> <ArrowDownTrayIcon height={20} />
              </button>
            </div>
          </div>
          {/* <div className='absolute right-[23%] top-[31.8%]'> */}
          <div className='absolute right-[19%]'>
            <div className='w-20 h-8 flex justify-between gap-4'>
              <div>
                <p className='whitespace-pre'>
                  <span className='text-gray-500'>Asset ID:</span> {assetId}
                </p>
              </div>
              <div>
                <p className='whitespace-pre'>
                  <span className='text-gray-500'>Sensor ID:</span> {sensorId}
                </p>
              </div>
              <div>
                <p className='whitespace-pre'>
                  <span className='text-gray-500'>Sensor Type:</span> {sensorType}
                </p>
              </div>
            </div>
          </div>

          <div className='absolute right-[45%]'>
            <div className='w-full h-8 flex justify-between gap-4'>
              <div className='font-bold'>
                <p>Put Current Time</p>
              </div>
            </div>
          </div>
          <Tabs>
            <TabList>
              <Tab>Vibration</Tab>
              <Tab>Magnetic Flux</Tab>
              <Tab>Ultrasonic</Tab>
            </TabList>

            <TabPanel>
              <div>
                <div className='flex'>
                  <div className='flex-1'>
                    <LineGraph name={'Vibration-Time'} />
                  </div>
                  <div className='flex-1'>
                    <LineGraph name={'Acceleration-time'} />
                  </div>
                </div>
                <div className='flex'>
                  <div className='w-1/2'>
                    <AreaGraph />
                  </div>
                  <div className='w-1/2'>
                    <TableComponent tableData={tableData} />
                  </div>
                </div>
                <div className='flex'>
                  <div className='w-full border-4 border-gray-300 rounded-lg'>
                    <TimeSeriesGraph />
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              <div>
                <div className='flex'>
                  <div className='flex-1'>
                    <LineGraph name={'Vibration-Time'} />
                  </div>
                </div>
                <div className=''>
                  <AreaGraph />
                </div>
                <div className='flex gap-3'>
                  <div className='w-1/2'>
                    <TableComponent tableData={tableData} />
                  </div>
                  <div className='w-1/2 border-4 border-gray-300 rounded-lg'>Coming Soon...</div>
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              <div>
                <div className='flex'>
                  <div className='flex-1'>
                    <LineGraph name={'Vibration-Time'} />
                  </div>
                  <div className='flex-1'>
                    <LineGraph name={'Acceleration-time'} />
                  </div>
                </div>
                <div className=''>
                  <AreaGraph />
                </div>
                <div className='flex gap-3'>
                  <div className='w-1/2'>
                    <TableComponent tableData={tableData} />
                  </div>
                  <div className='w-1/2 border-4 border-gray-300 rounded-lg'>Coming Soon...</div>
                </div>
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </section>
    </div>
  );
}

export default Diagnosis;
