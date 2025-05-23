/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
function clientCards({ nameID, location, image, TWclass, workshopCode }) {
  return (
    <Link to={`/client/${workshopCode}/assets`}>
      <div className='w-full shadow-md h-21 hover:shadow-2xl rounded flex flex-col bg-white '>
        <div className={TWclass + ' h-24 w-full min-height-40 rounded-t flex items-center'}>
          <div className='w-2/5'> </div>
          <div className='w-3/5 text-white text-xl lg:text-xl sm:text-md font-bold text-left px-2'>
            {nameID}
          </div>
        </div>

        <div className='flex flex-row  items-center h-28 w-full xl:h-28 xl:w-full -mt-16 justify-around '>
          <div className='w-2/5 flex ml-2'>
            <img
              src={image}
              className='w-24 h-24 m-auto xl:h-24 xl:w-24 border-4 border-gray-100 shadow-md rounded-full object-cover justify-start pl-0'
              alt='factory section'
            ></img>
          </div>
          <div className='w-3/5 h-28 text-left flex flex-col justify-end '>
            <div className='text-gray-700 text-sm font-semibold text-left whitespace-pre px-2 pb-4'>
              {location}
            </div>
          </div>
        </div>

        <div className='flex flex-col pb-7'>
          <div className='flex flex-row justify-evenly mt-6 '>
            {/* active box  */}
            <div className='shadow-sm flex flex-col relative items-center'>
              <div className='peer pt-1 w-16 h-full bg-green-100 text-center flex flex-col hover:bg-green-200 rounded-md shadow-sm'>
                <span className='text-gray-700 text-xs font-semibold'>Active</span>
                <div>
                  <span className='text-green-700 text-lg font-bold'>14</span>
                  <span className='text-green-700 text-md font-semibold'>+1</span>
                </div>
              </div>

              {/* pop up massage here */}
              <div className='bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md w-52 rounded-sm absolute bottom-16 opacity-0 -z-10 peer-hover:opacity-100 peer-hover:z-10'>
                <p className='font-bold'>Active devices</p>
                <p className='text-sm'>Total number of devices that are connected to the server</p>
              </div>
            </div>
            {/* offline box  */}
            <div className='shadow-sm flex flex-col relative items-center'>
              <div className='peer pt-1 w-16 h-full bg-gray-100 text-center flex flex-col hover:bg-gray-200  rounded-md shadow-sm'>
                <span className='text-gray-700 text-xs font-semibold'>Offline</span>
                <span className='text-gray-700 text-lg font-bold'>3</span>
              </div>

              {/* pop up massage here */}
              <div className='bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md w-52 rounded-sm absolute bottom-16 opacity-0 -z-10 peer-hover:opacity-100 peer-hover:z-10'>
                <p className='font-bold'>Offline devices</p>
                <p className='text-sm'>
                  Total number of devices that are not connected to the server
                </p>
              </div>
            </div>
            {/* healthy box  */}
            <div className='shadow-sm flex flex-col relative items-center'>
              <div className='peer pt-1 w-16 h-full bg-yellow-100 text-center flex flex-col hover:bg-yellow-200  rounded-md shadow-sm'>
                <span className='text-gray-700 text-xs font-semibold'>Healthy</span>
                <span className='text-yellow-700 text-lg font-bold'>11</span>
              </div>

              {/* pop up massage here */}
              <div className='bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md w-52 rounded-sm absolute bottom-16 right-0 opacity-0 -z-10 peer-hover:opacity-100 peer-hover:z-10'>
                <p className='font-bold'>Healthy devices</p>
                <p className='text-sm'>
                  Active devices that are sending accurate sensor data to the server
                </p>
              </div>
            </div>
          </div>

          <div className='flex flex-row justify-evenly mt-6'>
            {/* defected box */}
            <div className='shadow-sm flex flex-col relative items-center'>
              <div className='peer pt-1 w-16 h-full bg-red-100 text-center flex flex-col hover:bg-red-200  rounded-md shadow-sm'>
                <span className='text-gray-700 text-xs font-semibold'>Defected</span>
                <span className='text-red-700 text-lg font-bold'>3</span>
              </div>

              {/* pop up massage here */}
              <div className='bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md w-52 rounded-sm absolute bottom-16 opacity-0 -z-10 peer-hover:opacity-100 peer-hover:z-10'>
                <p className='font-bold'>Defected devices</p>
                <p className='text-sm'>
                  Active devices that are not sending sensor data to the console
                </p>
              </div>
            </div>
            {/* Total box */}
            <div className='shadow-sm flex flex-col relative items-center'>
              <div className='peer pt-1 w-16 h-full bg-blue-100 text-center flex flex-col hover:bg-blue-200  rounded-md shadow-dm'>
                <span className='text-gray-700 text-xs font-semibold'>Total</span>
                <span className='text-blue-700 text-lg font-bold'>17</span>
              </div>

              {/* pop up massage here */}
              <div className='bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md w-52 rounded-sm absolute bottom-16 right-0 opacity-0 -z-10 peer-hover:opacity-100 peer-hover:z-10'>
                <p className='font-bold'>Total devices</p>
                <p className='text-sm'>All registered devices in that section</p>
              </div>
            </div>
            {/* Total box */}
            <div className='shadow-sm flex flex-col relative items-center'>
              <div className='peer pt-1 w-16 h-full bg-blue-100 text-center flex flex-col hover:bg-blue-200  rounded-md shadow-dm'>
                <span className='text-gray-700 text-xs font-semibold'>Total</span>
                <span className='text-blue-700 text-lg font-bold'>17</span>
              </div>

              {/* pop up massage here */}
              <div className='bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md w-52 rounded-sm absolute bottom-16 right-0 opacity-0 -z-10 peer-hover:opacity-100 peer-hover:z-10'>
                <p className='font-bold'>Total devices </p>
                <p className='text-sm'>All registered devices in that section</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default clientCards;
