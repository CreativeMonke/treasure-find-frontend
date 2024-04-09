import React from 'react';
import Switch from '@mui/joy/Switch';
import { useTranslation } from 'react-i18next';
import Box from '@mui/joy/Box'; // For layout
import Typography from '@mui/joy/Typography'; // For text

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  // Determines if the switch should be checked based on the current language
  const isRo = i18n.language.startsWith('ro');

  const toggleLanguage = () => {
    const newLang = isRo ? 'en' : 'ro';
    i18n.changeLanguage(newLang);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Typography>EN</Typography>
      <Switch checked={isRo} onChange={toggleLanguage} />
      <Typography>RO</Typography>
    </Box>
  );
};

export default LanguageSwitcher;
