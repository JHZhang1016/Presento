import EditText from './EditText';
import EditImage from './EditImage';
import EditVideo from './EditVideo';
import EditCode from './EditCode';

const EditElement = ({ type, elementId, content, isModifying, setIsModifying }) => {

  return (
    <>
      {type === 0 && <EditText content={content} elementId={elementId} isModifying={isModifying} setIsModifying={setIsModifying} />}
      {type === 1 && <EditImage content={content} elementId={elementId} isModifying={isModifying} setIsModifying={setIsModifying} />}
      {type === 2 && <EditVideo content={content} elementId={elementId} isModifying={isModifying} setIsModifying={setIsModifying} />}
      {type === 3 && <EditCode content={content} elementId={elementId} isModifying={isModifying} setIsModifying={setIsModifying} />}
    </>
  );
};

export default EditElement;