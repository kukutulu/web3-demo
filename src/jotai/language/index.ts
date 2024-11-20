import { atom, useAtomValue, useSetAtom } from 'jotai';
import { SupportLanguages } from 'src/types';

const initData: SupportLanguages = 'English';

const language = atom<SupportLanguages>(initData);

export const useLanguageData = () => useAtomValue(language);

export const useLanguageFunction = () => {
  const setLanguageState = useSetAtom(language);

  function setLanguage(data: SupportLanguages) {
    setLanguageState(data);
  }

  return { setLanguage };
};
