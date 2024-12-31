import { useState } from 'react';
import Modal from '../Modal';
import Form from '../Form';
import { useDataStore } from '../../../src/app/store/store';
import { toast } from 'react-toastify';
import { useShallow } from 'zustand/react/shallow';

const EditCode = ({ elementId, content, isModifying, setIsModifying }) => {
  const [formData, setFormData] = useState({
    code: content.code,
    fontSize: content.fontSize,
  });

  const fields = [
    {
      label: 'Code',
      name: 'code',
      type: 'textarea',
      placeholder: '',
      value: formData.code,
      onChange: (e) => setFormData({ ...formData, code: e.target.value }),
      validate: (value) => {
        return value !== '' ? '' : 'Code can not be empty.';
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
  ]

  const editContent = useDataStore(useShallow((state) => state.editContent));
  const onSubmit = async () => {
    try {
      await editContent(elementId, formData);
      setIsModifying(false);
      toast.success('Code updated successfully');
    } catch (error) {
      toast.error('Failed: ' + error.message);
    }
  }

  return (
    <Modal
      isShow={isModifying}
      setIsShow={setIsModifying}
      title='Edit Code'
    >
      <Form title='' fields={fields} buttonText='Submit' onSubmit={onSubmit} />
    </Modal>
  );
};

export default EditCode;