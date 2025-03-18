require('dotenv').config();
const { Client } = require('pg');

async function checkDatabase() {
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL não está definida');
    return;
  }

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    console.log('Conectando ao banco de dados...');
    await client.connect();
    console.log('Conectado com sucesso!');

    console.log('\nVerificando tabelas existentes...');
    const tablesResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    console.log('Tabelas encontradas:', tablesResult.rows);

    try {
      console.log('\nVerificando usuário admin...');
      const adminResult = await client.query('SELECT * FROM admin_users');
      console.log('Usuários encontrados:', adminResult.rows);
    } catch (err) {
      console.log('Tabela admin_users não existe');
    }

    // Criar tabela e usuário admin se não existir
    console.log('\nCriando tabela admin_users se não existir...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Verificar se o usuário admin existe
    const adminCheck = await client.query("SELECT * FROM admin_users WHERE username = 'admin'");
    
    if (adminCheck.rows.length === 0) {
      console.log('Criando usuário admin...');
      const bcrypt = require('bcryptjs');
      const hashedPassword = await bcrypt.hash('admin123', 10);
      
      await client.query(`
        INSERT INTO admin_users (username, password)
        VALUES ('admin', $1)
      `, [hashedPassword]);
      
      console.log('Usuário admin criado com sucesso!');
    } else {
      console.log('Usuário admin já existe');
    }

    // Verificar estado final
    const finalCheck = await client.query('SELECT * FROM admin_users');
    console.log('\nEstado final da tabela admin_users:', finalCheck.rows);

  } catch (error) {
    console.error('Erro:', error);
  } finally {
    await client.end();
  }
}

checkDatabase(); 