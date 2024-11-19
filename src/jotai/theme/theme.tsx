import { atom, useAtomValue, useSetAtom } from 'jotai';
import { THEME_MODE, TThemeData } from './type';
import { useCallback } from 'react';
import { appStore } from '../app-store';

const initData: TThemeData = {
  mode: 'light',
};

const state = atom<TThemeData>(initData);
appStore.set(state, initData);

export const useThemeData = () => useAtomValue(state);

export const useThemeFunction = () => {
  const _setState = useSetAtom(state);
  function setState(data: Partial<TThemeData>) {
    _setState((prev) => {
      return {
        ...prev,
        ...data,
      };
    });
  }

  const toggleThemeMode = useCallback(() => {
    _setState((prev) => {
      const newMode: THEME_MODE = prev.mode === 'dark' ? 'light' : 'dark';
      // eslint-disable-next-line no-undef
      localStorage.setItem('theme', newMode);
      return {
        ...prev,
        mode: newMode,
      };
    });
  }, [_setState]);

  return {
    toggleThemeMode,
    setState,
  };
};
