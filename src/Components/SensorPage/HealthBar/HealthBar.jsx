/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API_URL from '../../../config';

function HealthBar() {
  const { assetId, sensorType } = useParams();

  const [healthStatus, setHealthStatus] = useState([
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ]);

  useEffect(() => {
    fetch(
      `${API_URL}/data/sensor/sesor-health-timeline?assetId=${assetId}&sensorType=${sensorType}`,
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.data.health_status.length > 0) {
          const formatData = data?.data?.health_status?.flatMap((status) => {
            return [status.first_half, status.second_half];
          });
          setHealthStatus(formatData);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let flag = true;
  let time1 = 0;
  let time2 = 0;

  return (
    <div className='w-full h-8 flex flex-nowrap border-y border-l border-gray-200 rounded-md'>
      {healthStatus.map((status, index) => {
        const BackGroundColor =
          status === 'healthy'
            ? 'bg-lime-500'
            : status === 'warning'
            ? 'bg-yellow-500'
            : status === 'unhealthy'
            ? 'bg-red-600'
            : 'bg-slate-400';

        const massageBoxColour =
          status === 'healthy'
            ? 'bg-teal-100'
            : status === 'warning'
            ? 'bg-yellow-200'
            : status === 'unhealthy'
            ? 'bg-red-200'
            : 'bg-slate-100';

        const massageBoxBorderColour =
          status === 'healthy'
            ? 'border-teal-500'
            : status === 'warning'
            ? 'border-orange-500'
            : status === 'unhealthy'
            ? 'border-red-500'
            : 'border-slate-500';

        const massageBoxTextColour =
          status === 'healthy'
            ? 'text-teal-950'
            : status === 'warning'
            ? 'text-orange-950'
            : status === 'unhealthy'
            ? 'text-red-950'
            : 'text-slate-950';

        const massage =
          status === 'healthy'
            ? 'All Good'
            : status === 'warning'
            ? 'Warning'
            : status === 'unhealthy'
            ? 'Alert'
            : '';

        const startTime = flag
          ? (() => {
              flag = false;
              return time1++;
            })()
          : (() => {
              flag = true;
              return time2++;
            })();

        const endTime = flag ? startTime + 1 : startTime;
        const startMin = flag ? '30' : '00';
        const endtMin = flag ? '00' : '30';

        return (
          <span
            key={index}
            className={`${BackGroundColor} w-full relative border-gray-200 border-r rounded-sm hover:rounded-md hover:border-2 cursor-pointer`}
          >
            <div className={`w-full h-full peer`}></div>
            <span
              className={`${massageBoxColour} ${massageBoxBorderColour} ${massageBoxTextColour} border-t-4 border-b-2 shadow-md rounded-lg p-1 absolute hidden peer-hover:block bottom-8 -left-16 pointer-events-none whitespace-pre`}
            >
              <div className='text-sm'>
                {startTime}:{startMin}-{endTime % 24}:{endtMin}
              </div>
              <div className='text-xs'>{massage}</div>
            </span>
          </span>
        );
      })}
    </div>
  );
}

export default HealthBar;
