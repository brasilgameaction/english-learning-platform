import bcrypt from 'bcryptjs';
import { sql } from '@vercel/postgres';

// Verificar credenciais do admin
export async function verifyAdminCredentials(username: string, password: string): Promise<boolean> {
  try {
    // Log para debug
    console.log('Tentando login com:', { username });
    
    const result = await sql`
      SELECT username, password 
      FROM admin_users 
      WHERE username = ${username}
    `;

    if (result.rows.length === 0) {
      console.log('Usuário não encontrado');
      return false;
    }

    const admin = result.rows[0];
    const isValid = await bcrypt.compare(password, admin.password);
    console.log('Senha válida:', isValid);
    
    return isValid;
  } catch (error) {
    console.error('Error verifying admin credentials:', error);
    return false;
  }
}

// Alterar senha do admin
export async function changeAdminPassword(username: string, currentPassword: string, newPassword: string): Promise<boolean> {
  try {
    const isValid = await verifyAdminCredentials(username, currentPassword);
    if (!isValid) {
      return false;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await sql`
      UPDATE admin_users 
      SET password = ${hashedPassword}
      WHERE username = ${username}
    `;

    return true;
  } catch (error) {
    console.error('Error changing admin password:', error);
    return false;
  }
}

// Inicializar banco de dados
export async function initializeDatabase() {
  try {
    // Criar extensão uuid-ossp se não existir
    await sql`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp"
    `;

    // Criar tabela admin_users se não existir
    await sql`
      CREATE TABLE IF NOT EXISTS admin_users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Verificar se já existe um admin
    const result = await sql`
      SELECT COUNT(*) as count 
      FROM admin_users 
      WHERE username = 'admin'
    `;

    // Se não existir admin, criar um
    if (result.rows[0].count === '0') {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await sql`
        INSERT INTO admin_users (username, password)
        VALUES ('admin', ${hashedPassword})
      `;
      console.log('Admin user created successfully');
    }

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

// Tipos
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