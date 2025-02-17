import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Alert,
  Chip,
} from '@mui/material';
import { dbService, Content } from '../services/DatabaseService';
import SchoolIcon from '@mui/icons-material/School';

interface ContentPageProps {
  title: string;
  description: string;
  category: 'listening' | 'speaking' | 'reading';
}

const ContentPage: React.FC<ContentPageProps> = ({ title, description, category }) => {
  const [content, setContent] = useState<Content[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    loadContent();
  }, [category]);

  const loadContent = async () => {
    try {
      const contents = await dbService.getContentByCategory(category);
      setContent(contents);
    } catch (err) {
      console.error('Error loading content:', err);
      setError('Erro ao carregar conteúdo');
    }
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.split('v=')[1];
    if (!videoId) return url;
    const ampersandPosition = videoId.indexOf('&');
    if (ampersandPosition !== -1) {
      return `https://www.youtube.com/embed/${videoId.substring(0, ampersandPosition)}`;
    }
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'success';
      case 'intermediate':
        return 'warning';
      case 'advanced':
        return 'error';
      default:
        return 'default';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'Iniciante';
      case 'intermediate':
        return 'Intermediário';
      case 'advanced':
        return 'Avançado';
      default:
        return difficulty;
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {title}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" paragraph>
        {description}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {content.length === 0 ? (
        <Alert severity="info">
          Nenhum conteúdo disponível nesta categoria ainda.
        </Alert>
      ) : (
        <Grid container spacing={4}>
          {content.map((item) => (
            <Grid item xs={12} md={6} key={item.id}>
              <Card>
                <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
                  <CardMedia
                    component="iframe"
                    src={getYouTubeEmbedUrl(item.youtubeUrl)}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      border: 0,
                    }}
                    title={item.title}
                  />
                </Box>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography gutterBottom variant="h6" component="h2">
                      {item.title}
                    </Typography>
                    <Chip
                      icon={<SchoolIcon />}
                      label={getDifficultyLabel(item.difficulty)}
                      color={getDifficultyColor(item.difficulty)}
                      size="small"
                      sx={{ ml: 1 }}
                    />
                  </Box>
                  <Typography variant="body2" color="textSecondary">
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ContentPage; 