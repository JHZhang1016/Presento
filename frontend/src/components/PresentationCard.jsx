import { useNavigate } from 'react-router-dom';

const PresentationCard = ({ title, thumbnail_url, description, id }) => {
  const thumbnail = thumbnail_url ? thumbnail_url : '';
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/presentation/${id}`);
  }

  return (
    <>
      <div className='hover:cursor-pointer grid grid-cols-2 bg-cardBackGround aspect-[2/1] shadow-lg gap-4 p-2 min-w-[100px] rounded-md dark:bg-gray-600 color-black dark:text-white'
        onClick={handleClick}
        tabIndex='0'>
        <div className='flex-1 outline-gray-100 outline-2 outline bg-gray-300 overflow-hidden'>
          {thumbnail !== '' && <img src={thumbnail} alt="Presentation's thumbnail" className='object-cover h-full w-full' />}
        </div>
        <div className='flex flex-col flex-1 justify-between'>
          <div>
            <h2 className='font-bold text-xl md:text-xl break-words lg:text-base border-b-2 border-b-gray-200 my-1 dark:border-b-gray-500'>{title}</h2>
            <p className='text-sm md:text-xs lg:text-sm text-gray-600 dark:text-gray-300'> {description}</p>
          </div>

        </div>
      </div>
    </>
  )
}

export default PresentationCard;