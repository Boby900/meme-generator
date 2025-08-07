import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
console.log('GitHub ID:', process.env.AUTH_GITHUB_ID)
console.log('GitHub Secret exists:', !!process.env.AUTH_GITHUB_SECRET)  
export const { handlers, auth, signIn, signOut } = NextAuth({
  debug: true,
  providers: [
  GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
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
    },
    async signIn({ user, account }) {
      console.log('User signed in:', user)
      console.log('Account:', account)
       try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/users/sync`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.BACKEND_SECRET}` // Add auth for backend
          },
          body: JSON.stringify({
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
            provider: account?.provider,
            providerAccountId: account?.providerAccountId,
          })
        })

        if (!response.ok) {
          console.error('Failed to sync user with backend')
          return false
        }

        return true
      } catch (error) {
        console.error('Error syncing user:', error)
        return false
      }
  },
}})