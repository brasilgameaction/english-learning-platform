import { sql } from '@vercel/postgres';

// Tipos
export interface Content {
  id: string;
  title: string;
  description: string;
  youtubeUrl: string;
  category: 'listening' | 'speaking' | 'reading';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  createdAt: Date;
  createdBy: string;
}

// Queries
export async function createTables() {
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

    console.log('Tabelas criadas com sucesso');
  } catch (error) {
    console.error('Erro ao criar tabelas:', error);
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
    console.error('Erro ao buscar conteúdo:', error);
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
    console.error('Erro ao buscar conteúdo por categoria:', error);
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
    console.error('Erro ao adicionar conteúdo:', error);
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
    console.error('Erro ao deletar conteúdo:', error);
    throw error;
  }
}

export async function deleteAllContent(): Promise<void> {
  try {
    await sql`
      DELETE FROM contents;
    `;
  } catch (error) {
    console.error('Erro ao deletar todo o conteúdo:', error);
    throw error;
  }
} 