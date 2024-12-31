const Text = ({ content }) => {
  const fontSize = isNaN(parseFloat(content.fontSize)) ? '1em' : `${content.fontSize}em`;
  let fontFamily = null;
  const fontFamilyMap = {
    'sans-serif': ' font-sans',
    'serif': ' font-serif',
    'monospace': ' font-mono'
  };

  fontFamily = fontFamilyMap[content.fontFamily] || ' font-sans';

  const fontStyle = {
    'color': /^#[0-9A-F]{6}$/i.test(content.fontColor) ? content.fontColor : '#000000',
    'fontSize': fontSize
  }

  return (
    <>
      <div className={'overflow-hidden max-h-full max-w-full text-wrap' + fontFamily}
        style={fontStyle}
      >
        {content.text}
      </div>
    </>
  );
};

export default Text;