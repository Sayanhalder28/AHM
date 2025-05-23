/* eslint-disable react/prop-types */
import React from 'react';

function Gears({ running }) {
  return (
    <>
      <style>
        {`
        .gears-container{
            width: 50px; 
            height: 50px;
            font-size:24px;
            position: relative; 
        }
        .gear-rotate{
            width: 2em;
            height: 2em;
            top: 90%; 
            left: 100%; 
            margin-top: -1em;
            margin-left: -1em;
            background: #9e9e98;
            position: absolute;
            border-radius: 1em;
            -webkit-animation: 1s gear-rotate linear infinite;
            -moz-animation: 1s gear-rotate linear infinite;
            animation: 1s gear-rotate linear infinite;
        }
        .gear-rotate-left{
            margin-top: -2.2em;
            top: 90%;
            right: 60%;
            width: 2em;
            height: 2em;
            background: #9e9e98;
            position: absolute;
            border-radius: 1em;
            -webkit-animation: 1s gear-rotate-left linear infinite;
            -moz-animation: 1s gear-rotate-left linear infinite;
            animation: 1s gear-rotate-left linear infinite;
        }

        .gear-rotate::before, .gear-rotate-left::before {
            width: 2.8em;
            height: 2.8em;
            background: 
            -webkit-linear-gradient(0deg,transparent 39%,#9e9e98 39%,#9e9e98 61%, transparent 61%),
            -webkit-linear-gradient(60deg,transparent 42%,#9e9e98 42%,#9e9e98 58%, transparent 58%),
            -webkit-linear-gradient(120deg,transparent 42%,#9e9e98 42%,#9e9e98 58%, transparent 58%);
            background: 
            -moz-linear-gradient(0deg,transparent 39%,#9e9e98 39%,#47EC19 61%, transparent 61%),
            -moz-linear-gradient(60deg,transparent 42%,#9e9e98 42%,#9e9e98 58%, transparent 58%),
            -moz-linear-gradient(120deg,transparent 42%,#9e9e98 42%,#9e9e98 58%, transparent 58%);
            background: 
            -o-linear-gradient(0deg,transparent 39%,#9e9e98 39%,#9e9e98 61%, transparent 61%),
            -o-linear-gradient(60deg,transparent 42%,#9e9e98 42%,#9e9e98 58%, transparent 58%),
            -o-linear-gradient(120deg,transparent 42%,#47EC19 42%,#9e9e98 58%, transparent 58%);
            background: -ms-linear-gradient(0deg,transparent 39%,#9e9e98 39%,#9e9e98 61%, transparent 61%),-ms-linear-gradient(60deg,transparent 42%,#9e9e98 42%,#9e9e98 58%, transparent 58%),-ms-linear-gradient(120deg,transparent 42%,#9e9e98 42%,#9e9e98 58%, transparent 58%);
            background: 
            linear-gradient(0deg,transparent 39%,#9e9e98 39%,#9e9e98 61%, transparent 61%),
            linear-gradient(60deg,transparent 42%,#9e9e98 42%,#9e9e98 58%, transparent 58%),
            linear-gradient(120deg,transparent 42%,#9e9e98 42%,#9e9e98 58%, transparent 58%);
            position: absolute;
            content:"";
            top: -.4em;
            left: -.4em;
            border-radius:1.4em;
        }
        .gear-rotate::after, .gear-rotate-left::after {
            width: 1em;
            height: 1em;
            background: black;
            position: absolute;
            content:"";
            top: .5em;
            left: .5em;
            border-radius: .5em;
        }

        /*
        * Keyframe Animations 
        */ 

        ${
          running &&
          `@-webkit-keyframes gear-rotate {
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

        @-webkit-keyframes gear-rotate-left {
            0% {
            -webkit-transform: rotate(30deg); 
            }
            100% {
                -webkit-transform: rotate(210deg);
            }
        }

        @-moz-keyframes gear-rotate-left {
            0% { 
            -webkit-transform: rotate(30deg); 
            }
            100% { 
                -webkit-transform: rotate(210deg);
            }
        }

        @keyframes gear-rotate-left {
            0% { 
            -webkit-transform: rotate(30deg); 
            }
            100% { 
                -webkit-transform: rotate(210deg);
            }
        }`
        }
        `}
      </style>
      <div className='gears-container'>
        <div className='gear-rotate'></div>
        <div className='gear-rotate-left'></div>
      </div>
    </>
  );
}

export default Gears;
