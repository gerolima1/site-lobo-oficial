import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ error: 'Token vazio' }, { status: 400 });
    }

    // Pega a URL e remove qualquer espaço em branco acidental
    const databaseUrl = process.env.DATABASE_URL?.trim();

    if (!databaseUrl) {
      return NextResponse.json({ error: 'DATABASE_URL não configurada na Vercel' }, { status: 500 });
    }

    const sql = neon(databaseUrl);
    
    // Tenta inserir o token na tabela bots
    await sql`INSERT INTO bots (token) VALUES (${token})`;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Erro detalhado do banco:', error);
    // Se cair aqui, o problema é a conexão (DATABASE_URL errada ou SSL)
    return NextResponse.json({ 
      error: 'Erro ao salvar. Verifique se a DATABASE_URL na Vercel está correta.',
      details: error.message 
    }, { status: 500 });
  }
}
