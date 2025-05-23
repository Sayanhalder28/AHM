import { useState, useEffect, useRef, Fragment } from 'react';
import SideBar from './SideBar';
import TopBar from './TopBar';
import { Transition } from '@headlessui/react';
import PropTypes from 'prop-types';

export default function Layout({ children }) {
  const [refreshMain, setRefreshMain] = useState(0);
  const windowWidth = useRef(window.innerWidth);
  const windowHeight = useRef(window.innerHeight);
  const [showNav, setShowNav] = useState(() => {
    if (window.innerWidth <= 1365) {
      return false;
    } else return true;
  });
  const [isMobile, setIsMobile] = useState(() => {
    if (window.innerWidth <= 1365) {
      return true;
    } else return false;
  });

  const handleResize = () => {
    if (window.innerWidth !== windowWidth.current) {
      windowWidth.current = window.innerWidth;

      if (windowWidth.current <= 1365) {
        setShowNav(false);
        setIsMobile(true);
      } else if (windowWidth.current <= 600) {
        setShowNav(false);
        setIsMobile(true);
      } else {
        setShowNav(true);
        setIsMobile(false);
      }
      setRefreshMain((refreshMain) => !refreshMain);
    }
    if (!(window.innerWidth <= 1365) && window.innerHeight !== windowHeight.current) {
      windowHeight.current = window.innerHeight;
      setRefreshMain((refreshMain) => !refreshMain);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <TopBar showNav={showNav} setShowNav={setShowNav} />
      <Transition
        as={Fragment}
        show={showNav}
        enter='transform transition duration-[400ms]'
        enterFrom='-translate-x-full'
        enterTo='translate-x-0'
        leave='transform duration-[400ms] transition ease-in-out'
        leaveFrom='translate-x-0'
        leaveTo='-translate-x-full'
      >
        <SideBar showNav={showNav} isMobile={isMobile} setShowNav={setShowNav} />
      </Transition>
      <main
        key={refreshMain}
        className={`pt-16 transition-all duration-[400ms] bg-gray-50 min-h-screen ${
          showNav && !isMobile ? 'pl-56' : ''
        }`}
      >
        {children}
      </main>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
