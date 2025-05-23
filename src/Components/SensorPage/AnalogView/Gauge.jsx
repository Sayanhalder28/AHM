import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import GaugeComponent from 'react-gauge-component';

function Gauge({ value, minValue, maxValue, breaks, unit, name, timeStamps }) {
  const setWidth = () => {
    if (window.innerWidth <= 600) return '25vw';
    else if (window.innerWidth <= 800) return '25%';
    else if (window.innerWidth <= 1450) return '30%';
    else return '35%';
  };

  const limits = [...breaks, maxValue];
  const colors = ['#5be12c', '#f5cd19', '#ea4228'];

  const width = setWidth();

  const getPointerColour = (val) => {
    if (val < limits[0]) return colors[0];
    else if (val >= limits[0] && val < limits[1]) return colors[1];
    else if (val >= limits[1] && val <= limits[2]) return colors[2];
  };

  const [pointerColour, setPointerColour] = useState(getPointerColour(value));

  useEffect(() => {
    setPointerColour(getPointerColour(value));
  }, [value, timeStamps]);

  return (
    <div className='backdrop-blur-xl bg-slate-900 rounded-3xl px-5 py-3 h-max'>
      <style>
        {`.gauge-component-class svg {
          overflow: visible;
        }`}
      </style>
      <GaugeComponent
        type='radial'
        value={value}
        minValue={minValue}
        maxValue={maxValue}
        style={{
          width: width,
          height: 'auto',
        }}
        arc={{
          subArcs: limits.map((limit, index) => ({
            limit,
            color: colors[index],
            showMark: true,
          })),
        }}
        labels={{
          valueLabel: {
            formatTextValue: (val) => `${val} ${unit}`,
            // matchColorWithArc: true,
            style: {
              fontSize: '55px',
              fontWeight: 'semibold',
              fill: '#fff',
              textShadow: 'black 0px 0px 0px, black 0px 0px 0px, black 0px 0px 0px',
            },
          },
          markLabel: {
            type: 'outer',
            marks: limits.map((limit) => ({ value: limit })),
            valueConfig: { formatTextValue: (val) => val },
            style: {
              fontSize: '45px',
              fontWeight: 'semibold',
              fill: '#fff',
              textShadow: 'black 0px 0px 0px, black 0px 0px 0px, black 0px 0px 0px',
            },
          },
        }}
        pointer={{
          elastic: true,
          animationDelay: 10,
          color: pointerColour,
        }}
      />

      <div className='xl:text-lg sm:text-sm text-white text-semibold text-center'>{name}</div>
    </div>
  );
}

Gauge.propTypes = {
  value: PropTypes.number.isRequired,
  minValue: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
  breaks: PropTypes.arrayOf(PropTypes.number).isRequired,
  timeStamps: PropTypes.arrayOf(PropTypes.string),
  unit: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Gauge;
