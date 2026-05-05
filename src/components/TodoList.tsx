'use client'

import { useRouter } from 'next/navigation'
import { useAction } from 'next-safe-action/hooks'
import { toast } from 'sonner'
import { toggleTodoAction, deleteTodoAction } from '@/app/actions/todos'
import { getActionError } from '@/lib/action-error'
import type { Todo } from '@/app/page'

function TodoItem({ todo }: { todo: Todo }) {
  const router = useRouter()

  const { execute: toggle, isPending: toggling } = useAction(toggleTodoAction, {
    onSuccess() {
      router.refresh()
    },
    onError({ error }) {
      toast.error(getActionError(error, 'Failed to update todo'))
    },
  })

  const { execute: remove, isPending: deleting } = useAction(deleteTodoAction, {
    onSuccess() {
      router.refresh()
    },
    onError({ error }) {
      toast.error(getActionError(error, 'Failed to delete todo'))
    },
  })

  return (
    <li className="flex items-center gap-3 p-3 border rounded">
      <input
        type="checkbox"
        checked={todo.is_complete}
        onChange={() => toggle({ id: todo.id, is_complete: !todo.is_complete })}
        disabled={toggling || deleting}
        aria-label={`Mark "${todo.title}" as ${todo.is_complete ? 'incomplete' : 'complete'}`}
        className="w-4 h-4 cursor-pointer disabled:opacity-50"
      />
      <span
        className={`flex-1 text-sm ${todo.is_complete ? 'line-through text-gray-400' : ''}`}
      >
        {todo.title}
      </span>
      <button
        type="button"
        onClick={() => remove({ id: todo.id })}
        disabled={toggling || deleting}
        className="text-red-400 hover:text-red-600 text-sm disabled:opacity-40"
      >
        {deleting ? '...' : 'Delete'}
      </button>
    </li>
  )
}

export default function TodoList({ todos }: { todos: Todo[] }) {
  if (todos.length === 0) {
    return <p className="text-gray-400 text-sm">No todos yet. Add one above!</p>
  }

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  )
}
