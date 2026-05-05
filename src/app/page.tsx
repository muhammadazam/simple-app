import { createClient } from '@/lib/supabase/server'
import AddTodo from '@/components/AddTodo'
import TodoList from '@/components/TodoList'

export type Todo = {
  id: string
  title: string
  is_complete: boolean
  created_at: string
}

export default async function Home() {
  const supabase = await createClient()

  const { data: todos } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <main className="max-w-xl mx-auto mt-16 px-4">
      <h1 className="text-2xl font-bold mb-6">My Todos</h1>
      <AddTodo />
      <TodoList todos={todos ?? []} />
    </main>
  )
}
