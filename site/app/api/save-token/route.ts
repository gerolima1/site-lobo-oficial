import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; 

export async function POST(req: Request) {
  try {
    // 1. Validação da Sessão
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      console.error("Tentativa de acesso sem sessão válida.");
      return NextResponse.json({ error: 'Sessão inválida ou expirada.' }, { status: 401 });
    }

    // 2. Coleta de dados do corpo da requisição
    const body = await req.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json({ error: 'Token não fornecido.' }, { status: 400 });
    }

    // 3. Conexão com o Banco (Neon)
    const databaseUrl = process.env.DATABASE_URL?.trim();
    if (!databaseUrl) {
      console.error("Variável DATABASE_URL não configurada no Railway.");
      return NextResponse.json({ error: 'Erro de configuração do servidor.' }, { status: 500 });
    }

    const sql = neon(databaseUrl);
    
    // 4. Inserção/Update (Upsert)
    // Usamos o e-mail da sessão para garantir que um usuário não mude o token de outro
    await sql`
      INSERT INTO bots (token, user_email) 
      VALUES (${token}, ${session.user.email})
      ON CONFLICT (user_email) DO UPDATE SET token = ${token}
    `;

    return NextResponse.json({ success: true, message: "Token atualizado com sucesso!" });

  } catch (error: any) {
    console.error('ERRO NA API SAVE-TOKEN:', error.message);
    return NextResponse.json({ error: "Erro interno no servidor." }, { status: 500 });
  }
}
