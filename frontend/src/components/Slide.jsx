import { useState, useEffect } from 'react';
import { useDataStore } from '../../src/app/store/store';
import Box from './elements/Box';
import { useShallow } from 'zustand/react/shallow';


const Slide = ({ presentationID, isPreviewing }) => {
  const presentation = useDataStore(useShallow((state) => state.currentPresentation));
  const currentSlideIndex = useDataStore(useShallow((state) => state.currentSlideIndex));
  const slides = useDataStore(useShallow((state) => state.currentPresentation?.slideDetails || []));
  const elementsOrder = useDataStore(useShallow((state) => state.getCurrentElementOrder() || []));
  const elements = useDataStore(useShallow((state) => state.getElements()));
  const [backgroundOptions, setBackgroundOptions] = useState(0);
  const [background, setBackground] = useState('#ffffff');
  const [backgroundStyle, setBackgroundStyle] = useState({});
  const [slideLength, setSlideLength] = useState(0);

  console.log(presentation);
  console.log(slides);
  console.log(elementsOrder);
  

  let width = `min(98%, 85vh*(2))`;
  if (isPreviewing) {
    width = `min(100%, 100vh*(2))`;
  }

  const [widthInPixels, setWidthInPixels] = useState(Math.min(window.innerWidth * 0.98, window.innerHeight * 0.85 * 2));

  useEffect(() => {
    function handleResize() {
      setWidthInPixels(Math.min(window.innerWidth * 0.98, window.innerHeight * 0.85 * 2));
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);



  useEffect(() => {
    if(slides === null) return;
    setBackgroundOptions(slides[currentSlideIndex]?.backgroundType || 0);
    setBackground(slides[currentSlideIndex]?.backgroundValue || '#ffffff');
    setSlideLength(slides.length);
  }, [slides, currentSlideIndex]);

  useEffect(() => {
    setBackgroundStyle(backgroundOptions === 0 ? { backgroundColor: background } : backgroundOptions === 1 ? { backgroundImage: `url(${background})` } : { backgroundImage: `linear-gradient(to right, ${background.from}, ${background.to})` });
  }, [backgroundOptions, background]);

  if (!presentation) {
    return <p>Loading presentation...</p>;
  }

  if (slides.length === 0) {
    return <p>No slides available.</p>;
  }

  return (
    <>
      <div className='relative flex-grow-0 mf:m-4 w-[calc()] aspect-[2/1] shadow-2xl bg-cover'
        style={{ width: width, ...backgroundStyle }}>
        {elementsOrder && elementsOrder.map((elementId) => {
          const element = elements[elementId];
          return (
            <Box
              key={elementId}
              elementId={elementId}
              elementDetails={element}
              parentWidth={widthInPixels}
              isPreviewing={isPreviewing}
            ></Box>
          )
        })}
        <div data-testid='nth-slide' className='absolute bottom-0 left-0 opacity-50 w-[50px] h-[50px] bg-gray-400 flex justify-center items-center text-[1em] font-bold shadow text-white'>{currentSlideIndex + 1}</div>
      </div>
    </>
  )
}

export default Slide;