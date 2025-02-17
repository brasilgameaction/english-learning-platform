import React from 'react';
import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import LanguageIcon from '@mui/icons-material/Language';

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    handleClose();
  };

  const languages = [
    { code: 'pt', name: 'Português' },
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
  ];

  return (
    <Box>
      <IconButton
        onClick={handleClick}
        color="primary"
        aria-label="select language"
      >
        <LanguageIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1.5,
            minWidth: 150,
            borderRadius: 2,
          },
        }}
      >
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            selected={i18n.language === lang.code}
            sx={{
              py: 1,
              px: 2,
            }}
          >
            <Typography variant="body2">{lang.name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default LanguageSelector; 