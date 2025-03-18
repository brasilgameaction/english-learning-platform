import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Alert,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';

interface ChangePasswordDialogProps {
  open: boolean;
  onClose: () => void;
}

const ChangePasswordDialog: React.FC<ChangePasswordDialogProps> = ({ open, onClose }) => {
  const { t } = useTranslation();
  const { changePassword } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validações
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError(t('admin.changePassword.error.allRequired'));
      return;
    }

    if (newPassword !== confirmPassword) {
      setError(t('admin.changePassword.error.passwordsMismatch'));
      return;
    }

    if (newPassword.length < 6) {
      setError(t('admin.changePassword.error.passwordTooShort'));
      return;
    }

    try {
      const success = await changePassword('admin', currentPassword, newPassword);
      if (success) {
        setSuccess(true);
        // Limpar campos
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        // Fechar o diálogo após 2 segundos
        setTimeout(() => {
          onClose();
          setSuccess(false);
        }, 2000);
      } else {
        setError(t('admin.changePassword.error.currentPasswordInvalid'));
      }
    } catch (error) {
      setError(t('admin.changePassword.error.general'));
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t('admin.changePassword.title')}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {t('admin.changePassword.success')}
            </Alert>
          )}
          
          <TextField
            fullWidth
            type="password"
            label={t('admin.changePassword.currentPassword')}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            margin="normal"
            required
          />
          
          <TextField
            fullWidth
            type="password"
            label={t('admin.changePassword.newPassword')}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            margin="normal"
            required
          />
          
          <TextField
            fullWidth
            type="password"
            label={t('admin.changePassword.confirmPassword')}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            margin="normal"
            required
          />
        </DialogContent>
        
        <DialogActions>
          <Button onClick={onClose}>
            {t('common.cancel')}
          </Button>
          <Button type="submit" variant="contained" color="primary">
            {t('admin.changePassword.submit')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ChangePasswordDialog; 