import React from 'react';

function ActivityInsights() {
  return (
    <div className='flex flex-col h-full w-full text-center rounded-lg shadow-lg bg-slate-200'>
      {/* heading secton with pop up  */}
      <div className='flex justify-center items-center text-white text-base 2xl:text-lg font-bold tracking-wider bg-orange-600 rounded-t-md relative'>
        ACTIVITY INSIGHTS
      </div>
      {/* parameter box */}
      <div className='flex flex-col gap-3 items-center p-4 justify-center w-full h-full border-x-2 border-b-2 border-slate-300 rounded-b-md'>
        <div className='w-full h-3/5 flex flex-col'>
          <p className='text-white text-sm bg-blue-700 font-semibold tracking-widest w-max px-4 h-5 rounded-t-lg'>
            Machine
          </p>
          <div className='flex flex-col flex-1 justify-between bg-slate-50 shadow-inner rounded-xl rounded-tl-none w-full overflow-hidden p-3'>
            <p className='flex-1 text-blue-900 font-bold tracking-wider w-full '>
              <span className='text-gray-800'>Total Run Time :</span> 13 Hr 20 Min
            </p>
            <div className='flex flex-1 items-center p-1 bg-slate-200 rounded-xl'>
              <p className='flex-1 text-gray-800 font-bold border-r-2 border-gray-500 p-1'>
                Starts : <span className='text-green-800'>5</span>
              </p>
              <p className='flex-1 text-gray-800 font-bold p-1'>
                Stops : <span className='text-red-800'>5</span>
              </p>
            </div>
          </div>
        </div>

        <div className='w-full h-2/5 flex flex-col'>
          <p className='text-white text-sm bg-blue-700 font-semibold tracking-widest w-max px-4 h-5 rounded-t-lg'>
            Device
          </p>
          <div className='flex-1 bg-slate-50 shadow-inner rounded-xl rounded-tl-none w-full overflow-hidden p-3'>
            <div className='flex items-center p-1 bg-slate-200 rounded-xl h-full rounded-tl-'>
              <p className='flex-1 text-gray-800 font-bold border-r-2 border-gray-500 p-1'>
                Online : <span className='text-green-800'>5</span>
              </p>
              <p className='flex-1 text-gray-800 font-bold p-1'>
                Offline : <span className='text-red-800'>5</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivityInsights;
