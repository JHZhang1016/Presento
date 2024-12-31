import factories from '../factories';
import agent from '../agent';

const usePresentationStore = (set, get) => ({
  presentations: {}, // store all presentations summary
  currentPresentation: null, // store current presentation Detail

  loadPresentations: async () => {
    const data = await agent.Presentations.list().then((response) => response.data);
    set({ presentations: {...data} });
    // get().updateCurrentSlide();
    return data;
  },

  setCurrentPresentation: async (id) => {
    const currentPresentation = await agent.Presentations.details(id);
    set({ currentPresentation });
  },

  clearCurrentPresentation: () => set({ currentPresentation: null }),

  getCurrentPresentation: () => get().currentPresentation,

  getCurrentPresentationId: () => get().currentPresentation?.id,

  createPresentations: async ({title, thumbnailUrl, description, defaultBackgroundType, defaultBackgroundValue}) => {
    const newPresentation = factories.createPresentationDto({ title, thumbnailUrl, description, defaultBackgroundType, defaultBackgroundValue });
    await agent.Presentations.create(newPresentation);
    await get().loadPresentations();
  },

  editCurrentPresentationInfo: async (title, thumbnailUrl, description) => {
    const updatedPresentation = factories.createPresentationDto({ title, thumbnailUrl, description});
    const currentPresentation = get().currentPresentation;
    currentPresentation.title = title;
    currentPresentation.thumbnailUrl = thumbnailUrl;
    currentPresentation.description = description;
    updatedPresentation.id = currentPresentation.id;
    try {
      set({ currentPresentation});
      await agent.Presentations.update(updatedPresentation);
    } catch (error) {
      await get().loadPresentations();
      throw error
    }
  },

  getSlideCount: () => get().currentPresentation?.slideDetails?.length || 0,

  deletePresentation: async (id) => {
    try {
      set({currentPresentation: null});
      await agent.Presentations.delete(id);
    } catch (error) {
      throw error
    }
    await get().loadPresentations();
  },
})

export default usePresentationStore;