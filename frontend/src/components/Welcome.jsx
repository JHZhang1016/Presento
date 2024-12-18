import { useNavigate } from 'react-router-dom';
import { Carousel } from 'flowbite-react';
import { Button } from 'flowbite-react';
import { DarkThemeToggle } from 'flowbite-react';
import carouselImg1 from '../assets/carousel/carousel_1.png';
import carouselImg2 from '../assets/carousel/carousel_2.png';
import carouselImg3 from '../assets/carousel/carousel_3.png';
import carouselImg4 from '../assets/carousel/carousel_4.png';
import carouselImg5 from '../assets/carousel/carousel_5.png';



function Welcome() {
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate('/login');
  }

  const goToRegister = () => {
    navigate('/Register');
  }

  const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));

  return (
    <>
      <div className='flex py-6 md:py-20 xl:py-40 px-10 md:px-20 xl:px-40 2xl:px-60 gap-10 md:gap-20 flex-col lg:flex-row w-[100vw] h-[100vh] justify-center items-center dark:bg-gradient-to-r dark:from-slate-800 dark:to-gray-600 bg-gradient-to-r from-slate-300 to-slate-200'>
        <DarkThemeToggle className='absolute top-4 right-4' />
        <div className='dark:text-darkmode-textcolor'>
          <div>
            <h1 className='text-4xl md:text-5xl font-bold mb-8'>Make better presentations</h1>
            <p className='mb-10 text-sm md:text-lg'>Create exceptional slide decks in half the time using intuitive design tools and machine learning. Present remotely or on-site.</p>
            {!isLoggedIn &&
              <div className='flex gap-6'>
                <Button color='blue' onClick={goToLogin} className='w-40' aria-label='login'>Log in</Button>
                <Button color='light' onClick={goToRegister} className='w-40' aria-label='sign up'>Sign up</Button>
              </div>}
            {isLoggedIn && <Button color='blue' onClick={() => navigate('/dashboard')} className='w-40' aria-label="navigate to dashboard">Go to dashboard</Button>}
          </div>
        </div>
        <div className='max-w-[1000px] w-full shadow-2xl aspect-[2/1]'>
          <Carousel className='bg-slate-100 dark:bg-slate-700'>
            <img src={carouselImg1} alt='Show presentation card in dashboard' className='object-contain h-full w-full' />
            <img src={carouselImg2} alt='Show basic text and image editing' className='object-contain h-full w-full' />
            <img src={carouselImg3} alt='Show code highlighting feature' className='object-contain h-full w-full' />
            <img src={carouselImg4} alt='Show dark mode' className='object-contain h-full w-full' />
            <img src={carouselImg5} alt='Show preview feature' className='object-contain h-full w-full' />
          </Carousel>
        </div>
      </div>
    </>
  )
}

export default Welcome;