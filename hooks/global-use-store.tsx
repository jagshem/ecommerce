// store.js
import create from 'zustand';

interface StoreState {
  activeStoreName: string;
  setActiveStoreName: (name: string) => void;
}

export const useStore = create<StoreState>((set) => ({
  activeStoreName: '',
  setActiveStoreName: (name: string) => set({ activeStoreName: name }),
}));
