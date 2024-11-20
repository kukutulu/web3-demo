import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Languages } from 'src/constants/languages';
import { useLanguageData, useLanguageFunction } from 'src/jotai/language';
import { SupportLanguages } from 'src/types';

export default function LanguagesMenu() {
  const currentLanguage = useLanguageData();
  const { setLanguage } = useLanguageFunction();

  const handleChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value as SupportLanguages);
  };

  return (
    <Box sx={{ maxWidth: '180px' }}>
      <FormControl fullWidth>
        <InputLabel id="langs-select-label">Language</InputLabel>
        <Select labelId="langs-select-label" id="langs-select" value={currentLanguage} onChange={handleChange} label="Language">
          {Languages.map((item, index) => (
            <MenuItem value={item.label} key={index}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
