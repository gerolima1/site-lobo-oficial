import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { neon } from "@neondatabase/serverless";

export async function GET() {
  try {
    // 1. Verifica a sessão do usuário logado via Discord
    const session = await getServerSession();

    // Se não houver sessão ou e-mail, bloqueia o acesso
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Não autorizado. Faça login primeiro." }, { status: 401 });
    }

    const databaseUrl = process.env.DATABASE_URL?.trim();

    if (!databaseUrl) {
      return NextResponse.json({ error: "Configuração de banco de dados ausente." }, { status: 500 });
    }

    const sql = neon(databaseUrl);

    // 2. Busca o token no banco Neon usando o e-mail da sessão
    // Buscamos apenas o bot que pertence a este e-mail específico
    const data = await sql`
      SELECT token, status, created_at 
      FROM bots 
      WHERE user_email = ${session.user.email} 
      LIMIT 1
    `;

    // 3. Verifica se encontrou algum registro
    if (data.length === 0) {
      return NextResponse.json({ message: "Nenhum bot cadastrado para este usuário." }, { status: 404 });
    }

    // 4. Retorna o primeiro (e único) bot encontrado
    return NextResponse.json(data[0]);

  } catch (error: any) {
    console.error("Erro na API get-token:", error);
    return NextResponse.json(
      { 
        error: "Erro interno ao buscar dados no banco.",
        details: error.message 
      }, 
      { status: 500 }
    );
  }
}
