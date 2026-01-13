import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function POST(req: Request) {
  try {
    const { token } = await req.json();
    const sql = neon(process.env.DATABASE_URL!);
    
    // Isso aqui manda o token para o seu banco Neon
    await sql`INSERT INTO bots (token) VALUES (${token})`;

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao salvar' }, { status: 500 });
  }
}
