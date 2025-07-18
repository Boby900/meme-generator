import { handleSignIn } from "@/app/sign-in/actions"
import { useFormStatus } from "react-dom"

export function SignIn() {
  const { pending } = useFormStatus()

  return (
    <form action={handleSignIn} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-white ">
          Email
        </label>
        <input
          name="email"
          type="email"
          id="email"
          required
          className="w-full px-3 py-2 bg-gray-800 border-2 border-gray-600 rounded-md text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50 focus:outline-none transition-colors"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-white ">
          Password
        </label>
        <input
          name="password"
          type="password"
          id="password"
          required
          className="w-full px-3 py-2 bg-gray-800 border-2 border-gray-600 rounded-md text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50 focus:outline-none transition-colors"
          placeholder="Enter your password"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 disabled:opacity-50 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors duration-200"
      >
        {pending ? "Signing in..." : "Sign In"}
      </button>
    </form>
  )
}
