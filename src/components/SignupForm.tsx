'use client'

import { useState } from 'react'
import Link from 'next/link'
import { signUp } from '@/app/actions/auth'

export default function SignupForm() {
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setPending(true)
    setError(null)
    const result = await signUp(new FormData(e.currentTarget))
    if (result?.error) {
      setError(result.error)
      setPending(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
        />
        <input
          name="password"
          type="password"
          placeholder="Password (min 6 characters)"
          minLength={6}
          required
          className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={pending}
          className="w-full bg-black text-white py-2 rounded text-sm hover:bg-gray-800 disabled:opacity-50"
        >
          {pending ? 'Creating account...' : 'Sign up'}
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-500">
        Already have an account?{' '}
        <Link href="/login" className="underline">
          Log in
        </Link>
      </p>
    </>
  )
}
