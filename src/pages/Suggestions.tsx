import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Avatar,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Chip,
  Divider,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import AddIcon from '@mui/icons-material/Add';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import { useAuth } from '../contexts/AuthContext';

interface Suggestion {
  id: number;
  type: string;
  title: string;
  content: string;
  author: string;
  date: Date;
  likes: number;
  comments: number;
  status: 'new' | 'in-progress' | 'completed';
}

const mockSuggestions: Suggestion[] = [
  {
    id: 1,
    type: 'content',
    title: 'Adicionar mais podcasts para listening',
    content: 'Seria ótimo ter uma seção com podcasts para iniciantes.',
    author: 'João Silva',
    date: new Date('2024-01-15'),
    likes: 15,
    comments: 3,
    status: 'in-progress',
  },
  {
    id: 2,
    type: 'feature',
    title: 'Chat em tempo real para prática',
    content: 'Podemos adicionar um chat para conversação em tempo real?',
    author: 'Maria Santos',
    date: new Date('2024-01-14'),
    likes: 24,
    comments: 7,
    status: 'new',
  },
];

const SuggestionsPage = () => {
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  const [openDialog, setOpenDialog] = useState(false);
  const [newSuggestion, setNewSuggestion] = useState({
    title: '',
    type: '',
    content: '',
  });

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você implementaria a lógica para salvar a sugestão
    console.log('Nova sugestão:', newSuggestion);
    handleCloseDialog();
    setNewSuggestion({ title: '', type: '', content: '' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'primary';
      case 'in-progress': return 'warning';
      case 'completed': return 'success';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'Novo';
      case 'in-progress': return 'Em Progresso';
      case 'completed': return 'Implementado';
      default: return status;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          {t('suggestions.title')}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          {t('suggestions.newButton')}
        </Button>
      </Box>

      <Grid container spacing={3}>
        {mockSuggestions.map((suggestion) => (
          <Grid item xs={12} key={suggestion.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ mr: 2 }}>{suggestion.author[0]}</Avatar>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {suggestion.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {suggestion.author} • {suggestion.date.toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Box sx={{ ml: 'auto' }}>
                    <Chip
                      label={getStatusText(suggestion.status)}
                      color={getStatusColor(suggestion.status)}
                      size="small"
                    />
                  </Box>
                </Box>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {suggestion.content}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Chip
                    icon={<ThumbUpIcon />}
                    label={suggestion.likes}
                    variant="outlined"
                    clickable
                  />
                  <Chip
                    icon={<CommentIcon />}
                    label={suggestion.comments}
                    variant="outlined"
                    clickable
                  />
                </Box>
              </CardContent>
              <Divider />
              <CardActions>
                <Button size="small" startIcon={<ThumbUpIcon />}>
                  Curtir
                </Button>
                <Button size="small" startIcon={<CommentIcon />}>
                  Comentar
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{t('suggestions.dialog.title')}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={t('suggestions.dialog.titleLabel')}
                  value={newSuggestion.title}
                  onChange={(e) => setNewSuggestion({ ...newSuggestion, title: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label={t('suggestions.dialog.typeLabel')}
                  value={newSuggestion.type}
                  onChange={(e) => setNewSuggestion({ ...newSuggestion, type: e.target.value })}
                  required
                >
                  <MenuItem value="content">{t('home.feedback.type.content')}</MenuItem>
                  <MenuItem value="feature">{t('home.feedback.type.feature')}</MenuItem>
                  <MenuItem value="improvement">{t('home.feedback.type.improvement')}</MenuItem>
                  <MenuItem value="bug">{t('home.feedback.type.bug')}</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label={t('suggestions.dialog.contentLabel')}
                  value={newSuggestion.content}
                  onChange={(e) => setNewSuggestion({ ...newSuggestion, content: e.target.value })}
                  required
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>
              {t('suggestions.dialog.cancelButton')}
            </Button>
            <Button type="submit" variant="contained" color="primary">
              {t('suggestions.dialog.submitButton')}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
};

export default SuggestionsPage; 