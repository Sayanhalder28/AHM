import React, { useEffect, useLayoutEffect, useState } from 'react';

import { InformationCircleIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import ReactCardFlip from 'react-card-flip';
import motor from '../.././assets/motor-nobg.png';
import Sensor from './Sensor/Sensor';
import PropTypes from 'prop-types';
import API_URL from '../../config';
import SingleGear from './SingleGear';

function AssetCard({ assetID, sensorsConnected, sensorIDs, assetType, site, workshop }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [healthData, setHealthdData] = useState([]);
  const [sensorStatus, setSensorStatus] = useState([]);
  const [healthColour, setHealthColour] = useState('gray');
  const [assetStatus, setAssetStatus] = useState('-');

  const navigate = useNavigate();

  const fetchUrls = sensorsConnected.map(
    (sensor) =>
      `${API_URL}/data/sensor/sesor-health?assetId=${assetID}&sensorType=${sensor.sensor_type}`,
  );

  useEffect(() => {
    const fetchData = async () => {
      console.log('Asset details fetch innitiated');
      const fetchPromises = fetchUrls.map(async (url) => {
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Request failed');
          }
          // console.log('Response', response);
          return await response.json();
        } catch (error) {
          console.error('Error fetching data from', url, ':', error);
          return null;
        }
      });

      const resolvedPromises = await Promise.all(fetchPromises);
      setHealthdData(resolvedPromises);
    };
    fetchData();
    const intervalId = setInterval(fetchData, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useLayoutEffect(() => {
    const sensorStatusColour = (healthStatus) => {
      if (healthStatus === 'healthy') return 'green';
      else if (healthStatus === 'unhealthy') return 'red';
      else if (healthStatus === 'warning') return 'orange';
      else return 'gray';
    };

    const sensorOverAllStatus = (statusArr) => {
      return statusArr.some((item) => item.deviceStatusColour === 'red')
        ? 'red'
        : statusArr.some((item) => item.deviceStatusColour === 'orange')
        ? 'orange'
        : statusArr.some((item) => item.deviceStatusColour === 'green')
        ? 'green'
        : 'gray';
    };

    const assetActiveStatus = (statusArr) => {
      return statusArr.some((item) => item.assetOnlineStatus === 'active')
        ? 'active'
        : statusArr.some((item) => item.assetOnlineStatus === 'inactive')
        ? 'inactive'
        : '-';
    };

    if (healthData.length) {
      const sensorStatus = healthData.map((sensor) => {
        return {
          deviceOnlineStatus: sensor.data.device_status,
          deviceStatusColour: sensorStatusColour(sensor.data.health_status),
          assetOnlineStatus: sensor.data.asset_status,
        };
      });
      setSensorStatus(sensorStatus);
      setHealthColour(sensorOverAllStatus(sensorStatus));
      setAssetStatus(assetActiveStatus(sensorStatus));
    }
  }, [healthData]);

  const handleSensorOne = () => {
    navigate(
      `/client/${workshop}/asset/${assetID}/${sensorsConnected[0].sensor_id}/${sensorsConnected[0].sensor_type}`,
    );
  };

  const handleSensorTwo = () => {
    navigate(
      `/client/${workshop}/asset/${assetID}/${sensorsConnected[1].sensor_id}/${sensorsConnected[1].sensor_type}`,
    );
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <>
      <style>
        {`.green{
            background-color: #84CC16; 
          }
          .gray{
            background-color: #6B7280; 
          }
          .red{
            background-color: #EF4444; 
          }
          .orange{
            background-color: #F59E0B; 
          }
          `}
      </style>
      <ReactCardFlip flipDirection='horizontal' isFlipped={isFlipped}>
        <div className='relative rounded-md overflow-hidden shadow-lg hover:shadow-xl xl:w-auto'>
          <div
            className={`w-max px-4 text-center rounded-tr-md text-white text-sm font-semibold overflow-hidden ${healthColour}`}
          >
            {assetID}
          </div>

          <div className='h-48 px-2 pb-2 flex flex-col items-center rounded-tr-lg rounded-b-lg bg-slate-200 border-2 border-slate-300'>
            {/* gears section */}
            <SingleGear running={assetStatus === 'active'} />
            {/* image section */}
            <div className='flex w-max h-full '>
              <div className='relative w-max h-full flex'>
                <div className='relative w-max h-full flex'>
                  <div onClick={handleSensorOne}>
                    <Sensor
                      className='absolute left-7 top-10'
                      colour={sensorStatus[0]?.deviceStatusColour}
                    />
                  </div>
                  <img src={motor} alt='' className='h-full' />
                  <div onClick={handleSensorTwo}>
                    {/* {sensorStatus[1]} */}
                    <Sensor
                      className='absolute right-7 top-10'
                      colour={sensorStatus[1]?.deviceStatusColour}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* online status section section */}
            <div className='flex gap-1 sm:gap-1 h-max w-full items-center justify-around p-1 sm:p-2 bg-slate-300 rounded-xl shadow-inner'>
              <div
                className={`w-1/3 h-full rounded-xl text-center shadow-inner overflow-hidden ${sensorStatus[0]?.deviceStatusColour} flex flex-col items-center`}
              >
                <p className='text-[11px] font-bold text-slate-700 bg-white rounded-xl pt-2 -mt-2.5 w-16'>
                  DE
                </p>
                <div className={`text-white font-semibold text-sm uppercase`}>
                  {sensorStatus[0]?.deviceOnlineStatus == 'unknown'
                    ? '-'
                    : sensorStatus[0]?.deviceOnlineStatus}
                </div>
              </div>
              <div
                className={`w-1/3 h-full rounded-xl text-center shadow-inner overflow-hidden ${sensorStatus[1]?.deviceStatusColour} flex flex-col items-center`}
              >
                <p className='text-[11px] font-bold text-slate-700 bg-white rounded-xl pt-2 -mt-2.5 w-16'>
                  NDE
                </p>
                <div className={`text-white font-semibold text-sm uppercase`}>
                  {sensorStatus[1]?.deviceOnlineStatus == 'unknown'
                    ? '-'
                    : sensorStatus[1]?.deviceOnlineStatus}
                </div>
              </div>
              <div
                className={`w-1/3 h-full rounded-xl text-center shadow-inner overflow-hidden flex flex-col items-center bg-gray-100 border border-slate-600`}
              >
                <p className='text-[11px] font-bold text-white bg-slate-700 rounded-xl pt-2 -mt-2.5 w-16'>
                  ASSET
                </p>
                <div
                  className={`${
                    assetStatus == 'active'
                      ? 'text-green-600'
                      : assetStatus == 'inactive'
                      ? 'text-red-600'
                      : 'text-gray-600'
                  } font-semibold text-sm uppercase`}
                >
                  {assetStatus}
                </div>
              </div>
            </div>
          </div>

          <InformationCircleIcon
            className='h-6 absolute text-slate-500 opacity-30 right-0 top-5 m-1 shadow-inner hover:opacity-100'
            onClick={flipCard}
          />
        </div>

        {/* Back of the card */}

        <div
          className={
            'h-full relative bg-white border-2 border-' +
            healthColour +
            '-500 rounded-2xl overflow-hidden justify content-between first-letter:shadow-sm hover:shadow-lg'
          }
          onClick={flipCard}
        >
          {/* assetID number heading */}
          <div
            className={
              'bg-' + healthColour + '-100 w-max px-3 rounded-br-2xl text-grey-300 font-semibold '
            }
          >
            {assetID}
          </div>
          {/* contents on the back */}
          <div className={'flex flex-col pb-3 w-full px-5'}>
            {/* sensor ids */}
            <div className='flex flex-col gap-2 py-4 '>
              {/* sensor 1*/}
              <div className='flex gap-x-3 justify-between'>
                <p className='text-xs font-bold whitespace-pre'>SENSOR ID (1): </p>
                <p className={'text-sm font-bold text-' + healthColour + '-700'}>
                  {
                    // healthData[0]?.data.asset_id
                    sensorIDs[0]
                  }
                </p>
              </div>
              {/* sensor 2*/}
              <div className='flex gap-x-3 justify-between'>
                <p className='text-xs font-bold whitespace-pre'>SENSOR ID (2): </p>
                <p className={'text-sm font-bold text-' + healthColour + '-700'}>
                  {
                    // healthData[1]?.data.asset_id
                    sensorIDs[1]
                  }
                </p>
              </div>
            </div>
            {/* asset ttype */}
            <div className='flex justify-between pt-1 pb-0 border-t border-slate-400'>
              {/*first box asset */}
              <div className='flex flex-col'>
                <p className='text-xs'>ASSET TYPE</p>
                <p className='font-bold text-gray-800'>
                  {
                    // healthData[0]?.data.asset_type
                    assetType
                  }
                </p>
              </div>
              {/* second box asset */}
              <div className='flex flex-col text-right'>
                <p className='text-xs'>STATUS</p>
                <p className='font-bold text-gray-800'>
                  {
                    // healthData[0]?.data.health_status
                    sensorStatus[0] === 'green' && sensorStatus[1] === 'green'
                      ? 'Healthy'
                      : sensorStatus[0] === 'red' && sensorStatus[1] === 'red'
                      ? 'Unhealthy'
                      : 'Warning'
                  }
                </p>
              </div>
            </div>
            {/* location boxes */}
            <div className='flex justify-between pt-1 border-t border-slate-400'>
              {/*first box location */}
              <div className='flex flex-col'>
                <p className='text-xs'>CLIENT</p>
                <p className='font-bold text-gray-800'>
                  {
                    // healthData[0]?.data.client
                    workshop
                  }
                </p>
              </div>
              {/* second box location */}
              <div className='flex flex-col text-right'>
                <p className='text-xs'>SITE</p>
                <p className='font-bold text-gray-800'>
                  {
                    // healthData[0]?.data.site
                    site
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </ReactCardFlip>
    </>
  );
}

AssetCard.propTypes = {
  assetID: PropTypes.string.isRequired,
  sensorsConnected: PropTypes.array.isRequired,
  sensorIDs: PropTypes.array.isRequired,
  assetType: PropTypes.string.isRequired,
  site: PropTypes.string.isRequired,
  workshop: PropTypes.string.isRequired,
};

export default AssetCard;
