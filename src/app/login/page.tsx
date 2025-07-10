import Image from "next/image"
import { auth, login, logout } from "../actions"

export default async function Home() {
  const subject = await auth()

  return (
    <div>
      <main>
        <Image
        
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol>
          {subject ? (
            <>
              <li>
                Logged in as <code>{subject.properties.id}</code>.
              </li>
              <li>
                And then check out <code>app/page.tsx</code>.
              </li>
            </>
          ) : (
            <>
              <li>Login with your email and password.</li>
              <li>
                And then check out <code>app/page.tsx</code>.
              </li>
            </>
          )}
        </ol>

        <div>
          {subject ? (
            <form action={logout}>
              <button>Logout</button>
            </form>
          ) : (
            <form action={login}>
              <button>Login with OpenAuth</button>
            </form>
          )}
        </div>
      </main>
    </div>
  )
}