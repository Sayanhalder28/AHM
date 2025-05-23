import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { XMarkIcon, ListBulletIcon } from '@heroicons/react/24/solid';

function FloatingMenu({ className, children }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <style>
        {`@keyframes rotateRightIcon {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(90deg);
            }
        }

        @keyframes buttonAppear {
            0% {
                opacity: 0.5;
                transform: scale(0.9);
            }
            100% {
                opacity: 1;
                transform: scale(1);
            }
        }

        @keyframes slideInFromButton {
            0% {
                opacity: 0;
                transform: scale(0.9) translateY(100px);
            }
            100% {
                opacity: 1;
                transform: scale(1) translateY(0px); /* Adjust the translateY value */
            }
        }

        .rotate-right-icon {
            animation: rotateRightIcon 600ms;
        }

        .button-appear {
            animation: buttonAppear 300ms;
        }

        .slide-in-from-button {
            animation: slideInFromButton 300ms;
        }
        `}
      </style>
      <div className={`fixed z-50 right-6 bottom-6 text-end ${className}`}>
        <div className={`slide-in-from-button ${isOpen ? 'visible' : 'hidden'}`}>{children}</div>
        <div className='relative w-12 h-12 mt-4 flex justify-center items-center'>
          {isOpen ? (
            <XMarkIcon
              className='w-10 h-10 rounded-full p-2 bg-blue-800 text-slate-200 shadow-2xl rotate-right-icon'
              onClick={handleClick}
            />
          ) : (
            <ListBulletIcon
              className='w-12 h-12 rounded-full p-2 bg-blue-800 text-slate-200 shadow-2xl button-appear '
              onClick={handleClick}
            />
          )}
          <div className='absolute -z-10 w-16 h-16  rounded-full backdrop-blur-2xl border-2 border-gray-500 border-opacity-30'></div>
        </div>
      </div>
    </>
  );
}

FloatingMenu.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default FloatingMenu;
