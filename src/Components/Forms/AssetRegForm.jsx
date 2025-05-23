import { XMarkIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import API_URL from '../../config.js';

// eslint-disable-next-line react/prop-types
function AssetRegForm({ visible, handleClose }) {
  const assetTypes = ['motor', 'pump', 'blower', 'motor_with_pump', 'motor_with_grinder'];
  const sensorOptions = {
    motor: ['DE', 'NDE'],
    pump: ['Option1', 'Option2'], // Add sensor types for 'pump' as needed
    blower: ['Option1', 'Option2'], // Add sensor types for 'blower' as needed
    motor_with_pump: ['Option1', 'Option2'], // Add sensor types for 'motor_with_pump' as needed
    motor_with_grinder: ['Option1', 'Option2'], // Add sensor types for 'motor_with_grinder' as needed
  };
  const [formData, setFormData] = useState({
    assetType: '',
    assetName: '',
    assetSite: '',
    assetApplication: '',
    assetDescription: '',
    sensors: [
      {
        id: '',
        type: '',
      },
    ],
  });

  // get workshop code from the params
  // const workshopCode = window.location.pathname.split('/')[2];

  // remove WP- from the workshop code at beginning
  const workshopCode = window.location.pathname.split('/')[2].split('-')[1];

  // Function to format the form data into the desired structure
  const formatDataToSend = () => {
    const { assetType, assetSite, assetApplication, assetDescription, sensors } = formData;

    const formattedData = {
      workshop_code: workshopCode, // You can customize this value
      asset_type: `ID_${assetType}`, // Assuming assetType corresponds to the type you want
      site: assetSite,
      application: assetApplication,
      sensors_connected: sensors?.map((sensor) => ({
        sensor_id: sensor.id,
        sensor_type: sensor.type,
      })),
      asset_image: 'image/image.jpg', // You can add an image URL here if needed
      asset_description: assetDescription,
    };

    return formattedData;
  };

  const handleAssetTypeChange = (e) => {
    const selectedAssetType = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      assetType: selectedAssetType,
      sensors: Array.from({ length: getSensorCount(selectedAssetType) }, () => ({
        id: '',
        type: '',
      })),
    }));
  };

  const getSensorCount = (assetType) => {
    switch (assetType) {
      case 'motor':
      case 'pump':
      case 'blower':
        return 2;
      case 'motor_with_pump':
      case 'motor_with_grinder':
        return 4;
      default:
        return 0;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSensorChange = (index, e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const sensors = [...prevData.sensors];
      sensors[index] = { ...sensors[index], [name]: value };
      return { ...prevData, sensors };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSend = formatDataToSend();
    // const jsonData = JSON.stringify(dataToSend);
    console.log('JSON data to send:', dataToSend);

    fetch(`${API_URL}/data/asset/register-asset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        setFormData({
          assetType: '',
          assetName: '',
          assetSite: '',
          assetApplication: '',
          assetDescription: '',
          sensors: [
            {
              id: '',
              type: '',
            },
          ],
        });
        handleClose();
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  if (!visible) return null;
  return (
    <form
      onSubmit={handleSubmit}
      // resposiveness has to be done for sm: md: lg: xl: screens
      className='w-screen lg:w-[900px] p-6 pt-10 border rounded-lg shadow-md bg-white'
    >
      <div className='flex justify-end'>
        <button
          type='button'
          onClick={() => {
            setFormData({
              assetType: '',
              assetName: '',
              assetSite: '',
              assetApplication: '',
              assetDescription: '',
              sensors: [],
            });
            handleClose();
          }}
          className='relative bottom-7 left-3 p-1 bg-blue-400 hover:bg-blue-900 w-min rounded-full'
        >
          <XMarkIcon className='w-5 text-white' />
        </button>
      </div>
      <h1 className='text-center text-gray-700 text-3xl font-bold mb-5 -mt-5'>Asset Register</h1>
      <div className='sm:flex sm:flex-col md:flex md:flex-row gap-5'>
        <div className='sm:w-full sm:h-fit md:w-2/5 md:h-[527px] p-1 border rounded-lg shadow-md bg-white '>
          <h2 className='text-lg font-semibold -mt-0 pt-3'>Device View</h2>
          <div className='flex gap-2 justify-center'>
            {/* show workshop code */}
            <p className='text-sm font-semibold text-gray-700 mb-2'>Workshop Code: </p>
            <p className='text-sm font-semibold text-gray-700 mb-2'>WP-{workshopCode}</p>
          </div>
        </div>
        <div className='sm:w-full md:w-3/5'>
          <div className='mb-6'>
            <label htmlFor='assetType' className='block text-gray-700 font-semibold mb-2'>
              Asset Type:
            </label>
            <select
              id='assetType'
              name='assetType'
              value={formData.assetType}
              onChange={handleAssetTypeChange}
              className='block w-full px-5 py-2 border rounded-lg bg-white shadow-md placeholder-gray-400 text-gray-700 focus:ring focus:outline-none'
              required
            >
              <option value=''>Select Asset Type</option>
              {assetTypes?.map((type) => (
                <option key={type} value={type}>
                  {type.replace(/_/g, ' ')}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className='mb-6'>
              <label htmlFor='assetName' className='block text-gray-700 font-semibold mb-2 w-fit'>
                Asset Name:
              </label>
              <input
                type='text'
                name='assetName'
                value={formData.assetName}
                onChange={handleChange}
                className='block w-full px-5 py-2 border rounded-lg bg-white shadow-md placeholder-gray-400 text-gray-700 focus:ring focus:outline-none'
                placeholder='Asset Name'
                required
              />
            </div>

            {/* Add fields for workshop code, asset site, and asset application */}
            <div className='grid grid-cols-2 gap-2'>
              <div>
                {/* add workshop code as immutable field */}
                <label
                  htmlFor='workshopCode'
                  className='block text-gray-700 font-semibold mb-2 w-fit'
                >
                  Workshop Code:
                </label>
                <input
                  type='text'
                  id='workshopCode'
                  name='workshopCode'
                  value={`WP-${workshopCode}`}
                  className='block w-full px-5 py-2 border rounded-lg bg-gray-200 shadow-md placeholder-gray-400 text-gray-700 focus:outline-none'
                  placeholder='Workshop Code'
                  readOnly
                  required
                />
              </div>
              <div>
                <label htmlFor='assetSite' className='block text-gray-700 font-semibold mb-2 w-fit'>
                  Asset Site:
                </label>
                <input
                  type='text'
                  id='assetSite'
                  name='assetSite'
                  value={formData.assetSite}
                  onChange={handleChange}
                  className='block w-full px-5 py-2 border rounded-lg bg-white shadow-md placeholder-gray-400 text-gray-700 focus:ring focus:outline-none'
                  placeholder='Asset Site'
                  required
                />
              </div>
            </div>

            <div className='mb-6'>
              <label
                htmlFor='assetApplication'
                className='block text-gray-700 font-semibold mb-2 w-fit'
              >
                Asset Application:
              </label>
              <input
                type='text'
                id='assetApplication'
                name='assetApplication'
                value={formData.assetApplication}
                onChange={handleChange}
                className='block w-full px-5 py-2 border rounded-lg bg-white shadow-md placeholder-gray-400 text-gray-700 focus:ring focus:outline-none'
                placeholder='Machine application'
                required
              />
            </div>

            <div className='mb-6'>
              <label
                htmlFor='assetDescription'
                className='block text-gray-700 font-semibold mb-2 w-fit'
              >
                Asset Description:
              </label>
              <textarea
                id='assetDescription'
                name='assetDescription'
                value={formData.assetDescription}
                onChange={handleChange}
                className='block w-full px-5 py-2 border rounded-lg bg-white shadow-md placeholder-gray-400 text-gray-700 focus:ring focus:outline-none'
                placeholder='Asset description'
                rows='4'
                required
              />
            </div>

            {/* Section for inputting sensor data */}
          </div>
        </div>
      </div>
      <div className=''>
        {formData.sensors.length ? (
          <h2 className='text-lg font-semibold mb-4'>Sensor Data</h2>
        ) : (
          <div className='mt-16'></div>
        )}
        <div className='sm:flex sm:flex-col md:flex md:flex-row w-full h-fit gap-3 justify-center mt-1 -mb-36'>
          {formData.sensors?.map((sensor, index) => (
            <div
              key={index}
              className='border rounded-lg pl-3 pr-3 pt-3 shadow-lg md:max-w-[300px] md:w-full sm:mb-3 md:mb-0'
            >
              <h3 className='text-md font-semibold mb-2'>Sensor {index + 1}</h3>
              <div className='grid grid-row-1 pb-4'>
                <div>
                  <input
                    type='text'
                    id={`sensorId${index}`}
                    name='id'
                    value={sensor.id}
                    onChange={(e) => handleSensorChange(index, e)}
                    className='block w-full px-5 py-2 border rounded-lg bg-white shadow-md placeholder-gray-400 text-gray-700 focus:ring focus:outline-none'
                    placeholder='MUID'
                    required
                  />
                </div>
                <div>
                  <select
                    id={`sensorType${index}`}
                    name='type'
                    value={sensor.type}
                    onChange={(e) => handleSensorChange(index, e)}
                    className='block w-full px-5 py-2 border rounded-lg bg-white shadow-md placeholder-gray-400 text-gray-700 focus:ring focus:outline-none'
                    required
                  >
                    <option value=''>Select Sensor Type</option>
                    {sensorOptions[formData.assetType]?.map((sensorType) => (
                      <option key={sensorType} value={sensorType}>
                        {sensorType}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='flex items-center justify-end my-28'>
        <button
          type='submit'
          className='my-10 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-200'
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default AssetRegForm;
