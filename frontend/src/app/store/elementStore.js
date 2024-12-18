import factories from '../factories';
import agent from '../agent';

const useElementsStore = (set, get) => ({

    getCurrentElementOrder: () => get().currentPresentation?.slideDetails[get().currentSlideIndex]?.elementOrder,

    getElements: () => get().currentPresentation?.slideDetails[get().currentSlideIndex]?.elements,

    newElement: async (type, width, height, positionX, positionY, details) => {
      try {
        const currentPresentationId = get().currentPresentation.id;
        const currentSlideId = get().getSlideId();
        const currentPresentation = get().currentPresentation;
        const currentSlideDetail = get().getCurrentSlide();
        let newElement = factories.createElementDto({positionX, positionY, height, width, type, details});
        const tempElementId = Math.random().toString(36).substring(7);
        newElement['id'] = tempElementId;
        const newElementDisplay = { ...newElement, ...newElement.details };
        const tempPresentation = {...currentPresentation,
          slideDetails: currentPresentation.slideDetails.map((slide) => {
            if (slide.id === currentSlideDetail.id) {
                return {
                ...slide,
                elements: { ...slide.elements, [tempElementId]: newElementDisplay },
                elementOrder: [...(slide.elementOrder || []), tempElementId],
                };
            } else {
              return slide;
            }
          }),
        };
        set({currentPresentation: tempPresentation});
        agent.Elements.create(currentPresentationId, currentSlideId, newElement).then((response) => {
          const responedElement = response;
          const responedElementDisplay = { ...responedElement, ...responedElement.details };

          const tempPresentation = {...currentPresentation,
            slideDetails: currentPresentation.slideDetails.map((slide) => {
              if (slide.id === currentSlideDetail.id) {
                  return {
                  ...slide,
                  elements: { ...slide.elements, [responedElement.id]: responedElementDisplay },
                  elementOrder: [...(slide.elementOrder || []), responedElement.id],
                  };
              } else {
                return slide;
              }
            }),
          };
          set({currentPresentation: tempPresentation});
        });
      } catch (error) {
        await get().loadPresentations();
        throw error;
      }
    },

    newTextElement: async ({width, height, positionX, positionY, fontSize, text, fontColor, fontFamily}) => {
      const details = {fontSize, text, fontColor, fontFamily};
      await get().newElement(0, width, height, positionX, positionY, details);
    },

    newImageElement: async ({width, height, positionX, positionY, source, alt}) => {
      const details = {source, alt};
      await get().newElement(1, width, height, positionX, positionY, details);
    },

    newVideoElement: async ({width, height, positionX, positionY, source, autoPlay}) => {
      const details = {source, autoPlay};

      await get().newElement(2, width, height, positionX, positionY, details);
    },

    newCodeElement: async ({width, height, positionX, positionY, codeContent}) => {
      const details = {codeContent};
      await get().newElement(3, width, height, positionX, positionY, details);
    },

    deleteElement: async (elementId) => {
      let currentSlide = get().getCurrentSlide();
      let currentElementOrder = currentSlide.elementOrder;
      currentElementOrder = currentElementOrder.filter((id) => id !== elementId);
      let currentElements = currentSlide.elements;
      delete currentElements[elementId];
      currentSlide.elementOrder = currentElementOrder;
      currentSlide.elements = currentElements;
      get().upodateSlide(currentSlide);
      await agent.Elements.delete(get().currentPresentation.id, get().getSlideId(), elementId);
    },

    updatePosition: async (elementId, position_X, position_Y) => {
        position_X = Math.floor(position_X);
        position_Y = Math.floor(position_Y);
      try {
        let currentSlide = get().getCurrentSlide();
        let currentElements = currentSlide.elements;
        currentElements[elementId] = {
          ...currentElements[elementId],
          positionX: position_X,
          positionY: position_Y,
        }
        currentSlide.elements = currentElements;
        get().upodateSlide(currentSlide);

        console.log(currentElements[elementId]);

        const targetElement = factories.createElementDto({
          ...currentElements[elementId],
          details: {
            ...currentElements[elementId],
            autoPlay : currentElements[elementId].autoPlay || false,
          }
        });
      
        await agent.Elements.update(get().currentPresentation.id, get().getSlideId(), elementId, targetElement);
      } catch (error) {
        await get().loadPresentations();
        throw error;
      }
    },

    updateSize: async (elementId, width, height) => {
      width = Math.floor(width);
      height = Math.floor(height);
      try {
        let currentSlide = get().getCurrentSlide();
        let currentElements = currentSlide.elements;
        currentElements[elementId] = {
          ...currentElements[elementId],
          width,
          height
        }
        currentSlide.elements = currentElements;
        get().upodateSlide(currentSlide);

        console.log(currentElements[elementId]);

        const targetElement = factories.createElementDto({
          ...currentElements[elementId],
          details: {
            ...currentElements[elementId],
            autoPlay : currentElements[elementId].autoPlay || false,
          }
        });

        console.log(targetElement);
        
      
        await agent.Elements.update(get().currentPresentation.id, get().getSlideId(), elementId, targetElement);
      } catch (error) {
        await get().loadPresentations();
        throw error;
      }
    }
})

export default useElementsStore;