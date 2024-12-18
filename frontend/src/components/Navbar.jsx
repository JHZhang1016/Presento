import { Link, useNavigate } from 'react-router-dom';
import { logoutApi } from '../../api.js';
import { useDataStore } from '../../src/app/store/store';
import { DarkThemeToggle, Button } from 'flowbite-react';
import { useShallow } from 'zustand/react/shallow'


const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));

  const handleLogout = async () => {
    await logoutApi();
    navigate('/');
  }

  const info = useDataStore(useShallow((state) => ({
    'title': state.currentPresentation?.title || '',
    'description': state.currentPresentation?.description || '',
    'thumbnail': state.currentPresentation?.thumbnail || ''
  })));

  const currentTitle = info.title;

  return (
    <>
      {isLoggedIn &&
        <>
          <header>
            <nav className='bg-white dark:bg-gray-900 w-full z-20 border-b border-gray-200 dark:border-gray-600 relative h-16 md:h-20 shadow-sm text-black dark:text-white'>
              <div className='fixed flex-grow min-w-40 sm:min-w-80 max-w-40 md:max-w-[calc(100vw-300px)] left-1/2 -translate-x-1/2 h-16'>
                {currentTitle && (
                  <span className='h-10 text-center flex items-center justify-center relative md:text-xl font-bold text-black rounded-full truncate text-sm text-nowrap px-3 md:px-10 shadow-inner bg-slate-50 top-3 md:top-5 dark:bg-gray-600 dark:text-white'>{currentTitle}
                  </span>
                )}
              </div>
              <div className='w-full flex flex-wrap items-center justify-between py-4 flex-0 h-full px-2 md:px-6'>
                <Link to='/dashboard' className='flex items-center text-xl md:text-3xl font-bold bg-clip-text text-transparent bg-slate-500 bg-gradient-to-r from-blue-600 to-cyan-400'>Presento</Link>
                <div className='flex flex-nowrap'>
                  <Button onClick={handleLogout} className='text-nowrap text-sm md:text-base flex items-center justify-center' size='xs' color='light' aria-label='log out'>Log Out</Button>
                  <DarkThemeToggle className='flex items-center gap-4 m-0 p-0.5 md:p-2 md:ml-4 ml-1' />

                </div>
              </div>
            </nav>
          </header>
        </>
      }
    </>
  )
}

export default Navbar