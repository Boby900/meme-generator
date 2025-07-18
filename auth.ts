import NextAuth from "next-auth"
import { ZodError } from "zod"
import Credentials from "next-auth/providers/credentials"
import { signInSchema } from "@/lib/zod"
import { redirect } from "next/navigation"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await signInSchema.parseAsync(credentials)
          
          // For demo purposes, accept any email/password
          // In a real app, you would validate against a database
          if (email && password) {
            return { email: "bobyt2265@gmail.com", password: 'DemoUser' }
          }
          
          return null
        } catch (error) {
          if (error instanceof ZodError) {
            return null
          }
          return null
        }
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Always redirect to the root page after authentication
      return "/create"
    }
  }
})