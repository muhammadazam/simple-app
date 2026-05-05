'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAction } from 'next-safe-action/hooks'
import { toast } from 'sonner'
import { addTodoAction } from '@/app/actions/todos'
import { getActionError } from '@/lib/action-error'

export default function AddTodo() {
  const [title, setTitle] = useState('')
  const router = useRouter()

  const { execute, isPending } = useAction(addTodoAction, {
    onSuccess() {
      setTitle('')
      router.refresh()
    },
    onError({ error }) {
      toast.error(getActionError(error, 'Failed to add todo'))
    },
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) {
      toast.error('Title cannot be empty')
      return
    }
    execute({ title: title.trim() })
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new todo..."
        disabled={isPending}
        className="flex-1 border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={isPending}
        className="bg-black text-white px-4 py-2 rounded text-sm hover:bg-gray-800 disabled:opacity-50"
      >
        {isPending ? 'Adding...' : 'Add'}
      </button>
    </form>
  )
}
