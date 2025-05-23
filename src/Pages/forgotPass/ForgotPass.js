import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IEMALogo from '../../assets/iemathree.png';
import SAILLogo from '../../assets/sailtwoo.png';
import './forgotpass.css';

function ForgotPass() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleForgotPass = (e) => {
    // Perform authentication logic here (e.g., validate credentials)
    // For simplicity, we'll just redirect to another page after 2 seconds
    e.preventDefault();

    const user = {
      username,
    };

    alert('Recovery link sent to your email');

    console.log(user);

    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  return (
    <div className='forgot-pass-container'>
      <div>
        <img src={IEMALogo} alt='logo' className='h-auto mt-6 mb-14 mr-52' />
      </div>
      <div className='forgot-pass-form'>
        <h2>Recover Password</h2>
        <input
          type='text'
          placeholder='Enter username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={handleForgotPass} className=' mt-5'>
          Recover
        </button>
      </div>
      <div>
        <img src={SAILLogo} alt='' className='h-auto mt-12 mb-14 ml-52' />
      </div>
    </div>
  );
}

export default ForgotPass;
