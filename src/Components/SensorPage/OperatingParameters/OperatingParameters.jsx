import React from 'react';

function OperatingParameters() {
  return (
    <div className='flex flex-col h-full w-full text-center rounded-lg shadow-lg bg-slate-200'>
      {/* heading secton with pop up  */}
      <div className='flex justify-center items-center text-white text-base 2xl:text-lg font-bold tracking-wider bg-blue-600 rounded-t-md relative'>
        OPERATING PARAMETERS
      </div>
      {/* parameter box */}
      <div className='grid grid-cols-2 gap-3 items-center p-4 justify-center w-full h-full border-x-2 border-b-2 border-slate-300 rounded-b-md'>
        <div className='bg-white shadow-inner rounded-xl p-2'>
          <p className='text-blue-800 text-lg font-bold tracking-wider'>Vibration</p>
          <p className='text-gray-800 text-base font-semibold tracking-wider'>1.2 mm/s</p>
        </div>
        <div className='bg-white shadow-inner rounded-xl p-2'>
          <p className='text-blue-800 text-lg font-bold tracking-wider'>RPM</p>
          <p className='text-gray-800 text-base font-semibold tracking-wider'>1750</p>
        </div>
        <div className='bg-white shadow-inner rounded-xl p-2'>
          <p className='text-blue-800 text-lg font-bold tracking-wider'>Line Freq.</p>
          <p className='text-gray-800 text-base font-semibold tracking-wider'>55</p>
        </div>
        <div className='bg-white shadow-inner rounded-xl p-2'>
          <p className='text-blue-800 text-lg font-bold tracking-wider'>Current</p>
          <p className='text-gray-800 text-base font-semibold tracking-wider'>10 A</p>
        </div>
        <div className='bg-white shadow-inner rounded-xl p-2'>
          <p className='text-blue-800 text-lg font-bold tracking-wider'>Power</p>
          <p className='text-gray-800 text-base font-semibold tracking-wider'>4300 kw</p>
        </div>
        <div className='bg-white shadow-inner rounded-xl p-2'>
          <p className='text-blue-800 text-lg font-bold tracking-wider'>Voltage</p>
          <p className='text-gray-800 text-base font-semibold tracking-wider'>430v</p>
        </div>
      </div>
    </div>
  );
}

export default OperatingParameters;
