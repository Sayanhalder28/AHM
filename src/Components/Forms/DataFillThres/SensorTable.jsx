import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SensorTable = ({ sensorGroups }) => {
  const initialData = sensorGroups
    ? sensorGroups.map((group) => ({
        group,
        rangeStart: '',
        rangeEnd: '',
        green: '',
        yellow: '',
        red: '',
      }))
    : [];

  const [data, setData] = useState(initialData);

  const handleInputChange = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = value;
    setData(newData);
  };

  return (
    <table className='w-fit'>
      <thead className='flex'>
        <tr className='bg-slate-100'>
          <th className='px-14 pb-2 whitespace-pre'>Sensor Group</th>
          <th className='px-20 pb-2'>Range</th>
          <th className='px-20 pb-2'>Green</th>
          <th className='px-20 pb-2'>Yellow</th>
          <th className='px-28 pb-2'>Red</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index} className='flex'>
            <td className='border px-4 py-2 flex justify-center items-center w-1/5 text-xl font-semibold bg-slate-200'>
              {row.group}
            </td>
            <td className='border px-4 py-2 flex w-1/5 justify-center'>
              <input
                type='text'
                className='w-1/2 mr-2 px-2 py-1 border rounded'
                placeholder='Start'
                value={row.rangeStart}
                onChange={(e) => handleInputChange(index, 'rangeStart', e.target.value)}
              />
              <input
                type='text'
                className='w-1/2 px-2 py-1 border rounded'
                placeholder='End'
                value={row.rangeEnd}
                onChange={(e) => handleInputChange(index, 'rangeEnd', e.target.value)}
              />
            </td>
            <td className='border px-4 py-2 flex w-1/5 justify-center'>
              <input
                type='text'
                className='w-5/6 px-2 py-1 border rounded'
                placeholder='Green'
                value={row.green}
                onChange={(e) => handleInputChange(index, 'green', e.target.value)}
              />
              <span className='bg-slate-400 rounded w-1/6 h-10 flex justify-center items-center py-1 px-2'>
                %
              </span>
            </td>
            <td className='border px-4 py-2 flex w-1/5 justify-center'>
              <input
                type='text'
                className='w-5/6 px-2 py-1 border rounded'
                placeholder='Yellow'
                value={row.yellow}
                onChange={(e) => handleInputChange(index, 'yellow', e.target.value)}
              />
              <span className='bg-slate-400 rounded w-1/6 h-10 flex justify-center items-center py-1 px-2'>
                %
              </span>
            </td>
            <td className='border px-4 py-2 flex w-1/5 justify-center'>
              <input
                type='text'
                className='w-5/6 px-2 py-1 border rounded'
                placeholder='Red'
                value={row.red}
                onChange={(e) => handleInputChange(index, 'red', e.target.value)}
              />
              <span className='bg-slate-400 rounded w-1/6 h-10 flex justify-center items-center py-1 px-2'>
                %
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

SensorTable.propTypes = {
  sensorGroups: PropTypes.arrayOf(PropTypes.string),
};

export default SensorTable;
