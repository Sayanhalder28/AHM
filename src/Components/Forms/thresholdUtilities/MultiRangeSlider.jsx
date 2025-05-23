/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

function MultiRangeSlider() {
  const [minValue, set_minValue] = useState(25);
  const [maxValue, set_maxValue] = useState(75);
  const handleInput = (e) => {
    set_minValue(e.minValue);
    set_maxValue(e.maxValue);
  };
  const handleMin = (e) => {
    e.preventDefault();
    set_minValue(e.target.value);
  };
  const handleMax = (e) => {
    e.preventDefault();
    set_maxValue(e.target.value);
  };
  return (
    <>
      <style>
        {`
      .range-slider.flat {
    --thumb-size: 25px;
    --track-height: calc(var(--thumb-size) / 3);
    --progress-shadow: none;
    --progress-flll-shadow: none;
    --thumb-shadow: 0 0 0 7px var(--primary-color) inset, 0 0 0 99px white inset;
    --thumb-shadow-hover: 0 0 0 9px var(--primary-color) inset,
      0 0 0 99px white inset;
    --thumb-shadow-active: 0 0 0 13px var(--primary-color) inset;
         } 
         
         `}
      </style>
      <div className='mb-2'>
        <div
          className='range-slider flat'
          data-ticks-position='top'
          //   style={
          //     '--min:-500; --max:500; --value-a:-220; --value-b:400; --suffix:"%"; --text-value-a:"-220"; --text-value-b:"400";'
          //   }
        />
        <input type='range' value={minValue} onChange={handleMin} />
        <output></output>
        <input type='range' value={maxValue} onChange={handleMax} />
        <output></output>
        <div className='range-slider__progress'></div>
      </div>
    </>
  );
}

export default MultiRangeSlider;
