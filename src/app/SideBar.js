import { forwardRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3CenterLeftIcon, HomeIcon, PowerIcon, UserIcon } from '@heroicons/react/24/solid';
import PropTypes from 'prop-types';
import IEMALogo from '../assets/iemathree.png';

const SideBar = forwardRef(({ showNav, isMobile, setShowNav }, ref) => {
  const location = useLocation();
  return (
    <div ref={ref} className='fixed w-56 h-full bg-white shadow-md z-50'>
      {isMobile && (
        <div className='ml-2 sm:ml-7 mt-2 p-3 absolute left-full z-10 shadow-md bg-sky-900 rounded-full hover:bg-sky-950 '>
          <Bars3CenterLeftIcon
            className='h-7 w-7 text-white cursor-pointer'
            onClick={() => setShowNav(!showNav)}
          />
        </div>
      )}

      <div className='flex justify-center mt-7 mb-14 px-14 '>
        <div className='flex flex-col items-center'>
          <img className='w-32 h-auto' src={IEMALogo} alt='company logo' />
          <h1 className='text-xl font-bold text-blue-900'>IEMA</h1>
        </div>
      </div>

      <div className='flex flex-col'>
        <Link to='/home'>
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              location.pathname === '/home'
                ? 'bg-blue-100 text-blue-500'
                : 'text-gray-400 hover:bg-blue-100 hover:text-blue-500'
            }`}
          >
            <div className='mr-2 text-blue-600'>
              <HomeIcon className='h-5 w-5' />
            </div>
            <div className='text-blue-600'>
              <p>Home</p>
            </div>
          </div>
        </Link>
        <Link to='/clients'>
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              location.pathname === '/clients'
                ? 'bg-blue-100 text-blue-500'
                : 'text-gray-400 hover:bg-blue-100 hover:text-blue-500'
            }`}
          >
            <div className='mr-2 text-blue-600'>
              <UserIcon className='h-5 w-5' />
            </div>
            <div className='text-blue-600'>
              <p>Clients</p>
            </div>
          </div>
        </Link>
        <Link to='/'>
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              location.pathname === '/'
                ? 'bg-blue-100 text-blue-500'
                : 'text-gray-400 hover:bg-blue-100 hover:text-blue-500'
            }`}
          >
            <div className='mr-2 text-blue-600'>
              <PowerIcon className='h-5 w-5' />
            </div>
            <div className='text-blue-600'>
              <p>Logout</p>
            </div>
          </div>
        </Link>
      </div>
      {isMobile ? (
        <div
          className='w-screen h-screen backdrop-blur-sm absolute top-0 left-full'
          onClick={() => setShowNav(!showNav)}
        ></div>
      ) : (
        <></>
      )}
    </div>
  );
});

SideBar.displayName = 'SideBar';

SideBar.propTypes = {
  showNav: PropTypes.bool,
  isMobile: PropTypes.bool,
  setShowNav: PropTypes.func,
};

export default SideBar;
