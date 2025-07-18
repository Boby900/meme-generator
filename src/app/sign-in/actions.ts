"use server"

import { signInSchema } from "@/lib/zod"
import { signIn } from "../../../auth"
import { redirect } from "next/navigation"

export async function handleSignIn(formData: FormData) {
  try {
    await signInSchema.parseAsync(Object.fromEntries(formData))
    const result = await signIn("credentials", formData)
    if (!result) {
      throw new Error('Authentication failed')
    }
    return { redirect: '/' }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}
