import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'pt',
    lng: 'pt',
    detection: {
      order: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },
    resources: {
      pt: {
        translation: {
          // Navbar
          'platform.name': 'Plataforma de Inglês',
          'nav.listening': 'Compreensão Auditiva',
          'nav.speaking': 'Conversação',
          'nav.reading': 'Leitura',
          'nav.register': 'Criar Conta',
          'nav.login': 'Entrar',
          'nav.admin': 'Admin',
          'nav.logout': 'Sair',
          'nav.adminPanel': 'Painel Admin',
          'nav.suggestions': 'Sugestões',

          // Sidebar
          'sidebar.menu': 'Menu de Navegação',
          'sidebar.listening': 'Praticar Listening',
          'sidebar.speaking': 'Praticar Speaking',
          'sidebar.reading': 'Praticar Reading',
          'sidebar.register': 'Criar uma Conta',
          'sidebar.login': 'Fazer Login',
          'sidebar.admin': 'Área Administrativa',
          'sidebar.suggestions': 'Sugestões da Comunidade',

          // Home
          'home.hero.title': 'Aprenda Inglês em Comunidade',
          'home.hero.subtitle': 'Uma plataforma colaborativa e gratuita para aprender inglês. Compartilhe conhecimento, pratique com outros estudantes e evolua através de conteúdo criado pela comunidade.',
          'home.hero.cta': 'Junte-se à Comunidade',
          
          'home.features.title': 'Como Funciona Nossa Comunidade',
          'home.features.listening.title': 'Listening',
          'home.features.listening.description': 'Pratique com podcasts, vídeos e áudios compartilhados pela comunidade.',
          'home.features.listening.button': 'Começar Listening',
          
          'home.features.speaking.title': 'Speaking',
          'home.features.speaking.description': 'Acesse vídeos e materiais para praticar conversação e melhorar sua pronúncia.',
          'home.features.speaking.button': 'Começar Speaking',
          
          'home.features.reading.title': 'Reading',
          'home.features.reading.description': 'Acesse textos e materiais selecionados pelos membros da comunidade.',
          'home.features.reading.button': 'Começar Reading',

          'home.why.title': 'Por que Participar da Nossa Comunidade?',
          'home.why.expert.title': 'Conteúdo Colaborativo',
          'home.why.expert.description': 'Material compartilhado e revisado pela própria comunidade de estudantes e professores.',
          'home.why.interactive.title': 'Aprendizado Social',
          'home.why.interactive.description': 'Aprenda e pratique diretamente com outros estudantes em um ambiente colaborativo.',
          'home.why.comprehensive.title': 'Totalmente Gratuito',
          'home.why.comprehensive.description': 'Sem mensalidades ou cobranças. Uma plataforma feita pela comunidade, para a comunidade.',

          'home.cta.title': 'Faça Parte da Nossa Comunidade de Aprendizado',
          'home.cta.subtitle': 'Junte-se a milhares de estudantes compartilhando conhecimento e aprendendo juntos.',
          'home.cta.button': 'Começar Agora - É Gratuito',

          // Suggestions Page
          'suggestions.title': 'Sugestões da Comunidade',
          'suggestions.newButton': 'Nova Sugestão',
          'suggestions.dialog.title': 'Criar Nova Sugestão',
          'suggestions.dialog.titleLabel': 'Título da sugestão',
          'suggestions.dialog.typeLabel': 'Tipo de sugestão',
          'suggestions.dialog.contentLabel': 'Descreva sua sugestão',
          'suggestions.dialog.cancelButton': 'Cancelar',
          'suggestions.dialog.submitButton': 'Enviar Sugestão',
          'suggestions.status.new': 'Novo',
          'suggestions.status.inProgress': 'Em Progresso',
          'suggestions.status.completed': 'Implementado',
          'suggestions.action.like': 'Curtir',
          'suggestions.action.comment': 'Comentar',

          // Login
          'login.title': 'Entrar na Plataforma',
          'login.subtitle': 'Escolha uma das opções abaixo para entrar',
          'login.google': 'Entrar com Google',
          'login.facebook': 'Entrar com Facebook',
          'login.github': 'Entrar com GitHub',
          'login.temporary': 'Entrar como Usuário Temporário',

          // Admin
          'admin.title': 'Painel Administrativo',
          'admin.addContent.title': 'Adicionar Novo Conteúdo',
          'admin.addContent.category': 'Categoria',
          'admin.addContent.level': 'Nível',
          'admin.addContent.contentTitle': 'Título',
          'admin.addContent.description': 'Descrição',
          'admin.addContent.youtubeUrl': 'URL do YouTube',
          'admin.addContent.youtubeUrlHelp': 'Cole a URL completa do vídeo do YouTube',
          'admin.addContent.submit': 'Adicionar Conteúdo',
          'admin.manageContent.title': 'Gerenciar Conteúdo',
          'admin.manageContent.deleteAll': 'Deletar Todo Conteúdo',
          'admin.manageContent.category': 'Categoria',
          'admin.manageContent.level': 'Nível',
          'admin.manageContent.addedOn': 'Adicionado em',
          'admin.deleteDialog.title': 'Confirmar Exclusão',
          'admin.deleteDialog.message': 'Tem certeza que deseja deletar o conteúdo "{title}"?',
          'admin.deleteDialog.cancel': 'Cancelar',
          'admin.deleteDialog.confirm': 'Deletar',
          'admin.messages.addSuccess': 'Conteúdo adicionado com sucesso!',
          'admin.messages.addError': 'Erro ao adicionar conteúdo',
          'admin.messages.deleteSuccess': 'Conteúdo deletado com sucesso!',
          'admin.messages.deleteError': 'Erro ao deletar conteúdo',
          'admin.messages.deleteAllSuccess': 'Todo o conteúdo foi deletado com sucesso!',
          'admin.messages.deleteAllError': 'Erro ao deletar todo o conteúdo',
          'admin.messages.loadError': 'Erro ao carregar conteúdo',

          'admin.difficulty.beginner': 'Iniciante',
          'admin.difficulty.intermediate': 'Intermediário',
          'admin.difficulty.advanced': 'Avançado',
        },
      },
      en: {
        translation: {
          // Navbar
          'platform.name': 'English Platform',
          'nav.listening': 'Listening',
          'nav.speaking': 'Speaking',
          'nav.reading': 'Reading',
          'nav.register': 'Register',
          'nav.login': 'Login',
          'nav.admin': 'Admin',
          'nav.logout': 'Logout',
          'nav.adminPanel': 'Admin Panel',
          'nav.suggestions': 'Suggestions',

          // Sidebar
          'sidebar.menu': 'Navigation Menu',
          'sidebar.listening': 'Practice Listening',
          'sidebar.speaking': 'Practice Speaking',
          'sidebar.reading': 'Practice Reading',
          'sidebar.register': 'Create Account',
          'sidebar.login': 'Sign In',
          'sidebar.admin': 'Admin Area',
          'sidebar.suggestions': 'Community Suggestions',

          // Home
          'home.hero.title': 'Learn English Together',
          'home.hero.subtitle': 'A free and collaborative platform to learn English. Share knowledge, practice with other students and improve through community-created content.',
          'home.hero.cta': 'Join the Community',
          
          'home.features.title': 'How Our Community Works',
          'home.features.listening.title': 'Listening',
          'home.features.listening.description': 'Practice with podcasts, videos and audio shared by the community.',
          'home.features.listening.button': 'Start Listening',
          
          'home.features.speaking.title': 'Speaking',
          'home.features.speaking.description': 'Access videos and materials to practice conversation and improve your pronunciation.',
          'home.features.speaking.button': 'Start Speaking',
          
          'home.features.reading.title': 'Reading',
          'home.features.reading.description': 'Access texts and materials selected by community members.',
          'home.features.reading.button': 'Start Reading',

          'home.why.title': 'Why Join Our Community?',
          'home.why.expert.title': 'Collaborative Content',
          'home.why.expert.description': 'Material shared and reviewed by the community of students and teachers.',
          'home.why.interactive.title': 'Social Learning',
          'home.why.interactive.description': 'Learn and practice directly with other students in a collaborative environment.',
          'home.why.comprehensive.title': 'Completely Free',
          'home.why.comprehensive.description': 'No fees or charges. A platform made by the community, for the community.',

          'home.cta.title': 'Be Part of Our Learning Community',
          'home.cta.subtitle': 'Join thousands of students sharing knowledge and learning together.',
          'home.cta.button': 'Start Now - It\'s Free',

          // Suggestions Page
          'suggestions.title': 'Community Suggestions',
          'suggestions.newButton': 'New Suggestion',
          'suggestions.dialog.title': 'Create New Suggestion',
          'suggestions.dialog.titleLabel': 'Suggestion title',
          'suggestions.dialog.typeLabel': 'Suggestion type',
          'suggestions.dialog.contentLabel': 'Describe your suggestion',
          'suggestions.dialog.cancelButton': 'Cancel',
          'suggestions.dialog.submitButton': 'Submit Suggestion',
          'suggestions.status.new': 'New',
          'suggestions.status.inProgress': 'In Progress',
          'suggestions.status.completed': 'Implemented',
          'suggestions.action.like': 'Like',
          'suggestions.action.comment': 'Comment',

          // Login
          'login.title': 'Login to Platform',
          'login.subtitle': 'Choose one of the options below to login',
          'login.google': 'Login with Google',
          'login.facebook': 'Login with Facebook',
          'login.github': 'Login with GitHub',
          'login.temporary': 'Login as Temporary User',

          // Admin
          'admin.title': 'Admin Panel',
          'admin.addContent.title': 'Add New Content',
          'admin.addContent.category': 'Category',
          'admin.addContent.level': 'Level',
          'admin.addContent.contentTitle': 'Title',
          'admin.addContent.description': 'Description',
          'admin.addContent.youtubeUrl': 'YouTube URL',
          'admin.addContent.youtubeUrlHelp': 'Paste the complete YouTube video URL',
          'admin.addContent.submit': 'Add Content',
          'admin.manageContent.title': 'Manage Content',
          'admin.manageContent.deleteAll': 'Delete All Content',
          'admin.manageContent.category': 'Category',
          'admin.manageContent.level': 'Level',
          'admin.manageContent.addedOn': 'Added on',
          'admin.deleteDialog.title': 'Confirm Deletion',
          'admin.deleteDialog.message': 'Are you sure you want to delete the content "{title}"?',
          'admin.deleteDialog.cancel': 'Cancel',
          'admin.deleteDialog.confirm': 'Delete',
          'admin.messages.addSuccess': 'Content added successfully!',
          'admin.messages.addError': 'Error adding content',
          'admin.messages.deleteSuccess': 'Content deleted successfully!',
          'admin.messages.deleteError': 'Error deleting content',
          'admin.messages.deleteAllSuccess': 'All content has been deleted successfully!',
          'admin.messages.deleteAllError': 'Error deleting all content',
          'admin.messages.loadError': 'Error loading content',

          'admin.difficulty.beginner': 'Beginner',
          'admin.difficulty.intermediate': 'Intermediate',
          'admin.difficulty.advanced': 'Advanced',
        },
      },
      es: {
        translation: {
          // Navbar
          'platform.name': 'Plataforma de Inglés',
          'nav.listening': 'Listening',
          'nav.speaking': 'Speaking',
          'nav.reading': 'Reading',
          'nav.register': 'Registrarse',
          'nav.login': 'Iniciar Sesión',
          'nav.admin': 'Admin',
          'nav.logout': 'Cerrar Sesión',
          'nav.adminPanel': 'Panel de Admin',
          'nav.suggestions': 'Sugerencias',

          // Sidebar
          'sidebar.menu': 'Menú de Navegación',
          'sidebar.listening': 'Practicar Listening',
          'sidebar.speaking': 'Practicar Speaking',
          'sidebar.reading': 'Practicar Reading',
          'sidebar.register': 'Crear Cuenta',
          'sidebar.login': 'Iniciar Sesión',
          'sidebar.admin': 'Área Administrativa',
          'sidebar.suggestions': 'Sugerencias de la Comunidad',

          // Home
          'home.hero.title': 'Aprende Inglés en Comunidad',
          'home.hero.subtitle': 'Una plataforma colaborativa y gratuita para aprender inglés. Comparte conocimiento, practica con otros estudiantes y evoluciona a través de contenido creado por la comunidad.',
          'home.hero.cta': 'Únete a la Comunidad',
          
          'home.features.title': 'Cómo Funciona Nuestra Comunidad',
          'home.features.listening.title': 'Listening',
          'home.features.listening.description': 'Practica con podcasts, videos y audios compartidos por la comunidad.',
          'home.features.listening.button': 'Comenzar Listening',
          
          'home.features.speaking.title': 'Speaking',
          'home.features.speaking.description': 'Accede a videos y materiales para practicar conversación y mejorar tu pronunciación.',
          'home.features.speaking.button': 'Comenzar Speaking',
          
          'home.features.reading.title': 'Reading',
          'home.features.reading.description': 'Accede a textos y materiales seleccionados por los miembros de la comunidad.',
          'home.features.reading.button': 'Comenzar Reading',

          'home.why.title': '¿Por Qué Unirse a Nuestra Comunidad?',
          'home.why.expert.title': 'Contenido Colaborativo',
          'home.why.expert.description': 'Material compartido y revisado por la propia comunidad de estudiantes y profesores.',
          'home.why.interactive.title': 'Aprendizaje Social',
          'home.why.interactive.description': 'Aprende y practica directamente con otros estudiantes en un ambiente colaborativo.',
          'home.why.comprehensive.title': 'Totalmente Gratuito',
          'home.why.comprehensive.description': 'Sin mensualidades ni cobros. Una plataforma hecha por la comunidad, para la comunidad.',

          'home.cta.title': 'Sé Parte de Nuestra Comunidad de Aprendizaje',
          'home.cta.subtitle': 'Únete a miles de estudiantes compartiendo conocimiento y aprendiendo juntos.',
          'home.cta.button': 'Empieza Ahora - Es Gratuito',

          // Suggestions Page
          'suggestions.title': 'Sugerencias de la Comunidad',
          'suggestions.newButton': 'Nueva Sugerencia',
          'suggestions.dialog.title': 'Crear Nueva Sugerencia',
          'suggestions.dialog.titleLabel': 'Título de la sugerencia',
          'suggestions.dialog.typeLabel': 'Tipo de sugerencia',
          'suggestions.dialog.contentLabel': 'Describe tu sugerencia',
          'suggestions.dialog.cancelButton': 'Cancelar',
          'suggestions.dialog.submitButton': 'Enviar Sugerencia',
          'suggestions.status.new': 'Nuevo',
          'suggestions.status.inProgress': 'En Progreso',
          'suggestions.status.completed': 'Implementado',
          'suggestions.action.like': 'Me gusta',
          'suggestions.action.comment': 'Comentar',

          // Login
          'login.title': 'Iniciar Sesión en la Plataforma',
          'login.subtitle': 'Elige una de las opciones abajo para entrar',
          'login.google': 'Entrar con Google',
          'login.facebook': 'Entrar con Facebook',
          'login.github': 'Entrar con GitHub',
          'login.temporary': 'Entrar como Usuario Temporal',

          // Admin
          'admin.title': 'Panel de Administración',
          'admin.addContent.title': 'Agregar Nuevo Contenido',
          'admin.addContent.category': 'Categoría',
          'admin.addContent.level': 'Nivel',
          'admin.addContent.contentTitle': 'Título',
          'admin.addContent.description': 'Descripción',
          'admin.addContent.youtubeUrl': 'URL de YouTube',
          'admin.addContent.youtubeUrlHelp': 'Pega la URL completa del video de YouTube',
          'admin.addContent.submit': 'Agregar Contenido',
          'admin.manageContent.title': 'Gestionar Contenido',
          'admin.manageContent.deleteAll': 'Eliminar Todo el Contenido',
          'admin.manageContent.category': 'Categoría',
          'admin.manageContent.level': 'Nivel',
          'admin.manageContent.addedOn': 'Agregado el',
          'admin.deleteDialog.title': 'Confirmar Eliminación',
          'admin.deleteDialog.message': '¿Estás seguro de que deseas eliminar el contenido "{title}"?',
          'admin.deleteDialog.cancel': 'Cancelar',
          'admin.deleteDialog.confirm': 'Eliminar',
          'admin.messages.addSuccess': '¡Contenido agregado con éxito!',
          'admin.messages.addError': 'Error al agregar contenido',
          'admin.messages.deleteSuccess': '¡Contenido eliminado con éxito!',
          'admin.messages.deleteError': 'Error al eliminar contenido',
          'admin.messages.deleteAllSuccess': '¡Todo el contenido ha sido eliminado con éxito!',
          'admin.messages.deleteAllError': 'Error al eliminar todo el contenido',
          'admin.messages.loadError': 'Error al cargar contenido',

          'admin.difficulty.beginner': 'Principiante',
          'admin.difficulty.intermediate': 'Intermedio',
          'admin.difficulty.advanced': 'Avanzado',
        },
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n; 