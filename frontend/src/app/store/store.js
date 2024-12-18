import { create } from 'zustand';
import usePresentationStore from '../store/presentationStore';
import useSlideStore from '../store/slideStore';
import useElementsStore from './elementStore';

export const useDataStore = create((...a) => ({
  ...usePresentationStore(...a),
  ...useSlideStore(...a),
  ...useElementsStore(...a),
}));
