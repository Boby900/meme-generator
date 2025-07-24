import { signInWithGitHub } from "@/lib/actions"

export default function SignIn() {
  return (
    <form action={signInWithGitHub}>
      <button type="submit">Signin with GitHub</button>
    </form>
  )
}