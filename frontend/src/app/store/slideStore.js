import factories from '../factories';
import agent from '../agent';

const useSlideStore = (set, get) => ({
  currentSlideIndex: 0,

  setCurrentSlideIndex: (index) => {
    set({ currentSlideIndex: index });
  },

  setNextSlide: () => {
    const nextPage = get().currentSlideIndex + 1;
    get().setCurrentSlideIndex(nextPage);
  },

  setPrevSlide: () => {
    const prevPage = get().currentSlideIndex - 1;
    get().setCurrentSlideIndex(prevPage);
  },

  getCurrentSlideIndex: () => get().currentSlideIndex,

  getCurrentSlide: () => get().currentPresentation?.slideDetails[get().currentSlideIndex],

  getSlideLength: () => get().currentPresentation.slideDetails.length || 0,

  // updateCurrentSlide: () => {
  //   if(get().currentPresentation === null) return;
  //   set({ currentSlideDetailed: get().currentPresentation.slideDetails[get().currentSlideIndex] });
  // },

  getSlideId: () => get().currentPresentation?.slideDetails[get().currentSlideIndex].id,

  upodateSlide: (slide) => {
    const currentPresentation = get().currentPresentation;
    const updatedSlides = currentPresentation.slideDetails.map((s) => {
      if (s.id === slide.id) {
        return slide;
      } else {
        return s;
      }
    });
    set({ currentPresentation: { ...currentPresentation, slideDetails: updatedSlides } });
  },

  newSlide: async () => {
    try {
      const newSlideDto = factories.createSlideDto({ order: 0, backgroundType: 0, backgroundValue: "#ffffff" });
      const newSlide = await agent.Slides.create(get().currentPresentation.id, newSlideDto).then()
      set((state) => {
        const currentPresentation = get().currentPresentation;
        const updatedSlides = [
          ...state.currentPresentation.slideDetails,
          newSlide,
        ];

        return {
          currentPresentation: {
            ...currentPresentation,
            slideDetails: updatedSlides,
          },
        };
      })
    } catch (error) {
      await get().loadPresentations();
      throw error
    }
  },

  editSlide: async (presentationId, SlideId, order, backgroundType, backgroundValue) => {
    const newSlide = factories.createSlideDto({ order, backgroundType, backgroundValue });
    try {
      const currentPresentation = get().currentPresentation;
      const updatedSlide = await agent.Slides.update(presentationId, SlideId, newSlide);
      const updatedSlides = currentPresentation.slideDetails.map((slide) => {
        if (slide.id === updatedSlide.id) {
          return updatedSlide;
        } else {
          return slide;
        }
      });
      currentPresentation.slideDetails = updatedSlides;

      set({ ...currentPresentation });

    } catch (error) {
      await get().loadPresentations();
      throw error;
    }
  },

  deleteCurrentSlide: async () => {
    if (get().currentPresentation.slideDetails.length === 1) {
      throw new Error("Cannot delete the only slide in a presentation");
    }
    try {
      const currentPresentation = { ...get().currentPresentation };
      const currentSlideId = currentPresentation.slideDetails[get().currentSlideIndex].id;
      const updatedSlides = currentPresentation.slideDetails.filter((slide) => slide.id !== currentSlideId);
      currentPresentation.slideDetails = updatedSlides;
      set({ currentPresentation });
      await agent.Slides.delete(currentPresentation.id, currentSlideId);
      set({ currentSlideIndex: get().currentSlideIndex === 0 ? 0 : get().currentSlideIndex - 1 });
    } catch (error) {
      await get().loadPresentations();
      throw error;
    }
  },
})

export default useSlideStore;