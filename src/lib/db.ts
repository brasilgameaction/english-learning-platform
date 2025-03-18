import bcrypt from 'bcryptjs';

// Credenciais hardcoded do admin
const ADMIN_CREDENTIALS = {
  username: 'admin',
  // senha: admin123
  password: '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'
};

// Verificar credenciais do admin
export async function verifyAdminCredentials(username: string, password: string): Promise<boolean> {
  try {
    // Log para debug
    console.log('Tentando login com:', { username });
    
    if (username !== ADMIN_CREDENTIALS.username) {
      console.log('Usuário não corresponde');
      return false;
    }

    const isValid = await bcrypt.compare(password, ADMIN_CREDENTIALS.password);
    console.log('Senha válida:', isValid);
    
    return isValid;
  } catch (error) {
    console.error('Error verifying admin credentials:', error);
    return false;
  }
}

// Alterar senha do admin (mantido para compatibilidade, mas não funcional com hardcoded)
export async function changeAdminPassword(username: string, currentPassword: string, newPassword: string): Promise<boolean> {
  console.warn('Password change not available in hardcoded mode');
  return false;
}

// Tipos (mantidos para compatibilidade)
export interface Content {
  id: string;
  title: string;
  description: string;
  youtubeUrl: string;
  category: 'listening' | 'speaking' | 'reading';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  createdBy: string;
  createdAt: Date;
}

export interface AdminUser {
  id: string;
  username: string;
  password: string;
  created_at: Date;
}