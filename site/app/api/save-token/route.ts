import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; 

export async function POST(req: Request) {
  try {
    // 1. Tenta pegar a sessão com as opções oficiais
    const session = await getServerSession(authOptions);

    // LOG DE DEBUG (Aparecerá no log da Vercel)
    if (!session) {
      console.error("DEBUG: Sessão retornou NULL. Verifique o NEXTAUTH_SECRET.");
      return NextResponse.json({ error: 'Sessão não encontrada no servidor.' }, { status: 401 });
    }

    const { token } = await req.json();
    const userEmail = session.user?.email;

    if (!userEmail) {
      return NextResponse.json({ error: 'E-mail do usuário não encontrado na sessão.' }, { status: 401 });
    }

    const databaseUrl = process.env.DATABASE_URL?.trim();
    if (!databaseUrl) return NextResponse.json({ error: 'DB_URL ausente' }, { status: 500 });

    const sql = neon(databaseUrl);
    
    // 2. Operação no banco
    await sql`
      INSERT INTO bots (token, user_email) 
      VALUES (${token}, ${userEmail})
      ON CONFLICT (user_email) DO UPDATE SET token = ${token}
    `;

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('ERRO CRÍTICO NA API:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
