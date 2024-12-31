import { useState } from 'react';
import Modal from '../Modal';
import Form from '../Form';
import { useDataStore } from '../../../src/app/store/store';
import { toast } from 'react-toastify';
import { useShallow } from 'zustand/react/shallow';

const EditVideo = ({ elementId, content, isModifying, setIsModifying }) => {

  const [formData, setFormData] = useState({
    url: content.url,
    autoplay: content.autoplay,
  });

  const fields = [
    {
      label: 'URL',
      name: 'url',
      type: 'url',
      placeholder: '',
      value: formData.url,
      onChange: (e) => setFormData({ ...formData, url: e.target.value }),
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
      onChange: (e) => setFormData({ ...formData, autoplay: e.target.checked }),
    },
  ]

  const editContent = useDataStore(useShallow((state) => state.editContent));
  const onSubmit = async () => {
    try {
      await editContent(elementId, formData);
      toast.success('Video update successfully');
    } catch (error) {
      toast.error('Failed: ' + error.message);
    }
    setIsModifying(false);
  }

  return (
    <Modal
      isShow={isModifying}
      setIsShow={setIsModifying}
      title='Edit Video'
    >
      <Form title='' fields={fields} buttonText='Submit' onSubmit={onSubmit} />
    </Modal>
  );
};

export default EditVideo;