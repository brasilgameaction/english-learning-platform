import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useTheme,
  useMediaQuery,
  Divider,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MenuIcon from '@mui/icons-material/Menu';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LanguageSelector from './LanguageSelector';

const Navbar = () => {
  const { isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { t } = useTranslation();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      setMobileMenuOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navigationItems = [
    { text: t('nav.listening'), icon: <HeadphonesIcon />, path: '/listening', mobileText: t('sidebar.listening') },
    { text: t('nav.speaking'), icon: <RecordVoiceOverIcon />, path: '/speaking', mobileText: t('sidebar.speaking') },
    { text: t('nav.reading'), icon: <MenuBookIcon />, path: '/reading', mobileText: t('sidebar.reading') },
  ];

  const renderMobileMenu = () => (
    <Drawer
      anchor="right"
      open={mobileMenuOpen}
      onClose={() => setMobileMenuOpen(false)}
      PaperProps={{
        sx: {
          width: 280,
          bgcolor: 'background.paper',
        },
      }}
    >
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" color="primary" gutterBottom>
          {t('sidebar.menu')}
        </Typography>
      </Box>
      
      <List sx={{ pt: 1 }}>
        {navigationItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={RouterLink}
            to={item.path}
            onClick={() => setMobileMenuOpen(false)}
            sx={{
              py: 1.5,
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'primary.main', minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.mobileText}
              primaryTypographyProps={{
                fontSize: '0.95rem',
                fontWeight: 500,
              }}
            />
          </ListItem>
        ))}
        
        <Divider sx={{ my: 2 }} />
        
        {!isAdmin ? (
          <ListItem
            button
            component={RouterLink}
            to="/admin-login"
            onClick={() => setMobileMenuOpen(false)}
            sx={{
              py: 1.5,
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'primary.main', minWidth: 40 }}>
              <AdminPanelSettingsIcon />
            </ListItemIcon>
            <ListItemText 
              primary={t('sidebar.admin')}
              primaryTypographyProps={{
                fontSize: '0.95rem',
                fontWeight: 500,
              }}
            />
          </ListItem>
        ) : (
          <>
            <ListItem
              button
              component={RouterLink}
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              sx={{
                py: 1.5,
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'primary.main', minWidth: 40 }}>
                <AdminPanelSettingsIcon />
              </ListItemIcon>
              <ListItemText 
                primary={t('nav.adminPanel')}
                primaryTypographyProps={{
                  fontSize: '0.95rem',
                  fontWeight: 500,
                }}
              />
            </ListItem>
            <ListItem
              button
              onClick={handleLogout}
              sx={{
                py: 1.5,
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              <ListItemText 
                primary={t('nav.logout')}
                primaryTypographyProps={{
                  fontSize: '0.95rem',
                  fontWeight: 500,
                }}
              />
            </ListItem>
          </>
        )}
      </List>
    </Drawer>
  );

  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'background.paper' }}>
      <Container>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'primary.main',
              fontWeight: 'bold',
              fontSize: { xs: '1.1rem', md: '1.3rem' },
            }}
          >
            {t('platform.name')}
          </Typography>

          {isMobile ? (
            <>
              <LanguageSelector />
              <IconButton
                edge="end"
                color="primary"
                aria-label="menu"
                onClick={handleMobileMenuToggle}
              >
                <MenuIcon />
              </IconButton>
              {renderMobileMenu()}
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              {navigationItems.map((item) => (
                <Button
                  key={item.text}
                  color="primary"
                  component={RouterLink}
                  to={item.path}
                  startIcon={item.icon}
                >
                  {item.text}
                </Button>
              ))}

              {isAdmin ? (
                <>
                  <Button
                    color="primary"
                    component={RouterLink}
                    to="/admin"
                    startIcon={<AdminPanelSettingsIcon />}
                  >
                    {t('nav.adminPanel')}
                  </Button>
                  <Button
                    color="primary"
                    onClick={handleLogout}
                  >
                    {t('nav.logout')}
                  </Button>
                </>
              ) : (
                <Button
                  color="primary"
                  component={RouterLink}
                  to="/admin-login"
                  startIcon={<AdminPanelSettingsIcon />}
                >
                  {t('nav.admin')}
                </Button>
              )}
              <LanguageSelector />
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 