/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import Gears from './Gears';
import Modal from '../../../Utils/Modal';

const MachineStatus = ({ AnalogData, dataFetchClock }) => {
  const [running, setRunning] = React.useState(null);
  const [formattedTimeStamp, setFormattedTimeStamp] = React.useState({
    time: '',
    day: '',
    month: '',
    year: '',
  });

  useEffect(() => {
    AnalogData.time_stamp
      ? (async () => {
          const lastReadingDate = new Date(AnalogData.time_stamp);
          const currentDate = new Date();

          // Format the time stamp
          const Time = lastReadingDate.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
          });
          const Month = lastReadingDate.toLocaleString('en-US', { month: 'short' });
          const Day = lastReadingDate.toLocaleString('en-US', { day: 'numeric' });
          const Year = lastReadingDate.toLocaleString('en-US', { year: 'numeric' });
          // Update the state with the formatted date and time
          setFormattedTimeStamp({
            time: Time,
            day: Day,
            month: Month,
            year: Year,
          });

          // Update the running state
          if (currentDate - lastReadingDate < 300000 && AnalogData.vibration_x > 0) {
            setRunning(true);
          } else {
            setRunning(false);
          }
        })()
      : setFormattedTimeStamp({
          time: 'No Record',
          day: '',
          month: '',
          year: '',
        });
  }, [dataFetchClock]);

  return (
    <div className='flex flex-col h-full w-full text-center rounded-lg shadow-lg bg-slate-300'>
      {/* heading secton with pop up  */}
      <div className='flex justify-center items-center text-white text-base 2xl:text-lg font-bold tracking-wider bg-green-600 rounded-t-md relative'>
        MACHINE STATUS
      </div>
      <div className='flex flex-col gap-3 items-center p-4 w-full h-full border-x-2 border-b-2 border-slate-300 rounded-b-md'>
        <div className='flex w-full gap-3'>
          <div className='flex flex-col w-1/2 bg-white shadow-inner rounded-xl px-2 pb-2 h-20'>
            <p className='text-blue-800 text-sm font-bold tracking-wider text-start '>Health</p>
            <p
              className={`${
                AnalogData.health === 'healthy'
                  ? 'bg-green-500'
                  : AnalogData.health === 'warning'
                  ? 'bg-amber-500'
                  : AnalogData.health === 'unhealthy'
                  ? 'bg-red-500'
                  : 'bg-gray-500'
              } text-sm font-bold tracking-wider px-1 rounded-lg flex-1 flex items-center justify-center text-white`}
            >
              {AnalogData.health === 'healthy'
                ? 'HEALTHY'
                : AnalogData.health === 'warning'
                ? 'WARNING'
                : AnalogData.health === 'unhealthy'
                ? 'UNHEALTHY'
                : 'NO RECORD'}
            </p>
          </div>
          <div className='flex flex-col w-1/2 bg-white shadow-inner rounded-xl px-2 pb-2 h-20'>
            <p className='text-blue-800 text-sm font-bold tracking-wider text-start '>Last Read</p>
            <div
              className={`bg-slate-200 text-xs sm:text-base font-bold tracking-wider px-1 rounded-lg flex flex-col 2xl:flex-row h-full justify-center 2xl:justify-evenly items-center text-slate-800`}
            >
              <div className='text-base 2xl:text-xl'>{formattedTimeStamp.time}</div>
              <div className='flex 2xl:flex-col gap-1 text-xs 2xl:text-sm justify-center'>
                <p>
                  {formattedTimeStamp.day} {formattedTimeStamp.month}
                </p>
                <p>{formattedTimeStamp.year}</p>
              </div>
            </div>
          </div>
        </div>

        <div className='flex justify-between items-center gap-3 w-full h-full'>
          <div
            className='flex flex-col gap-3 bg-slate-100 w-1/2 h-full min-h-[138px] items-center justify-between shadow-inner rounded-xl'
            style={{ minWidth: '7rem' }}
          >
            <div className='mt-7'>
              <Gears running={running} />
            </div>

            <p className={`${running ? 'text-lime-500' : 'text-red-500'} font-bold mb-1`}>
              {running == null ? 'NO RECORD' : running ? 'RUNNING' : 'INACTIVE'}
            </p>
          </div>
          <div className='flex flex-col gap-1 justify-around items-center w-1/2 h-full bg-gray-200 shadow-inner rounded-xl p-2'>
            <p className='w-full text-sm text-center text-blue-900 font-bold truncate'>
              Service Status
            </p>
            <div className='-mt-2'>
              <p className='w-full text-center text-green-500 font-bold text-lg'>All OK</p>
              <p className='w-full text-center text-gray-600 font-bold text-xs'>
                Last service: <span className='text-gray-800 font-bold text-xs'>12/12/2023</span>
              </p>
            </div>

            <Modal>
              <button
                className='w-min h-8 px-3 bg-blue-500 text-white font-bold rounded-2xl shadow-md hover:bg-blue-600'
                id='ButtonIcon'
              >
                Update
              </button>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MachineStatus;
