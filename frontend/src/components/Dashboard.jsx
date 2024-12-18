import { useState, useEffect } from 'react';
import Modal from './Modal';
import Form from './Form';
import { randomId } from '../helpers.js';
import { useDataStore } from '../../src/app/store/store';
import PresentationCard from './PresentationCard';
import factories from '../app/factories.js';

const Dashboard = () => {
  const [isShowCreateModal, setIsShowCreateModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [description, setDescription] = useState('');
  const loadPresentations = useDataStore((state) => state.loadPresentations);
  const createNewPresentation = useDataStore((state) => state.createPresentations)
  const clearCurrentPresentation = useDataStore((state) => state.clearCurrentPresentation);
  const presentations = useDataStore((state) => state.presentations);
  
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      loadPresentations();
    }
  }, []);

  useEffect(() => {
    clearCurrentPresentation();
  }, [clearCurrentPresentation]);

  const newPresentationFields = [
    {
      label: 'Name',
      name: 'name',
      type: 'text',
      placeholder: 'Name of your presentation',
      value: newName,
      onChange: (e) => setNewName(e.target.value),
      validate: (value) => {
        return value !== '' ? '' : 'Name can not be empty.';
      }
    },
    {
      label: 'Description',
      name: 'description',
      type: 'text',
      placeholder: 'Optional',
      value: description,
      onChange: (e) => setDescription(e.target.value),
    }
  ]

  const handleClickNew = () => {
    setNewName('');
    setDescription('');
    setIsShowCreateModal(true);
  }

  const handleSubmit = () => {    
    createNewPresentation({title: newName, thumbnailUrl: '', description: description, defaultBackgroundType: 0, defaultBackgroundValue: '#ffffff'});
    setIsShowCreateModal(false);
  }

  return (
    <>
      <main>
        <div className='bg-slate-200 w-full md:min-h-[calc(100vh-5rem)] md:max-h-[calc(100vh-5rem)] min-h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] overflow-auto dark:bg-gray-800'>
          <div className='gap-4 py-6 px-6 sm:px-10 md:px-10 xl:px-32 2xl:px-36 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 '>
            <div className='hover:cursor-pointer bg-cardBackGround aspect-[2/1] shadow-lg gap-4 p-4 min-w-[100px] flex rounded-md dark:bg-gray-600' tabIndex='0'>
              <button className='bg-gray-100 outline-2 outline-dashed outline-gray-200 rounded-lg col-span-8 col-start-1 max-w-full max-h-full w-full' onClick={handleClickNew} data-testid='new-presentation' aria-label='create new presentation' aria-haspopup="dialog">
                <svg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill='none' stroke='#000000' strokeWidth='0.0002' className='w-full h-full dark:bg-gray-600'>
                  <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
                  <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
                  <g id='SVGRepo_iconCarrier'>
                    <path fill='#d4d4d4' fillRule='evenodd' d='M9 17a1 1 0 102 0v-6h6a1 1 0 100-2h-6V3a1 1 0 10-2 0v6H3a1 1 0 000 2h6v6z'></path>
                  </g>
                </svg>
              </button>
            </div>

            {Object.keys(presentations).length !== 0 &&
              Object.keys(presentations).reverse().map((key) => (
                <PresentationCard
                  key={key}
                  title={presentations[key].title}
                  thumbnail_url={presentations[key].thumbnailUrl}
                  description={presentations[key].description}
                  id={key}
                >
                </PresentationCard>
              ))
            }
          </div>

        </div>
        {isShowCreateModal && (
          <Modal
            isShow={isShowCreateModal}
            setIsShow={setIsShowCreateModal}
            title='Create new Presentation'
          >
            <Form
              fields={newPresentationFields}
              buttonText='create'
              onSubmit={handleSubmit}
            ></Form>
          </Modal>
        )}
      </main>
    </>
  )
}

export default Dashboard;