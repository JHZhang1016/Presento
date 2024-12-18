const Image = ({ content }) => {
  const base64 = content.source;
  const alt = content.alt;

  return (
    <>
      <div className='max-h-full max-w-full w-full h-full overflow-hidden'>
        <img src={base64} alt={alt} className='h-full w-auto object-contain' draggable='false' />
      </div>
    </>
  );
};

export default Image;