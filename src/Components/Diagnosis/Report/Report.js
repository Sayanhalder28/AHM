/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import API_URL from '../../../config.js';
import AccelerationSpectra from './ReportGraphs/AccelerationSpectra';
import AccelerationSpectraAmplitude from './ReportGraphs/AccelerationSpectraAmplitude';
import VelocitySpectraAmplitude from './ReportGraphs/VelocitySpectraAmplitude';
import UltrasonicSpectraGraph from './ReportGraphs/UltrasonicSpectraGraph';
import VibrationAccelerationTrendGraph from './ReportGraphs/VibrationAccelerationTrendGraph';
import VibrationVelocityTrendGraph from './ReportGraphs/VibrationVelocityTrendGraph';
import MagneticFieldSpectraGraph from './ReportGraphs/MagneticFieldSpectraGraph';
import TemperatureTrendGraph from './ReportGraphs/TemperatureTrendGraph';
// import ReportData from './reportData.json';
import AccelerationICO from '../../../assets/info.png';
import { useReactToPrint } from 'react-to-print';

import ReportData from '../../../Utils/ReportData.json';

const Report = () => {
  // const { workshopCode, assetId, sensorId, sensorType } = useParams();

  const [assetDetails, setAssetDetails] = useState({
    asset_id: 'Loading...',
    asset_type: 'Loading...',
    workshop: 'Loading...',
    site: 'Loading...',
    application: 'Loading...',
    manufacturer: 'Loading...',
  });
  const [assetSpecification, setAssetSpecification] = useState({
    frame: 'Loading...',
    deBearingNumber: 'Loading...',
    ndeBearingNumber: 'Loading...',
    ratedRPM: 'Loading...',
    ratedPower: 'Loading...',
    ratedVoltage: 'Loading...',
    lineFrequency: 'Loading...',
    powerFactor: 'Loading...',
    ratedAmbientTemperature: 'Loading...',
  });
  const [sensorsConnected, setSensorsConnected] = useState({
    modelNo: 'Loading...',
    ndeSensorID: 'Loading...',
    deSensorID: 'Loading...',
    sampleRate: 'Loading...',
    ratedSensorTemperature: 'Loading...',
  });
  const [spectralAnalysis, setSpectralAnalysis] = useState({
    modelNo: 'Loading...',
    ndeSensorID: 'Loading...',
    deSensorID: 'Loading...',
    sampleRate: 'Loading...',
    ratedSensorTemperature: 'Loading...',
  });

  // useEffect(() => {
  //   const getAssetDetails = async () => {
  //     const res = await fetch(
  //       `${API_URL}/data/sensor/sensor-data?assetId=${assetId}&sensorType=${sensorType}`,
  //     );
  //     const data = await res.json();
  //     setAssetDetails(data.data);
  //     console.log(data.data);
  //   };
  //   getAssetDetails();
  // }, []);

  useEffect(() => {
    // console.log(ReportData[0].data.assetDetails.assetId);
    setAssetDetails({
      asset_id: ReportData[0].data.assetDetails.assetId,
      asset_type: ReportData[0].data.assetDetails.assetType,
      workshop: ReportData[0].data.assetDetails.workshop,
      site: ReportData[0].data.assetDetails.site,
      application: ReportData[0].data.assetDetails.application,
      manufacturer: ReportData[0].data.assetDetails.manufacturer,
    });
  }, []);
  useEffect(() => {
    // console.log(ReportData[0].data.assetDetails.assetId);
    setAssetSpecification({
      frame: ReportData[0].data.assetSpecification.frame,
      deBearingNumber: ReportData[0].data.assetSpecification.deBearingNumber,
      ndeBearingNumber: ReportData[0].data.assetSpecification.ndeBearingNumber,
      ratedRPM: ReportData[0].data.assetSpecification.ratedRPM,
      ratedPower: ReportData[0].data.assetSpecification.ratedPower,
      ratedVoltage: ReportData[0].data.assetSpecification.ratedVoltage,
      lineFrequency: ReportData[0].data.assetSpecification.lineFrequency,
      powerFactor: ReportData[0].data.assetSpecification.powerFactor,
      ratedAmbientTemperature: ReportData[0].data.assetSpecification.ratedAmbientTemperature,
    });
  }, []);
  useEffect(() => {
    // console.log(ReportData[0].data.assetDetails.assetId);
    setSensorsConnected({
      modelNo: ReportData[0].data.sensorsConnected.modelNo,
      ndeSensorID: ReportData[0].data.sensorsConnected.ndeSensorID,
      deSensorID: ReportData[0].data.sensorsConnected.deSensorID,
      sampleRate: ReportData[0].data.sensorsConnected.sampleRate,
      ratedSensorTemperature: ReportData[0].data.sensorsConnected.ratedSensorTemperature,
    });
  }, []);
  useEffect(() => {
    // console.log(ReportData[0].data.assetDetails.assetId);
    setSpectralAnalysis({
      accelerationSpectraGraph: ReportData[0].data.spectralAnalysis.accelerationSpectraGraph,
      accTangentialv1: ReportData[0].data.spectralAnalysis.accTangentialv1,
      accAxialv1: ReportData[0].data.spectralAnalysis.accAxialv1,
      accRadialv1: ReportData[0].data.spectralAnalysis.accRadialv1,
      velocitySpectraGraph: ReportData[0].data.spectralAnalysis.velocitySpectraGraph,
      velTangentialv1: ReportData[0].data.spectralAnalysis.velTangentialv1,
      velAxialv1: ReportData[0].data.spectralAnalysis.velAxialv1,
      velRadialv1: ReportData[0].data.spectralAnalysis.velRadialv1,
    });
  }, []);

  const {
    Ultrasound,
    XMagneticFlux,
    YMagneticFlux,
    ZMagneticFlux,
    XVibration,
    YVibration,
    ZVibration,
  } = assetDetails;

  console.log(XVibration);

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // time and date
  const today = new Date();
  const date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
  const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  return (
    <div className='px-4 md:px-10 pt-3'>
      <div className='flex flex-nowrap justify-between items-center'>
        <div>
          <p className='text-gray-800 text-2xl font-bold'> Diagnosis Report </p>
          <p className='text-gray-600 text-base font-semibold'>{window.location.pathname}</p>
        </div>
        <div className='flex gap-3'>
          <button
            onClick={handlePrint}
            className='rounded-md bg-green-700 px-7 w-min text-lg text-white hover:text-black font-semibold'
          >
            Print
          </button>
        </div>
      </div>
      <div className='border-2 mt-5'>
        <div className='justify-items-center mx-4' ref={componentRef}>
          {/* first page */}
          <div>
            <div className='py-7'>
              <h1 className='bg-sky-200 mr-96 px-4 mx-4 font-semibold'>Asset Details:</h1>
              <div className=' w-full mx-auto p-4'>
                <table className='w-full border border-collapse border-gray-300'>
                  <tbody>
                    <tr className='bg-white'>
                      <td className='w-2/3 border border-gray-300 py-2 px-4'>Asset Id</td>
                      <td className='w-1/3 border border-gray-300 py-2 px-4'>
                        {assetDetails.asset_id}
                      </td>
                    </tr>
                    <tr className='bg-gray-100'>
                      <td className='w-2/3 border border-gray-300 py-2 px-4'>Asset Type</td>
                      <td className='w-1/3 border border-gray-300 py-2 px-4 capitalize'>
                        {assetDetails.asset_type}
                      </td>
                    </tr>
                    <tr className='bg-white'>
                      <td className='w-2/3 border border-gray-300 py-2 px-4'>Workshop</td>
                      <td className='w-1/3 border border-gray-300 py-2 px-4 capitalize'>
                        {assetDetails.workshop}
                      </td>
                    </tr>
                    <tr className='bg-white'>
                      <td className='w-2/3 border border-gray-300 py-2 px-4'>Site</td>
                      <td className='w-1/3 border border-gray-300 py-2 px-4 capitalize'>
                        {assetDetails.site}
                      </td>
                    </tr>
                    <tr className='bg-gray-100'>
                      <td className='w-2/3 border border-gray-300 py-2 px-4'>Application</td>
                      <td className='w-1/3 border border-gray-300 py-2 px-4 capitalize'>
                        {assetDetails.application}
                      </td>
                    </tr>
                    <tr className='bg-white'>
                      <td className='w-2/3 border border-gray-300 py-2 px-4'>Manufacturer</td>
                      <td className='w-1/3 border border-gray-300 py-2 px-4 uppercase'>
                        {assetDetails.manufacturer}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <h1 className='bg-sky-200 mr-96 px-4 mx-4 font-semibold'>Asset Specifications:</h1>
              <div className=' w-full mx-auto p-4'>
                <table className='w-full border border-collapse border-gray-300'>
                  <tbody>
                    {/* <tr className='bg-white'>
                    <td className='border border-gray-300 py-2 px-4'>Insulation className</td>
                    <td className='border border-gray-300 py-2 px-4'></td>
                  </tr> */}
                    <tr className='bg-gray-100'>
                      <td className='border border-gray-300 py-2 px-4'>Frame</td>
                      <td className='border border-gray-300 py-2 px-4'>
                        {assetSpecification.frame}
                      </td>
                    </tr>
                    {/* <tr className='bg-white'>
                    <td className='border border-gray-300 py-2 px-4'>Duty</td>
                    <td className='border border-gray-300 py-2 px-4'></td>
                  </tr> */}
                    <tr className='bg-gray-100'>
                      <td className='w-2/3 border border-gray-300 py-2 px-4'>DE Bearing Number</td>
                      <td className='w-1/3 border border-gray-300 py-2 px-4'>
                        {assetSpecification.deBearingNumber}
                      </td>
                    </tr>
                    <tr className='bg-white'>
                      <td className='w-2/3 border border-gray-300 py-2 px-4'>NDE Bearing Number</td>
                      <td className='w-1/3 border border-gray-300 py-2 px-4'>
                        {assetSpecification.ndeBearingNumber}
                      </td>
                    </tr>
                    <tr className='bg-gray-100'>
                      <td className='w-2/3 border border-gray-300 py-2 px-4'>Rated RPM</td>
                      <td className='w-1/3 border border-gray-300 py-2 px-4'>
                        {assetSpecification.ratedRPM}
                      </td>
                    </tr>
                    <tr className='bg-white'>
                      <td className='w-2/3 border border-gray-300 py-2 px-4'>Rated Power</td>
                      <td className='w-1/3 border border-gray-300 py-2 px-4'>
                        {assetSpecification.ratedPower}
                      </td>
                    </tr>
                    <tr className='bg-gray-100'>
                      <td className='w-2/3 border border-gray-300 py-2 px-4'>Rated Voltage</td>
                      <td className='w-1/3 border border-gray-300 py-2 px-4'>
                        {assetSpecification.ratedVoltage}
                      </td>
                    </tr>
                    <tr className='bg-white'>
                      <td className='w-2/3 border border-gray-300 py-2 px-4'>Line Frequency</td>
                      <td className='w-1/3 border border-gray-300 py-2 px-4'>
                        {assetSpecification.lineFrequency}
                      </td>
                    </tr>
                    <tr className='bg-gray-100'>
                      <td className='w-2/3 border border-gray-300 py-2 px-4'>Power Factor</td>
                      <td className='w-1/3 border border-gray-300 py-2 px-4'>
                        {assetSpecification.powerFactor}
                      </td>
                    </tr>
                    <tr className='bg-white'>
                      <td className='w-2/3 border border-gray-300 py-2 px-4'>
                        Rated Ambient Temperature
                      </td>
                      <td className='w-1/3 border border-gray-300 py-2 px-4'>
                        {assetSpecification.ratedAmbientTemperature}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <h1 className='bg-sky-200 mr-96 px-4 mx-2 font-semibold'>Sensors Connected</h1>
              <div className=' w-full mx-auto py-4 px-2'>
                <table className='w-full border border-collapse border-gray-300'>
                  <tbody>
                    <tr className='bg-white'>
                      <td className='w-2/3 border border-gray-300 py-2 px-4'>Model No.</td>
                      <td className='w-1/3 border border-gray-300 py-2 px-4'>
                        {sensorsConnected.modelNo}
                      </td>
                    </tr>
                    <tr className='bg-gray-100'>
                      <td className='w-2/3 border border-gray-300 py-2 px-4'>NDE Sensor Id </td>
                      <td className='w-1/3 border border-gray-300 py-2 px-4'>
                        {sensorsConnected.ndeSensorID}
                      </td>
                    </tr>
                    <tr className='bg-white'>
                      <td className='w-2/3 border border-gray-300 py-2 px-4'>DE Sensor Id</td>
                      <td className='w-1/3 border border-gray-300 py-2 px-4'>
                        {sensorsConnected.deSensorID}
                      </td>
                    </tr>
                    <tr className='bg-gray-100'>
                      <td className='w-2/3 border border-gray-300 py-2 px-4'>Sample Rate</td>
                      <td className='w-1/3 border border-gray-300 py-2 px-4'>
                        {sensorsConnected.sampleRate}
                      </td>
                    </tr>
                    <tr className='bg-gray-100'>
                      <td className='w-2/3 border border-gray-300 py-2 px-4'>
                        {' '}
                        Rated Sensor Temperature
                      </td>
                      <td className='w-1/3 border border-gray-300 py-2 px-4'>
                        {sensorsConnected.ratedSensorTemperature}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <footer className='text-center font-semibold py-4'>1.</footer>
          </div>
          {/* second page */}
          <div>
            <div className='py-4'>
              <div className='flex px-4 font-semibold text-lg bg-sky-200 justify-between'>
                Asset current status
                <i className='font-normal text-base'>Captured at : 12 jan 2023 at 09:30:21 PM</i>
              </div>
              <div className='flex'>
                <div className='flex-1 h-36  border-2 border-current rounded-xl m-2 py-1 px-2 font-semibold'>
                  Operational
                </div>
                <div className='flex-1  border-2 border-current rounded-xl m-2 py-1 px-2 font-semibold'>
                  Overall Health
                </div>
                <div className='flex-1  border-2 border-current rounded-xl m-2 py-1 px-2 font-semibold'>
                  Service Status
                </div>
              </div>
              <h1 className='font-semibold text-lg'>Motor Health Report:</h1>
              <div className='mt-4'>
                <span className='py-1 flex justify-center font-semibold text-xl bg-gray-200 border-x border-t border-slate-950'>
                  <img src={AccelerationICO} alt='' className='h-6 w-6 mr-5' />
                  Temperature
                </span>{' '}
                <table className='table-auto mx-auto w-full'>
                  <thead>
                    <tr className='mx-auto border border-slate-950'>
                      <td
                        colSpan='1'
                        className='w-1/3 px-6 py-2 whitespace-no-wrap border text-center font-semibold text-lg border-slate-950'
                      >
                        Skin
                      </td>
                      <td
                        colSpan='1'
                        className='w-1/3 px-6 py-2 whitespace-no-wrap border text-center font-semibold text-lg border-slate-950'
                      >
                        NDE
                      </td>
                      <td
                        colSpan='1'
                        className='w-1/3 px-6 py-2 whitespace-no-wrap border text-center font-semibold text-lg border-slate-950'
                      >
                        DE
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className='border border-slate-950 px-6 py-2'>20°C</td>
                      <td className='border border-slate-950 px-6 py-2'>20°C</td>
                      <td className='border border-slate-950 px-6 py-2'>20°C</td>
                    </tr>
                    <tr>
                      <td className='border border-slate-950 px-6 py-2'>20°C</td>
                      <td className='border border-slate-950 px-6 py-2'>20°C</td>
                      <td className='border border-slate-950 px-6 py-2'>20°C</td>
                    </tr>
                    <tr>
                      <td className='border border-slate-950 px-6 py-2'>20°C</td>
                      <td className='border border-slate-950 px-6 py-2'>20°C</td>
                      <td className='border border-slate-950 px-6 py-2'>20°C</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className='mt-4'>
                <span className='py-1 flex justify-center font-semibold text-xl bg-gray-200 border-x border-t border-slate-950'>
                  <img src={AccelerationICO} alt='' className='h-6 w-6 mr-5' />
                  Acceleration
                </span>{' '}
                <table className='table-auto mx-auto w-full'>
                  <thead>
                    <tr className='mx-auto border border-slate-950'>
                      <td
                        colSpan='1'
                        className='w-1/3 px-6 py-2 whitespace-no-wrap border text-center font-semibold text-lg border-slate-950'
                      >
                        Directions
                      </td>
                      <td
                        colSpan='1'
                        className='w-1/3 px-6 py-2 whitespace-no-wrap border text-center font-semibold text-lg border-slate-950'
                      >
                        NDE
                      </td>
                      <td
                        colSpan='1'
                        className='w-1/3 px-6 py-2 whitespace-no-wrap border text-center font-semibold text-lg border-slate-950'
                      >
                        DE
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className='border border-slate-950 px-6 py-2'>Tangential</td>
                      <td className='border border-slate-950 px-6 py-2'>2.36 m/sec2</td>
                      <td className='border border-slate-950 px-6 py-2'>2.36 m/sec2</td>
                    </tr>
                    <tr>
                      <td className='border border-slate-950 px-6 py-2'>Axial</td>
                      <td className='border border-slate-950 px-6 py-2'>3.54 m/sec2</td>
                      <td className='border border-slate-950 px-6 py-2'>2.36 m/sec2</td>
                    </tr>
                    <tr>
                      <td className='border border-slate-950 px-6 py-2'>Radial</td>
                      <td className='border border-slate-950 px-6 py-2'>6.28 m/sec2</td>
                      <td className='border border-slate-950 px-6 py-2'>2.36 m/sec2</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className='mt-4'>
                <span className='py-1 flex justify-center font-semibold text-xl bg-gray-200 border-x border-t border-slate-950'>
                  <img src={AccelerationICO} alt='' className='h-6 w-6 mr-5' />
                  Magnetic Field
                </span>{' '}
                <table className='table-auto mx-auto w-full'>
                  <thead>
                    <tr className='mx-auto border border-slate-950'>
                      <td
                        colSpan='1'
                        className='w-1/3 px-6 py-2 whitespace-no-wrap border text-center font-semibold text-lg border-slate-950'
                      >
                        Directions
                      </td>
                      <td
                        colSpan='1'
                        className='w-1/3 px-6 py-2 whitespace-no-wrap border text-center font-semibold text-lg border-slate-950'
                      >
                        NDE
                      </td>
                      <td
                        colSpan='1'
                        className='w-1/3 px-6 py-2 whitespace-no-wrap border text-center font-semibold text-lg border-slate-950'
                      >
                        DE
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className='border border-slate-950 px-6 py-2'>Tangential</td>
                      <td className='border border-slate-950 px-6 py-2'>2.36 m/sec2</td>
                      <td className='border border-slate-950 px-6 py-2'>2.36 m/sec2</td>
                    </tr>
                    <tr>
                      <td className='border border-slate-950 px-6 py-2'>Axial</td>
                      <td className='border border-slate-950 px-6 py-2'>3.54 m/sec2</td>
                      <td className='border border-slate-950 px-6 py-2'>2.36 m/sec2</td>
                    </tr>
                    <tr>
                      <td className='border border-slate-950 px-6 py-2'>Radial</td>
                      <td className='border border-slate-950 px-6 py-2'>6.28 m/sec2</td>
                      <td className='border border-slate-950 px-6 py-2'>2.36 m/sec2</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className='mt-4'>
                <table className='w-full table-auto'>
                  <tbody>
                    <tr className='h-24'>
                      <td className='w-1/2 border px-4 py-2 font-semibold text-center border-slate-950'>
                        Machine RPM
                        <p className='py-2'></p>
                      </td>
                      <td className='w-1/2 border px-4 py-2 font-semibold text-center border-slate-950'>
                        Ultrasonic Sound
                        <p className=''>(0.0 dBV | 107.3 dB-A)</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <footer className='text-center font-semibold py-4'>2.</footer>
          </div>

          {/* third page */}
          <div>
            <div className='py-8'>
              <h1 className='font-semibold text-lg bg-sky-200 px-4 mx-2'>Spectral Analysis</h1>
              <h2 className='font-semibold mx-4 mt-5'>Acceleration Spectra:</h2>
              <div className='w-full flex flex-col items-center'>
                <div className='w-fit h-fit border-2 border-current rounded-xl m-2 py-4 px-4 font-semibold'>
                  <AccelerationSpectra
                    XVibrationData={XVibration}
                    YVibrationData={YVibration}
                    ZVibrationData={ZVibration}
                  />
                </div>
                <div className='w-full mx-2 border border-slate-900'>
                  <table className='table-auto mx-auto w-full'>
                    <tbody>
                      <tr>
                        <td className='border px-6 py-2'>
                          Tangential <div className='bg-blue-700 h-1 w-6'></div>
                        </td>
                        <td className='border px-6 py-2'>{spectralAnalysis.accTangentialv1}</td>
                        <td className='border px-6 py-2'>0-7.0</td>
                      </tr>
                      <tr>
                        <td className='border px-6 py-2'>
                          Axial<div className='bg-red-500 h-1 w-6'></div>
                        </td>
                        <td className='border px-6 py-2'>{spectralAnalysis.accAxialv1}</td>
                        <td className='border px-6 py-2'>0-7.0</td>
                      </tr>
                      <tr>
                        <td className='border px-6 py-2'>
                          Radial<div className='bg-green-700 h-1 w-6'></div>
                        </td>
                        <td className='border px-6 py-2'>{spectralAnalysis.accRadialv1}</td>
                        <td className='border px-6 py-2'>0-7.0</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <h2 className='font-semibold mx-4 mt-5'>Velocity Spectra:</h2>
              <div className='w-full flex flex-col items-center'>
                <div className='w-fit h-fit border-2 border-current rounded-xl m-2 py-4 px-4 font-semibold'>
                  <AccelerationSpectra />
                </div>
                <div className='w-full mx-2 border border-slate-900'>
                  <table className='table-auto mx-auto w-full'>
                    <tbody>
                      <tr>
                        <td className='border px-6 py-2'>
                          Tangential <div className='bg-blue-700 h-1 w-6'></div>
                        </td>
                        <td className='border px-6 py-2'>{spectralAnalysis.velAxialv1}</td>
                        <td className='border px-6 py-2'>0-7.0</td>
                      </tr>
                      <tr>
                        <td className='border px-6 py-2'>
                          Axial<div className='bg-red-500 h-1 w-6'></div>
                        </td>
                        <td className='border px-6 py-2'>{spectralAnalysis.velTangentialv1}</td>
                        <td className='border px-6 py-2'>0-7.0</td>
                      </tr>
                      <tr>
                        <td className='border px-6 py-2'>
                          Radial<div className='bg-green-700 h-1 w-6'></div>
                        </td>
                        <td className='border px-6 py-2'>{spectralAnalysis.velRadialv1}</td>
                        <td className='border px-6 py-2'>0-7.0</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <footer className='text-center font-semibold py-4 mt-10 '>3.</footer>
          </div>

          {/* fourth page */}
          <div>
            <div className='py-4'>
              <div className='py-4 mx-2 flex'>
                <h1 className=' w-1/2 font-bold text-lg bg-sky-200 flex justify-center text-violet-950'>
                  <span className=''>Based on Acceleration Spectra</span>
                </h1>
                <h1 className=' w-1/2 font-bold text-lg bg-sky-200 flex justify-center text-violet-950'>
                  Based on Velocity Spectra
                </h1>
              </div>
              <div className='py-2 flex'>
                <h1 className='font-bold text-lg  w-1/2  flex justify-center'>
                  Acceleration Spectra<span className='text-violet-950 mx-2'>Amplitude</span> (mm/s)
                </h1>
                <h1 className='font-bold text-lg  w-1/2  flex justify-center'>
                  Velocity Spectra:<span className='text-violet-950 mx-2'>Amplitude</span> (m/sec2)
                </h1>
              </div>
              <div className='flex justify-around'>
                <div className='w-min h-min border-2 border-current rounded-xl m-2 py-4 px-4'>
                  <AccelerationSpectraAmplitude />
                </div>
                <div className='w-min h-min border-2 border-current rounded-xl m-2 py-4 px-4'>
                  <VelocitySpectraAmplitude />
                </div>
              </div>

              <div className='py-2 w-full  text-center'>
                <h1 className='font-bold text-lg'>Predominant Frequencies</h1>
              </div>

              <div className='flex h-full bg-gray-300 border- border-slate-500 rounded-xl m-2 p-4 font-semibold gap-3'>
                <div className='container mx-auto'>
                  <table className='table-auto border w-min'>
                    <thead>
                      <tr>
                        <th
                          className='bg-gray-200 border border-slate-500 px-2 py-2 text-sky-600'
                          rowSpan='2'
                        >
                          Frequency (Hz)
                        </th>
                        <th className='bg-gray-200 border border-slate-500 px-2 py-2 text-sky-600'>
                          Radial
                        </th>
                        <th className='bg-gray-200 border border-slate-500 px-2 py-2 text-sky-600'>
                          Axial
                        </th>
                        <th className='bg-gray-200 border border-slate-500 px-2 py-2 text-sky-600'>
                          Tangential
                        </th>
                      </tr>
                      <tr>
                        <th className='bg-gray-100 border border-slate-500 px-4 py-2'>mm/s</th>
                        <th className='bg-gray-100 border border-slate-500 px-4 py-2'>mm/s</th>
                        <th className='bg-gray-100 border border-slate-500 px-4 py-2'>mm/s</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>23.34</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>3.99</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>-</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>5.02</td>
                      </tr>
                      <tr>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>72.59</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>-</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>3.70</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>-</td>
                      </tr>
                      <tr>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>73.02</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>2.05</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>6.39</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>-</td>
                      </tr>
                      <tr>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>73.44</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>-</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>1.79</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>-</td>
                      </tr>
                      <tr>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>96.93</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>1.88</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>-</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>-</td>
                      </tr>
                      <tr>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>97.36</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>2.04</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'></td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>2.07</td>
                      </tr>
                      <tr>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>121.27</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>1.84</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>2.85</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>2.85</td>
                      </tr>
                      <tr>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>121.70</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>-</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>2.05</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>2.03</td>
                      </tr>
                      <tr>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>364.23</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>-</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>-</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>2.19</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className='container mx-auto'>
                  <table className='table-auto border w-min'>
                    <thead>
                      <tr>
                        <th
                          className='bg-gray-200 border border-slate-500 px-2 py-2 text-sky-600'
                          rowSpan='2'
                        >
                          Frequency (Hz)
                        </th>
                        <th className='bg-gray-200 border border-slate-500 px-2 py-2 text-sky-600'>
                          Radial
                        </th>
                        <th className='bg-gray-200 border border-slate-500 px-2 py-2 text-sky-600'>
                          Axial
                        </th>
                        <th className='bg-gray-200 border border-slate-500 px-2 py-2 text-sky-600'>
                          Tangential
                        </th>
                      </tr>
                      <tr>
                        <th className='bg-gray-100 border border-slate-500 px-4 py-2'>mm/s</th>
                        <th className='bg-gray-100 border border-slate-500 px-4 py-2'>mm/s</th>
                        <th className='bg-gray-100 border border-slate-500 px-4 py-2'>mm/s</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>72.59</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>-</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>1.69</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>-</td>
                      </tr>
                      <tr>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>73.02</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>0.94</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>2.25</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>-</td>
                      </tr>
                      <tr>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>73.44</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>-</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>0.83</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>-</td>
                      </tr>
                      <tr>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>96.93</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>1.15</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>-</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>-</td>
                      </tr>
                      <tr>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>97.36</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>1.25</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>-</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>-</td>
                      </tr>
                      <tr>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>121.27</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>1.41</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>2.18</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>2.18</td>
                      </tr>
                      <tr>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>121.70</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>1.05</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>1.57</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>-</td>
                      </tr>
                      <tr>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>291.21</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>-</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>-</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>1.71</td>
                      </tr>
                      <tr>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>291.64</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>-</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>-</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>2.34</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className=''>
                <div className='py-2 flex'>
                  <h1 className='font-bold text-lg  w-1/2  flex justify-center text-sky-600'>
                    Drive End Bearing Frequencies
                  </h1>
                  <h1 className='font-bold text-lg  w-1/2  flex justify-center text-sky-600'>
                    Non-Drive End Bearing Frequencies
                  </h1>
                </div>

                <div className='py-2 flex gap-5 mt-2'>
                  <div className='container mx-2 flex justify-end w-1/2'>
                    <table className='table-auto w-full border border-collapse border-slate-800'>
                      <tbody>
                        <tr>
                          <td className='bg-gray-50 border border-slate-500 px-4 py-2'>
                            Outer Race
                          </td>
                          <td className='bg-gray-50 border border-slate-500 px-4 py-2'>
                            Inner Race
                          </td>
                          <td className='bg-gray-50 border border-slate-500 px-4 py-2'>
                            Ball Spin
                          </td>
                          <td className='bg-gray-50 border border-slate-500 px-4 py-2'>
                            Ball Cage
                          </td>
                        </tr>
                        <tr>
                          <td className='bg-gray-50 border border-slate-500 px-4 py-2'>0</td>
                          <td className='bg-gray-50 border border-slate-500 px-4 py-2'>0</td>
                          <td className='bg-gray-50 border border-slate-500 px-4 py-2'>0</td>
                          <td className='bg-gray-50 border border-slate-500 px-4 py-2'>0</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className='container mx-2 flex justify-end w-1/2'>
                    <table className='table-auto w-full border border-collapse border-slate-800'>
                      <tbody>
                        <tr>
                          <td className='bg-gray-50 border border-slate-500 px-4 py-2'>
                            Outer Race
                          </td>
                          <td className='bg-gray-50 border border-slate-500 px-4 py-2'>
                            Inner Race
                          </td>
                          <td className='bg-gray-50 border border-slate-500 px-4 py-2'>
                            Ball Spin
                          </td>
                          <td className='bg-gray-50 border border-slate-500 px-4 py-2'>
                            Ball Cage
                          </td>
                        </tr>
                        <tr>
                          <td className='bg-gray-50 border border-slate-500 px-4 py-2'>0</td>
                          <td className='bg-gray-50 border border-slate-500 px-4 py-2'>0</td>
                          <td className='bg-gray-50 border border-slate-500 px-4 py-2'>0</td>
                          <td className='bg-gray-50 border border-slate-500 px-4 py-2'>0</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <footer className='text-center font-semibold py-4'>4.</footer>
          </div>

          {/* fifth page */}
          <div>
            <div className='py-10'>
              <h1 className='font-semibold text-lg bg-sky-200 px-4 mx-2'>Machine Diagnostics:</h1>
              <div className='flex justify-around text-center py-5'>
                <div>
                  <h2 className='font-bold text-lg'>Ultrasonic Spectra:</h2>
                  <div className='w-min h-min  border-2 border-current rounded-xl m-2 py-4 px-4 font-semibold'>
                    <UltrasonicSpectraGraph />
                  </div>
                </div>

                <div>
                  <h2 className='font-bold text-lg'>Magnetic Field Spectra:</h2>
                  <div className='w-min h-min  border-2 border-current rounded-xl m-2 py-4 px-4 font-semibold'>
                    <MagneticFieldSpectraGraph />
                  </div>
                </div>
              </div>
              <h1 className='font-semibold text-lg bg-sky-200 px-4 mx-2'>
                Machine Diagnostics Summary:
              </h1>

              <div className='flex py-2'>
                <table className='table-auto border w-full mx-2'>
                  <tr>
                    <td className='border p-2 text-sky-600 text-center border-slate-950'>
                      Machine Parameter
                    </td>
                    <td className='border p-2 text-sky-600 text-center border-slate-950'>Value</td>
                    <td className='border p-2 text-sky-600 text-center border-slate-950'>
                      Acceptable Limits
                    </td>
                  </tr>
                </table>
              </div>
              <div className='mx-2 border'>
                <table className='table-auto mx-auto w-full'>
                  <tbody>
                    <tr>
                      <td className='border px-6 py-2 border-slate-950'>
                        Vibration - Velocity (mm/sec)
                      </td>
                      <td className='border px-6 py-2 border-slate-950'></td>
                      <td className='border px-6 py-2 border-slate-950'></td>
                    </tr>

                    <tr>
                      <td className='border px-6 py-2 border-slate-950'>
                        Tangential <div className='bg-blue-700 h-1 w-6'></div>
                      </td>
                      <td className='border px-6 py-2 border-slate-950'>2.36</td>
                      <td className='border px-6 py-2 border-slate-950'>0-7.0</td>
                    </tr>
                    <tr>
                      <td className='border px-6 py-2 border-slate-950'>
                        Axial<div className='bg-red-500 h-1 w-6'></div>
                      </td>
                      <td className='border px-6 py-2 border-slate-950'>3.54</td>
                      <td className='border px-6 py-2 border-slate-950'>0-7.0</td>
                    </tr>
                    <tr>
                      <td className='border px-6 py-2 border-slate-950'>
                        Radial<div className='bg-green-700 h-1 w-6'></div>
                      </td>
                      <td className='border px-6 py-2 border-slate-950'>6.28</td>
                      <td className='border px-6 py-2 border-slate-950'>0-7.0</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className='mx-2 py-4 border-slate-800'>
                <table className='table-auto mx-auto w-full'>
                  <tbody>
                    <tr>
                      <td className='border px-6 py-2 border-slate-950'>Temperature (°C)</td>
                      <td className='border px-6 py-2 border-slate-950'></td>
                      <td className='border px-6 py-2 border-slate-950'></td>
                    </tr>

                    <tr>
                      <td className='border px-6 py-2 border-slate-950'>
                        Tangential <div className='bg-blue-700 h-1 w-6'></div>
                      </td>
                      <td className='border px-6 py-2 border-slate-950'>2.36</td>
                      <td className='border px-6 py-2 border-slate-950'>0-7.0</td>
                    </tr>
                    <tr>
                      <td className='border px-6 py-2 border-slate-950'>
                        Axial<div className='bg-red-500 h-1 w-6'></div>
                      </td>
                      <td className='border px-6 py-2 border-slate-950'>3.54</td>
                      <td className='border px-6 py-2 border-slate-950'>0-7.0</td>
                    </tr>
                    <tr>
                      <td className='border px-6 py-2 border-slate-950'>
                        Radial<div className='bg-green-700 h-1 w-6'></div>
                      </td>
                      <td className='border px-6 py-2 border-slate-950'>6.28</td>
                      <td className='border px-6 py-2 border-slate-950'>0-7.0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className='px-2 py-8 font-semibold'>
                Diagnostics analysis was performed at: SA: {date} {time} (IST) Based on the spectrum
                analysis. The diagnosed predominant unacceptable condition is:
                <span className='text-red-600'>N/A (Machine is currently Healthy)</span>
                The Conditions to Observe are:{' '}
                <span className='text-red-600'>
                  {' '}
                  Mechanical Unbalance Condition, Soft Foot Condition, Looseness Condition
                </span>
              </p>
            </div>
            <footer className='text-center font-semibold py-4 mt-8'>5.</footer>
          </div>

          {/* sixth page */}
          <div>
            <div className='px-2 py-4'>
              <h1 className='font-semibold text-lg bg-sky-200 px-4 mx-2'>Past 24 hr Monitoring:</h1>
              <h2 className='font-semibold mx-4 mt-5'>Vibration - Acceleration Trend</h2>
              <div className='w-full flex justify-center'>
                <div className='w-fit h-fit border-2 border-current rounded-xl m-2 py-4 px-4 font-semibold'>
                  <VibrationAccelerationTrendGraph />
                </div>
              </div>
              <h2 className='font-semibold px-4'>Analysis Summary</h2>
              <div className='border border-slate-900'>
                <table className='table-auto mx-auto w-full'>
                  <tbody>
                    <tr>
                      <td className='bg-gray-100 border px-6 py-2 text-sky-600'>
                        Machine Parameter
                      </td>
                      <td className='bg-gray-100 border px-4 py-2 text-sky-600'>Min</td>
                      <td className='bg-gray-100 border px-4 py-2 text-sky-600'>Max</td>
                      <td className='bg-gray-100 border px-4 py-2 text-sky-600'>Average</td>
                      <td className='bg-gray-100 border px-4 py-2 text-sky-600'>
                        Acceptable Limits
                      </td>
                    </tr>

                    <tr>
                      <td className='border px-6 py-2'>
                        Tangential<div className='bg-blue-700 h-1 w-6'></div>
                      </td>
                      <td className='border px-4 py-2'>2.1</td>
                      <td className='border px-4 py-2'>3.7</td>
                      <td className='border px-4 py-2'>2.9</td>
                      <td className='border px-4 py-2'>0-4.9</td>
                    </tr>
                    <tr>
                      <td className='border px-6 py-2'>
                        Axial<div className='bg-red-500 h-1 w-6'></div>
                      </td>
                      <td className='border px-4 py-2'>3.7</td>
                      <td className='border px-4 py-2'>4.7</td>
                      <td className='border px-4 py-2'>4.5</td>
                      <td className='border px-4 py-2'>0-4.9</td>
                    </tr>
                    <tr>
                      <td className='border px-6 py-2'>
                        Radial<div className='bg-green-700 h-1 w-6'></div>
                      </td>
                      <td className='border px-4 py-2'>3.8</td>
                      <td className='border px-4 py-2'>9.9</td>
                      <td className='border px-4 py-2'>7.4</td>
                      <td className='border px-4 py-2'>0-4.9</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <h2 className='font-semibold mx-4 mt-5'>Vibration - Velocity Trend:</h2>
              <div className='w-full flex flex-col items-center'>
                <div className='w-fit h-fit border-2 border-current rounded-xl m-2 py-4 px-4 font-semibold'>
                  <VibrationVelocityTrendGraph />
                </div>
              </div>
              <h2 className='font-semibold px-4'>Analysis Summary</h2>
              <div className='border border-slate-900'>
                <table className='table-auto mx-auto w-full'>
                  <tbody>
                    <tr>
                      <td className='bg-gray-100 border px-6 py-2 text-sky-600'>
                        Machine Parameter
                      </td>
                      <td className='bg-gray-100 border px-4 py-2 text-sky-600'>Min</td>
                      <td className='bg-gray-100 border px-4 py-2 text-sky-600'>Max</td>
                      <td className='bg-gray-100 border px-4 py-2 text-sky-600'>Average</td>
                      <td className='bg-gray-100 border px-4 py-2 text-sky-600'>
                        Acceptable Limits
                      </td>
                    </tr>

                    <tr>
                      <td className='border px-6 py-2'>
                        Tangential<div className='bg-blue-700 h-1 w-6'></div>
                      </td>
                      <td className='border px-4 py-2'>2.1</td>
                      <td className='border px-4 py-2'>3.7</td>
                      <td className='border px-4 py-2'>2.9</td>
                      <td className='border px-4 py-2'>0-4.9</td>
                    </tr>
                    <tr>
                      <td className='border px-6 py-2'>
                        Axial<div className='bg-red-500 h-1 w-6'></div>
                      </td>
                      <td className='border px-4 py-2'>3.7</td>
                      <td className='border px-4 py-2'>4.7</td>
                      <td className='border px-4 py-2'>4.5</td>
                      <td className='border px-4 py-2'>0-4.9</td>
                    </tr>
                    <tr>
                      <td className='border px-6 py-2'>
                        Radial<div className='bg-green-700 h-1 w-6'></div>
                      </td>
                      <td className='border px-4 py-2'>3.8</td>
                      <td className='border px-4 py-2'>9.9</td>
                      <td className='border px-4 py-2'>7.4</td>
                      <td className='border px-4 py-2'>0-4.9</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <footer className='text-center font-semibold py-4'>6.</footer>
          </div>

          {/* seventh page */}
          <div>
            <div className='py-4 mx-2'>
              <h2 className='font-semibold mx-4'>Temperature Trend:</h2>
              <div className='w-full flex flex-col items-center'>
                <div className='w-fit h-fit border-2 border-current rounded-xl m-2 py-4 px-4 font-semibold'>
                  <TemperatureTrendGraph />
                </div>
              </div>
              <h2 className='font-semibold px-4'>Analysis Summary</h2>
              <div className='mx-2 border border-slate-900'>
                <table className='table-auto mx-auto w-full mb-10 '>
                  <tbody>
                    <tr>
                      <td className='bg-gray-100 border px-6 py-2 text-sky-600'>
                        Machine Parameter
                      </td>
                      <td className='bg-gray-100 border px-4 py-2 text-sky-600'>Min</td>
                      <td className='bg-gray-100 border px-4 py-2 text-sky-600'>Max</td>
                      <td className='bg-gray-100 border px-4 py-2 text-sky-600'>Average</td>
                      <td className='bg-gray-100 border px-4 py-2 text-sky-600'>
                        Acceptable Limits
                      </td>
                    </tr>

                    <tr>
                      <td className='border px-6 py-2'>DE Bearing</td>
                      <td className='border px-4 py-2'>2.1</td>
                      <td className='border px-4 py-2'>3.7</td>
                      <td className='border px-4 py-2'>2.9</td>
                      <td className='border px-4 py-2'>0-4.9</td>
                    </tr>
                    <tr>
                      <td className='border px-6 py-2'>Static Winding</td>
                      <td className='border px-4 py-2'>3.7</td>
                      <td className='border px-4 py-2'>4.7</td>
                      <td className='border px-4 py-2'>4.5</td>
                      <td className='border px-4 py-2'>0-4.9</td>
                    </tr>
                    <tr>
                      <td className='border px-6 py-2'>NDE Bearing</td>
                      <td className='border px-4 py-2'>3.8</td>
                      <td className='border px-4 py-2'>9.9</td>
                      <td className='border px-4 py-2'>7.4</td>
                      <td className='border px-4 py-2'>0-4.9</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h1 className='font-semibold text-lg bg-sky-200 px-4 my-2'>Past 24 hr Monitoring:</h1>
              <h2 className='font-semibold px-4'>Machine Acoustics</h2>
              <div className='flex-1 h-48  border-2 border-current rounded-xl m-2 py-2 px-4 font-semibold bg-gray-100'>
                Graph
              </div>
              <h2 className='font-semibold px-4'>Machine Acoustics</h2>
              <div className='flex-1 h-48  border-2 border-current rounded-xl m-2 py-2 px-4 font-semibold bg-gray-100'>
                Graph
              </div>
              <p className='font-semibold px-2'>
                Conclusion - Based on the analysis of real time data captured at {date} {time} (IST)
                the machine is in
                <span className='text-red-600'>UNHEALTHY</span> state and{' '}
                <span className='text-red-600'>Attention</span> Required as such.
              </p>
            </div>
            <footer className='text-center font-semibold'>7.</footer>
          </div>

          {/* eighth page */}
          <div>
            <div className='py-4'>
              <h1 className='font-semibold text-lg bg-sky-200 mx-2 px-4 mb-4'>Glossary:</h1>
              <div className='flex h-full bg-gray-300 border border-slate-950 rounded-xl m-2 p-2 font-semibold'>
                <div className='container mx-auto mt-8'>
                  <table className='table-auto border border-collapse border-slate-950 w-full'>
                    <tbody>
                      <tr>
                        <td className='text-sky-600 border px-4 py-2 bg-gray-200  border-slate-500'>
                          ACCELERATION
                        </td>
                        <td className='border px-4 py-2 bg-gray-50 border-slate-500'></td>
                      </tr>

                      <tr>
                        <td className='text-sky-600 border px-4 py-2 bg-gray-200  border-slate-500'>
                          TEMPERATURE
                        </td>
                        <td className='border px-4 py-2 bg-gray-50 border-slate-500'></td>
                      </tr>

                      <tr>
                        <td className='text-sky-600 border px-4 py-2 bg-gray-200  border-slate-500'>
                          ORIENTATION
                        </td>
                        <td className='border px-4 py-2 bg-gray-50 border-slate-500'></td>
                      </tr>

                      <tr>
                        <td className='text-sky-600 border px-4 py-2 bg-gray-200  border-slate-500'>
                          VELOCITY
                        </td>
                        <td className='border px-4 py-2 bg-gray-50 border-slate-500'></td>
                      </tr>

                      <tr>
                        <td className='text-sky-600 border px-4 py-2 bg-gray-200  border-slate-500'>
                          MACHINE RPM
                        </td>
                        <td className='border px-4 py-2 bg-gray-50 border-slate-500'></td>
                      </tr>

                      <tr>
                        <td className='text-sky-600 border px-4 py-2 bg-gray-200  border-slate-500'>
                          ESTIMATED MACHINE LOADING
                        </td>
                        <td className='border px-4 py-2 bg-gray-50 border-slate-500'></td>
                      </tr>

                      <tr>
                        <td className='text-sky-600 border px-4 py-2 bg-gray-200  border-slate-500'>
                          ASSET NAME
                        </td>
                        <td className='border px-4 py-2 bg-gray-50 border-slate-500'></td>
                      </tr>

                      <tr>
                        <td className='text-sky-600 border px-4 py-2 bg-gray-200  border-slate-500'>
                          SITE
                        </td>
                        <td className='border px-4 py-2 bg-gray-50 border-slate-500'></td>
                      </tr>

                      <tr>
                        <td className='text-sky-600 border px-4 py-2 bg-gray-200  border-slate-500'>
                          APPLICATION
                        </td>
                        <td className='border px-4 py-2 bg-gray-50 border-slate-500'></td>
                      </tr>

                      <tr>
                        <td className='text-sky-600 border px-4 py-2 bg-gray-200  border-slate-500'>
                          MOTOR MAKE
                        </td>
                        <td className='border px-4 py-2 bg-gray-50 border-slate-500'></td>
                      </tr>

                      <tr>
                        <td className='text-sky-600 border px-4 py-2 bg-gray-200  border-slate-500'>
                          FRAME
                        </td>
                        <td className='border px-4 py-2 bg-gray-50 border-slate-500'></td>
                      </tr>

                      <tr>
                        <td className='text-sky-600 border px-4 py-2 bg-gray-200  border-slate-500'>
                          RATED AMBIENT TEMPERATURE
                        </td>
                        <td className='border px-4 py-2 bg-gray-50 border-slate-500'></td>
                      </tr>

                      <tr>
                        <td className='text-sky-600 border px-4 py-2 bg-gray-200  border-slate-500'>
                          INSULATION className
                        </td>
                        <td className='border px-4 py-2 bg-gray-50 border-slate-500'></td>
                      </tr>

                      <tr>
                        <td className='text-sky-600 border px-4 py-2 bg-gray-200  border-slate-500'>
                          MOTOR SERIAL NUMBER
                        </td>
                        <td className='border px-4 py-2 bg-gray-50 border-slate-500'></td>
                      </tr>

                      <tr>
                        <td className='text-sky-600 border px-4 py-2 bg-gray-200  border-slate-500'>
                          RATED POWER
                        </td>
                        <td className='border px-4 py-2 bg-gray-50 border-slate-500'></td>
                      </tr>

                      <tr>
                        <td className='text-sky-600 border px-4 py-2 bg-gray-200  border-slate-500'>
                          RATED RPM
                        </td>
                        <td className='border px-4 py-2 bg-gray-50 border-slate-500'></td>
                      </tr>

                      <tr>
                        <td className='text-sky-600 border px-4 py-2 bg-gray-200  border-slate-500'>
                          RATED VOLTAGE
                        </td>
                        <td className='border px-4 py-2 bg-gray-50 border-slate-500'></td>
                      </tr>

                      <tr>
                        <td className='text-sky-600 border px-4 py-2 bg-gray-200  border-slate-500'>
                          PERCENTAGE EFICIENCY
                        </td>
                        <td className='border px-4 py-2 bg-gray-50 border-slate-500'></td>
                      </tr>

                      <tr>
                        <td className='text-sky-600 border px-4 py-2 bg-gray-200  border-slate-500'>
                          LINE FREQUENCY
                        </td>
                        <td className='border px-4 py-2 bg-gray-50 border-slate-500'></td>
                      </tr>

                      <tr>
                        <td className='text-sky-600 border px-4 py-2 bg-gray-200  border-slate-500'>
                          POWER FACTOR
                        </td>
                        <td className='border px-4 py-2 bg-gray-50 border-slate-500'></td>
                      </tr>

                      <tr>
                        <td className='text-sky-600 border px-4 py-2 bg-gray-200  border-slate-500'>
                          DUTY
                        </td>
                        <td className='border px-4 py-2 bg-gray-50 border-slate-500'></td>
                      </tr>

                      <tr>
                        <td className='text-sky-600 border px-4 py-2 bg-gray-200  border-slate-500'>
                          DE BEARING NUMBER
                        </td>
                        <td className='border px-4 py-2 bg-gray-50  border-slate-500'></td>
                      </tr>

                      <tr>
                        <td className='text-sky-600 border px-4 py-2 bg-gray-200  border-slate-500'>
                          NDE BEARING NUMBER
                        </td>
                        <td className='border px-4 py-2 bg-gray-50 border-slate-500'></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <footer className='text-center font-semibold'>8.</footer>
          </div>
        </div>
      </div>
      {/* visible div */}
      <div className='absolute  border-2 mt-5 z-20 bg-gray-50'>
        <div className='justify-items-center mx-4'>
          {/* first page */}
          <div>
            <div className='py-7'>
              <h1 className='bg-sky-200 px-4 mx-2 font-semibold'>Asset Details:</h1>
              <div className=' w-full mx-auto py-4 px-2'>
                <table className='w-full border border-collapse border-gray-300'>
                  <tbody>
                    <tr className='bg-white'>
                      <td className='w-2/3 border border-gray-300 py-2 px-4'>Asset Id</td>
                      <td className='w-1/3 border border-gray-300 py-2 px-4'>
                        {assetDetails.asset_id}
                      </td>
                    </tr>
                    <tr className='bg-gray-100'>
                      <td className='w-2/3 border border-gray-300 py-2 px-4'>Asset Type</td>
                      <td className='w-1/3 border border-gray-300 py-2 px-4'>
                        {assetDetails.ultrasound}
                      </td>
                    </tr>
                    <tr className='bg-white'>
                      <td className='w-2/3 border border-gray-300 py-2 px-4'>Workshop</td>
                      <td className='w-1/3 border border-gray-300 py-2 px-4'></td>
                    </tr>
                    <tr className='bg-white'>
                      <td className='w-2/3 border border-gray-300 py-2 px-4'>Site</td>
                      <td className='w-1/3 border border-gray-300 py-2 px-4'></td>
                    </tr>
                    <tr className='bg-gray-100'>
                      <td className='w-2/3 border border-gray-300 py-2 px-4'>Application</td>
                      <td className='w-1/3 border border-gray-300 py-2 px-4'></td>
                    </tr>
                    <tr className='bg-white'>
                      <td className='w-2/3 border border-gray-300 py-2 px-4'>Manufacturer</td>
                      <td className='w-1/3 border border-gray-300 py-2 px-4'></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <h1 className='bg-sky-200 px-4 mx-2 font-semibold'>Asset Specifications:</h1>
              <div className=' w-full mx-auto py-4 px-2'>
                <table className='w-full border border-collapse border-gray-300'>
                  <tbody>
                    {/* <tr className='bg-white'>
                    <td className='border border-gray-300 py-2 px-4'>Insulation className</td>
                    <td className='border border-gray-300 py-2 px-4'></td>
                  </tr> */}
                    <tr className='bg-gray-100'>
                      <td className='border border-gray-300 py-2 px-4'>Frame</td>
                      <td className='border border-gray-300 py-2 px-4'></td>
                    </tr>
                    {/* <tr className='bg-white'>
                    <td className='border border-gray-300 py-2 px-4'>Duty</td>
                    <td className='border border-gray-300 py-2 px-4'></td>
                  </tr> */}
                    <tr className='bg-gray-100'>
                      <td className='w-2/3 border border-gray-300 py-2 px-4'>DE Bearing Number</td>
                      <td className='w-1/3 border border-gray-300 py-2 px-4'></td>
                    </tr>
                    <tr className='bg-white'>
                      <td className='w-2/3 border border-gray-300 py-2 px-4'>NDE Bearing Number</td>
                      <td className='w-1/3 border border-gray-300 py-2 px-4'></td>
                    </tr>
                    <tr className='bg-gray-100'>
                      <td className='w-2/3 border border-gray-300 py-2 px-4'>Rated RPM</td>
                      <td className='w-1/3 border border-gray-300 py-2 px-4'></td>
                    </tr>
                    <tr className='bg-white'>
                      <td className='w-2/3 border border-gray-300 py-2 px-4'>Rated Power</td>
                      <td className='w-1/3 border border-gray-300 py-2 px-4'></td>
                    </tr>
                    <tr className='bg-gray-100'>
                      <td className='w-2/3 border border-gray-300 py-2 px-4'>Rated Voltage</td>
                      <td className='w-1/3 border border-gray-300 py-2 px-4'></td>
                    </tr>
                    <tr className='bg-white'>
                      <td className='w-2/3 border border-gray-300 py-2 px-4'>Line Frequency</td>
                      <td className='w-1/3 border border-gray-300 py-2 px-4'></td>
                    </tr>
                    <tr className='bg-gray-100'>
                      <td className='w-2/3 border border-gray-300 py-2 px-4'>Power Factor</td>
                      <td className='w-1/3 border border-gray-300 py-2 px-4'></td>
                    </tr>
                    <tr className='bg-white'>
                      <td className='w-2/3 border border-gray-300 py-2 px-4'>
                        Rated Ambient Temperature
                      </td>
                      <td className='w-1/3 border border-gray-300 py-2 px-4'></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <h1 className='bg-sky-200 px-4 mx-2 font-semibold'>Sensors Connected</h1>
              <div className=' w-full mx-auto py-4 px-2'>
                <table className='w-full border border-collapse border-gray-300'>
                  <tbody>
                    <tr className='bg-white'>
                      <td className='w-2/3 border border-gray-300 py-2 px-4'>Model No.</td>
                      <td className='w-1/3 border border-gray-300 py-2 px-4'></td>
                    </tr>
                    <tr className='bg-gray-100'>
                      <td className='w-2/3 border border-gray-300 py-2 px-4'>NDE Sensor Id </td>
                      <td className='w-1/3 border border-gray-300 py-2 px-4'></td>
                    </tr>
                    <tr className='bg-white'>
                      <td className='w-2/3 border border-gray-300 py-2 px-4'>DE Sensor Id</td>
                      <td className='w-1/3 border border-gray-300 py-2 px-4'></td>
                    </tr>
                    <tr className='bg-gray-100'>
                      <td className='w-2/3 border border-gray-300 py-2 px-4'>Sample Rate</td>
                      <td className='w-1/3 border border-gray-300 py-2 px-4'></td>
                    </tr>
                    <tr className='bg-gray-100'>
                      <td className='w-2/3 border border-gray-300 py-2 px-4'>
                        {' '}
                        Rated Sensor Temperature
                      </td>
                      <td className='w-1/3 border border-gray-300 py-2 px-4'></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <footer className='text-center font-semibold py-4'>1.</footer>
          </div>
          {/* second page */}
          <div>
            <div className='py-4'>
              <div className='flex px-4 font-semibold text-lg bg-sky-200 justify-between'>
                Asset current status
                <i className='font-normal text-base'>Captured at : 12 jan 2023 at 09:30:21 PM</i>
              </div>
              <div className='flex'>
                <div className='flex-1 h-36  border-2 border-current rounded-xl m-2 py-1 px-2 font-semibold'>
                  Operational
                </div>
                <div className='flex-1  border-2 border-current rounded-xl m-2 py-1 px-2 font-semibold'>
                  Overall Health
                </div>
                <div className='flex-1  border-2 border-current rounded-xl m-2 py-1 px-2 font-semibold'>
                  Service Status
                </div>
              </div>
              <h1 className='font-semibold text-lg'>Motor Health Report:</h1>
              <div className='mt-4'>
                <span className='py-1 flex justify-center font-semibold text-xl bg-gray-200 border-x border-t border-slate-950'>
                  <img src={AccelerationICO} alt='' className='h-6 w-6 mr-5' />
                  Temperature
                </span>{' '}
                <table className='table-auto mx-auto w-full'>
                  <thead>
                    <tr className='mx-auto border border-slate-950'>
                      <td
                        colSpan='1'
                        className='w-1/3 px-6 py-2 whitespace-no-wrap border text-center font-semibold text-lg border-slate-950'
                      >
                        Skin
                      </td>
                      <td
                        colSpan='1'
                        className='w-1/3 px-6 py-2 whitespace-no-wrap border text-center font-semibold text-lg border-slate-950'
                      >
                        NDE
                      </td>
                      <td
                        colSpan='1'
                        className='w-1/3 px-6 py-2 whitespace-no-wrap border text-center font-semibold text-lg border-slate-950'
                      >
                        DE
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className='border border-slate-950 px-6 py-2'>20°C</td>
                      <td className='border border-slate-950 px-6 py-2'>20°C</td>
                      <td className='border border-slate-950 px-6 py-2'>20°C</td>
                    </tr>
                    <tr>
                      <td className='border border-slate-950 px-6 py-2'>20°C</td>
                      <td className='border border-slate-950 px-6 py-2'>20°C</td>
                      <td className='border border-slate-950 px-6 py-2'>20°C</td>
                    </tr>
                    <tr>
                      <td className='border border-slate-950 px-6 py-2'>20°C</td>
                      <td className='border border-slate-950 px-6 py-2'>20°C</td>
                      <td className='border border-slate-950 px-6 py-2'>20°C</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className='mt-4'>
                <span className='py-1 flex justify-center font-semibold text-xl bg-gray-200 border-x border-t border-slate-950'>
                  <img src={AccelerationICO} alt='' className='h-6 w-6 mr-5' />
                  Acceleration
                </span>{' '}
                <table className='table-auto mx-auto w-full'>
                  <thead>
                    <tr className='mx-auto border border-slate-950'>
                      <td
                        colSpan='1'
                        className='w-1/3 px-6 py-2 whitespace-no-wrap border text-center font-semibold text-lg border-slate-950'
                      >
                        Directions
                      </td>
                      <td
                        colSpan='1'
                        className='w-1/3 px-6 py-2 whitespace-no-wrap border text-center font-semibold text-lg border-slate-950'
                      >
                        NDE
                      </td>
                      <td
                        colSpan='1'
                        className='w-1/3 px-6 py-2 whitespace-no-wrap border text-center font-semibold text-lg border-slate-950'
                      >
                        DE
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className='border border-slate-950 px-6 py-2'>Tangential</td>
                      <td className='border border-slate-950 px-6 py-2'>2.36 m/sec2</td>
                      <td className='border border-slate-950 px-6 py-2'>2.36 m/sec2</td>
                    </tr>
                    <tr>
                      <td className='border border-slate-950 px-6 py-2'>Axial</td>
                      <td className='border border-slate-950 px-6 py-2'>3.54 m/sec2</td>
                      <td className='border border-slate-950 px-6 py-2'>2.36 m/sec2</td>
                    </tr>
                    <tr>
                      <td className='border border-slate-950 px-6 py-2'>Radial</td>
                      <td className='border border-slate-950 px-6 py-2'>6.28 m/sec2</td>
                      <td className='border border-slate-950 px-6 py-2'>2.36 m/sec2</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className='mt-4'>
                <span className='py-1 flex justify-center font-semibold text-xl bg-gray-200 border-x border-t border-slate-950'>
                  <img src={AccelerationICO} alt='' className='h-6 w-6 mr-5' />
                  Magnetic Field
                </span>{' '}
                <table className='table-auto mx-auto w-full'>
                  <thead>
                    <tr className='mx-auto border border-slate-950'>
                      <td
                        colSpan='1'
                        className='w-1/3 px-6 py-2 whitespace-no-wrap border text-center font-semibold text-lg border-slate-950'
                      >
                        Directions
                      </td>
                      <td
                        colSpan='1'
                        className='w-1/3 px-6 py-2 whitespace-no-wrap border text-center font-semibold text-lg border-slate-950'
                      >
                        NDE
                      </td>
                      <td
                        colSpan='1'
                        className='w-1/3 px-6 py-2 whitespace-no-wrap border text-center font-semibold text-lg border-slate-950'
                      >
                        DE
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className='border border-slate-950 px-6 py-2'>Tangential</td>
                      <td className='border border-slate-950 px-6 py-2'>2.36 m/sec2</td>
                      <td className='border border-slate-950 px-6 py-2'>2.36 m/sec2</td>
                    </tr>
                    <tr>
                      <td className='border border-slate-950 px-6 py-2'>Axial</td>
                      <td className='border border-slate-950 px-6 py-2'>3.54 m/sec2</td>
                      <td className='border border-slate-950 px-6 py-2'>2.36 m/sec2</td>
                    </tr>
                    <tr>
                      <td className='border border-slate-950 px-6 py-2'>Radial</td>
                      <td className='border border-slate-950 px-6 py-2'>6.28 m/sec2</td>
                      <td className='border border-slate-950 px-6 py-2'>2.36 m/sec2</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className='mt-4'>
                <table className='w-full table-auto'>
                  <tbody>
                    <tr className='h-24'>
                      <td className='w-1/2 border px-4 py-2 font-semibold text-center border-slate-950'>
                        Machine RPM
                        <p className='py-2'></p>
                      </td>
                      <td className='w-1/2 border px-4 py-2 font-semibold text-center border-slate-950'>
                        Ultrasonic Sound
                        <p className=''>(0.0 dBV | 107.3 dB-A)</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <footer className='text-center font-semibold py-4'>2.</footer>
          </div>
          {/* third page */}
          <div>
            <div className='py-8'>
              <h1 className='font-semibold text-lg bg-sky-200 px-4 mx-2'>Spectral Analysis</h1>
              <div className='flex flex-row'>
                <div className='flex flex-col w-1/2 items-center'>
                  <h2 className='font-semibold mx-4 mt-5'>Acceleration Spectra:</h2>
                  <div className='w-fit h-min border-2 border-current rounded-xl m-2 py-4 px-4 font-semibold'>
                    <AccelerationSpectra />
                  </div>
                  <div className='w-full mx-2 px-2'>
                    <table className='table-auto mx-auto w-full'>
                      <tbody>
                        <tr>
                          <td className='border px-6 py-2'>
                            Tangential <div className='bg-blue-700 h-1 w-6'></div>
                          </td>
                          <td className='border px-6 py-2'>2.36</td>
                          <td className='border px-6 py-2'>0-7.0</td>
                        </tr>
                        <tr>
                          <td className='border px-6 py-2'>
                            Axial<div className='bg-red-500 h-1 w-6'></div>
                          </td>
                          <td className='border px-6 py-2'>3.54</td>
                          <td className='border px-6 py-2'>0-7.0</td>
                        </tr>
                        <tr>
                          <td className='border px-6 py-2'>
                            Radial<div className='bg-green-700 h-1 w-6'></div>
                          </td>
                          <td className='border px-6 py-2'>6.28</td>
                          <td className='border px-6 py-2'>0-7.0</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className='flex flex-col w-1/2 items-center'>
                  <h2 className='font-semibold mx-4 mt-5'>Velocity Spectra:</h2>
                  <div className='w-fit h-min border-2 border-current rounded-xl m-2 py-4 px-4 font-semibold'>
                    <AccelerationSpectra />
                  </div>
                  <div className='w-full mx-2 px-2'>
                    <table className='table-auto mx-auto w-full'>
                      <tbody>
                        <tr>
                          <td className='border px-6 py-2'>
                            Tangential <div className='bg-blue-700 h-1 w-6'></div>
                          </td>
                          <td className='border px-6 py-2'>2.36</td>
                          <td className='border px-6 py-2'>0-7.0</td>
                        </tr>
                        <tr>
                          <td className='border px-6 py-2'>
                            Axial<div className='bg-red-500 h-1 w-6'></div>
                          </td>
                          <td className='border px-6 py-2'>3.54</td>
                          <td className='border px-6 py-2'>0-7.0</td>
                        </tr>
                        <tr>
                          <td className='border px-6 py-2'>
                            Radial<div className='bg-green-700 h-1 w-6'></div>
                          </td>
                          <td className='border px-6 py-2'>6.28</td>
                          <td className='border px-6 py-2'>0-7.0</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <footer className='text-center font-semibold py-4 mt-10 '>3.</footer>
          </div>

          {/* fourth page */}
          <div>
            <div className='py-4'>
              <div className='py-4 mx-2 flex'>
                <h1 className=' w-1/2 font-bold text-lg bg-sky-200 flex justify-center text-violet-950'>
                  <span className=''>Based on Acceleration Spectra</span>
                </h1>
                <h1 className=' w-1/2 font-bold text-lg bg-sky-200 flex justify-center text-violet-950'>
                  Based on Velocity Spectra
                </h1>
              </div>
              <div className='py-2 flex'>
                <h1 className='font-bold text-lg  w-1/2  flex justify-center'>
                  Acceleration Spectra<span className='text-violet-950 mx-2'>Amplitude</span> (mm/s)
                </h1>
                <h1 className='font-bold text-lg  w-1/2  flex justify-center'>
                  Velocity Spectra:<span className='text-violet-950 mx-2'>Amplitude</span> (m/sec2)
                </h1>
              </div>
              <div className='flex justify-around'>
                <div className='w-1/3 h-min border-2 border-current rounded-xl m-2 py-4 px-4'>
                  <AccelerationSpectraAmplitude />
                </div>
                <div className='w-1/3 h-min border-2 border-current rounded-xl m-2 py-4 px-4'>
                  <VelocitySpectraAmplitude />
                </div>
              </div>

              <div className='py-2 w-full  text-center'>
                <h1 className='font-bold text-lg'>Predominant Frequencies</h1>
              </div>

              <div className='flex w-full h-full bg-gray-300 border- border-slate-500 rounded-xl m-2 p-4 font-semibold gap-1'>
                <div className='w-full'>
                  <table className='table-auto border w-full px-2'>
                    <thead>
                      <tr>
                        <th
                          className='bg-gray-200 border border-slate-500 px-2 py-2 text-sky-600'
                          rowSpan='2'
                        >
                          Frequency (Hz)
                        </th>
                        <th className='bg-gray-200 border border-slate-500 px-2 py-2 text-sky-600'>
                          Radial
                        </th>
                        <th className='bg-gray-200 border border-slate-500 px-2 py-2 text-sky-600'>
                          Axial
                        </th>
                        <th className='bg-gray-200 border border-slate-500 px-2 py-2 text-sky-600'>
                          Tangential
                        </th>
                      </tr>
                      <tr>
                        <th className='bg-gray-100 border border-slate-500 px-4 py-2'>mm/s</th>
                        <th className='bg-gray-100 border border-slate-500 px-4 py-2'>mm/s</th>
                        <th className='bg-gray-100 border border-slate-500 px-4 py-2'>mm/s</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>23.34</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>3.99</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>-</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>5.02</td>
                      </tr>
                      <tr>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>72.59</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>-</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>3.70</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>-</td>
                      </tr>
                      <tr>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>73.02</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>2.05</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>6.39</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>-</td>
                      </tr>
                      <tr>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>73.44</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>-</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>1.79</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>-</td>
                      </tr>
                      <tr>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>96.93</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>1.88</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>-</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>-</td>
                      </tr>
                      <tr>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>97.36</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>2.04</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'></td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>2.07</td>
                      </tr>
                      <tr>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>121.27</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>1.84</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>2.85</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>2.85</td>
                      </tr>
                      <tr>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>121.70</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>-</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>2.05</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>2.03</td>
                      </tr>
                      <tr>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>364.23</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>-</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>-</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>2.19</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className='w-full'>
                  <table className='table-auto border w-full px-2'>
                    <thead>
                      <tr>
                        <th
                          className='bg-gray-200 border border-slate-500 px-2 py-2 text-sky-600'
                          rowSpan='2'
                        >
                          Frequency (Hz)
                        </th>
                        <th className='bg-gray-200 border border-slate-500 px-2 py-2 text-sky-600'>
                          Radial
                        </th>
                        <th className='bg-gray-200 border border-slate-500 px-2 py-2 text-sky-600'>
                          Axial
                        </th>
                        <th className='bg-gray-200 border border-slate-500 px-2 py-2 text-sky-600'>
                          Tangential
                        </th>
                      </tr>
                      <tr>
                        <th className='bg-gray-100 border border-slate-500 px-4 py-2'>mm/s</th>
                        <th className='bg-gray-100 border border-slate-500 px-4 py-2'>mm/s</th>
                        <th className='bg-gray-100 border border-slate-500 px-4 py-2'>mm/s</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>72.59</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>-</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>1.69</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>-</td>
                      </tr>
                      <tr>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>73.02</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>0.94</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>2.25</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>-</td>
                      </tr>
                      <tr>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>73.44</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>-</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>0.83</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>-</td>
                      </tr>
                      <tr>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>96.93</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>1.15</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>-</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>-</td>
                      </tr>
                      <tr>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>97.36</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>1.25</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>-</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>-</td>
                      </tr>
                      <tr>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>121.27</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>1.41</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>2.18</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>2.18</td>
                      </tr>
                      <tr>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>121.70</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>1.05</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>1.57</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>-</td>
                      </tr>
                      <tr>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>291.21</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>-</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>-</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>1.71</td>
                      </tr>
                      <tr>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>291.64</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>-</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>-</td>
                        <td className='bg-gray-50 border border-slate-500 px-4 py-2'>2.34</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className=''>
                <div className='py-2 flex'>
                  <h1 className='font-bold text-lg  w-1/2  flex justify-center text-sky-600'>
                    Drive End Bearing Frequencies
                  </h1>
                  <h1 className='font-bold text-lg  w-1/2  flex justify-center text-sky-600'>
                    Non-Drive End Bearing Frequencies
                  </h1>
                </div>

                <div className='py-2 flex gap-5 mt-2'>
                  <div className='container mx-2 flex justify-end w-1/2'>
                    <table className='table-auto w-full border border-collapse border-slate-800'>
                      <tbody>
                        <tr>
                          <td className='bg-gray-50 border border-slate-500 px-4 py-2'>
                            Outer Race
                          </td>
                          <td className='bg-gray-50 border border-slate-500 px-4 py-2'>
                            Inner Race
                          </td>
                          <td className='bg-gray-50 border border-slate-500 px-4 py-2'>
                            Ball Spin
                          </td>
                          <td className='bg-gray-50 border border-slate-500 px-4 py-2'>
                            Ball Cage
                          </td>
                        </tr>
                        <tr>
                          <td className='bg-gray-50 border border-slate-500 px-4 py-2'>0</td>
                          <td className='bg-gray-50 border border-slate-500 px-4 py-2'>0</td>
                          <td className='bg-gray-50 border border-slate-500 px-4 py-2'>0</td>
                          <td className='bg-gray-50 border border-slate-500 px-4 py-2'>0</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className='container mx-2 flex justify-end w-1/2'>
                    <table className='table-auto w-full border border-collapse border-slate-800'>
                      <tbody>
                        <tr>
                          <td className='bg-gray-50 border border-slate-500 px-4 py-2'>
                            Outer Race
                          </td>
                          <td className='bg-gray-50 border border-slate-500 px-4 py-2'>
                            Inner Race
                          </td>
                          <td className='bg-gray-50 border border-slate-500 px-4 py-2'>
                            Ball Spin
                          </td>
                          <td className='bg-gray-50 border border-slate-500 px-4 py-2'>
                            Ball Cage
                          </td>
                        </tr>
                        <tr>
                          <td className='bg-gray-50 border border-slate-500 px-4 py-2'>0</td>
                          <td className='bg-gray-50 border border-slate-500 px-4 py-2'>0</td>
                          <td className='bg-gray-50 border border-slate-500 px-4 py-2'>0</td>
                          <td className='bg-gray-50 border border-slate-500 px-4 py-2'>0</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <footer className='text-center font-semibold py-4'>4.</footer>
          </div>

          {/* fifth page */}
          <div>
            <div className='py-10'>
              <h1 className='font-semibold text-lg bg-sky-200 px-4 mx-2'>Machine Diagnostics:</h1>
              <div className='py-2 flex'>
                <h2 className='font-bold text-lg  w-1/2  flex justify-center'>
                  Ultrasonic Spectra:
                </h2>
                <h2 className='font-bold text-lg  w-1/2  flex justify-center'>
                  Magnetic Field Spectra:
                </h2>
              </div>

              <div className='flex justify-around'>
                <div className='w-1/3 h-min  border-2 border-current rounded-xl m-2 py-4 px-4 font-semibold'>
                  <UltrasonicSpectraGraph />
                </div>
                <div className='w-1/3 h-min  border-2 border-current rounded-xl m-2 py-4 px-4 font-semibold'>
                  <MagneticFieldSpectraGraph />
                </div>
              </div>
              <h1 className='font-semibold text-lg bg-sky-200 px-4 mx-2'>
                Machine Diagnostics Summary:
              </h1>

              <div className='flex py-2'>
                <table className='table-auto border w-full mx-2'>
                  <tr>
                    <td className='border p-2 text-sky-600 text-center border-slate-950'>
                      Machine Parameter
                    </td>
                    <td className='border p-2 text-sky-600 text-center border-slate-950'>Value</td>
                    <td className='border p-2 text-sky-600 text-center border-slate-950'>
                      Acceptable Limits
                    </td>
                  </tr>
                </table>
              </div>
              <div className='mx-2 border'>
                <table className='table-auto mx-auto w-full'>
                  <tbody>
                    <tr>
                      <td className='border px-6 py-2 border-slate-950'>
                        Vibration - Velocity (mm/sec)
                      </td>
                      <td className='border px-6 py-2 border-slate-950'></td>
                      <td className='border px-6 py-2 border-slate-950'></td>
                    </tr>

                    <tr>
                      <td className='border px-6 py-2 border-slate-950'>
                        Tangential <div className='bg-blue-700 h-1 w-6'></div>
                      </td>
                      <td className='border px-6 py-2 border-slate-950'>2.36</td>
                      <td className='border px-6 py-2 border-slate-950'>0-7.0</td>
                    </tr>
                    <tr>
                      <td className='border px-6 py-2 border-slate-950'>
                        Axial<div className='bg-red-500 h-1 w-6'></div>
                      </td>
                      <td className='border px-6 py-2 border-slate-950'>3.54</td>
                      <td className='border px-6 py-2 border-slate-950'>0-7.0</td>
                    </tr>
                    <tr>
                      <td className='border px-6 py-2 border-slate-950'>
                        Radial<div className='bg-green-700 h-1 w-6'></div>
                      </td>
                      <td className='border px-6 py-2 border-slate-950'>6.28</td>
                      <td className='border px-6 py-2 border-slate-950'>0-7.0</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className='mx-2 py-4 border-slate-800'>
                <table className='table-auto mx-auto w-full'>
                  <tbody>
                    <tr>
                      <td className='border px-6 py-2 border-slate-950'>Temperature (°C)</td>
                      <td className='border px-6 py-2 border-slate-950'></td>
                      <td className='border px-6 py-2 border-slate-950'></td>
                    </tr>

                    <tr>
                      <td className='border px-6 py-2 border-slate-950'>
                        Tangential <div className='bg-blue-700 h-1 w-6'></div>
                      </td>
                      <td className='border px-6 py-2 border-slate-950'>2.36</td>
                      <td className='border px-6 py-2 border-slate-950'>0-7.0</td>
                    </tr>
                    <tr>
                      <td className='border px-6 py-2 border-slate-950'>
                        Axial<div className='bg-red-500 h-1 w-6'></div>
                      </td>
                      <td className='border px-6 py-2 border-slate-950'>3.54</td>
                      <td className='border px-6 py-2 border-slate-950'>0-7.0</td>
                    </tr>
                    <tr>
                      <td className='border px-6 py-2 border-slate-950'>
                        Radial<div className='bg-green-700 h-1 w-6'></div>
                      </td>
                      <td className='border px-6 py-2 border-slate-950'>6.28</td>
                      <td className='border px-6 py-2 border-slate-950'>0-7.0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className='px-2 py-8 font-semibold'>
                Diagnostics analysis was performed at: SA: {date} {time} (IST) Based on the spectrum
                analysis. The diagnosed predominant unacceptable condition is:
                <span className='text-red-600'>N/A (Machine is currently Healthy)</span>
                The Conditions to Observe are:{' '}
                <span className='text-red-600'>
                  {' '}
                  Mechanical Unbalance Condition, Soft Foot Condition, Looseness Condition
                </span>
              </p>
            </div>
            <footer className='text-center font-semibold py-4 mt-8'>5.</footer>
          </div>

          {/* sixth page */}
          <div>
            <div className='px-2 py-4'>
              <h1 className='font-semibold text-lg bg-sky-200 px-4 mx-2'>Past 24 hr Monitoring:</h1>
              <h2 className='font-semibold mx-4 mt-5'>Vibration - Acceleration Trend</h2>
              <div className='w-full flex justify-center'>
                <div className='w-fit h-fit border-2 border-current rounded-xl m-2 py-4 px-4 font-semibold'>
                  <VibrationAccelerationTrendGraph />
                </div>
              </div>
              <h2 className='font-semibold px-4'>Analysis Summary</h2>
              <div className='border border-slate-900'>
                <table className='w-full border border-slate-900 table-auto mx-auto'>
                  <tbody>
                    <tr>
                      <td className='bg-gray-100 border px-6 py-2 text-sky-600'>
                        Machine Parameter
                      </td>
                      <td className='bg-gray-100 border px-4 py-2 text-sky-600'>Min</td>
                      <td className='bg-gray-100 border px-4 py-2 text-sky-600'>Max</td>
                      <td className='bg-gray-100 border px-4 py-2 text-sky-600'>Average</td>
                      <td className='bg-gray-100 border px-4 py-2 text-sky-600'>
                        Acceptable Limits
                      </td>
                    </tr>

                    <tr>
                      <td className='border px-6 py-2'>
                        Tangential<div className='bg-blue-700 h-1 w-6'></div>
                      </td>
                      <td className='border px-4 py-2'>2.1</td>
                      <td className='border px-4 py-2'>3.7</td>
                      <td className='border px-4 py-2'>2.9</td>
                      <td className='border px-4 py-2'>0-4.9</td>
                    </tr>
                    <tr>
                      <td className='border px-6 py-2'>
                        Axial<div className='bg-red-500 h-1 w-6'></div>
                      </td>
                      <td className='border px-4 py-2'>3.7</td>
                      <td className='border px-4 py-2'>4.7</td>
                      <td className='border px-4 py-2'>4.5</td>
                      <td className='border px-4 py-2'>0-4.9</td>
                    </tr>
                    <tr>
                      <td className='border px-6 py-2'>
                        Radial<div className='bg-green-700 h-1 w-6'></div>
                      </td>
                      <td className='border px-4 py-2'>3.8</td>
                      <td className='border px-4 py-2'>9.9</td>
                      <td className='border px-4 py-2'>7.4</td>
                      <td className='border px-4 py-2'>0-4.9</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <h2 className='font-semibold mx-4 mt-5'>Vibration - Velocity Trend:</h2>
              <div className='w-full flex flex-col items-center'>
                <div className='w-fit h-fit border-2 border-current rounded-xl m-2 py-4 px-4 font-semibold'>
                  <VibrationVelocityTrendGraph />
                </div>
              </div>
              <h2 className='font-semibold px-4'>Analysis Summary</h2>
              <div className='border border-slate-900'>
                <table className='table-auto mx-auto w-full'>
                  <tbody>
                    <tr>
                      <td className='bg-gray-100 border px-6 py-2 text-sky-600'>
                        Machine Parameter
                      </td>
                      <td className='bg-gray-100 border px-4 py-2 text-sky-600'>Min</td>
                      <td className='bg-gray-100 border px-4 py-2 text-sky-600'>Max</td>
                      <td className='bg-gray-100 border px-4 py-2 text-sky-600'>Average</td>
                      <td className='bg-gray-100 border px-4 py-2 text-sky-600'>
                        Acceptable Limits
                      </td>
                    </tr>

                    <tr>
                      <td className='border px-6 py-2'>
                        Tangential<div className='bg-blue-700 h-1 w-6'></div>
                      </td>
                      <td className='border px-4 py-2'>2.1</td>
                      <td className='border px-4 py-2'>3.7</td>
                      <td className='border px-4 py-2'>2.9</td>
                      <td className='border px-4 py-2'>0-4.9</td>
                    </tr>
                    <tr>
                      <td className='border px-6 py-2'>
                        Axial<div className='bg-red-500 h-1 w-6'></div>
                      </td>
                      <td className='border px-4 py-2'>3.7</td>
                      <td className='border px-4 py-2'>4.7</td>
                      <td className='border px-4 py-2'>4.5</td>
                      <td className='border px-4 py-2'>0-4.9</td>
                    </tr>
                    <tr>
                      <td className='border px-6 py-2'>
                        Radial<div className='bg-green-700 h-1 w-6'></div>
                      </td>
                      <td className='border px-4 py-2'>3.8</td>
                      <td className='border px-4 py-2'>9.9</td>
                      <td className='border px-4 py-2'>7.4</td>
                      <td className='border px-4 py-2'>0-4.9</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <footer className='text-center font-semibold py-4'>6.</footer>
          </div>

          {/* seventh page */}
          <div>
            <div className='py-4 mx-2'>
              <h2 className='font-semibold mx-4'>Temperature Trend:</h2>
              <div className='w-full flex flex-col items-center'>
                <div className='w-fit h-fit border-2 border-current rounded-xl m-2 py-4 px-4 font-semibold'>
                  <TemperatureTrendGraph />
                </div>
              </div>
              <h2 className='font-semibold px-4'>Analysis Summary</h2>
              <div className='mx-2 border border-slate-900'>
                <table className='table-auto mx-auto w-full mb-10 '>
                  <tbody>
                    <tr>
                      <td className='bg-gray-100 border px-6 py-2 text-sky-600'>
                        Machine Parameter
                      </td>
                      <td className='bg-gray-100 border px-4 py-2 text-sky-600'>Min</td>
                      <td className='bg-gray-100 border px-4 py-2 text-sky-600'>Max</td>
                      <td className='bg-gray-100 border px-4 py-2 text-sky-600'>Average</td>
                      <td className='bg-gray-100 border px-4 py-2 text-sky-600'>
                        Acceptable Limits
                      </td>
                    </tr>

                    <tr>
                      <td className='border px-6 py-2'>DE Bearing</td>
                      <td className='border px-4 py-2'>2.1</td>
                      <td className='border px-4 py-2'>3.7</td>
                      <td className='border px-4 py-2'>2.9</td>
                      <td className='border px-4 py-2'>0-4.9</td>
                    </tr>
                    <tr>
                      <td className='border px-6 py-2'>Static Winding</td>
                      <td className='border px-4 py-2'>3.7</td>
                      <td className='border px-4 py-2'>4.7</td>
                      <td className='border px-4 py-2'>4.5</td>
                      <td className='border px-4 py-2'>0-4.9</td>
                    </tr>
                    <tr>
                      <td className='border px-6 py-2'>NDE Bearing</td>
                      <td className='border px-4 py-2'>3.8</td>
                      <td className='border px-4 py-2'>9.9</td>
                      <td className='border px-4 py-2'>7.4</td>
                      <td className='border px-4 py-2'>0-4.9</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h1 className='font-semibold text-lg bg-sky-200 px-4 my-2'>Past 24 hr Monitoring:</h1>
              <h2 className='font-semibold px-4'>Machine Acoustics</h2>
              <div className='flex-1 h-48  border-2 border-current rounded-xl m-2 py-2 px-4 font-semibold bg-gray-100'>
                Graph
              </div>
              <h2 className='font-semibold px-4'>Machine Acoustics</h2>
              <div className='flex-1 h-48  border-2 border-current rounded-xl m-2 py-2 px-4 font-semibold bg-gray-100'>
                Graph
              </div>
              <p className='font-semibold px-2'>
                Conclusion - Based on the analysis of real time data captured at {date} {time} (IST)
                the machine is in
                <span className='text-red-600'>UNHEALTHY</span> state and{' '}
                <span className='text-red-600'>Attention</span> Required as such.
              </p>
            </div>
            <footer className='text-center font-semibold'>7.</footer>
          </div>

          {/* eighth page */}
          <div>
            <div className='py-4 '>
              <h1 className='font-semibold text-lg bg-sky-200 mx-2 px-4 mb-4'>Glossary:</h1>
              <div className='flex h-full bg-gray-100 border border-slate-950 rounded-xl m-2 p-2 font-semibold'>
                <div className='container mx-auto mt-8'>
                  <table className='table-auto border border-collapse border-slate-950 w-full'>
                    <tbody>
                      <tr>
                        <td className='text-sky-600 border px-4 py-2 bg-gray-200  border-slate-500'>
                          ACCELERATION
                        </td>
                        <td className='border px-4 py-2 bg-gray-50 border-slate-500'></td>
                      </tr>

                      <tr>
                        <td className='text-sky-600 border px-4 py-2 bg-gray-200  border-slate-500'>
                          TEMPERATURE
                        </td>
                        <td className='border px-4 py-2 bg-gray-50 border-slate-500'></td>
                      </tr>

                      <tr>
                        <td className='text-sky-600 border px-4 py-2 bg-gray-200  border-slate-500'>
                          ORIENTATION
                        </td>
                        <td className='border px-4 py-2 bg-gray-50 border-slate-500'></td>
                      </tr>

                      <tr>
                        <td className='text-sky-600 border px-4 py-2 bg-gray-200  border-slate-500'>
                          VELOCITY
                        </td>
                        <td className='border px-4 py-2 bg-gray-50 border-slate-500'></td>
                      </tr>

                      <tr>
                        <td className='text-sky-600 border px-4 py-2 bg-gray-200  border-slate-500'>
                          MACHINE RPM
                        </td>
                        <td className='border px-4 py-2 bg-gray-50 border-slate-500'></td>
                      </tr>

                      <tr>
                        <td className='text-sky-600 border px-4 py-2 bg-gray-200  border-slate-500'>
                          ESTIMATED MACHINE LOADING
                        </td>
                        <td className='border px-4 py-2 bg-gray-50 border-slate-500'></td>
                      </tr>

                      <tr>
                        <td className='text-sky-600 border px-4 py-2 bg-gray-200  border-slate-500'>
                          ASSET NAME
                        </td>
                        <td className='border px-4 py-2 bg-gray-50 border-slate-500'></td>
                      </tr>

                      <tr>
                        <td className='text-sky-600 border px-4 py-2 bg-gray-200  border-slate-500'>
                          SITE
                        </td>
                        <td className='border px-4 py-2 bg-gray-50 border-slate-500'></td>
                      </tr>

                      <tr>
                        <td className='text-sky-600 border px-4 py-2 bg-gray-200  border-slate-500'>
                          APPLICATION
                        </td>
                        <td className='border px-4 py-2 bg-gray-50 border-slate-500'></td>
                      </tr>

                      <tr>
                        <td className='text-sky-600 border px-4 py-2 bg-gray-200  border-slate-500'>
                          MOTOR MAKE
                        </td>
                        <td className='border px-4 py-2 bg-gray-50 border-slate-500'></td>
                      </tr>

                      <tr>
                        <td className='text-sky-600 border px-4 py-2 bg-gray-200  border-slate-500'>
                          FRAME
                        </td>
                        <td className='border px-4 py-2 bg-gray-50 border-slate-500'></td>
                      </tr>

                      <tr>
                        <td className='text-sky-600 border px-4 py-2 bg-gray-200  border-slate-500'>
                          RATED AMBIENT TEMPERATURE
                        </td>
                        <td className='border px-4 py-2 bg-gray-50 border-slate-500'></td>
                      </tr>

                      <tr>
                        <td className='text-sky-600 border px-4 py-2 bg-gray-200  border-slate-500'>
                          INSULATION className
                        </td>
                        <td className='border px-4 py-2 bg-gray-50 border-slate-500'></td>
                      </tr>

                      <tr>
                        <td className='text-sky-600 border px-4 py-2 bg-gray-200  border-slate-500'>
                          MOTOR SERIAL NUMBER
                        </td>
                        <td className='border px-4 py-2 bg-gray-50 border-slate-500'></td>
                      </tr>

                      <tr>
                        <td className='text-sky-600 border px-4 py-2 bg-gray-200  border-slate-500'>
                          RATED POWER
                        </td>
                        <td className='border px-4 py-2 bg-gray-50 border-slate-500'></td>
                      </tr>

                      <tr>
                        <td className='text-sky-600 border px-4 py-2 bg-gray-200  border-slate-500'>
                          RATED RPM
                        </td>
                        <td className='border px-4 py-2 bg-gray-50 border-slate-500'></td>
                      </tr>

                      <tr>
                        <td className='text-sky-600 border px-4 py-2 bg-gray-200  border-slate-500'>
                          RATED VOLTAGE
                        </td>
                        <td className='border px-4 py-2 bg-gray-50 border-slate-500'></td>
                      </tr>

                      <tr>
                        <td className='text-sky-600 border px-4 py-2 bg-gray-200  border-slate-500'>
                          PERCENTAGE EFICIENCY
                        </td>
                        <td className='border px-4 py-2 bg-gray-50 border-slate-500'></td>
                      </tr>

                      <tr>
                        <td className='text-sky-600 border px-4 py-2 bg-gray-200  border-slate-500'>
                          LINE FREQUENCY
                        </td>
                        <td className='border px-4 py-2 bg-gray-50 border-slate-500'></td>
                      </tr>

                      <tr>
                        <td className='text-sky-600 border px-4 py-2 bg-gray-200  border-slate-500'>
                          POWER FACTOR
                        </td>
                        <td className='border px-4 py-2 bg-gray-50 border-slate-500'></td>
                      </tr>

                      <tr>
                        <td className='text-sky-600 border px-4 py-2 bg-gray-200  border-slate-500'>
                          DUTY
                        </td>
                        <td className='border px-4 py-2 bg-gray-50 border-slate-500'></td>
                      </tr>

                      <tr>
                        <td className='text-sky-600 border px-4 py-2 bg-gray-200  border-slate-500'>
                          DE BEARING NUMBER
                        </td>
                        <td className='border px-4 py-2 bg-gray-50  border-slate-500'></td>
                      </tr>

                      <tr>
                        <td className='text-sky-600 border px-4 py-2 bg-gray-200  border-slate-500'>
                          NDE BEARING NUMBER
                        </td>
                        <td className='border px-4 py-2 bg-gray-50 border-slate-500'></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <footer className='text-center font-semibold mb-80'>8.</footer>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Report;
