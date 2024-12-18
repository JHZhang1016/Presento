import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDataStore } from '../../src/app/store/store';
import leftArrowImg from '../assets/leftArrow.svg';
import rightArrowImg from '../assets/rightArrow.svg';
import { useShallow } from 'zustand/react/shallow';
import { AnimatePresence, motion } from 'framer-motion';
import Box from './elements/Box';

const Preview = () => {
  const id = useParams().id;
  const loadPresentations = useDataStore((state) => state.loadPresentations);
  const setCurrentPresentation = useDataStore((state) => state.setCurrentPresentation);
  const presentation = useDataStore(useShallow((state) => state.currentPresentation));
  const slides = useDataStore(useShallow((state) => state.currentPresentation?.slideDetails || []));
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const slideLength = slides.length;

  console.log(slides);
  

  const onLeftArrowClick = () => {
    setDirection(0);
    setCurrentSlideIndex(currentSlideIndex - 1);
  }

  const onRightArrowClick = () => {
    setDirection(1);
    setCurrentSlideIndex(currentSlideIndex + 1);
  }

  const [disablePrev, setDisablePrev] = useState(false);
  const [disableNext, setDisableNext] = useState(false);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (currentSlideIndex <= 0) {
      setDisablePrev(true);
    } else {
      setDisablePrev(false);
    }
    if (currentSlideIndex >= slideLength - 1) {
      setDisableNext(true);
    } else {
      setDisableNext(false);
    }
  }, [currentSlideIndex, slideLength])

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? '100vw' : '-100vw',
      scale: 1,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? '-100vw' : '100vw',
      scale: 0.6,
    }),
  };

  const width = `min(100%, 100vh*(2))`;
  const [widthInPixels, setWidthInPixels] = useState(Math.min(window.innerWidth, window.innerHeight * 2));

  useEffect(() => {
    loadPresentations();
    setCurrentPresentation(id);
    function handleResize() {
      setWidthInPixels(Math.min(window.innerWidth, window.innerHeight * 2));
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      if (disablePrev) return;
      onLeftArrowClick();
    } else if (event.key === 'ArrowRight') {
      if (disableNext) return;
      onRightArrowClick();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, disablePrev, disableNext]);

  return (
    <>
      <div className='absolute inset-0 bg-gray-900 flex justify-center items-center -z-10 overflow-hidden'>
        <AnimatePresence
          custom={direction}
          initial={false}
        >
          {slides && slides.map((slide, pageIndex) => {
            const elementsOrder = slide.elementOrder;
            const elements = slide.elements;
            const backgroundOptions = slide.backgroundOptions || 0;
            const background = slide.background || '#ffffff';
            const backgroundStyle = backgroundOptions === 0 ? { backgroundColor: background } : backgroundOptions === 1 ? { backgroundImage: `url(${background})` } : { backgroundImage: `linear-gradient(to right, ${background.from}, ${background.to})` };
            if (pageIndex === currentSlideIndex)
              return (
                <motion.div
                  key={pageIndex}
                  custom={direction}
                  variants={variants}
                  initial='enter'
                  animate='center'
                  exit='exit'
                  transition={{ duration: 0.5 }}
                  className='absolute w-full h-full flex justify-center items-center'
                >
                  <div className='absolute flex-grow-0 aspect-[2/1] shadow-2xl bg-cover'
                    style={{ width: width, ...backgroundStyle }}>
                    {elementsOrder && elementsOrder.map((elementId, index) => {
                      const element = elements[elementId];
                      return (
                        <Box
                          key={index}
                          elementId={elementId}
                          elementDetails={element}
                          parentWidth={widthInPixels}
                          isPreviewing={true}
                        ></Box>
                      )
                    })}
                    <div className='absolute bottom-0 left-0 opacity-50 w-[50px] h-[50px] bg-gray-400 flex justify-center items-center text-[1em] font-bold shadow text-white'>{currentSlideIndex + 1}</div>
                  </div>
                </motion.div>
              )
          })
          }
        </AnimatePresence>
      </div>

      <div className='absolute right-10 bottom-10'>
        <button
          onClick={onLeftArrowClick}
          className={'mr-2 px-2 py-2 text-white rounded z-50 bg-opacity-30 bg-slate-600' + (disablePrev ? ' invisible' : '')}
          disabled={disablePrev}
          aria-label='switch to the previous slide'
        >
          <img src={leftArrowImg} alt='previous slide button' className='h-10 w-10' />
        </button>
        <button
          onClick={onRightArrowClick}
          className={'mr-2 px-2 py-2 text-white rounded z-50 bg-opacity-30 bg-slate-600' + (disableNext ? ' invisible' : '')}
          disabled={disableNext}
          aria-label='switch to the next slide'
        >
          <img src={rightArrowImg} alt='Next slide button' className='h-10 w-10' />
        </button>
      </div>
    </>
  )
}

export default Preview;
