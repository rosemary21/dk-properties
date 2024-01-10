import { create } from "zustand";

type PropertyState = {
  state: string | null;
  onChangeState: ((value: string | null) => void) | undefined;
};

const usePropertyStore = create<PropertyState>()((set) => ({
  state: "Lagos",
  onChangeState: (value: string | null) => set(() => ({ state: value })),
}));

export default usePropertyStore;
