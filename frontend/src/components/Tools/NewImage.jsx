import newImggeImg from '../../assets/newImage.svg'
import Modal from '../Modal';
import { useState, useEffect } from 'react';
import Form from '../Form';
import { useDataStore } from '../../../src/app/store/store';
import { toast } from 'react-toastify';
import { fileToDataUrl } from '../../helpers';

const NewImage = ({ buttonStyle, iconStyle }) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [formData, setFormData] = useState({
    width: 10,
    height: 10,
    source: '',
    alt: '',
  });

  useEffect(() => {
    setFormData({
      width: 10,
      height: 10,
      source: '',
      alt: '',
    });
  }, [isShowModal]);

  const fields = [
    {
      label: 'Width (%)',
      name: 'width',
      type: 'number',
      placeholder: '0-100',
      value: formData.width,
      onChange: (e) => setFormData({ ...formData, width: e.target.value }),
      validate: (value) => {
        return value >= 0 && value <= 100 ? '' : 'Width should be between 0 and 100.';
      }
    },
    {
      label: 'Height (%)',
      name: 'height',
      type: 'number',
      placeholder: '0-100',
      value: formData.height,
      onChange: (e) => setFormData({ ...formData, height: e.target.value }),
      validate: (value) => {
        return value >= 0 && value <= 100 ? '' : 'Height should be between 0 and 100.';
      }
    },
    {
      label: 'Image',
      name: 'image',
      type: 'file',
      accept: 'image/*',
      placeholder: '',
      onChange: (e) => {
        const file = e.target.files[0];
        if (file) {
          fileToDataUrl(file)
            .then((dataUrl) => {
              setFormData((prev) => ({ ...prev, source: dataUrl }));
            })
            .catch((error) => {
              toast.error(`Error converting file to Data source:${error}`);
            });
        } else {
          setFormData((prev) => ({ ...prev, source: '' }));
        }
      },
    },
    {
      label: 'Description',
      name: 'alt',
      type: 'text',
      placeholder: 'Description of the image',
      value: formData.alt,
      onChange: (e) => setFormData({ ...formData, alt: e.target.value }),
      validate: (value) => {
        return value !== '' ? '' : 'Description can not be empty.';
      }
    },
  ]

  const newImage = useDataStore((state) => state.newImageElement);

  const onSubmit = async () => {
    try {
      await newImage(formData);
      toast.success('Image added successfully');
    } catch (error) {
      toast.error('Failed: ' + error.message);
    }
    setIsShowModal(false);
  }
  const buttonTextStyle = 'hidden md:block';

  return (
    <>
      <button className={buttonStyle} onClick={() => setIsShowModal(true)} aria-label='insert image' aria-haspopup="dialog">
        <img src={newImggeImg} alt='Insert new image' className={iconStyle} />
        <span className={buttonTextStyle}>Image</span>
      </button>
      <Modal
        isShow={isShowModal}
        setIsShow={setIsShowModal}
        title='New Image'
      >
        <Form title='' fields={fields} buttonText='Submit' onSubmit={onSubmit} />
      </Modal>
    </>
  );
};

export default NewImage;