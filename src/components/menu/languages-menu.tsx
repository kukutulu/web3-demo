import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Languages } from 'src/constants/languages';
import { useLanguageData, useLanguageFunction } from 'src/jotai/language';
import { SupportLanguages } from 'src/types';

export default function LanguagesMenu() {
  const currentLanguage = useLanguageData();
  console.log('🚀 ~ LanguagesMenu ~ currentLanguage:', currentLanguage);
  const { setLanguage } = useLanguageFunction();
  const { i18n, t } = useTranslation();

  const handleChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value as SupportLanguages);
    i18n.changeLanguage(event.target.value);
  };

  return (
    <Box sx={{ maxWidth: '180px', pt: 2 }}>
      <FormControl fullWidth>
        <InputLabel id="langs-select-label">{t('languageSelect')}</InputLabel>
        <Select labelId="langs-select-label" id="langs-select" value={currentLanguage} onChange={handleChange} label="Language">
          {Languages.map((item, index) => (
            <MenuItem value={item.code} key={index}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
