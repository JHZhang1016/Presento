import EditText from './EditText';
import EditImage from './EditImage';
import EditVideo from './EditVideo';
import EditCode from './EditCode';

const EditElement = ({ type, elementId, content, isModifying, setIsModifying }) => {

  return (
    <>
      {type === 'Text' && <EditText content={content} elementId={elementId} isModifying={isModifying} setIsModifying={setIsModifying} />}
      {type === 'Image' && <EditImage content={content} elementId={elementId} isModifying={isModifying} setIsModifying={setIsModifying} />}
      {type === 'Video' && <EditVideo content={content} elementId={elementId} isModifying={isModifying} setIsModifying={setIsModifying} />}
      {type === 'Code' && <EditCode content={content} elementId={elementId} isModifying={isModifying} setIsModifying={setIsModifying} />}
    </>
  );
};

export default EditElement;