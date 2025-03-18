import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';

// Verificar conexão com o banco de dados
async function testDatabaseConnection() {
  console.log('Testing database connection...');
  try {
    const result = await sql`SELECT 1`;
    console.log('Database connection successful');
    return true;
  } catch (error) {
    console.error('Database connection error:', error);
    throw new Error(`Failed to connect to database: ${error instanceof Error ? error.message : 'Unknown error'}`);
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

// Criar extensões necessárias
async function createExtensions() {
  console.log('Starting extensions check...');
  try {
    // Verificar se a extensão está disponível
    const result = await sql`
      SELECT EXISTS (
        SELECT 1 FROM pg_extension WHERE extname = 'uuid-ossp'
      );
    `;
    const extensionExists = result.rows[0].exists;
    console.log('UUID extension status:', extensionExists ? 'installed' : 'not installed');
    
    if (!extensionExists) {
      throw new Error('Required extension uuid-ossp is not available');
    }
    
    console.log('Extensions check completed successfully');
  } catch (error) {
    console.error('Error checking extensions:', error);
    throw new Error(`Failed to check database extensions: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Queries
async function createTables() {
  console.log('Starting tables creation...');
  try {
    // Criar tabela de conteúdo
    console.log('Creating contents table...');
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
    console.log('Contents table created successfully');

    // Criar tabela de admin
    console.log('Creating admin_users table...');
    await sql`
      CREATE TABLE IF NOT EXISTS admin_users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log('Admin users table created successfully');

    // Verificar se as tabelas foram criadas
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      AND table_name IN ('contents', 'admin_users');
    `;
    console.log('Created tables:', tables.rows.map(row => row.table_name));
  } catch (error) {
    console.error('Error creating tables:', error);
    throw new Error(`Failed to create database tables: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
  console.log('Starting default admin creation...');
  try {
    const defaultUsername = 'admin';
    const defaultPassword = 'admin123';

    // Verificar se o admin já existe
    console.log('Checking if admin user exists...');
    const result = await sql`
      SELECT id FROM admin_users WHERE username = ${defaultUsername}
    `;

    if (result.rows.length === 0) {
      console.log('Admin user does not exist, creating...');
      const hashedPassword = await bcrypt.hash(defaultPassword, 10);
      await sql`
        INSERT INTO admin_users (username, password)
        VALUES (${defaultUsername}, ${hashedPassword})
      `;
      console.log('Default admin user created successfully');
    } else {
      console.log('Default admin user already exists');
    }

    // Verificar se o admin foi criado corretamente
    const check = await sql`
      SELECT id, username, created_at 
      FROM admin_users 
      WHERE username = ${defaultUsername}
    `;
    console.log('Admin user details:', check.rows[0]);
  } catch (error) {
    console.error('Error creating default admin:', error);
    throw new Error(`Failed to create default admin: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
  console.log('Starting database initialization...');
  try {
    console.log('Step 0: Testing database connection...');
    await testDatabaseConnection();
    
    console.log('Step 1: Checking extensions...');
    await createExtensions();
    
    console.log('Step 2: Creating tables...');
    await createTables();
    
    console.log('Step 3: Creating default admin...');
    await createDefaultAdmin();
    
    console.log('Database initialization completed successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw new Error(`Database initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Exportar funções necessárias
export {
  createTables as createAdminTable,
  createDefaultAdmin,
  verifyAdminCredentials
}; 