const Video = ({ content }) => {
  const autoplay = content.autoplay;
  let url = content.source;
  if (autoplay) {
    url += '&autoplay=1';
  } else {
    url += '&autoplay=0';
  }

  return (
    <>
      <div className='max-h-full max-w-full w-full h-full bg-slate-700 bg-opacity-20'>
        <iframe className='block w-full h-full p-4 object-fit' src={url} draggable='false' allow='autoplay'> </iframe>
      </div>
    </>
  );
};

export default Video;