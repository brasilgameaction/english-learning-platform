import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';

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

// Criar extensões necessárias
async function createExtensions() {
  try {
    // No Vercel Postgres, a extensão uuid-ossp já está instalada por padrão
    console.log('Extensions check completed');
  } catch (error) {
    console.error('Error checking extensions:', error);
    throw error;
  }
}

// Queries
async function createTables() {
  try {
    // Criar tabela de conteúdo
    await sql`
      CREATE TABLE IF NOT EXISTS contents (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        youtube_url VARCHAR(255) NOT NULL,
        category VARCHAR(50) NOT NULL,
        difficulty VARCHAR(50) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        created_by VARCHAR(255) NOT NULL
      );
    `;

    // Criar tabela de admin
    await sql`
      CREATE TABLE IF NOT EXISTS admin_users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    console.log('Tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
    throw error;
  }
}

// Operações de conteúdo
export async function getAllContent(): Promise<Content[]> {
  try {
    const result = await sql<Content>`
      SELECT * FROM contents 
      ORDER BY created_at DESC;
    `;
    return result.rows;
  } catch (error) {
    console.error('Error fetching content:', error);
    throw error;
  }
}

export async function getContentByCategory(category: Content['category']): Promise<Content[]> {
  try {
    const result = await sql<Content>`
      SELECT * FROM contents 
      WHERE category = ${category}
      ORDER BY created_at DESC;
    `;
    return result.rows;
  } catch (error) {
    console.error('Error fetching content by category:', error);
    throw error;
  }
}

export async function addContent(content: Omit<Content, 'id' | 'createdAt'>): Promise<Content> {
  try {
    const result = await sql<Content>`
      INSERT INTO contents (
        title, 
        description, 
        youtube_url, 
        category, 
        difficulty, 
        created_by
      ) VALUES (
        ${content.title}, 
        ${content.description}, 
        ${content.youtubeUrl}, 
        ${content.category}, 
        ${content.difficulty}, 
        ${content.createdBy}
      )
      RETURNING *;
    `;
    return result.rows[0];
  } catch (error) {
    console.error('Error adding content:', error);
    throw error;
  }
}

export async function deleteContent(id: string): Promise<void> {
  try {
    await sql`
      DELETE FROM contents 
      WHERE id = ${id};
    `;
  } catch (error) {
    console.error('Error deleting content:', error);
    throw error;
  }
}

export async function deleteAllContent(): Promise<void> {
  try {
    await sql`
      DELETE FROM contents;
    `;
  } catch (error) {
    console.error('Error deleting all content:', error);
    throw error;
  }
}

// Criar admin padrão se não existir
async function createDefaultAdmin() {
  try {
    const defaultUsername = 'admin';
    const defaultPassword = 'admin123';
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    // Verificar se o admin já existe
    const result = await sql`
      SELECT id FROM admin_users WHERE username = ${defaultUsername}
    `;

    if (result.rows.length === 0) {
      await sql`
        INSERT INTO admin_users (username, password)
        VALUES (${defaultUsername}, ${hashedPassword})
      `;
      console.log('Default admin user created');
    } else {
      console.log('Default admin user already exists');
    }
  } catch (error) {
    console.error('Error creating default admin:', error);
    throw error;
  }
}

// Verificar credenciais do admin
async function verifyAdminCredentials(username: string, password: string): Promise<boolean> {
  try {
    const result = await sql`
      SELECT password FROM admin_users WHERE username = ${username}
    `;

    if (result.rows.length === 0) {
      return false;
    }

    const hashedPassword = result.rows[0].password;
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    console.error('Error verifying admin credentials:', error);
    throw error;
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
    throw error;
  }
}

// Inicializar banco de dados
export async function initializeDatabase() {
  try {
    await createExtensions();
    await createTables();
    await createDefaultAdmin();
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

// Exportar funções necessárias
export {
  createTables as createAdminTable,
  createDefaultAdmin,
  verifyAdminCredentials
}; 