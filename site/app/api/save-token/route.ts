import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/callback/route"; 

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Sessão inválida.' }, { status: 401 });
    }

    const { token } = await req.json();
    const databaseUrl = process.env.DATABASE_URL?.trim();
    if (!databaseUrl) return NextResponse.json({ error: 'DB_URL ausente' }, { status: 500 });

    const sql = neon(databaseUrl);
    
    await sql`
      INSERT INTO bots (token, user_email) 
      VALUES (${token}, ${session.user.email})
      ON CONFLICT (user_email) DO UPDATE SET token = ${token}
    `;

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('ERRO NA API SAVE-TOKEN:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
