import bcrypt from 'bcryptjs';
import { sql } from '@vercel/postgres';

// Verificar credenciais do admin
export async function verifyAdminCredentials(username: string, password: string): Promise<boolean> {
  try {
    console.log('Iniciando verificação de credenciais...');
    console.log('Tentando login com:', { username });
    
    const result = await sql`
      SELECT username, password 
      FROM admin_users 
      WHERE username = ${username}
    `;

    console.log('Resultado da consulta:', { 
      rowCount: result.rows.length,
      hasRows: result.rows.length > 0,
      firstRow: result.rows[0] ? {
        username: result.rows[0].username,
        passwordLength: result.rows[0].password?.length
      } : null
    });

    if (result.rows.length === 0) {
      console.log('Usuário não encontrado');
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
    console.log('Iniciando inicialização do banco de dados...');

    // Criar extensão uuid-ossp se não existir
    console.log('Criando extensão uuid-ossp...');
    await sql`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp"
    `;

    // Remover tabela existente
    console.log('Removendo tabela existente...');
    await sql`
      DROP TABLE IF EXISTS admin_users
    `;

    // Criar tabela admin_users
    console.log('Criando tabela admin_users...');
    await sql`
      CREATE TABLE admin_users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Criar usuário admin
    console.log('Criando usuário admin...');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await sql`
      INSERT INTO admin_users (username, password)
      VALUES ('admin', ${hashedPassword})
    `;
    console.log('Admin user created successfully');

    // Verificar se o admin foi criado corretamente
    const adminCheck = await sql`
      SELECT username, password 
      FROM admin_users 
      WHERE username = 'admin'
    `;
    console.log('Admin check:', { 
      exists: adminCheck.rows.length > 0,
      username: adminCheck.rows[0]?.username,
      passwordLength: adminCheck.rows[0]?.password.length
    });

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