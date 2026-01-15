import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { neon } from "@neondatabase/serverless";
import { authOptions } from "@/app/api/auth/callback/route"; 

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Sessão inválida." }, { status: 401 });
    }

    const databaseUrl = process.env.DATABASE_URL?.trim();
    if (!databaseUrl) return NextResponse.json({ error: "DB_URL ausente" }, { status: 500 });

    const sql = neon(databaseUrl);
    const data = await sql`
      SELECT token, created_at 
      FROM bots 
      WHERE user_email = ${session.user.email} 
      LIMIT 1
    `;

    if (data.length === 0) return NextResponse.json({ token: null });

    return NextResponse.json(data[0]);

  } catch (error: any) {
    console.error("Erro na API get-token:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
