import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Alert,
  Divider,
  Link,
} from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';

const Register = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { loginWithGoogle, loginWithFacebook, loginWithGithub } = useAuth();

  const handleSocialRegister = async (provider: 'google' | 'facebook' | 'github') => {
    try {
      setError('');
      switch (provider) {
        case 'google':
          await loginWithGoogle();
          break;
        case 'facebook':
          await loginWithFacebook();
          break;
        case 'github':
          await loginWithGithub();
          break;
      }
      navigate('/');
    } catch (err) {
      setError('Failed to register. Please try again.');
      console.error('Registration error:', err);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Create Your Account
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Typography variant="body1" align="center" sx={{ mb: 3 }}>
          Join our community and start learning English today!
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<GoogleIcon />}
            onClick={() => handleSocialRegister('google')}
            sx={{
              backgroundColor: '#DB4437',
              '&:hover': {
                backgroundColor: '#C53929',
              },
            }}
          >
            Register with Google
          </Button>

          <Button
            variant="contained"
            size="large"
            startIcon={<FacebookIcon />}
            onClick={() => handleSocialRegister('facebook')}
            sx={{
              backgroundColor: '#4267B2',
              '&:hover': {
                backgroundColor: '#365899',
              },
            }}
          >
            Register with Facebook
          </Button>

          <Button
            variant="contained"
            size="large"
            startIcon={<GitHubIcon />}
            onClick={() => handleSocialRegister('github')}
            sx={{
              backgroundColor: '#333',
              '&:hover': {
                backgroundColor: '#222',
              },
            }}
          >
            Register with GitHub
          </Button>

          <Divider sx={{ my: 2 }}>
            <Typography color="textSecondary">
              Already have an account?
            </Typography>
          </Divider>

          <Link
            component={RouterLink}
            to="/user-login"
            sx={{ textAlign: 'center' }}
          >
            Sign in here
          </Link>

          <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 2 }}>
            By registering, you agree to our Terms of Service and Privacy Policy.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register; 