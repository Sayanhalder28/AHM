import React, { useState } from 'react';
import PropTypes from 'prop-types';

function SetThreshold({ machineRatings }) {
  const initialData = machineRatings
    ? machineRatings.map((rating) => ({
        rating,
        greenStart: '',
        greenEnd: '',
        yellowStart: '',
        yellowEnd: '',
        redStart: '',
        redEnd: '',
      }))
    : [];

  const [data, setData] = useState(initialData);

  const handleInputChange = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = value;
    setData(newData);
  };

  return (
    <table className='w-full'>
      <thead className='flex'>
        <tr className='bg-slate-100 w-full'>
          <th className='px-16 w-1/4 pb-2 whitespace-pre'>Machine Rating</th>
          <th className='px-24 w-1/4 pb-2'>Green</th>
          <th className='px-24 w-1/4 pb-2'>Yellow</th>
          <th className='px-32 w-1/4 pb-2'>Red</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index} className='flex'>
            <td className='border px-4 py-2 flex justify-center items-center w-1/4 text-xl font-semibold bg-slate-200'>
              {row.rating}
            </td>
            <td className='border px-4 py-2 flex w-1/4 justify-center'>
              <input
                type='text'
                className='w-1/2 mr-2 px-2 py-1 border rounded'
                placeholder='Start'
                value={row.greenStart}
                onChange={(e) => handleInputChange(index, 'greenStart', e.target.value)}
              />
              <input
                type='text'
                className='w-1/2 px-2 py-1 border rounded'
                placeholder='End'
                value={row.greenEnd}
                onChange={(e) => handleInputChange(index, 'greenEnd', e.target.value)}
              />
            </td>
            <td className='border px-4 py-2 flex w-1/4 justify-center'>
              <input
                type='text'
                className='w-1/2 mr-2 px-2 py-1 border rounded'
                placeholder='Start'
                value={row.yellowStart}
                onChange={(e) => handleInputChange(index, 'yellowStart', e.target.value)}
              />
              <input
                type='text'
                className='w-1/2 px-2 py-1 border rounded'
                placeholder='End'
                value={row.yellowEnd}
                onChange={(e) => handleInputChange(index, 'yellowEnd', e.target.value)}
              />
            </td>
            <td className='border px-4 py-2 flex w-1/4 justify-center'>
              <input
                type='text'
                className='w-1/2 mr-2 px-2 py-1 border rounded'
                placeholder='Start'
                value={row.redStart}
                onChange={(e) => handleInputChange(index, 'redStart', e.target.value)}
              />
              <input
                type='text'
                className='w-1/2 px-2 py-1 border rounded'
                placeholder='End'
                value={row.redEnd}
                onChange={(e) => handleInputChange(index, 'redEnd', e.target.value)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

SetThreshold.propTypes = {
  machineRatings: PropTypes.arrayOf(PropTypes.string),
};

export default SetThreshold;
