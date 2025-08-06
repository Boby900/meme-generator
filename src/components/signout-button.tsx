import { handleSignOut } from "@/lib/actions"


export function SignOut() {
  return (
    <form action={handleSignOut}>
      <button type="submit" className="cursor-pointer">Sign Out</button>
    </form>
  )
}