import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { getServerSession } from "next-auth"; // Importação necessária

export async function POST(req: Request) {
  try {
    // 1. Pega a sessão do usuário (quem está logado)
    const session = await getServerSession();

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Você precisa estar logado via Discord para salvar um token.' }, { status: 401 });
    }

    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ error: 'Token vazio' }, { status: 400 });
    }

    const databaseUrl = process.env.DATABASE_URL?.trim();

    if (!databaseUrl) {
      return NextResponse.json({ error: 'DATABASE_URL não configurada na Vercel' }, { status: 500 });
    }

    const sql = neon(databaseUrl);
    
    // 2. Tenta inserir o token vinculado ao e-mail do usuário
    // Usamos ON CONFLICT para atualizar o token caso o usuário já tenha um salvo
    await sql`
      INSERT INTO bots (token, user_email) 
      VALUES (${token}, ${session.user.email})
      ON CONFLICT (user_email) DO UPDATE SET token = ${token}
    `;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Erro detalhado do banco:', error);
    return NextResponse.json({ 
      error: 'Erro ao salvar no banco de dados.',
      details: error.message 
    }, { status: 500 });
  }
}
