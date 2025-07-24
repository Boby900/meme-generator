import NextAuth from "next-auth"
import { ZodError } from "zod"
import Credentials from "next-auth/providers/credentials"
import { signInSchema } from "@/lib/zod"
import { createDb } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"
import { compare } from "bcryptjs"
import GitHub from "next-auth/providers/github"
console.log('GitHub ID:', process.env.AUTH_GITHUB_ID)
console.log('GitHub Secret exists:', !!process.env.AUTH_GITHUB_SECRET)  
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await signInSchema.parseAsync(credentials)
          const db = createDb(process.env as any)
          const userArr = await db.select().from(users).where(eq(users.email, email))
          const user = userArr[0]
          if (!user) return null
          const valid = await compare(password, user.passwordHash)
          if (!valid) return null
          return {
            id: String(user.id),
            email: user.email,
            name: user.email
          }
        } catch (error) {
          if (error instanceof ZodError) {
            return null
          }
          return null
        }
      },
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
    }
  }
})