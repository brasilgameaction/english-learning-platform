import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

const UserLogin = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { createTemporaryUser } = useAuth();
  const { t } = useTranslation();

  const handleTemporaryLogin = async () => {
    try {
      setError('');
      await createTemporaryUser();
      navigate('/');
    } catch (err) {
      setError('Erro ao criar usuário temporário. Tente novamente.');
      console.error('Login error:', err);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          {t('login.title')}
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
          {t('login.subtitle')}
        </Typography>

        <Button
          variant="contained"
          fullWidth
          startIcon={<PersonOutlineIcon />}
          onClick={handleTemporaryLogin}
          sx={{ py: 1.5 }}
        >
          {t('login.temporary')}
        </Button>
      </Paper>
    </Container>
  );
};

export default UserLogin; 