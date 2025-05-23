import React from 'react';
import PropTypes from 'prop-types';

const GlowingDot = ({ className, colour }) => {
  return (
    <>
      <style>
        {`
        .led-dimentions {
            width: 5px;
            height: 3px;
            border-radious: 50%;
        }
        .color-green {
            background-color: rgb(0, 255, 0);
        }
        .color-red {
            background-color: rgb(255, 0, 0);
        }
        .color-orange {
            background-color: rgb(255, 153, 0);
        }
        .color-blue {
            background-color: rgb(0, 0, 255);
        }
        .glow-green {
            box-shadow: 0 0 10px 10px rgba(0, 255, 0, 0.8);
        }
        .glow-red {
            box-shadow: 0 0 10px 10px rgba(255, 0, 0, 0.8);
        }
        .glow-orange {
            box-shadow: 0 0 10px 10px rgb(255, 153, 0);
        }
        .glow-blue{
            box-shadow: 0 0 10px 10px rgba(0, 0, 255, 0.8);
        }`}
      </style>
      <div className={className}>
        <div className={'flex items-center justify-center led-dimentions color-' + colour}>
          <div className={'rounded-full animate-ping glow-' + colour} />
        </div>
      </div>
    </>
  );
  //   rgba(0, 255, 0, 0.7)
};

GlowingDot.propTypes = {
  className: PropTypes.string,
  colour: PropTypes.string,
};

export default GlowingDot;
