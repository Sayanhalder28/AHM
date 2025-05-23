/* eslint-disable no-unused-vars */
import React from 'react';

import PropTypes from 'prop-types';

const Checkbox = ({ label, onChange, value, className }) => {
  return (
    <div className={className ?? ' '}>
      <label className='w-max max-w-full relative flex justify-start items-center gap-5 group p-2'>
        <input
          type='checkbox'
          className='absolute w-full h-full peer appearance-none rounded-md'
          // checked={value}
          onInput={(e) => {
            onChange(e.target.checked);
          }}
        />
        <span className='w-16 h-8 flex items-center flex-shrink-0 p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-teal-600 after:w-6 after:h-6 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-8 group-hover:after:translate-x-1 group-hover:bg-blue-300'></span>
        <div className='text-wrap'>{label}</div>
      </label>
    </div>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.bool.isRequired,
};

export default Checkbox;
