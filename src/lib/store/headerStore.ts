import {create} from 'zustand';

type HeaderState = {
  IsScrollingHeader: boolean;
  setIsScrollingHeader: (sticky: boolean) => void;
};

const useHeaderStore = create<HeaderState>((set) => ({
  IsScrollingHeader: true,
  setIsScrollingHeader: (sticky) => set({ IsScrollingHeader: sticky }),
}));

export default useHeaderStore;
