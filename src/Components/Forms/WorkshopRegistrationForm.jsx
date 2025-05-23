import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import PropTypes from 'prop-types';
import './WorkshopRegistrationForm.css';
import API_URL from './../../config';

const workShopCodeRegEx = /^[A-Z0-9]{3,}$/;
const workShopNameRegEx = /^[A-Za-z\s]{5,}$/;
const workShopAddressRegEx = /^[a-zA-Z0-9\s.,#-]{5,}$/;
const workShopDescriptionRegEx = /^[a-zA-Z0-9\s.,#-:]{5,}$/;

function WorkshopRegistrationForm({ visible, handleClose }) {
  const [formData, setFormData] = useState({
    workshopCode: '',
    workshopName: '',
    workshopAddress: '',
    description: '',
    supervisors: [],
    image: null, // Add an image property to store the base64 image
  });

  const clearForm = () => {
    setFormData({
      workshopCode: '',
      workshopName: '',
      workshopAddress: '',
      description: '',
      supervisors: [],
      image: null,
    });
    handleClose();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData({ ...formData, image: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const addSupervisor = () => {
    setFormData({
      ...formData,
      supervisors: [...formData.supervisors, { name: '', email: '', password: '' }],
    });
  };

  const removeSupervisor = (index) => {
    const updatedSupervisors = [...formData.supervisors];
    updatedSupervisors.splice(index, 1);
    setFormData({
      ...formData,
      supervisors: updatedSupervisors,
    });
  };

  const handleSupervisorChange = (index, field, value) => {
    const updatedSupervisors = [...formData.supervisors];
    updatedSupervisors[index][field] = value;
    setFormData({
      ...formData,
      supervisors: updatedSupervisors,
    });
  };

  const validateForm = () => {
    // Perform validation checks on the form data
    if (
      !formData.workshopCode ||
      !formData.workshopName ||
      !formData.workshopAddress ||
      !formData.description
    ) {
      alert('Please fill in all required fields.');
      return false;
    }

    // Additional validation checks can be added based on your requirements

    if (!workShopCodeRegEx.test(formData.workshopCode)) {
      alert('Workshop Code is invalid.');
      return false;
    }
    if (!workShopNameRegEx.test(formData.workshopName)) {
      alert('Workshop Name is invalid.');
      return false;
    }
    if (!workShopAddressRegEx.test(formData.workshopAddress)) {
      alert('Workshop Address is invalid.');
      return false;
    }
    if (!workShopDescriptionRegEx.test(formData.description)) {
      alert('Workshop Description is invalid.');
      return false;
    }
    // else if (formData.supervisors.length === 0) {
    //   alert('Please add at least one supervisor.');
    //   return false;
    // }

    return true;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validate the form data
    if (!validateForm()) {
      return;
    }

    // Create the JSON object with the required format
    const workshopData = {
      workshop_code: formData.workshopCode,
      workshop_name: formData.workshopName,
      workshop_address: formData.workshopAddress,
      workshop_description: formData.description,
    };

    // Add the supervisors to the JSON object
    // workshopData.supervisors = formData.supervisors.map((supervisor) => ({
    //   name: supervisor.name,
    //   email: supervisor.email,
    //   password: supervisor.password,
    // }));

    // If you need to include the image data in the JSON, you can add it as a base64 string
    // workshopData.image = formData.image;

    // Send the data to the backend as JSON
    fetch(`${API_URL}/data/workshop/register-workshop`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(workshopData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // Clear the form data and close the modal
        clearForm();
        // reload the page to show the new workshop
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  if (!visible) return null;

  return (
    <div className='modal-container'>
      <div className='modal'>
        <div className='modal-content'>
          <h1 className='text-4xl font-semibold text-slate-600 mb-4'>Register Workshop</h1>
          <form onSubmit={handleFormSubmit}>
            <div className='mb-4'>
              <label className='text-slate-600'>Workshop Code</label>
              <input
                type='text'
                className='border-2 border-slate-400 rounded-md p-2 w-full'
                placeholder='Workshop Code'
                value={formData.workshopCode}
                onChange={(e) => setFormData({ ...formData, workshopCode: e.target.value })}
                required
              />
            </div>
            <div className='mb-4'>
              <label className='text-slate-600'>Workshop Name</label>
              <input
                type='text'
                className='border-2 border-slate-400 rounded-md p-2 w-full'
                placeholder='Workshop Name'
                value={formData.workshopName}
                onChange={(e) => setFormData({ ...formData, workshopName: e.target.value })}
                required
              />
            </div>
            <div className='mb-4'>
              <label className='text-slate-600'>Workshop Address</label>
              <input
                type='text'
                className='border-2 border-slate-400 rounded-md p-2 w-full'
                placeholder='Workshop Address'
                value={formData.workshopAddress}
                onChange={(e) => setFormData({ ...formData, workshopAddress: e.target.value })}
                required
              />
            </div>
            <div className='mb-4'>
              <label className='text-slate-600'>Description</label>
              <textarea
                className='border-2 border-slate-400 rounded-md p-2 w-full'
                placeholder='Description'
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>
            <div className='mb-4 flex flex-col items-center'>
              <label className='text-slate-600'>Workshop Image</label>
              {
                // Display the image if it exists
                formData.image && (
                  <img
                    src={formData.image}
                    alt='Workshop'
                    className='border-2 border-slate-400 rounded-md p-2 w-[15%]'
                  />
                )
              }
              {/* // option to remove the image */}
              <button
                onClick={() => setFormData({ ...formData, image: null })}
                className={
                  'bg-red-400 rounded-md p-2 text-white mt-2 text-center' +
                  (formData.image ? '' : ' hidden')
                }
              >
                Remove Image
              </button>
              <label
                className='
                text-slate-600 text-center mb-2
              '
              >
                <span className='text-red-500'>*</span>Image should be in .jpg or .png format and
                not more than 1MB
              </label>
              <input
                type='file'
                accept='image/*'
                size={
                  100 * 1024
                } /* 100 in bytes, you can change the size according to your needs */
                className='border-2 border-slate-400 rounded-md p-2 w-full'
                onChange={handleImageChange}
              />
            </div>
            <div className='mb-4'>
              <h2 className='text-3xl font-medium text-slate-600 mb-2'>Supervisors</h2>
              {formData.supervisors.map((supervisor, index) => (
                <div key={index} className='mb-4'>
                  <h3 className='text-lg font-semibold text-slate-600 mb-2'>
                    Supervisor {index + 1}
                  </h3>
                  <div className='flex'>
                    <div className='mr-2'>
                      <label className='text-slate-600'>Name</label>
                      <input
                        type='text'
                        className='border-2 border-slate-400 rounded-md p-2 w-full'
                        placeholder='Name'
                        value={supervisor.name}
                        onChange={(e) => handleSupervisorChange(index, 'name', e.target.value)}
                        required
                      />
                    </div>
                    <div className='mr-2'>
                      <label className='text-slate-600'>Email</label>
                      <input
                        type='email'
                        className='border-2 border-slate-400 rounded-md p-2 w-full'
                        placeholder='Email'
                        value={supervisor.email}
                        onChange={(e) => handleSupervisorChange(index, 'email', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className='text-slate-600'>Password</label>
                      <input
                        type='password'
                        className='border-2 border-slate-400 rounded-md p-2 w-full'
                        placeholder='Password'
                        value={supervisor.password}
                        onChange={(e) => handleSupervisorChange(index, 'password', e.target.value)}
                        required
                      />
                    </div>
                    <button className='ml-2 text-red-500'>
                      <XMarkIcon className='h-5 w-5' onClick={() => removeSupervisor(index)} />
                    </button>
                  </div>
                </div>
              ))}
              <button className='bg-slate-400 rounded-md p-2 text-white' onClick={addSupervisor}>
                Add Supervisor
              </button>
            </div>
            <div className='flex justify-end'>
              <button className='bg-slate-400 rounded-md p-2 text-white' type='submit'>
                Register
              </button>
              <button className='bg-red-400 rounded-md p-2 text-white ml-2' onClick={clearForm}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

WorkshopRegistrationForm.propTypes = {
  visible: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default WorkshopRegistrationForm;
