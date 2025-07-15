"use server"

import { signInSchema } from "@/lib/zod"
import { signIn } from "../../../auth"

export async function handleSignIn(formData: FormData) {
  try {
    await signInSchema.parseAsync(Object.fromEntries(formData))
    await signIn("credentials", formData)
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}
