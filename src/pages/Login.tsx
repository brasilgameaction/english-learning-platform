import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { adminLogin } = useAuth();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const success = await adminLogin(username, password);
      if (success) {
        navigate('/admin');
      } else {
        setError(t('login.error.invalid'));
      }
    } catch (err) {
      setError(t('login.error.general'));
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          {t('login.admin.title')}
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label={t('login.admin.username')}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label={t('login.admin.password')}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
          >
            {t('login.admin.submit')}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login; 