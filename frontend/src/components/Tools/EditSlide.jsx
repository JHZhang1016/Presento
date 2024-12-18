import editSlideImg from '../../assets/editPresentation.svg';
import Modal from '../Modal';
import { useState, useEffect } from 'react';
import { useDataStore } from '../../../src/app/store/store';
import { toast } from 'react-toastify';
import { fileToDataUrl } from '../../helpers';
import { Label, Radio, Button, FileInput } from 'flowbite-react';
import { useShallow } from 'zustand/react/shallow';

const EditSlide = ({ buttonStyle, iconStyle }) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const getCurrentSlide = useDataStore(useShallow((state) => state.getCurrentSlide));
  const presentationID = useDataStore(useShallow((state) => state.currentPresentation?.id));

  let currentSlide = getCurrentSlide();
  useEffect(() => {
    if (!isShowModal) return;
    const currentSlide = getCurrentSlide();
    setFormData({
      'backgroundType': currentSlide.backgroundType || 0,
      'backgroundValue': currentSlide.backgroundValue || '#ffffff',
    });
  }, [isShowModal]);

  const [formData, setFormData] = useState({
    'backgroundType': currentSlide?.backgroundType || 0, //0: color, 1: image 2: gradient
    'backgroundValue': currentSlide?.backgroundValue || '#ffffff',
  });

  const [gradient, setGradient] = useState({ from: '#ffffff', to: '#ffffff' });
  useEffect(() => {
    if (formData.backgroundType === 2) {
      setGradient({
        from: formData.background.from,
        to: formData.background.to
      });
    }
  }, []);


  useEffect(() => {
    setFormData({
      'backgroundType': currentSlide?.backgroundType || 0,
      'backgroundValue': currentSlide?.background || '#ffffff',
    });
  }, [isShowModal]);


  const editSlide = useDataStore((state) => state.editSlide);
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.backgroundType === 2) {
        formData.backgroundValue = {
          from: gradient.from,
          to: gradient.to
        };
      }
      await editSlide(presentationID, currentSlide.id, currentSlide.order, formData.backgroundType, formData.background);
      toast.success('Slide updated successfully');
    } catch (error) {
      toast.error(error.message);
    }
    setIsShowModal(false);
  }

  const handleBackgroundChange = (backgroundType) => {
    setFormData((prev) => ({
      ...prev,
      backgroundType: backgroundType,
    }));
  };

  const buttonTextStyle = 'hidden md:block';

  return (
    <>
      <button className={buttonStyle} onClick={() => setIsShowModal(true)} aria-label='edit slide' aria-haspopup="dialog">
        <img src={editSlideImg} alt='Edit slide button' className={iconStyle} />
        <span className={buttonTextStyle}>Edit Slide</span>
      </button>
      <Modal
        isShow={isShowModal}
        setIsShow={setIsShowModal}
        title='Edit Slide'
      >
        <form onSubmit={onSubmit}>
          <div className='flex flex-col mt-2'>
            <fieldset className='flex max-w-md flex-col gap-4 mb-6'>
              <legend className='mb-4 text-gray-800'>Choose a background type</legend>
              <div className='flex items-center gap-2'>
                <Radio id='solid-color' name='solid-color' value={0}
                  checked={formData.backgroundType === 0}
                  onChange={() => handleBackgroundChange(0)}
                />
                <Label htmlFor='solid-color'>Solid Colour</Label>
              </div>

              <div className='flex items-center gap-2'>
                <Radio id='image' name='image' value={1}
                  checked={formData.backgroundType === 1}
                  onChange={() => handleBackgroundChange(1)}
                />
                <Label htmlFor='image'>Image</Label>
              </div>
{/* 
              <div className='flex items-center gap-2'>
                <Radio id='gradient' name='gradient' value={2}
                  checked={formData.backgroundType === 2}
                  onChange={() => handleBackgroundChange(2)}
                />
                <Label htmlFor='gradient'>Gradient</Label>
              </div> */}
            </fieldset>

            {formData.backgroundType === 0 && (
              <>
                <Label htmlFor='slidecolor' className='mb-3'>Background Colour:</Label>
                <input id='slidecolor' name='slidecolor' value={formData.background} type='color' className='p-1 h-10 w-full block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700'
                  onChange={(e) => setFormData({ ...formData, background: e.target.value })}
                />
              </>
            )}

            {formData.backgroundType === 1 && (
              <>
                <Label htmlFor='slideimage' className='mb-3'>Background Image:</Label>
                <FileInput id='slideimage' name='slideimage' accept='image/jpeg, image/png, image/jpg'
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    const dataUrl = await fileToDataUrl(file);
                    setFormData({ ...formData, background: dataUrl });
                  }} />
              </>
            )}

            {/* {formData.backgroundType === 2 && (
              <div>
                <Label htmlFor='slideGradientFor' className='mb-3'>Gradient From:</Label>
                <input id='slideGradientFor' name='slideGradientFor' value={gradient.from} type='color' className='p-1 h-10 w-full block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700'
                  onChange={(e) =>
                    setGradient({ ...gradient, from: e.target.value })
                  }
                />

                <Label htmlFor='slideGradientTo' className='my-4'>Gradient To:</Label>
                <input id='slideGradientTo' name='slideGradientTo' value={gradient.to} type='color' className='p-1 h-10 w-full block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700'
                  onChange={(e) => setGradient({ ...gradient, to: e.target.value })}
                />
              </div>
            )} */}
          </div>
          <Button color='blue' type='submit' className='mt-10' aria-label='Save'>Save</Button>
        </form>
      </Modal>
    </>
  );
};

export default EditSlide;