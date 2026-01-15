import NextAuth from "next-auth"
import DiscordProvider from "next-auth/providers/discord"

// 1. Criamos uma constante EXPORTÁVEL com as configurações
export const authOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: { params: { scope: 'identify guilds' } },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
}

// 2. Passamos essa constante para o NextAuth
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
