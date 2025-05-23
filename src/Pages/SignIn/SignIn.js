import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import BGImage from '../../assets/bg.jpg';
import IEMALogo from '../../assets/iemathree.png';
import { fetchUser } from '../../app/redux/features/user/userSlice';
import { useSelector, useDispatch } from 'react-redux';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userStatus = useSelector((state) => state.user.status);
  const handleLogin = async (e) => {
    // Perform authentication logic here (e.g., validate credentials)
    // For simplicity, we'll just redirect to another page after 2 seconds
    e.preventDefault();

    const userDetails = {
      username,
      password,
    };
    const response = await dispatch(fetchUser(userDetails)).then((res) => res);
    if (response.payload) {
      if (response.payload.status === 'success') {
        navigate('/home');
      }
      if (response.payload.status === 'unauthorized') {
        alert(response.payload.errors.massage);
      }
      if (response.payload.status === 'error') {
        alert(response.payload.message);
      }
    }
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
        className='w-80 sm:w-2/3 lg:w-1/3 lg:h-screen flex flex-col items-center justify-center min-w-fit mb-10 lg:mb-0 p-8 rounded-2xl lg:rounded-none backdrop-blur-sm '
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}
      >
        <h2
          style={{ color: '#0d47a1' }}
          className='text-2xl sm:text-3xl lg:text-4xl font-bold mb-5'
        >
          Login
        </h2>
        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {userStatus === 'loading' ? (
          <button className='w-1/2 mt-5 bg-blue-900 text-white px-3 py-2 rounded-2xl hover:bg-blue-800 '>
            Loading . . .
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className='w-1/2 mt-5 bg-blue-900 text-white px-3 py-2 rounded-2xl hover:bg-blue-800 '
          >
            Login
          </button>
        )}

        <div className=' mt-5 text-center text-blue-700 mb-5'>
          <div className=' text-white'>
            <a href='/forgot-password'>Forgot Password?</a>
            <br />
            or
          </div>
          <Link to='/sign-up' className='text-blue-700 text-lg font-semibold'>
            Sign Up!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
