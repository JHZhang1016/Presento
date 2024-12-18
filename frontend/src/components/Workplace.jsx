import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Slide from './Slide';
import Toolbox from './Tools/Toolbox';
import { useDataStore } from '../../src/app/store/store';

const Workplace = () => {
  const id = useParams().id;
  const loadPresentations = useDataStore((state) => state.loadPresentations);
  const setCurrentPresentation = useDataStore((state) => state.setCurrentPresentation);
  const presentations = useDataStore((state) => state.presentations);
  const currentPresentation = useDataStore((state) => state.currentPresentation);
  // console.log('currentPresentation', currentPresentation);
  

  useEffect(() => {    
    loadPresentations();
    setCurrentPresentation(id);
  }, []);

  return (
    <>
      <main>
        <div className='dark:bg-gray-800 flex flex-col justify-center items-center bg-workPlace w-full md:min-h-[calc(100vh-5rem)] md:max-h-[calc(100vh-5rem)] min-h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] h-[200px]'>
          <div className='w-full flex-grow-0'>
            <Toolbox></Toolbox>
          </div>

          <div className='flex-grow w-full flex justify-center items-center'>
            <Slide
              presentationID={id}
              isPreviewing={false}
            ></Slide>
          </div>
        </div>
      </main>
    </>
  )
}

export default Workplace;