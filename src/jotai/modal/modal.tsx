import { DialogProps } from '@mui/material';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { ReactNode } from 'react';

export type TModalData = {
  open: boolean;
  title: string | ReactNode;
  modalProps?: Omit<DialogProps, 'open'>;
  conditionOpen?: boolean | (() => boolean);
  content?: ReactNode;
};

const initData: TModalData = {
  open: false,
  title: '',
  modalProps: undefined,
  conditionOpen: false,
  content: <></>,
};

const modalData = atom(initData);

export const useModalData = () => useAtomValue(modalData);
export const useModalFunction = () => {
  const _setModalData = useSetAtom(modalData);

  function setModalData(data: Partial<TModalData>) {
    _setModalData((prev) => {
      return {
        ...prev,
        ...data,
      };
    });
  }
  function openModal(data: Omit<TModalData, 'open'>) {
    console.log('suy');
    setModalData({ ...data, open: true });
  }

  function closeModal() {
    setModalData({
      title: '',
      conditionOpen: true,
      open: false,
    });
  }

  return {
    setModalData,
    openModal,
    closeModal,
  };
};
