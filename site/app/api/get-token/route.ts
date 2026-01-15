import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { neon } from "@neondatabase/serverless";
import { authOptions } from "@/app/api/auth/callback/route"; // Importe as opções!

export async function GET() {
  try {
    // 1. Passamos o authOptions para que ele use as chaves secretas do Railway
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Sessão inválida. Refaça o login." }, { status: 401 });
    }

    const databaseUrl = process.env.DATABASE_URL?.trim();
    if (!databaseUrl) {
      return NextResponse.json({ error: "DATABASE_URL não configurada." }, { status: 500 });
    }

    const sql = neon(databaseUrl);

    // 2. Busca o token de forma segura
    const data = await sql`
      SELECT token, created_at 
      FROM bots 
      WHERE user_email = ${session.user.email} 
      LIMIT 1
    `;

    // 3. Se não houver bot, retornamos um JSON vazio em vez de erro 404
    // Isso evita que o Dashboard trave no "Erro de carregamento"
    if (data.length === 0) {
      return NextResponse.json({ token: null });
    }

    return NextResponse.json(data[0]);

  } catch (error: any) {
    console.error("Erro crítico no Railway GET-TOKEN:", error.message);
    return NextResponse.json(
      { error: "Erro de conexão com o banco Neon." }, 
      { status: 500 }
    );
  }
}
