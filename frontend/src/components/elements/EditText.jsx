import { useState } from 'react';
import Modal from '../Modal';
import Form from '../Form';
import { useDataStore } from '../../../src/app/store/store';
import { toast } from 'react-toastify';
import { useShallow } from 'zustand/react/shallow';

const EditText = ({ elementId, content, isModifying, setIsModifying }) => {
  const [formData, setFormData] = useState({
    text: content.text,
    fontSize: content.fontSize,
    textColor: content.fontColor,
    fontFamily: content.fontFamily
  });

  const fields = [
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
      validate: () => {
        return '';
      }
    },
    {
      label: 'Text color',
      name: 'textColor',
      type: 'text',
      placeholder: 'Hex color code',
      value: formData.textColor,
      onChange: (e) => setFormData({ ...formData, textColor: e.target.value }),
      validate: (value) => {
        const pattern = /^#?([a-f0-9]{6}|[a-f0-9]{3})$/;
        return value.match(pattern) ? '' : 'Invalid color code';
      }
    },
    {
      label: 'Font family',
      name: 'fontFamily',
      type: 'select',
      options: ['sans-serif', 'serif', 'monospace'],
      value: formData.fontFamily,
      onChange: (e) => setFormData({ ...formData, fontFamily: e.target.value }),
      validate: () => {
        return '';
      }
    }
  ]

  const editText = useDataStore(useShallow((state) => state.editText));
  const onSubmit = async () => {
    try {
      await editText(elementId, formData);
      setIsModifying(false);
      toast.success('Text updated successfully');
    } catch (error) {
      toast.error('Failed: ' + error.message);
    }
  }

  return (
    <Modal
      isShow={isModifying}
      setIsShow={setIsModifying}
      title='Edit Text'
    >
      <Form title='' fields={fields} buttonText='Submit' onSubmit={onSubmit} />
    </Modal>
  );
};

export default EditText;