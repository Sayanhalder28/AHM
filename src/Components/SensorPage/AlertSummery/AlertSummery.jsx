import React from 'react';
import AlertICO from '../../../assets/alert.png';
import { InformationCircleIcon } from '@heroicons/react/20/solid';

function AlertSummery() {
  return (
    <div className='flex flex-col h-72 w-full text-center rounded-lg shadow-lg bg-slate-400'>
      {/* heading secton with pop up  */}
      <div className='flex justify-center items-center text-white text-base 2xl:text-lg font-bold tracking-wider bg-sky-600 rounded-t-md relative'>
        ALERT SUMMERY
        <InformationCircleIcon className='peer h-5 text-white opacity-50 right-0 top-0 ml-2 m-1  shadow-inner hover:opacity-100' />
        {/* pop up massamge  */}
        <div className='bg-sky-900 text-white rounded-md px-14 py-1 mx-auto shadow-md w-max absolute inset-x-0 -top-9 hidden peer-hover:block '>
          <p className='font-medium'>Last 24 hours alerts</p>
        </div>
      </div>
      {/* alert summery box */}
      <div className=' w-full h-full flex flex-col gap-3 items-center p-7 justify-start border-x-2 border-b-2 border-slate-500 rounded-b-md overflow-y-auto'>
        {/* alert 1  */}
        <div className='w-full flex items-center p-2 px-5 bg-white shadow-inner rounded-lg h-max content-center'>
          <img src={AlertICO} alt='alert sign' className='h-12'></img>
          <div className=' w-full flex justify-between gap-2 ml-2'>
            <p className='text-sm sm:text-base font-bold text-gray-800 text-left'>
              Unhealthy Vibration Detected
            </p>
            <p className='text-xs font-medium text-gray-600'>2 days ago</p>
          </div>
        </div>
        {/* alert 2  */}
        <div className='w-full flex items-center p-2 px-5 bg-white shadow-inner rounded-lg h-max content-center'>
          <img src={AlertICO} alt='alert sign' className='h-12'></img>
          <div className=' w-full flex justify-between gap-2 ml-2'>
            <p className='text-sm sm:text-base font-bold text-gray-800 text-left'>
              Unhealthy Magnetic Flux Detected
            </p>
            <p className='text-xs font-medium text-gray-600'>2 days ago</p>
          </div>
        </div>
        {/* alert 1  */}
        <div className='w-full flex items-center p-2 px-5 bg-white shadow-inner rounded-lg h-max content-center'>
          <img src={AlertICO} alt='alert sign' className='h-12'></img>
          <div className=' w-full flex justify-between gap-2 ml-2'>
            <p className='text-sm sm:text-base font-bold text-gray-800 text-left'>
              Unhealthy Vibration Detected
            </p>
            <p className='text-xs font-medium text-gray-600'>2 days ago</p>
          </div>
        </div>
        {/* alert 2  */}
        <div className='w-full flex items-center p-2 px-5 bg-white shadow-inner rounded-lg h-max content-center'>
          <img src={AlertICO} alt='alert sign' className='h-12'></img>
          <div className=' w-full flex justify-between gap-2 ml-2'>
            <p className='text-sm sm:text-base font-bold text-gray-800 text-left'>
              Unhealthy Vibration Detected
            </p>
            <p className='text-xs font-medium text-gray-600'>2 days ago</p>
          </div>
        </div>
        {/* alert 1  */}
        <div className='w-full flex items-center p-2 px-5 bg-white shadow-inner rounded-lg h-max content-center'>
          <img src={AlertICO} alt='alert sign' className='h-12'></img>
          <div className=' w-full flex justify-between gap-2 ml-2'>
            <p className='text-sm sm:text-base font-bold text-gray-800 text-left'>
              Unhealthy Vibration Detected
            </p>
            <p className='text-xs font-medium text-gray-600'>2 days ago</p>
          </div>
        </div>
        {/* alert 2  */}
        <div className='w-full flex items-center p-2 px-5 bg-white shadow-inner rounded-lg h-max content-center'>
          <img src={AlertICO} alt='alert sign' className='h-12'></img>
          <div className=' w-full flex justify-between gap-2 ml-2'>
            <p className='text-sm sm:text-base font-bold text-gray-800 text-left'>
              Unhealthy Vibration Detected
            </p>
            <p className='text-xs font-medium text-gray-600'>2 days ago</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlertSummery;
