/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import ThresholdSlider from './thresholdUtilities/ThresholdSlider';
import Checkbox from './thresholdUtilities/checkbox';
import { XMarkIcon } from '@heroicons/react/24/solid';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import API_URL from '../../config';
import popMessage from '../../Utils/PopUp';

function ThresholdForm({ visible, handleClose, thresholdData }) {
  useEffect(() => {
    console.log('Threshold form rendered', thresholdData);
  }, []);

  const { sensorId } = useParams();
  const [formData, setFormData] = useState({
    temperatureThreshold: {
      min: thresholdData.temperature_min,
      healthy: thresholdData.temperature_healthy,
      warning: thresholdData.temperature_warning,
      max: thresholdData.temperature_max,
    },
    vibrationThreshold: {
      min: thresholdData.vibration_min,
      healthy: thresholdData.vibration_healthy,
      warning: thresholdData.vibration_warning,
      max: thresholdData.vibration_max,
    },
    magneticFluxThreshold: {
      min: thresholdData.magnetic_flux_min,
      healthy: thresholdData.magnetic_flux_healthy,
      warning: thresholdData.magnetic_flux_warning,
      max: thresholdData.magnetic_flux_max,
    },
    microphonicsThreshold: {
      min: thresholdData.ultrasound_min,
      healthy: thresholdData.ultrasound_healthy,
      warning: thresholdData.ultrasound_warning,
      max: thresholdData.ultrasound_max,
    },
    allSensor: false,
    allAsset: false,
  });

  const handleThresholdChange = (type, value) => {
    const checkLimit = (value) => {
      if (value.max <= value.warning) value.warning = value.max - 1;
      if (value.min >= value.healthy) value.healthy = value.min + 1;

      if (value.warning <= value.healthy) {
        if (value.healthy - 1 == value.min) value.warning = value.healthy + 1;
        else value.healthy = value.warning - 1;
      }
      return value;
    };
    const checkedValue = checkLimit(value);
    setFormData((prevData) => ({
      ...prevData,
      [`${type}Threshold`]: checkedValue,
    }));
  };

  const handleCheckboxChange = (type, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [type]: value,
    }));
  };

  const handleSubmit = () => {
    // Prepare the data to be sent in JSON format
    const jsonData = {
      sensor_id: sensorId,
      temperature_min: formData.temperatureThreshold.min,
      temperature_healthy: formData.temperatureThreshold.healthy,
      temperature_warning: formData.temperatureThreshold.warning,
      temperature_max: formData.temperatureThreshold.max,
      vibration_min: formData.vibrationThreshold.min,
      vibration_healthy: formData.vibrationThreshold.healthy,
      vibration_warning: formData.vibrationThreshold.warning,
      vibration_max: formData.vibrationThreshold.max,
      magnetic_flux_min: formData.magneticFluxThreshold.min,
      magnetic_flux_healthy: formData.magneticFluxThreshold.healthy,
      magnetic_flux_warning: formData.magneticFluxThreshold.warning,
      magnetic_flux_max: formData.magneticFluxThreshold.max,
      ultrasound_min: formData.microphonicsThreshold.min,
      ultrasound_healthy: formData.microphonicsThreshold.healthy,
      ultrasound_warning: formData.microphonicsThreshold.warning,
      ultrasound_max: formData.microphonicsThreshold.max,
      allSensor: formData.allSensor,
      allAsset: formData.allAsset,
    };

    // Log the JSON data to be sent

    fetch(`${API_URL}/data/sensor/update-sensor-threshold`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 200) {
          if (data.data[0].changedRows) {
            popMessage('Success', 'success', 'Threshold value updated successfully .', () => {
              handleClose();
              // TODO: Make a log to the record about the thresshold change and the user who made the change
              window.location.reload();
            });
          } else if (data.data[0].changedRows === 0) {
            popMessage(
              'Warning',
              'warning',
              'Failed to edit threshold value. Please update the input and try again.',
            );
          }
        } else popMessage('Error', 'error', 'Failed to edit threshold value. Please try again.');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  if (!visible) return null;
  return (
    <div className='w-screen sm:w-[550px] md:w-[700px] lg:w-[800px] xl:w-[1000px] 2xl:w-[1100px]  p-6 pt-10 border rounded-2xl shadow-md bg-white'>
      <div className='flex justify-end'>
        <button
          type='button'
          onClick={() => {
            handleClose();
          }}
          className='relative bottom-7 left-3 p-1 bg-slate-400 hover:bg-slate-900 w-min rounded-full'
        >
          <XMarkIcon className='w-5 text-white' />
        </button>
      </div>
      <h1 className='text-center text-slate-700 text-3xl font-bold mb-3 -mt-10'>
        Sensor Threshold Value
      </h1>
      <div className='mb-3'>
        <h1 className='font-semibold text-lg text-gray-700 flex justify-center'>Sensor Ranges</h1>

        <ThresholdSlider
          type={'Temperature'}
          min={0}
          max={100}
          onChange={(value) => handleThresholdChange('temperature', value)}
          value={formData.temperatureThreshold}
        />
        <ThresholdSlider
          type={'Vibration'}
          min={0}
          max={16}
          onChange={(value) => handleThresholdChange('vibration', value)}
          value={formData.vibrationThreshold}
        />
        <ThresholdSlider
          type={'MagneticFlux'}
          min={0}
          max={16}
          onChange={(value) => handleThresholdChange('magneticFlux', value)}
          value={formData.magneticFluxThreshold}
        />
        <ThresholdSlider
          type={'Microphonics'}
          min={0}
          max={16}
          onChange={(value) => handleThresholdChange('microphonics', value)}
          value={formData.microphonicsThreshold}
        />
        <Checkbox
          className={'text-sm sm:text-base md:text-lg font-semibold'}
          label={'Apply changes to every sensors on this asset'}
          onChange={(isChecked) => handleCheckboxChange('allSensor', isChecked)}
          value={formData.allSensor}
        />
        <Checkbox
          className={'text-sm sm:text-base md:text-lg font-semibold'}
          label={'Apply changes to every asset having same specifications'}
          onChange={(isChecked) => handleCheckboxChange('allAsset', isChecked)}
          value={formData.allAsset}
        />
        <div className='flex items-center justify-center'>
          <button
            type='button' // Change the type to 'button' to prevent accidental form submission
            onClick={handleSubmit}
            className='my-10 bg-blue-700 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-200'
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

ThresholdForm.propTypes = {
  visible: PropTypes.bool,
  handleClose: PropTypes.func,
  thresholdData: PropTypes.object,
};

export default ThresholdForm;
