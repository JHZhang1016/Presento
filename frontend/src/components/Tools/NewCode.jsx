import React from 'react';
import newCodeImg from '../../assets/newCode.svg'
import Modal from '../Modal';
import { useState } from 'react';
import Form from '../Form';
import { useDataStore } from '../../../src/app/store/store';
import { toast } from 'react-toastify';

const NewCode = ({ buttonStyle, iconStyle }) => {

  const [isShowModal, setIsShowModal] = useState(false);
  const [formData, setFormData] = useState({
    width: '50',
    height: '50',
    codeContent: '',
    fontSize: '1',
  });

  React.useEffect(() => {
    if (isShowModal) {
      setFormData({
        width: '50',
        height: '50',
        codeContent: '',
        fontSize: '1',
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
      label: 'Code',
      name: 'code',
      type: 'textarea',
      placeholder: '',
      value: formData.code,
      onChange: (e) => setFormData({ ...formData, codeContent: e.target.value }),
      validate: (value) => {
        return value !== '' ? '' : 'Code can not be empty.';
      }
    },
    // {
    //   label: 'Font size (em)',
    //   name: 'fontSize',
    //   type: 'number',
    //   placeholder: '',
    //   value: formData.fontSize,
    //   onChange: (e) => setFormData({ ...formData, fontSize: e.target.value }),
    //   validate: (value) => {
    //     return value !== '' ? '' : 'Font size can not be empty.';
    //   }
    // },
  ]

  const newCode = useDataStore((state) => state.newCodeElement);
  const onSubmit = async () => {
    try {
      await newCode(formData);
      toast.success('Code block created successfully');
    } catch (error) {
      toast.error('Failed: ' + error.message);
    }
    setIsShowModal(false);
  }
  const buttonTextStyle = 'hidden md:block';

  return (
    <>
      <button className={buttonStyle} onClick={() => setIsShowModal(true)} aria-label='insert code block' aria-haspopup="dialog">
        <img src={newCodeImg} alt='Insert new code block' className={iconStyle} />
        <span className={buttonTextStyle}>Code</span>
      </button>
      {isShowModal && <Modal
        isShow={isShowModal}
        setIsShow={setIsShowModal}
        title='New Code Block'
      >
        <Form title='' fields={fields} buttonText='Submit' onSubmit={onSubmit} />
      </Modal>}
    </>
  );
};

export default NewCode;