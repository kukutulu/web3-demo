import { Languages } from 'src/constants/languages';
import { SupportLanguages } from 'src/types';

export function langToCode(lng: SupportLanguages): string {
  const language = Languages.find((language) => language.label === lng);
  return language ? language.code : 'en';
}
