/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import MultiRangeSlider from 'multi-range-slider-react';
import PropTypes from 'prop-types';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

function ThresholdSlider({ type, min, max, onChange, value }) {
  return (
    <>
      <style>
        {`
          #range-slider-gradient {
            height: 10px;
            border-radius: 12px;
            background: linear-gradient(to right, #00cc00, #ffa500, #ff0000);
          }
          
          #range-slider-gradient .range-slider__thumb {
            border: 6px solid #fff;
            box-sizing: border-box;
          }
          
          #range-slider-gradient .range-slider__thumb[data-lower] {
            background: green;
          }
          
          #range-slider-gradient .range-slider__thumb[data-upper] {
            background: orange;
          }
          
          #range-slider-gradient .range-slider__range {
            background: #ffa500;
            background-size: 200% 100%;
            background-position: 50% 0;
          }
          
          #range-slider-gradient .range-slider__range[data-active],
          #range-slider-gradient
            .range-slider__thumb[data-active]
            ~ .range-slider__range {
            animation: move-bg 0.75s infinite linear;
          }
          
        `}
      </style>
      <div className='mb-2'>
        <h3
          className='mt-2 shadow-lg w-fit p-2 rounded-t-lg bg-slate-300 text-slate text-center text-sm font-semibold
      '
        >
          {type}
        </h3>
        {/* main div */}
        <div className='w-full flex flex-col sm:flex-row border-2 p-5 gap-6 bg-slate-200 rounded-xl rounded-tl-none'>
          {/* multi range slider div */}
          <div className='flex flex-col sm:w-1/3 justify-center gap-1'>
            <MultiRangeSlider
              className='w-full border-none'
              min={min}
              max={max}
              step={3}
              minValue={value.min}
              maxValue={value.max}
              barInnerColor='#6da2ff'
              thumbLeftColor='#6da2ff'
              thumbRightColor='#6da2ff'
              onChange={(input) => {
                onChange({ ...value, min: input.minValue, max: input.maxValue });
              }}
              style={{ border: 'none', boxShadow: 'none' }}
            />
            <div className='w-full'>
              <span className='text-md font-medium text-gray-700'>Min</span>
              <span className='text-md font-medium text-gray-700 float-right'>Max</span>
            </div>
          </div>
          {/* other sliders div */}
          <div className='flex flex-col sm:w-2/3 gap-3'>
            {/* input sliders div */}
            <div className='flex p-6 justify-around items-center bg-slate-300 rounded-xl shadow-inner'>
              <RangeSlider
                id='range-slider-gradient'
                min={value.min}
                max={value.max}
                value={[value.healthy, value.warning]}
                className='margin-lg'
                step={1}
                onInput={(input) => onChange({ ...value, healthy: input[0], warning: input[1] })}
              />
            </div>
            {/* value div */}
            <div className='flex gap-2 sm:gap-6 justify-between items-end'>
              <div className='w-full text-center'>
                <label className='text-gray-700 text-md font-medium'>Mini</label>
                <input
                  type='number'
                  className='thresholdText text-center border rounded  text-lime-600 font-bold'
                  value={value.min}
                  // onChange={handleMin}
                  readOnly
                />
              </div>

              <div className='w-full text-center'>
                <label className='text-gray-700 text-md font-medium'>Healthy</label>
                <input
                  id='healthy'
                  className='thresholdText w-full text-center border rounded text-lime-700 font-bold'
                  type='number'
                  min={value.min}
                  max={value.max}
                  value={value.healthy}
                  onInput={(e) => onChange({ ...value, healthy: parseInt(e.target.value) })}
                />
              </div>
              <div className='w-full text-center'>
                <label className='text-gray-700 text-md font-medium'>Warning</label>
                <input
                  id='warning'
                  className='thresholdText text-center border rounded text-amber-500 font-bold'
                  type='number'
                  min={value.min}
                  max={value.max}
                  value={value.warning}
                  onInput={(e) => onChange({ ...value, warning: parseInt(e.target.value) })}
                />
              </div>
              <div className='w-full text-center'>
                <label className='text-gray-700 text-md font-medium'>Max</label>
                <input
                  type='number'
                  className='thresholdText text-center border rounded text-red-700 font-bold'
                  value={value.max}
                  // onChange={handleMax}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

ThresholdSlider.propTypes = {
  type: PropTypes.string,
};

export default ThresholdSlider;
