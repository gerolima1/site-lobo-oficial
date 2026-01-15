import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { neon } from "@neondatabase/serverless";

export async function GET() {
  try {
    // 1. Verifica se o usuário está logado via Discord
    const session = await getServerSession();

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    // 2. Conecta ao Banco de Dados Neon
    const sql = neon(process.env.DATABASE_URL!);

    // 3. Busca o token associado ao email/usuário
    // Nota: Aqui assumimos que sua tabela tem uma coluna 'email' ou 'userId'
    const data = await sql`
      SELECT token, created_at 
      FROM bots 
      WHERE user_email = ${session.user.email} 
      ORDER BY created_at DESC 
      LIMIT 1
    `;

    // 4. Retorna os dados encontrados
    return NextResponse.json(data[0] || { message: "Nenhum bot encontrado" });

  } catch (error) {
    console.error("Erro na API get-token:", error);
    return NextResponse.json(
      { error: "Erro interno ao buscar dados" }, 
      { status: 500 }
    );
  }
}
