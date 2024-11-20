import { atom, useAtomValue, useSetAtom } from 'jotai';
import { THEME_MODE, TThemeData } from './type';
import { useCallback } from 'react';
import { appStore } from '../app-store';

const initData: TThemeData = {
  mode: 'light',
};

const themeMode = atom<TThemeData>(initData);
appStore.set(themeMode, initData);

export const useThemeData = () => useAtomValue(themeMode);

export const useThemeFunction = () => {
  const _setState = useSetAtom(themeMode);
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
