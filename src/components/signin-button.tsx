import { handleSignIn } from "../lib/auth-actions"

export function SignIn() {
  return (
    <form action={handleSignIn}>
      <button type="submit">Sign in</button>
    </form>
  )
}