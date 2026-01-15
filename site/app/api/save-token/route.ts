import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Certifique-se que o caminho está correto

export async function POST(req: Request) {
  try {
    // 1. Passamos o authOptions aqui para acabar com o erro 401
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      console.log("Falha na sessão: Usuário não identificado.");
      return NextResponse.json({ error: 'Sessão expirada. Faça login novamente no Discord.' }, { status: 401 });
    }

    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ error: 'Token vazio' }, { status: 400 });
    }

    const databaseUrl = process.env.DATABASE_URL?.trim();

    if (!databaseUrl) {
      return NextResponse.json({ error: 'DATABASE_URL não configurada' }, { status: 500 });
    }

    const sql = neon(databaseUrl);
    
    // 2. Salva ou atualiza usando o email da sessão
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
