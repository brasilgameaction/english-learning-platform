import bcrypt from 'bcryptjs';
import { createClient } from '@vercel/postgres';

// Verificar credenciais do admin
export async function verifyAdminCredentials(username: string, password: string): Promise<boolean> {
  try {
    console.log('Iniciando verificação de credenciais...');
    console.log('Tentando login com:', { username });
    
    // Log all environment variables related to database
    const envVars = {
      DATABASE_URL: process.env.DATABASE_URL,
      DATABASE_URL_POSTGRES_URL: process.env.DATABASE_URL_POSTGRES_URL,
      DATABASE_URL_POSTGRES_URL_NO_SSL: process.env.DATABASE_URL_POSTGRES_URL_NO_SSL,
      DATABASE_URL_POSTGRES_URL_NON_POOLING: process.env.DATABASE_URL_POSTGRES_URL_NON_POOLING,
      DATABASE_URL_POSTGRES_HOST: process.env.DATABASE_URL_POSTGRES_HOST,
      DATABASE_URL_POSTGRES_USER: process.env.DATABASE_URL_POSTGRES_USER,
      DATABASE_URL_POSTGRES_PASSWORD: process.env.DATABASE_URL_POSTGRES_PASSWORD ? '[REDACTED]' : undefined,
      DATABASE_URL_POSTGRES_DATABASE: process.env.DATABASE_URL_POSTGRES_DATABASE
    };
    
    console.log('Database environment variables:', {
      hasDatabaseUrl: !!process.env.DATABASE_URL,
      hasPostgresUrl: !!process.env.DATABASE_URL_POSTGRES_URL,
      hasPostgresUrlNoSsl: !!process.env.DATABASE_URL_POSTGRES_URL_NO_SSL,
      hasPostgresUrlNonPooling: !!process.env.DATABASE_URL_POSTGRES_URL_NON_POOLING,
      envVars: Object.fromEntries(
        Object.entries(envVars).map(([key, value]) => [key, value ? 'SET' : 'NOT SET'])
      )
    });

    if (!process.env.DATABASE_URL_POSTGRES_URL) {
      console.error('DATABASE_URL_POSTGRES_URL não está definida');
      return false;
    }
    
    // Create client with explicit configuration
    const client = createClient({
      connectionString: process.env.DATABASE_URL_POSTGRES_URL,
      ssl: { rejectUnauthorized: false }
    });
    
    console.log('Connecting to database...');
    await client.connect();
    
    const result = await client.query(
      'SELECT username, password FROM admin_users WHERE username = $1',
      [username]
    );

    console.log('Resultado da consulta:', { 
      rowCount: result.rowCount,
      hasRows: result.rowCount > 0,
      firstRow: result.rows[0] ? {
        username: result.rows[0].username,
        passwordLength: result.rows[0].password?.length
      } : null
    });

    if (result.rowCount === 0) {
      console.log('Usuário não encontrado');
      await client.end();
      return false;
    }

    const admin = result.rows[0];
    console.log('Admin encontrado:', { 
      username: admin.username,
      passwordLength: admin.password?.length,
      hasPassword: !!admin.password
    });

    const isValid = await bcrypt.compare(password, admin.password);
    console.log('Senha válida:', isValid);
    console.log('Detalhes da comparação:', {
      inputPassword: password,
      hashedPasswordLength: admin.password?.length
    });
    
    await client.end();
    return isValid;
  } catch (error: any) {
    console.error('Error verifying admin credentials:', error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
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

    if (!process.env.DATABASE_URL_POSTGRES_URL) {
      console.error('DATABASE_URL_POSTGRES_URL não está definida');
      return false;
    }

    const client = createClient({
      connectionString: process.env.DATABASE_URL_POSTGRES_URL,
      ssl: { rejectUnauthorized: false }
    });
    
    await client.connect();
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    await client.query(
      'UPDATE admin_users SET password = $1 WHERE username = $2',
      [hashedPassword, username]
    );
    
    await client.end();
    return true;
  } catch (error: any) {
    console.error('Error changing admin password:', error);
    return false;
  }
}

// Inicializar banco de dados
export async function initializeDatabase() {
  try {
    console.log('Iniciando inicialização do banco de dados...');
    
    // Log all environment variables related to database
    const envVars = {
      DATABASE_URL: process.env.DATABASE_URL,
      DATABASE_URL_POSTGRES_URL: process.env.DATABASE_URL_POSTGRES_URL,
      DATABASE_URL_POSTGRES_URL_NO_SSL: process.env.DATABASE_URL_POSTGRES_URL_NO_SSL,
      DATABASE_URL_POSTGRES_URL_NON_POOLING: process.env.DATABASE_URL_POSTGRES_URL_NON_POOLING,
      DATABASE_URL_POSTGRES_HOST: process.env.DATABASE_URL_POSTGRES_HOST,
      DATABASE_URL_POSTGRES_USER: process.env.DATABASE_URL_POSTGRES_USER,
      DATABASE_URL_POSTGRES_PASSWORD: process.env.DATABASE_URL_POSTGRES_PASSWORD ? '[REDACTED]' : undefined,
      DATABASE_URL_POSTGRES_DATABASE: process.env.DATABASE_URL_POSTGRES_DATABASE
    };
    
    console.log('Database environment variables:', {
      hasDatabaseUrl: !!process.env.DATABASE_URL,
      hasPostgresUrl: !!process.env.DATABASE_URL_POSTGRES_URL,
      hasPostgresUrlNoSsl: !!process.env.DATABASE_URL_POSTGRES_URL_NO_SSL,
      hasPostgresUrlNonPooling: !!process.env.DATABASE_URL_POSTGRES_URL_NON_POOLING,
      envVars: Object.fromEntries(
        Object.entries(envVars).map(([key, value]) => [key, value ? 'SET' : 'NOT SET'])
      )
    });

    if (!process.env.DATABASE_URL_POSTGRES_URL) {
      console.error('DATABASE_URL_POSTGRES_URL não está definida');
      throw new Error('DATABASE_URL_POSTGRES_URL não está definida');
    }

    const client = createClient({
      connectionString: process.env.DATABASE_URL_POSTGRES_URL,
      ssl: { rejectUnauthorized: false }
    });
    
    await client.connect();

    // Criar extensão uuid-ossp se não existir
    console.log('Criando extensão uuid-ossp...');
    await client.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    // Remover tabela existente
    console.log('Removendo tabela existente...');
    await client.query('DROP TABLE IF EXISTS admin_users');

    // Criar tabela admin_users
    console.log('Criando tabela admin_users...');
    await client.query(`
      CREATE TABLE admin_users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Criar usuário admin
    console.log('Criando usuário admin...');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await client.query(
      'INSERT INTO admin_users (username, password) VALUES ($1, $2)',
      ['admin', hashedPassword]
    );
    console.log('Admin user created successfully');

    // Verificar se o admin foi criado corretamente
    const adminCheck = await client.query(
      'SELECT username, password FROM admin_users WHERE username = $1',
      ['admin']
    );
    console.log('Admin check:', { 
      exists: adminCheck.rowCount > 0,
      username: adminCheck.rows[0]?.username,
      passwordLength: adminCheck.rows[0]?.password.length
    });

    await client.end();
    console.log('Database initialized successfully');
  } catch (error: any) {
    console.error('Error initializing database:', error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
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