import Modal from './Modal';
import { Button } from 'flowbite-react';

const ConfirmPopup = ({ isShow, setIsShow, title, description, onConfirm, onCancle }) => {
  return (
    <Modal
      isShow={isShow}
      setIsShow={setIsShow}
      title={title}
    >
      <div className='mt-6'>
        <span className='whitespace-pre-line'>{description}</span>
        <div className='flex justify-between items-center gap-8 mt-10 px-10'>
          <Button color='blue' onClick={onConfirm} className='w-32' aria-label='delete'>Yes</Button>
          <Button color='blue' onClick={onCancle} className='w-32' aria-label='cancle'>No</Button>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmPopup;