import { create } from 'zustand';
import { setStoreApi, getStoreApi } from '../../../api.js';
import { toast } from 'react-toastify';
import { randomId } from '../../helpers.js';
import agent from '../agent.js';

export const useDataStore = create((set, get) => ({
  presentations: {},
  currentPresentation: null,
  currentSlideIndex: 0,

  setSlideIndex: (index) => set({ currentSlideIndex: index }),
  setNextSlide: () => set((state) => ({ currentSlideIndex: state.currentSlideIndex + 1 })),
  setPrevSlide: () => set((state) => ({ currentSlideIndex: state.currentSlideIndex - 1 })),

  loadPresentations: async () => {
    const data = await agent.Presentations.list();
    set({ presentations: data });
  },

  setCurrentPresentation: (id) => {
    set({ currentPresentation: id });
    if (get().presentations[id]?.slides.length > 0) {
      set({ currentSlideIndex: 0 });
    }
  },
  clearCurrentPresentation: () => set({ currentPresentation: null }),

  getCurrentPresentation: (id) =>
    get((state) => ({
      currentPresentation: state.presentations[id] || null,
    })),

  getCurrentSlide: () =>
    get((state) =>
      state.presentations[state.currentPresentation]?.slides[state.currentSlideIndex] || null
    ),

  createPresentations: async (id, newPresentation) => {
    set((state) => ({
      presentations: {
        ...state.presentations,
        [id]: newPresentation,
      },
    }));
    await get().updateToServer();
  },

  editPresentationInfo: async (info) => {
    try {
      set((state) => ({
        presentations: {
          ...state.presentations,
          [get().currentPresentation]: {
            ...state.presentations[get().currentPresentation],
            name: info.title,
            description: info.description,
            thumbnail: info.thumbnail,
            fontFamily: info.fontFamily,
          },
        },
      }));
      await get().updateToServer();
    } catch (error) {
      await get().loadPresentations();
      throw error
    }
  },

  deletePresentation: async (id) => {
    try {
      set((state) => {
        const updatedPresentations = { ...state.presentations };
        delete updatedPresentations[id];
        return { presentations: updatedPresentations };
      });
      await get().updateToServer();
    } catch (error) {
      await get().loadPresentations();
      throw error
    }
  },

  newSlide: async () => {
    try {
      const newSlide = {
        'id': `slide_${randomId()}`,
        'background': null,
        'elementOrder': [],
        'elements': {}
      };

      set((state) => {
        const currentPresentation = get().currentPresentation;
        const updatedSlides = [
          ...state.presentations[currentPresentation].slides,
          newSlide,
        ];

        return {
          presentations: {
            ...state.presentations,
            [currentPresentation]: {
              ...state.presentations[currentPresentation],
              slides: updatedSlides,
            },
          },
        };
      })
      await get().updateToServer();
    } catch (error) {
      await get().loadPresentations();
      throw error
    }
  },

  editSlide: async (formData) => {
    try {
      let currentSlide = [
        ...get().presentations[get().currentPresentation].slides,
      ];
      currentSlide[get().currentSlideIndex] = {
        ...currentSlide[get().currentSlideIndex],
        backgroundOptions: formData.backgroundOptions,
        background: formData.background,
      }
      set((state) => ({
        presentations: {
          ...state.presentations,
          [state.currentPresentation]: {
            ...state.presentations[state.currentPresentation],
            slides: currentSlide,
          },
        },
      }));
      await get().updateToServer();
    } catch (error) {
      await get().loadPresentations();
      throw error;
    }
  },

  deleteCurrentSlide: async () => {
    if (get().presentations[get().currentPresentation].slides.length === 1) {
      throw Error('Cannot delete the last slide');
    }
    try {
      set((state) => {
        const currentPresentation = state.currentPresentation;
        const updatedSlides = [
          ...state.presentations[currentPresentation].slides,
        ];
        updatedSlides.splice(state.currentSlideIndex, 1);
        return {
          presentations: {
            ...state.presentations,
            [currentPresentation]: {
              ...state.presentations[currentPresentation],
              slides: updatedSlides,
            },
          },
        };
      });
      set((state) => {
        const newIndex = state.currentSlideIndex === 0 ? 0 : state.currentSlideIndex - 1;
        return { currentSlideIndex: newIndex };
      });
      await get().updateToServer();
    } catch (error) {
      await get().loadPresentations();
      throw error;
    }
  },

  newElement: async (type, width, height, position, content) => {
    try {
      let currentSlide = [
        ...get().presentations[get().currentPresentation].slides,
      ];
      const elementId = `${type}_${randomId()}`;
      let currentElementOrder = currentSlide[get().currentSlideIndex].elementOrder;
      currentElementOrder.push(elementId);
      let currentElements = currentSlide[get().currentSlideIndex].elements;
      currentElements = {
        ...currentElements,
        [elementId]: {
          type,
          width,
          height,
          position,
          content,
        },
      }
      currentSlide[get().currentSlideIndex].elementOrder = currentElementOrder;
      currentSlide[get().currentSlideIndex].elements = currentElements;
      set((state) => ({
        presentations: {
          ...state.presentations,
          [state.currentPresentation]: {
            ...state.presentations[state.currentPresentation],
            slides: currentSlide,
          },
        },
      }));
      await get().updateToServer();
    } catch (error) {
      await get().loadPresentations();
      throw error;
    }
  },

  newText: async (formData) => {
    const type = 'Text';
    const width = formData.width;
    const height = formData.height;
    const position = { x: 0, y: 0 };

    const content = {
      'text': formData.text,
      'fontSize': formData.fontSize,
      'color': formData.textColor,
      'fontFamily': formData.fontFamily,
    }


    await get().newElement(type, width, height, position, content);
  },

  editText: async (elementId, formData) => {
    try {
      let currentSlide = [
        ...get().presentations[get().currentPresentation].slides,
      ];
      let currentElements = currentSlide[get().currentSlideIndex].elements;
      currentElements[elementId] = {
        ...currentElements[elementId],
        content: {
          text: formData.text,
          fontSize: formData.fontSize,
          color: formData.textColor,
          fontFamily: formData.fontFamily,
        },
      }
      set((state) => ({
        presentations: {
          ...state.presentations,
          [state.currentPresentation]: {
            ...state.presentations[state.currentPresentation],
            slides: currentSlide,
          },
        },
      }));
      await get().updateToServer();
    } catch (error) {
      await get().loadPresentations();
      throw error;
    }
  },

  newImage: async (formData) => {
    const type = 'Image';
    const width = formData.width;
    const height = formData.height;
    const position = { x: 0, y: 0 };

    const content = {
      'url': formData.url,
      'alt': formData.alt,
    }

    await get().newElement(type, width, height, position, content);
  },

  newVideo: async (formData) => {
    const type = 'Video';
    const width = formData.width;
    const height = formData.height;
    const position = { x: 0, y: 0 };
    const content = {
      'url': formData.url,
      'autoplay': formData.autoplay,
    }
    await get().newElement(type, width, height, position, content);
  },

  newCode: async (formData) => {
    const type = 'Code';
    const width = formData.width;
    const height = formData.height;
    const position = { x: 0, y: 0 };
    const content = {
      'code': formData.code,
      'fontSize': formData.fontSize,
    }
    await get().newElement(type, width, height, position, content);
  },

  editContent: async (elementId, contenet) => {

    try {
      let currentSlide = [
        ...get().presentations[get().currentPresentation].slides,
      ];
      let currentElements = currentSlide[get().currentSlideIndex].elements;
      currentElements[elementId] = {
        ...currentElements[elementId],
        content: contenet,
      }
      set((state) => ({
        presentations: {
          ...state.presentations,
          [state.currentPresentation]: {
            ...state.presentations[state.currentPresentation],
            slides: currentSlide,
          },
        },
      }));
      await get().updateToServer();
    } catch (error) {
      await get().loadPresentations();
      throw error;
    }
  },

  deleteElement: async (elementId) => {
    try {
      let currentSlide = [
        ...get().presentations[get().currentPresentation].slides,
      ];
      let currentElementOrder = currentSlide[get().currentSlideIndex].elementOrder;
      currentElementOrder = currentElementOrder.filter((id) => id !== elementId);
      let currentElements = currentSlide[get().currentSlideIndex].elements;
      delete currentElements[elementId];
      currentSlide[get().currentSlideIndex].elementOrder = currentElementOrder;
      currentSlide[get().currentSlideIndex].elements = currentElements;
      set((state) => ({
        presentations: {
          ...state.presentations,
          [state.currentPresentation]: {
            ...state.presentations[state.currentPresentation],
            slides: currentSlide,
          },
        },
      }));
      await get().updateToServer();
    } catch (error) {
      await get().loadPresentations();
      throw error;
    }
  },

  updatePosition: async (elementId, position) => {
    try {
      let currentSlide = [
        ...get().presentations[get().currentPresentation].slides,
      ];
      let currentElements = currentSlide[get().currentSlideIndex].elements;
      currentElements[elementId] = {
        ...currentElements[elementId],
        position,
      }
      set((state) => ({
        presentations: {
          ...state.presentations,
          [state.currentPresentation]: {
            ...state.presentations[state.currentPresentation],
            slides: currentSlide,
          },
        },
      }));
      await get().updateToServer();
    } catch (error) {
      await get().loadPresentations();
      throw error;
    }
  },

  updateSize: async (elementId, width, height) => {
    try {
      let currentSlide = [
        ...get().presentations[get().currentPresentation].slides,
      ];
      let currentElements = currentSlide[get().currentSlideIndex].elements;
      currentElements[elementId] = {
        ...currentElements[elementId],
        width: width,
        height: height,
      }
      set((state) => ({
        presentations: {
          ...state.presentations,
          [state.currentPresentation]: {
            ...state.presentations[state.currentPresentation],
            slides: currentSlide,
          },
        },
      }));
      await get().updateToServer();
    } catch (error) {
      await get().loadPresentations();
      throw error;
    }
  }
}))