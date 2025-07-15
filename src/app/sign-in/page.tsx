"use client"

import { SignIn } from "@/app/sign-in/sign-in"

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-300">
            Sign in to your account
          </h2>
        </div>
        <SignIn />
      </div>
    </div>
  )
}
