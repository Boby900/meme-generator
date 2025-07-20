import { signOut } from "../../auth"

async function handleSignOut() {
  await signOut({
    redirect: true,
    redirectTo: "/"
  })
} 

export function SignOut() {
  return (
    <form action={handleSignOut}>
      <button type="submit">Sign Out</button>
    </form>
  )
}