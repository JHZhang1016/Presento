import { createPortal } from 'react-dom';

const Modal = ({ isShow, setIsShow, title, children }) => {
  if (!isShow) return null;


  const handleColse = () => {
    setIsShow(false);
  }

  const handleBackgroundClick = (e) => {
    e.stopPropagation();
  };

  const handleDragEvent = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    createPortal(
      <div className='fixed inset-0 bg-opacity-80 z-50 bg-gray-950 flex items-center justify-center dark:text-white'
        onClick={handleBackgroundClick}
        onDragStart={handleDragEvent}
        onDragOver={handleDragEvent}
        onDrop={handleDragEvent}
      >
        <div className='relative bg-white rounded-lg shadow-2xl min-w-96 min-h-64 dark:bg-gray-700'
          onDragStart={handleDragEvent}
          onDragOver={handleDragEvent}
          onDrop={handleDragEvent}
          role='alertdialog' aria-modal='true'
        >
          <span className='flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-500'>
            <h3 className='text-lg font-semibold '>{title}</h3>
            <button type='button' onClick={handleColse} className='text-gray-400 text-sm w-8 h-8 ms-auto bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg inline-flex justify-center items-center' aria-label='close the modal'>
              <svg className='w-3 h-3' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 14 14'>
                <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6' />
              </svg>
            </button>
          </span>
          <div className='px-4 pb-10'>
            {children}
          </div>
        </div>
      </div>
      , document.body
    ))
}

export default Modal;