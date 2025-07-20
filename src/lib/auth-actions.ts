"use server"

import { signIn, signOut } from "../../auth"

export async function handleSignIn() {
  await signIn("credentials", {
    email: "demo@example.com",
    password: "demo12345",
    redirect: true,
    redirectTo: "/create"
  })
}

export async function handleSignOut() {
  await signOut({
    redirect: true,
    redirectTo: "/"
  })
} 