import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ConfirmPopup from '../ConfirmPopup';
import { toast } from 'react-toastify';
import { useShallow } from 'zustand/react/shallow';
import { useDataStore } from '../../../src/app/store/store';
import backArrowImg from '../../assets/leftArrow.svg'
import nextArrowImg from '../../assets/rightArrow.svg';
import backToDashboardImg from '../../assets/returnPage.svg';
import previewSvg from '../../assets/preview.svg';
import deleteImg from '../../assets/delete.svg';
import deleteSlideImg from '../../assets/deleteSlide.svg';
import newSlideImg from '../../assets/newSlide.svg';
import NewText from './CreateNewText.jsx';
import NewImage from './NewImage';
import NewVideo from './NewVideo';
import NewCode from './NewCode';
import EditPresentation from './EditPresentation';
import EditSlide from './EditSlide';

const Toolbox = () => {
  const id = useParams().id;
  const navigate = useNavigate();
  const currentPage = useDataStore(useShallow((state) => state.currentSlideIndex));
  const slideLength = useDataStore(useShallow((state) => state.getSlideCount()));
  const [isShowDeletePresentationModal, setIsShowDeletePresentationModal] = useState(false);
  const [isShowDeleteSlideModal, setIsShowDeleteSlideModal] = useState(false);

  const deletePresentation = useDataStore(useShallow((state) => state.deletePresentation));
  const handleDeletePresentationConfirm = () => {
    try {
      setIsShowDeletePresentationModal(false);
      deletePresentation(id).then(() => {
        navigate('/dashboard');
        toast.success('Presentation deleted successfully');
      });
    } catch {
      toast.error('Failed to delete presentation');
    }
  }
  const handleDeletePresentationCancle = () => {
    setIsShowDeletePresentationModal(false);
  }

  const [disablePrev, setDisablePrev] = useState(false);
  const [disableNext, setDisableNext] = useState(false);

  const setPrevSlide = useDataStore((state) => state.setPrevSlide);
  const handlePreviousSlide = () => {
    setPrevSlide();
  }
  const setNextSlide = useDataStore((state) => state.setNextSlide);
  const handleNextSlide = () => {
    setNextSlide();
  }

  useEffect(() => {
    if (currentPage <= 0) {
      setDisablePrev(true);
    } else {
      setDisablePrev(false);
    }
    if (currentPage >= slideLength - 1) {
      setDisableNext(true);
    } else {
      setDisableNext(false);
    }
  }, [currentPage, slideLength])

  const deleteCurrentSlide = useDataStore((state) => state.deleteCurrentSlide);
  const handleDeleteSlide = async () => {
    try {
      await deleteCurrentSlide();
      setIsShowDeleteSlideModal(false);
      toast.success('Slide deleted successfully');

    } catch (err) {
      toast.error(err.message);
    }
  }

  const newSlide = useDataStore((state) => state.newSlide)
  const handleNewSlide = async () => {
    try {
      await newSlide();
      toast.success('New slide added');
    } catch {
      toast.error('Failed to delete presentation', { toastId: 'newSlide' });
    }
  }

  const handlePrevew = () => {
    window.open(`${window.location.origin}/preview/${id}`, '_blank')
  }

  const splitBar = () => { return <div className='w-[1px] min-h-full bg-gray-300 dark:bg-gray-900 m-1'></div> }

  const buttonStyle = `h-full flex-grow px-3 py-2 text-xs bg-gray-600 hover:bg-gray-900 rounded-lg text-white focus:ring-2 focus:outline-none focus:ring-blue-300 flex flex-col items-center justify-center gap-1 border-[1px] border-gray-500`;
  const buttonTextStyle = 'hidden md:block';
  const iconStyle = 'max-w-4 max-h-4 min-w-4 min-h-4';
  const sectionStyle = 'flex gap-2 min-h-full flex-grow';

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      if (disablePrev) return;
      handlePreviousSlide();
    } else if (event.key === 'ArrowRight') {
      if (disableNext) return;
      handleNextSlide();
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
      <div className='flex min-h-full w-full max-w-full flex-grow bg-gray-50 dark:bg-gray-800 gap-1 gap-y-2 py-2 md:gap-2 px-2 md:px-10 border-b-[1.5px] dark:border-gray-700 border-gray-200 flex-wrap z-40'>
        <div className={sectionStyle + ' grow-[2]'}>
          <button aria-label='back to dashboard' className={`${buttonStyle} `} onClick={(e) => {
            e.preventDefault();
            navigate('/dashboard');
          }}>
            <img src={backToDashboardImg} alt='back to dashboard' className={iconStyle} />
            <span className={buttonTextStyle}>Dashboard</span>
          </button>
          <EditPresentation buttonStyle={buttonStyle} iconStyle={iconStyle}></EditPresentation>

          <button aria-label='Delete Presentation' aria-haspopup="dialog" className={buttonStyle} onClick={() => setIsShowDeletePresentationModal(true)}>
            <img src={deleteImg} alt='delete this presentation' className={iconStyle} />
            <span className={buttonTextStyle}>Delete Presentation</span>
          </button>
        </div>

        {splitBar()}
        <div className={sectionStyle + ' grow-[3]'}>
          <button aria-label='new slide' className={buttonStyle} onClick={() => handleNewSlide()}>
            <img src={newSlideImg} alt='Add a new presentation' className={iconStyle} />
            <span className={buttonTextStyle}>New Slide</span>
          </button>
          <button aria-label='Delete Slide' className={buttonStyle} onClick={() => setIsShowDeleteSlideModal(true)} aria-haspopup="dialog">
            <img src={deleteSlideImg} alt='delete this slide' className={iconStyle} />
            <span className={buttonTextStyle}>Delete Slide</span>
          </button>
          <EditSlide buttonStyle={buttonStyle} iconStyle={iconStyle}></EditSlide>
        </div>

        {splitBar()}
        <div className={sectionStyle + ' grow-[4</div>]'}>
          <NewText buttonStyle={buttonStyle} iconStyle={iconStyle}></NewText>
          <NewImage buttonStyle={buttonStyle} iconStyle={iconStyle}></NewImage>
          <NewVideo buttonStyle={buttonStyle} iconStyle={iconStyle}></NewVideo>
          <NewCode buttonStyle={buttonStyle} iconStyle={iconStyle}></NewCode>
        </div>

        {splitBar()}
        <div className={sectionStyle + ' grow-[1]'}>

          <button aria-label='show preview' className={buttonStyle} onClick={() => handlePrevew()}>
            <img src={previewSvg} alt='Go to preview page' className={iconStyle} />
            <span className={buttonTextStyle}>Preview</span>
          </button>
        </div>

      </div>

      <div className='fixed right-0 left-0 bottom-4 flex items-center justify-center z-50'>
        <div className='flex space-x-4'>
          <button aria-label='go to previous page' onClick={() => handlePreviousSlide()} disabled={disablePrev}
            data-testid='prev-slide'
            className={'mr-2 px-2 py-2 text-white rounded z-50 opacity-80' + (disablePrev ? ' visible' : ' bg-gray-400 hover:bg-gray-600')}
          >
            <img src={backArrowImg} alt='Go to previous slide' className='h-10 w-10' />
          </button>

          <button aria-label='go to next page' onClick={() => handleNextSlide()} disabled={disableNext}
            data-testid='next-slide'
            className={'mr-2 px-2 py-2 text-white rounded z-50 opacity-80' + (disableNext ? ' visible' : ' bg-gray-400 hover:bg-gray-600')}
          >
            <img src={nextArrowImg} alt='Go to next slide' className='h-10 w-10' />
          </button>
        </div>
      </div>

      <ConfirmPopup
        isShow={isShowDeletePresentationModal}
        setIsShow={setIsShowDeletePresentationModal}
        title='Deleting presentation?'
        description={`Do you want to delete this presentation?\n This action cannot be undone.`}
        onConfirm={handleDeletePresentationConfirm}
        onCancle={handleDeletePresentationCancle}
      />
      <ConfirmPopup
        isShow={isShowDeleteSlideModal}
        setIsShow={setIsShowDeleteSlideModal}
        title='Deleting slide?'
        description={`Do you want to delete this slide?\n This action cannot be undone.`}
        onConfirm={handleDeleteSlide}
        onCancle={() => setIsShowDeleteSlideModal(false)} />
    </>
  )
}

export default Toolbox;