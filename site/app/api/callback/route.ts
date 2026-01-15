import NextAuth from "next-auth"
import DiscordProvider from "next-auth/providers/discord"

export const authOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: { params: { scope: 'identify guilds' } },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  // No Railway, force sempre true se estiver usando o domínio .up.railway.app
  useSecureCookies: true, 
  trustHost: true,
  callbacks: {
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  // Removemos a configuração manual de 'cookies' para deixar o NextAuth
  // gerenciar os nomes automaticamente baseado no HTTPS.
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
