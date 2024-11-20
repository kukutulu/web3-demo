import { atom, useAtomValue, useSetAtom } from 'jotai';

type ModalState = {
  modal1: boolean;
  modal2: boolean;
  connectWallet: boolean;
};

const initData: ModalState = {
  modal1: false,
  modal2: false,
  connectWallet: false,
};

const modalTest = atom<ModalState>(initData);

export const useModalStateData = () => useAtomValue(modalTest);

export const useModalStateFunction = () => {
  const setModalState = useSetAtom(modalTest);

  function setModalData(modalKey: keyof ModalState, value: boolean) {
    setModalState((prev) => {
      return {
        ...prev,
        [modalKey]: value,
      };
    });
  }

  function openModal(modalKey: keyof ModalState) {
    setModalData(modalKey, true);
  }
  function closeModal(modalKey: keyof ModalState) {
    setModalData(modalKey, false);
  }
  return { openModal, closeModal };
};
