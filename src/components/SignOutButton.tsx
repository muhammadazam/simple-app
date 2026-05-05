'use client'

import { signOut } from '@/app/actions/auth'

export default function SignOutButton() {
  return (
    <form action={signOut}>
      <button
        type="submit"
        className="text-sm text-gray-500 hover:text-black underline"
      >
        Sign out
      </button>
    </form>
  )
}
