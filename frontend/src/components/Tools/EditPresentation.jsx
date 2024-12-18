import { useEffect, useState } from 'react';
import { useDataStore } from '../../../src/app/store/store';
import { useShallow } from 'zustand/react/shallow'
import editPresentationImg from '../../assets/editPresentation.svg';
import Modal from '../Modal.jsx';
import Form from '../Form.jsx';
import { toast } from 'react-toastify';
import { fileToDataUrl } from '../../helpers';

const EditPresentation = ({ buttonStyle, iconStyle }) => {
  const currentId = useDataStore(useShallow((state) => state.getCurrentPresentationId()));
  const info = useDataStore(useShallow((state) => ({
    'title': state.presentations[currentId]?.title || '',
    'description': state.presentations[currentId]?.description || '',
    'thumbnailUrl': state.presentations[currentId]?.thumbnailUrl || '',
  })));
  const [isShowCreateModal, setIsShowCreateModal] = useState(false);

  const [formData, setFormData] = useState({
    title: info.title,
    description: info.description,
    thumbnailUrl: info.thumbnailUrl,
  });
  useEffect(() => {
    setFormData({
      title: info.title,
      description: info.description,
      thumbnailUrl: info.thumbnailUrl,
    });
  }, [info]);

  const [thumbnailError, setThumbnailError] = useState('');

  const editPresentationFields = [
    {
      label: 'Name',
      name: 'name',
      type: 'text',
      placeholder: 'Name of your presentation',
      value: formData.title,
      onChange: (e) => setFormData((prev) => ({ ...prev, title: e.target.value })),
      validate: (value) => {
        return value !== '' ? '' : 'Name can not be empty.';
      }
    },
    {
      label: 'Description',
      name: 'description',
      type: 'text',
      placeholder: 'Optional',
      value: formData.description,
      onChange: (e) => setFormData((prev) => ({ ...prev, description: e.target.value })),
    },
    {
      label: 'Thumbnail',
      name: 'thumbnail',
      type: 'file',
      accept: 'image/jpeg, image/png, image/jpg',
      placeholder: '',
      onChange: (e) => {
        const file = e.target.files[0];
        if (file) {
          fileToDataUrl(file)
            .then((dataUrl) => {
              setFormData((prev) => ({ ...prev, thumbnailUrl: dataUrl }));
              setThumbnailError('');
            })
            .catch(() => {
              setThumbnailError('Invalid file type');
            });
        }
      },
      validate: () => {
        return thumbnailError;
      }
    },
  ]

  const editPresentationInfo = useDataStore(useShallow((state) => state.editCurrentPresentationInfo));
  const buttonTextStyle = 'hidden md:block';

  const handleSubmitChange = async () => {
    try {
      await editPresentationInfo(formData.title, formData.thumbnailUrl, formData.description);
      toast.success('Presentation info update successfully');
    } catch (error) {
      toast.error('Failed: ' + error.message);
    }
    setIsShowCreateModal(false);
  }

  return (
    <>
      <button className={buttonStyle} onClick={() => setIsShowCreateModal(true)} aria-label='edit presentation' aria-haspopup="dialog">
        <img src={editPresentationImg} alt='Edit presentation' className={iconStyle} />
        <span className={buttonTextStyle} >Edit presentation</span>
      </button>

      <Modal
        isShow={isShowCreateModal}
        setIsShow={setIsShowCreateModal}
        title='Editing Presentation Info'
      >
        <Form
          fields={editPresentationFields}
          buttonText='Submit'
          onSubmit={handleSubmitChange}
        ></Form>
      </Modal>
    </>
  )
};

export default EditPresentation;