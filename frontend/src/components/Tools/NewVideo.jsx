import React from 'react';
import newVideoImg from '../../assets/newVideo.svg'
import Modal from '../Modal';
import { useState } from 'react';
import Form from '../Form';
import { useDataStore } from '../../../src/app/store/store';
import { toast } from 'react-toastify';

const NewVideo = ({ buttonStyle, iconStyle }) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [formData, setFormData] = useState({
    width: 50,
    height: 50,
    source: '',
    autoPlay: true,
  });

  React.useEffect(() => {
    if (isShowModal) {
      setFormData({
        width: 50,
        height: 50,
        source: '',
        autoPlay: true,
      });
    }
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
      label: 'URL',
      name: 'url',
      type: 'url',
      placeholder: '',
      value: formData.url,
      onChange: (e) => setFormData({ ...formData, source: e.target.value }),
      validate: (value) => {
        return value !== '' ? '' : 'URL can not be empty.';
      }
    },
    {
      label: 'Autoplay',
      name: 'autoplay',
      type: 'checkbox',
      placeholder: '',
      checked: formData.autoplay,
      onChange: (e) => setFormData({ ...formData, autoPlay: e.target.checked }),
      validate: () => {
        return '';
      }
    },
  ]

  const newVideo = useDataStore((state) => state.newVideoElement);
  const onSubmit = async () => {
    try {
      await newVideo(formData);
      toast.success('Video created successfully');
    } catch (error) {
      toast.error('Failed: ' + error.message);
    }
    setIsShowModal(false);
  }
  const buttonTextStyle = 'hidden md:block';

  return (
    <>
      <button className={buttonStyle} onClick={() => setIsShowModal(true)} aria-label='insert video' aria-haspopup="dialog">
        <img src={newVideoImg} alt='Insert new video' className={iconStyle} />
        <span className={buttonTextStyle}>Video</span>
      </button>
      {isShowModal && <Modal
        isShow={isShowModal}
        setIsShow={setIsShowModal}
        title='New Video'
      >
        <Form title='' fields={fields} buttonText='Submit' onSubmit={onSubmit} />
      </Modal>}
    </>
  );
};

export default NewVideo;