import React from 'react';
import newTextImg from '../../assets/newText.svg'
import Modal from '../Modal';
import { useState } from 'react';
import Form from '../Form';
import { useDataStore } from '../../../src/app/store/store';
import { toast } from 'react-toastify';

const NewText = ({ buttonStyle, iconStyle }) => {

  const [isShowModal, setIsShowModal] = useState(false);
  const newText = useDataStore((state) => state.newTextElement);

  const [formData, setFormData] = useState({
    width: 10,
    height: 10,
    text: '',
    fontSize: '1',
    fontColor: '#000000',
    fontFamily: 0
  });

  React.useEffect(() => {
    if (isShowModal) {
      setFormData({
        width: 10,
        height: 10,
        text: '',
        fontSize: '1',
        fontColor: '#000000',
        fontFamily: 0
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
      label: 'Text',
      name: 'text',
      type: 'text',
      placeholder: 'write your text here',
      value: formData.text,
      onChange: (e) => setFormData({ ...formData, text: e.target.value }),
      validate: (value) => {
        return value !== '' ? '' : 'Text can not be empty.';
      }
    },
    {
      label: 'Font size (em)',
      name: 'fontSize',
      type: 'number',
      placeholder: '',
      value: formData.fontSize,
      onChange: (e) => setFormData({ ...formData, fontSize: e.target.value }),
      validate: (value) => {
        return value !== '' ? '' : 'Font size can not be empty.';
      }
    },
    {
      label: 'Text color',
      name: 'fontColor',
      type: 'color',
      placeholder: 'Hex color code',
      value: formData.fontColor,
      onChange: (e) => setFormData({ ...formData, fontColor: e.target.value }),
      validate: (value) => {
        const pattern = /^#?([a-f0-9]{6}|[a-f0-9]{3})$/;
        return value.match(pattern) ? '' : 'Invalid color code';
      }
    }
  ]

  const onSubmit = async () => {
    try {
      await newText(formData);
      toast.success('Text created successfully');
    } catch (error) {
      toast.error('Failed: ' + error.message);
    }
    setIsShowModal(false);
  }
  const buttonTextStyle = 'hidden md:block';

  return (
    <>
      <button className={buttonStyle} onClick={() => setIsShowModal(true)} aria-label='insert text' aria-haspopup="dialog">
        <img src={newTextImg} alt='Insert new text' className={iconStyle} />
        <span className={buttonTextStyle}>Text</span>
      </button>
      {isShowModal && <Modal
        isShow={isShowModal}
        setIsShow={setIsShowModal}
        title='Create Text'
      >
        <Form title='' fields={fields} buttonText='Create' onSubmit={onSubmit} />
      </Modal>}
    </>
  );
};

export default NewText;