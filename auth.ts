import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
console.log('GitHub ID:', process.env.AUTH_GITHUB_ID)
console.log('GitHub Secret exists:', !!process.env.AUTH_GITHUB_SECRET)  
export const { handlers, auth, signIn, signOut } = NextAuth({
  debug: true,
  providers: [
    GitHub,
    Google,
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = String(token.id ?? "");
        session.user.email = String(token.email ?? "");
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      return "/create"
    }
  }
})