import React from 'react';
import PropTypes from 'prop-types';

function PageHeading({ name, children }) {
  return (
    <div className='flex flex-col sm:flex-row flex-nowrap mb-3'>
      <div className='w-full pb-3 sm:p-0'>
        <p className='text-gray-800 text-2xl font-bold'>{name}</p>
        <p className='hidden sm:block text-gray-600 text-base font-semibold '>
          {window.location.pathname}
        </p>
      </div>
      {children}
    </div>
  );
}

PageHeading.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default PageHeading;
