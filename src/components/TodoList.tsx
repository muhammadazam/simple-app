'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { Todo } from '@/app/page'

export default function TodoList({ todos }: { todos: Todo[] }) {
  const router = useRouter()

  async function toggleTodo(id: string, isComplete: boolean) {
    const supabase = createClient()
    await supabase.from('todos').update({ is_complete: !isComplete }).eq('id', id)
    router.refresh()
  }

  async function deleteTodo(id: string) {
    const supabase = createClient()
    await supabase.from('todos').delete().eq('id', id)
    router.refresh()
  }

  if (todos.length === 0) {
    return <p className="text-gray-400 text-sm">No todos yet. Add one above!</p>
  }

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <li key={todo.id} className="flex items-center gap-3 p-3 border rounded">
          <input
            type="checkbox"
            checked={todo.is_complete}
            onChange={() => toggleTodo(todo.id, todo.is_complete)}
            className="w-4 h-4 cursor-pointer"
          />
          <span className={`flex-1 text-sm ${todo.is_complete ? 'line-through text-gray-400' : ''}`}>
            {todo.title}
          </span>
          <button
            onClick={() => deleteTodo(todo.id)}
            className="text-red-400 hover:text-red-600 text-sm"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  )
}
