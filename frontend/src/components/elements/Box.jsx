import { useState, useRef } from 'react';
import { Rnd } from 'react-rnd';
import { toPercentage } from '../../helpers';
import Anchor from './Anchor';
import Text from './Text';
import EditElement from './EditElement';
import { useDataStore } from '../../../src/app/store/store';
import Image from './Image';
import Video from './Video';
import Code from './Code';
import { Button } from 'flowbite-react';
import { toast } from 'react-toastify';
import { useShallow } from 'zustand/react/shallow'

const Box = ({ elementId, elementDetails, parentWidth, isPreviewing }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [positon_x, setPosition_x] = useState(elementDetails.positionX);
  const [positon_y, setPosition_y] = useState(elementDetails.positionY);
  const [width, setWidth] = useState(elementDetails.width);
  const [height, setHeight] = useState(elementDetails.height);
  const type = elementDetails.type;

  const enableResizing = {
    bottom: isEditing,
    bottomLeft: isEditing,
    bottomRight: isEditing,
    left: isEditing,
    right: isEditing,
    top: isEditing,
    topLeft: isEditing,
    topRight: isEditing,
  }

  const isListenerActive = useRef(false);
  const onSingleClick = () => {
    setIsEditing(true);
    if (!isListenerActive.current) {
      setTimeout(() => {
        document.addEventListener('click', handleBoxClickOutside);
        isListenerActive.current = true;
      }, 0);
    }
  };

  const handleBoxClickOutside = () => {
    setIsEditing(false);
    setTimeout(() => {
      document.removeEventListener('click', handleBoxClickOutside);
      isListenerActive.current = false;
    }, 0);
  }

  const [isModifying, setIsModifying] = useState(false);

  const handleDoubleClick = () => {
    setIsModifying(true);
  }

  const updatePosition = useDataStore(useShallow((state) => state.updatePosition));
  const updateSize = useDataStore(useShallow((state) => state.updateSize));

  const [deleteMenuVisible, setDeleteMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const handleContextMenu = (e) => {
    if (isPreviewing) return;
    document.addEventListener('click', handleDeleteClickOutside);
    e.preventDefault();
    setMenuPosition({ x: e.clientX, y: e.clientY });
    setDeleteMenuVisible(true);
    setIsEditing(true);
  };

  const handleDeleteClickOutside = () => {
    setDeleteMenuVisible(false);
    setIsEditing(false);
    document.removeEventListener('click', handleDeleteClickOutside);
  };

  const deleteElement = useDataStore(useShallow((state) => state.deleteElement));

  const handleDeleteElement = async () => {
    try {
      await deleteElement(elementId);
      toast.success('Element deleted successfully');
    } catch {
      toast.error('Error deleting element');
    }
  }

  const deleteMenuPositionStyel = {
    top: menuPosition.y,
    left: menuPosition.x,
  }

  return (
    <>
      <Rnd
        default={{
          x: positon_x * parentWidth / 100,
          y: positon_y * parentWidth / 200,
          width: toPercentage(width),
          height: toPercentage(height),
        }}
        size={{ width: toPercentage(width), height: toPercentage(height) }}
        position={{ x: positon_x * parentWidth / 100, y: positon_y * parentWidth / 200 }}
        onDragStop={(_e, d) => {
          setPosition_x(d.x / parentWidth * 100);
          setPosition_y(d.y / parentWidth * 200);
          updatePosition(elementId, d.x / parentWidth * 100, d.y / parentWidth * 200);
          document.removeEventListener('click', handleBoxClickOutside);
        }}
        onResize={(_e, _direction, ref) => {
          setWidth((ref.offsetWidth / parentWidth) * 100);
          setHeight((ref.offsetHeight / parentWidth) * 100 * 2);
          document.removeEventListener('click', handleBoxClickOutside);
        }}
        onResizeStop={(_e, _direction, ref) => {
          updateSize(elementId, (ref.offsetWidth / parentWidth) * 100, (ref.offsetHeight / parentWidth) * 100 * 2);
          document.removeEventListener('click', handleBoxClickOutside);
        }}
        bounds='parent'
        resizeGrid={[parentWidth / 100, parentWidth / 200]}
        dragGrid={[parentWidth / 100, parentWidth / 200]}
        resizeHandleComponent={
          {
            bottomRight: <Anchor />,
            bottomLeft: <Anchor />,
            topRight: <Anchor />,
            topLeft: <Anchor />,
          }
        }
        className={isEditing && 'outline-dashed outline-1'}
        enableResizing={enableResizing}
        disableDragging={!isEditing}
        onClick={!isPreviewing ? onSingleClick : undefined}
        onDoubleClick={!isPreviewing ? handleDoubleClick : undefined}
        onContextMenu={handleContextMenu}
      >
        {type === 0 && <Text content={elementDetails} />}
        {type === 1 && <Image content={elementDetails} />}
        {type === 2 && <Video content={elementDetails} />}
        {type === 3 && <Code content={elementDetails} />}
        {isModifying && <EditElement type={type} elementId={elementId} content={elementDetails} isModifying={isModifying} setIsModifying={setIsModifying} />}
      </Rnd>
      {deleteMenuVisible &&
        <Button color={'light'} className='fixed' size='xs' style={deleteMenuPositionStyel} onClick={handleDeleteElement} aria-label='delete'>delete</Button>
      }
    </>

  )
}
export default Box;