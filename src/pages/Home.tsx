import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  useTheme,
  useMediaQuery,
  Paper,
  Divider,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SchoolIcon from '@mui/icons-material/School';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const { t } = useTranslation();

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(45deg, #1976d2 30%, #21CBF3 90%)',
          color: 'white',
          py: { xs: 6, md: 12 },
          mb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant={isMobile ? 'h4' : 'h2'}
                component="h1"
                gutterBottom
                sx={{ fontWeight: 'bold' }}
              >
                {t('home.hero.title')}
              </Typography>
              <Typography
                variant={isMobile ? 'body1' : 'h6'}
                sx={{ mb: 4, opacity: 0.9 }}
              >
                {t('home.hero.subtitle')}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                component={RouterLink}
                to="/register"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                }}
              >
                {t('home.hero.cta')}
              </Button>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box
                component="img"
                src="https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg"
                alt="Students learning"
                sx={{
                  width: '100%',
                  maxWidth: 500,
                  height: 'auto',
                  borderRadius: 4,
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography
          variant={isMobile ? 'h5' : 'h4'}
          component="h2"
          align="center"
          gutterBottom
          sx={{ mb: 6, fontWeight: 'bold' }}
        >
          {t('home.features.title')}
        </Typography>

        <Grid container spacing={isTablet ? 2 : 4}>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              elevation={3}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                }
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image="https://images.pexels.com/photos/3059747/pexels-photo-3059747.jpeg"
                alt="Listening"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <HeadphonesIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6" component="h3">
                    {t('home.features.listening.title')}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {t('home.features.listening.description')}
                </Typography>
                <Button
                  component={RouterLink}
                  to="/listening"
                  variant="outlined"
                  color="primary"
                  fullWidth
                >
                  {t('home.features.listening.button')}
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card
              elevation={3}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                }
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image="https://images.pexels.com/photos/7516347/pexels-photo-7516347.jpeg"
                alt="Speaking"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <RecordVoiceOverIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6" component="h3">
                    {t('home.features.speaking.title')}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {t('home.features.speaking.description')}
                </Typography>
                <Button
                  component={RouterLink}
                  to="/speaking"
                  variant="outlined"
                  color="primary"
                  fullWidth
                >
                  {t('home.features.speaking.button')}
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card
              elevation={3}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                }
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image="https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg"
                alt="Reading"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <MenuBookIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6" component="h3">
                    {t('home.features.reading.title')}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {t('home.features.reading.description')}
                </Typography>
                <Button
                  component={RouterLink}
                  to="/reading"
                  variant="outlined"
                  color="primary"
                  fullWidth
                >
                  {t('home.features.reading.button')}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Why Choose Us Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant={isMobile ? 'h5' : 'h4'}
            component="h2"
            align="center"
            gutterBottom
            sx={{ mb: 6, fontWeight: 'bold' }}
          >
            {t('home.why.title')}
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  height: '100%',
                  bgcolor: 'transparent',
                  textAlign: 'center',
                }}
              >
                <SchoolIcon
                  sx={{ fontSize: 48, color: 'primary.main', mb: 2 }}
                />
                <Typography variant="h6" gutterBottom>
                  {t('home.why.expert.title')}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('home.why.expert.description')}
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  height: '100%',
                  bgcolor: 'transparent',
                  textAlign: 'center',
                }}
              >
                <RecordVoiceOverIcon
                  sx={{ fontSize: 48, color: 'primary.main', mb: 2 }}
                />
                <Typography variant="h6" gutterBottom>
                  {t('home.why.interactive.title')}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('home.why.interactive.description')}
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  height: '100%',
                  bgcolor: 'transparent',
                  textAlign: 'center',
                }}
              >
                <MenuBookIcon
                  sx={{ fontSize: 48, color: 'primary.main', mb: 2 }}
                />
                <Typography variant="h6" gutterBottom>
                  {t('home.why.comprehensive.title')}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('home.why.comprehensive.description')}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Call to Action */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant={isMobile ? 'h5' : 'h4'} gutterBottom>
            {t('home.cta.title')}
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
            {t('home.cta.subtitle')}
          </Typography>
          <Button
            component={RouterLink}
            to="/register"
            variant="contained"
            color="secondary"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
            }}
          >
            {t('home.cta.button')}
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 