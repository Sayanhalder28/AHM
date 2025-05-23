/* eslint-disable react/prop-types */
import React from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import hertz from '../../assets/hertz.png';

function TableComponent({ tableData }) {
  return (
    <div className='flex flex-col h-[350px] w-full text-center rounded-lg shadow-lg bg-slate-400'>
      <div className='flex justify-center items-center text-white text-base 2xl:text-lg font-bold tracking-wider bg-sky-600 rounded-t-md relative'>
        PREDOMINANT FREQUENCY
        <InformationCircleIcon className='peer h-5 text-white opacity-50 right-0 top-0 ml-2 m-1  shadow-inner hover:opacity-100' />
        <div className='bg-sky-900 text-white rounded-md px-14 py-1 mx-auto shadow-md w-max absolute inset-x-0 -top-9 hidden peer-hover:block '>
          <p className='font-medium'>Last Recorded Frequencies</p>
        </div>
      </div>
      <div className='w-full h-full flex flex-col gap-3 items-center p-7 justify-start border-x-2 border-b-2 border-slate-500 rounded-b-md overflow-y-auto'>
        {tableData?.map((data, index) => (
          <div
            key={index}
            className='w-full flex items-center p-2 px-5 bg-white shadow-inner rounded-lg h-max content-center'
          >
            <img src={hertz} alt='alert sign' className='h-12'></img>
            <div className='flex gap-16'>
              <p className='text-gray-500 text-md font-semibold'>
                Frequency{' '}
                <span
                  className='
                text-gray-900 text-xl font-bold
                '
                >
                  {data.frequency}
                </span>
              </p>
              <p className='text-gray-500 text-md font-semibold'>
                Radial{' '}
                <span
                  className='
                text-gray-900 text-xl font-bold
                '
                >
                  {data.radial}
                </span>
              </p>
              <p className='text-gray-500 text-md font-semibold'>
                Tangential{' '}
                <span
                  className='
                text-gray-900 text-xl font-bold
                '
                >
                  {data.tangential}
                </span>
              </p>
              <p className='text-gray-500 text-md font-semibold'>
                Axial{' '}
                <span
                  className='
                text-gray-900 text-xl font-bold
                '
                >
                  {data.axial}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TableComponent;
