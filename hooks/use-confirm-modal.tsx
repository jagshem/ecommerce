import { create } from 'zustand';

interface StoreInfo {
  id: string;
  name: string;
}

interface useConfirmModalStore {
  isOpen: boolean;
  storeInfo: StoreInfo | null;
  onOpen: (storeInfo: StoreInfo) => void;
  onClose: () => void;
  onConfirm: () => void;
  setOnConfirm: (onConfirm: () => void) => void;
}

export const useConfirmModal = create<useConfirmModalStore>((set) => ({
  isOpen: false,
  storeInfo: null,
  onOpen: (storeInfo) => set({ isOpen: true, storeInfo }),
  onClose: () => set({ isOpen: false, storeInfo: null }),
  onConfirm: () => {},
  setOnConfirm: (onConfirm) => set({ onConfirm }),
}));
