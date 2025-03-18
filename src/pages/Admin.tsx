import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Paper,
  Grid,
  SelectChangeEvent,
  IconButton,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import DeleteIcon from '@mui/icons-material/Delete';
import { dbService, Content } from '../services/DatabaseService';
import ChangePasswordDialog from '../components/ChangePasswordDialog';

const Admin = () => {
  const { t } = useTranslation();
  const [content, setContent] = useState<Omit<Content, 'id' | 'createdAt'>>({
    title: '',
    description: '',
    youtubeUrl: '',
    category: 'listening',
    difficulty: 'beginner',
    createdBy: 'admin',
  });
  const [allContent, setAllContent] = useState<Content[]>([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [openChangePasswordDialog, setOpenChangePasswordDialog] = useState(false);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const content = await dbService.getAllContent();
      setAllContent(content);
    } catch (error) {
      setErrorMessage(t('admin.messages.loadError'));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dbService.addContent({
        title: content.title,
        description: content.description,
        youtubeUrl: content.youtubeUrl,
        category: content.category,
        difficulty: content.difficulty,
        createdBy: 'admin'
      });
      setContent({
        title: '',
        description: '',
        youtubeUrl: '',
        category: 'listening',
        difficulty: 'beginner',
        createdBy: 'admin',
      });
      loadContent();
      setSuccessMessage(t('admin.messages.addSuccess'));
    } catch (error) {
      setErrorMessage(t('admin.messages.addError'));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
    const { name, value } = e.target;
    setContent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDeleteClick = (contentItem: Content) => {
    setSelectedContent(contentItem);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedContent) {
      try {
        await dbService.deleteContent(selectedContent.id);
        loadContent();
        setSuccessMessage(t('admin.messages.deleteSuccess'));
      } catch (error) {
        setErrorMessage(t('admin.messages.deleteError'));
      }
      setOpenDeleteDialog(false);
      setSelectedContent(null);
    }
  };

  const handleDeleteAllContent = async () => {
    try {
      await dbService.deleteAllContent();
      loadContent();
      setSuccessMessage(t('admin.messages.deleteAllSuccess'));
    } catch (error) {
      setErrorMessage(t('admin.messages.deleteAllError'));
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          {t('admin.title')}
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setOpenChangePasswordDialog(true)}
        >
          {t('admin.changePassword.button')}
        </Button>
      </Box>

      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccessMessage('')}>
          {successMessage}
        </Alert>
      )}

      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setErrorMessage('')}>
          {errorMessage}
        </Alert>
      )}

      <Grid container spacing={4}>
        {/* Form for adding new content */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 4 }}>
            <Typography variant="h6" gutterBottom>
              {t('admin.addContent.title')}
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>{t('admin.addContent.category')}</InputLabel>
                    <Select
                      name="category"
                      value={content.category}
                      label={t('admin.addContent.category')}
                      onChange={handleChange}
                    >
                      <MenuItem value="listening">Listening</MenuItem>
                      <MenuItem value="speaking">Speaking</MenuItem>
                      <MenuItem value="reading">Reading</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>{t('admin.addContent.level')}</InputLabel>
                    <Select
                      name="difficulty"
                      value={content.difficulty}
                      label={t('admin.addContent.level')}
                      onChange={handleChange}
                    >
                      <MenuItem value="beginner">{t('admin.difficulty.beginner')}</MenuItem>
                      <MenuItem value="intermediate">{t('admin.difficulty.intermediate')}</MenuItem>
                      <MenuItem value="advanced">{t('admin.difficulty.advanced')}</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label={t('admin.addContent.contentTitle')}
                    name="title"
                    value={content.title}
                    onChange={handleChange}
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label={t('admin.addContent.description')}
                    name="description"
                    value={content.description}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label={t('admin.addContent.youtubeUrl')}
                    name="youtubeUrl"
                    value={content.youtubeUrl}
                    onChange={handleChange}
                    required
                    helperText={t('admin.addContent.youtubeUrlHelp')}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                    >
                      {t('admin.addContent.submit')}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>

        {/* Content list and management */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                {t('admin.manageContent.title')}
              </Typography>
              <Button
                variant="contained"
                color="error"
                onClick={handleDeleteAllContent}
                disabled={allContent.length === 0}
              >
                {t('admin.manageContent.deleteAll')}
              </Button>
            </Box>

            <Grid container spacing={2}>
              {allContent.map((item) => (
                <Grid item xs={12} key={item.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {item.title}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          {t('admin.manageContent.category')}: {item.category}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          •
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {t('admin.manageContent.level')}: {t(`admin.difficulty.${item.difficulty}`)}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {t('admin.manageContent.addedOn')}: {item.createdAt.toLocaleDateString()}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteClick(item)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {/* Delete confirmation dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>{t('admin.deleteDialog.title')}</DialogTitle>
        <DialogContent>
          <Typography>
            {t('admin.deleteDialog.message', { title: selectedContent?.title })}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>
            {t('admin.deleteDialog.cancel')}
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            {t('admin.deleteDialog.confirm')}
          </Button>
        </DialogActions>
      </Dialog>

      <ChangePasswordDialog
        open={openChangePasswordDialog}
        onClose={() => setOpenChangePasswordDialog(false)}
      />
    </Container>
  );
};

export default Admin; 