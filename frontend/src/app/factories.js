function createPresentationDto({ title, thumbnailUrl, description, defaultBackgroundType, defaultBackgroundValue}) {
  return {
    title: title,
    description: description || "",
    thumbnailUrl : thumbnailUrl || "",
    defaultBackgroundType: defaultBackgroundType || 0,
    defaultBackgroundValue: defaultBackgroundValue || "#ffffff",
  };
}

function createSlideDto({ order, backgroundType, backgroundValue}) {
  return {
    order : order || 0,
    backgroundType: backgroundType || 0,
    backgroundValue: backgroundValue || "#ffffff",
  };
}

function createElementDto({ positionX, positionY, height, width, zIndex, type, details}) {
  return {
      positionX: positionX || 0,
      positionY: positionY || 0,
      height: height || 1,
      width: width|| 1,
      zIndex: zIndex || 0,
      type: type || 0,
      details: {
        ...details
      }
  };
}

const factories = {
  createPresentationDto,
  createSlideDto,
  createElementDto
};

export default factories;