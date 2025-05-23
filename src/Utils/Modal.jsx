/* eslint-disable no-unused-vars */
// import { PlusCircleIcon } from "@heroicons/react/24/solid";
import React, { useState, cloneElement } from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';
import PropTypes from 'prop-types';

function Modal({ children }) {
  const [visible, setVisible] = useState(false);

  const handleVisible = () => {
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  const renderChildren = (Type) => {
    return React.Children.map(children, (child) => {
      if (Type == 'ButtonIcon') {
        if (child.props.id === Type) {
          return cloneElement(child);
        }
      } else if (Type == 'ModalBody') {
        if (child.props.id === Type) {
          return cloneElement(child, { visible, handleClose });
        }
      }
    });
  };

  const Icon = renderChildren('ButtonIcon');
  const modalBody = renderChildren('ModalBody');

  return (
    <div id='modal'>
      {/* <button onClick={handleVisible} className='p-0 m-0'> */}
      <div onClick={handleVisible} className='m-0 cursor-pointer rounded-full hover:bg-slate-300'>
        {Icon.length ? (
          Icon
        ) : (
          <PlusIcon className='w-12 h-12 rounded-full p-2 bg-slate-100 text-gray-500 shadow-md border border-slate-300 border-opacity-60' />
        )}
      </div>
      {/* </button> */}
      <section
        className={`h-screen w-screen pt-20 sm:py-20 fixed inset-0 bg-slate-200 bg-opacity-20 backdrop-blur-sm z-50 flex items-start justify-center overflow-y-scroll overflow-x-hidden ${
          visible ? 'visible' : 'hidden'
        } ${visible ? 'pointer-events-auto' : 'pointer-events-non'}`}
        onClick={handleClose}
      >
        <div className='w-min' onClick={(e) => e.stopPropagation()}>
          {modalBody.length ? (
            modalBody
          ) : (
            <div className='w-96 h-96 bg-gray-300 flex justify-center items-center'>
              Add the ModalBody elemnt
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Modal;
