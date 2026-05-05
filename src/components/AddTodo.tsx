'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AddTodo() {
  const [title, setTitle] = useState('')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return

    const supabase = createClient()
    await supabase.from('todos').insert({ title: title.trim() })
    setTitle('')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new todo..."
        className="flex-1 border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
      />
      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded text-sm hover:bg-gray-800"
      >
        Add
      </button>
    </form>
  )
}
