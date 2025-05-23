import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Import Link component for internal navigation
import BGImage from '../../assets/bg.jpg';
import IEMALogo from '../../assets/iemathree.png';

import './signup.css';
import API_URL from '../../config';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUserName] = useState('');
  const [phoneNumber, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Password and Confirm Password do not match');
      return;
    }

    const user = {
      firstName,
      lastName,
      username,
      phoneNumber,
      address,
      employeeId,
      password,
    };

    fetch(`${API_URL}/v1/sign-up`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json))
      .then(() => {
        navigate('/sign-in');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div
      className='min-h-screen flex flex-col lg:flex-row items-center justify-evenly bg-cover bg-center bg-no-repeat'
      style={{ backgroundImage: `url(${BGImage})` }}
    >
      <div className='my-10 flex flex-col items-center'>
        <img src={IEMALogo} alt='logo' className='w-40 sm:w-44 lg:w-72' />
        <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-900'> I E M A </h1>
      </div>
      <div
        className='w-80 sm:w-2/3 lg:w-1/3 min-w-fit lg:h-screen flex flex-col items-center justify-center  mb-10 lg:mb-0 p-8 rounded-2xl lg:rounded-none backdrop-blur-sm '
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}
      >
        <h2
          style={{ color: '#0d47a1' }}
          className='text-2xl sm:text-3xl lg:text-4xl font-bold mb-5'
        >
          Create Account
        </h2>

        <div className='w-full sm:flex gap-3'>
          <input
            type='text'
            placeholder='First Name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type='text'
            placeholder='Last Name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <input
          type='text'
          placeholder='Employee ID'
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
        />
        <input
          type='email'
          placeholder='Email'
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type='text'
          placeholder='Phone'
          value={phoneNumber}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type='text'
          placeholder='Address'
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <div className='w-full sm:flex gap-3'>
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button
          onClick={handleSignUp}
          className='w-1/2 mt-5 bg-blue-900 text-white px-3 py-2 rounded-2xl hover:bg-blue-800 '
        >
          Signup
        </button>
        <div className='text-white mb-2 btn-center mt-7'>
          <p>
            Already have an account?{' '}
            <Link to='/' className='text-blue-700 text-lg font-semibold'>
              Sign In!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
