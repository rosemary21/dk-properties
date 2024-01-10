import { ChangeEvent, ChangeEventHandler, MouseEventHandler } from "react";
import { create } from "zustand";

type CheckBoxState = {
  price: string;
  isChecked1: boolean;
  isChecked2: boolean;
  isChecked3: boolean;
  isChecked4: boolean;
  isChecked5: boolean;
  isChecked6: boolean;
  isChecked7: boolean;
  isChecked8: boolean;
  onChangeCheck1: ChangeEventHandler<HTMLInputElement> | undefined;
  onChangeCheck2: ChangeEventHandler<HTMLInputElement> | undefined;
  onChangeCheck3: ChangeEventHandler<HTMLInputElement> | undefined;
  onChangeCheck4: ChangeEventHandler<HTMLInputElement> | undefined;
  onChangeCheck5: ChangeEventHandler<HTMLInputElement> | undefined;
  onChangeCheck6: ChangeEventHandler<HTMLInputElement> | undefined;
  onChangeCheck7: ChangeEventHandler<HTMLInputElement> | undefined;
  onChangeCheck8: ChangeEventHandler<HTMLInputElement> | undefined;
  refresh:  MouseEventHandler<HTMLButtonElement> | undefined;
};

const useCheckBoxStore = create<CheckBoxState>()((set) => ({
  price: "500000",
  isChecked1: true,
  isChecked2: false,
  isChecked3: false,
  isChecked4: false,
  isChecked5: false,
  isChecked6: false,
  isChecked7: false,
  isChecked8: false,
  onChangeCheck1: (e: ChangeEvent<HTMLInputElement>) => {
    set(() => ({ price: "500000" }));
    set(() => ({ isChecked1: e.currentTarget.checked }));
    set(() => ({ isChecked2: !e.currentTarget.checked }));
    set(() => ({ isChecked3: !e.currentTarget.checked }));
    set(() => ({ isChecked4: !e.currentTarget.checked }));
    set(() => ({ isChecked5: !e.currentTarget.checked }));
    set(() => ({ isChecked6: !e.currentTarget.checked }));
    set(() => ({ isChecked7: !e.currentTarget.checked }));
    set(() => ({ isChecked8: !e.currentTarget.checked }));
  },
  onChangeCheck2: (e: ChangeEvent<HTMLInputElement>) => {
    set(() => ({ price: "1000000" }));
    set(() => ({ isChecked1: !e.currentTarget.checked }));
    set(() => ({ isChecked2: e.currentTarget.checked }));
    set(() => ({ isChecked3: !e.currentTarget.checked }));
    set(() => ({ isChecked4: !e.currentTarget.checked }));
    set(() => ({ isChecked5: !e.currentTarget.checked }));
    set(() => ({ isChecked6: !e.currentTarget.checked }));
    set(() => ({ isChecked7: !e.currentTarget.checked }));
    set(() => ({ isChecked8: !e.currentTarget.checked }));
  },
  onChangeCheck3: (e: ChangeEvent<HTMLInputElement>) => {
    set(() => ({ price: "2500000" }));
    set(() => ({ isChecked1: !e.currentTarget.checked }));
    set(() => ({ isChecked2: !e.currentTarget.checked }));
    set(() => ({ isChecked3: e.currentTarget.checked }));
    set(() => ({ isChecked4: !e.currentTarget.checked }));
    set(() => ({ isChecked5: !e.currentTarget.checked }));
    set(() => ({ isChecked6: !e.currentTarget.checked }));
    set(() => ({ isChecked7: !e.currentTarget.checked }));
    set(() => ({ isChecked8: !e.currentTarget.checked }));
  },
  onChangeCheck4: (e: ChangeEvent<HTMLInputElement>) => {
    set(() => ({ price: "5000000" }));
    set(() => ({ isChecked1: !e.currentTarget.checked }));
    set(() => ({ isChecked2: !e.currentTarget.checked }));
    set(() => ({ isChecked3: !e.currentTarget.checked }));
    set(() => ({ isChecked4: e.currentTarget.checked }));
    set(() => ({ isChecked5: !e.currentTarget.checked }));
    set(() => ({ isChecked6: !e.currentTarget.checked }));
    set(() => ({ isChecked7: !e.currentTarget.checked }));
    set(() => ({ isChecked8: !e.currentTarget.checked }));
  },
  onChangeCheck5: (e: ChangeEvent<HTMLInputElement>) => {
    set(() => ({ price: "7500000" }));
    set(() => ({ isChecked1: !e.currentTarget.checked }));
    set(() => ({ isChecked2: !e.currentTarget.checked }));
    set(() => ({ isChecked3: !e.currentTarget.checked }));
    set(() => ({ isChecked4: !e.currentTarget.checked }));
    set(() => ({ isChecked5: e.currentTarget.checked }));
    set(() => ({ isChecked6: !e.currentTarget.checked }));
    set(() => ({ isChecked7: !e.currentTarget.checked }));
    set(() => ({ isChecked8: !e.currentTarget.checked }));
  },
  onChangeCheck6: (e: ChangeEvent<HTMLInputElement>) => {
    set(() => ({ price: "10000000" }));
    set(() => ({ isChecked1: !e.currentTarget.checked }));
    set(() => ({ isChecked2: !e.currentTarget.checked }));
    set(() => ({ isChecked3: !e.currentTarget.checked }));
    set(() => ({ isChecked4: !e.currentTarget.checked }));
    set(() => ({ isChecked5: !e.currentTarget.checked }));
    set(() => ({ isChecked6: e.currentTarget.checked }));
    set(() => ({ isChecked7: !e.currentTarget.checked }));
    set(() => ({ isChecked8: !e.currentTarget.checked }));
  },
  onChangeCheck7: (e: ChangeEvent<HTMLInputElement>) => {
    set(() => ({ price: "15000000" }));
    set(() => ({ isChecked1: !e.currentTarget.checked }));
    set(() => ({ isChecked2: !e.currentTarget.checked }));
    set(() => ({ isChecked3: !e.currentTarget.checked }));
    set(() => ({ isChecked4: !e.currentTarget.checked }));
    set(() => ({ isChecked5: !e.currentTarget.checked }));
    set(() => ({ isChecked6: !e.currentTarget.checked }));
    set(() => ({ isChecked7: e.currentTarget.checked }));
    set(() => ({ isChecked8: !e.currentTarget.checked }));
  },
  onChangeCheck8: (e: ChangeEvent<HTMLInputElement>) => {
    set(() => ({ price: "20000000" }));
    set(() => ({ isChecked1: !e.currentTarget.checked }));
    set(() => ({ isChecked2: !e.currentTarget.checked }));
    set(() => ({ isChecked3: !e.currentTarget.checked }));
    set(() => ({ isChecked4: !e.currentTarget.checked }));
    set(() => ({ isChecked5: !e.currentTarget.checked }));
    set(() => ({ isChecked6: !e.currentTarget.checked }));
    set(() => ({ isChecked7: !e.currentTarget.checked }));
    set(() => ({ isChecked8: e.currentTarget.checked }));
  },
  refresh: () => {
    set(() => ({ price: "500000" }));
    set(() => ({ isChecked1: true }));
    set(() => ({ isChecked2: false }));
    set(() => ({ isChecked3: false }));
    set(() => ({ isChecked4: false }));
    set(() => ({ isChecked5: false }));
    set(() => ({ isChecked6: false }));
    set(() => ({ isChecked7: false }));
    set(() => ({ isChecked8: false }));
  },
}));

export default useCheckBoxStore;
