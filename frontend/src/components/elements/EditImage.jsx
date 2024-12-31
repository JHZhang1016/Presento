import { useState } from 'react';
import Modal from '../Modal';
import Form from '../Form';
import { useDataStore } from '../../../src/app/store/store';
import { toast } from 'react-toastify';
import { fileToDataUrl } from '../../helpers';
import { useShallow } from 'zustand/react/shallow';

const EditImage = ({ elementId, content, isModifying, setIsModifying }) => {
  const [formData, setFormData] = useState({
    url: content.url,
    alt: content.alt,
  });

  const fields = [
    {
      label: 'Image',
      name: 'image',
      type: 'file',
      placeholder: '',
      onChange: (e) => {
        const file = e.target.files[0];
        if (file) {
          fileToDataUrl(file)
            .then((dataUrl) => {
              setFormData((prev) => ({ ...prev, url: dataUrl }));
            })
            .catch((error) => {
              toast.error(`Error converting file to Data URL:${error}`);
            });
        } else {
          setFormData((prev) => ({ ...prev, url: '' }));
        }
      },
      validate: () => {
        const currenturl = formData.url;
        return currenturl !== '' ? '' : 'Image can not be empty';
      }
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

  const editContent = useDataStore(useShallow((state) => state.editContent));
  const onSubmit = async () => {
    try {
      await editContent(elementId, formData);
      setIsModifying(false);
      toast.success('Image updated successfully');
    } catch (error) {
      toast.error('Failed: ' + error.message);
      setIsModifying(false);
    }
  }

  return (
    <Modal
      isShow={isModifying}
      setIsShow={setIsModifying}
      title='Edit Image'
    >
      <Form title='' fields={fields} buttonText='Submit' onSubmit={onSubmit} />
    </Modal>
  );
};

export default EditImage;