/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';

function SingleGear({ running }) {
  return (
    <>
      <style>
        {`
          .gears{
            display: inline-block;
            position: absolute;
            top: 18%;
            left: 8%;
          }
          .gears:first-child{
            margin-right: 3%;
          }
          .gears-container{
              font-size:8px;
              position: relative; 
          }
         
           .gear-rotate{
            width: 2em;
            height: 2em;
            top: 50%; 
            left: 50%; 
            margin-top: -1em;
            margin-left: -1em;
            background: #737373;
            position: absolute;
            border-radius: 1em;
            -webkit-animation: 1s gear-rotate linear infinite;
            -moz-animation: 1s gear-rotate linear infinite;
            animation: 1s gear-rotate linear infinite;
          }

          .gear-still{
            width: 2em;
            height: 2em;
            top: 50%; 
            left: 50%; 
            margin-top: -1em;
            margin-left: -1em;
            background: #737373;
            position: absolute;
            border-radius: 1em;
          }
         
          .gear-rotate::before, .gear-still::before {
            width: 2.8em;
            height: 2.8em;
            background: 
              -webkit-linear-gradient(0deg,transparent 39%,#737373 39%,#737373 61%, transparent 61%),
              -webkit-linear-gradient(60deg,transparent 42%,#737373 42%,#737373 58%, transparent 58%),
              -webkit-linear-gradient(120deg,transparent 42%,#737373 42%,#737373 58%, transparent 58%);
            background: 
              -moz-linear-gradient(0deg,transparent 39%,#737373 39%,#47EC19 61%, transparent 61%),
              -moz-linear-gradient(60deg,transparent 42%,#737373 42%,#737373 58%, transparent 58%),
              -moz-linear-gradient(120deg,transparent 42%,#737373 42%,#737373 58%, transparent 58%);
            background: 
              -o-linear-gradient(0deg,transparent 39%,#737373 39%,#737373 61%, transparent 61%),
              -o-linear-gradient(60deg,transparent 42%,#737373 42%,#737373 58%, transparent 58%),
              -o-linear-gradient(120deg,transparent 42%,#47EC19 42%,#737373 58%, transparent 58%);
            background: -ms-linear-gradient(0deg,transparent 39%,#737373 39%,#737373 61%, transparent 61%),-ms-linear-gradient(60deg,transparent 42%,#737373 42%,#737373 58%, transparent 58%),-ms-linear-gradient(120deg,transparent 42%,#737373 42%,#737373 58%, transparent 58%);
            background: 
                linear-gradient(0deg,transparent 39%,#737373 39%,#737373 61%, transparent 61%),
              linear-gradient(60deg,transparent 42%,#737373 42%,#737373 58%, transparent 58%),
              linear-gradient(120deg,transparent 42%,#737373 42%,#737373 58%, transparent 58%);
            position: absolute;
            content:"";
            top: -.4em;
            left: -.4em;
            border-radius:1.4em;
          }

          .gear-rotate::after, .gear-still::after {
            width: 1em;
            height: 1em;
            background: #fff;
            position: absolute;
            content:"";
            top: .5em;
            left: .5em;
            border-radius: .5em;
          }
          
          /*
          * Keyframe Animations 
          */ 

          @-webkit-keyframes gear-rotate {
            0% { 
              -webkit-transform: rotate(0deg);
            }
            100% { 
              -webkit-transform: rotate(-180deg); 
            }
          }

          @-moz-keyframes gear-rotate {
            0% { 
              transform: rotate(0deg);
            }
            100% { 
              transform: rotate(-180deg); 
            }
          }

          @keyframes gear-rotate {
            0% { 
              transform: rotate(0deg); 
            }
            100% { 
              transform: rotate(-180deg); 
            }
          }
        `}
      </style>
      <div className='gears' id='one-gear'>
        <div className='gears-container'>
          {running ? <div className='gear-rotate'></div> : <div className='gear-still'></div>}
        </div>
      </div>
    </>
  );
}

export default SingleGear;

SingleGear.propTypes = {
  running: PropTypes.bool.isRequired,
};
