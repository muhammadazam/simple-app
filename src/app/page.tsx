import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import AddTodo from '@/components/AddTodo'
import TodoList from '@/components/TodoList'
import SignOutButton from '@/components/SignOutButton'

export type Todo = {
  id: string
  title: string
  is_complete: boolean
  created_at: string
}

export default async function Home() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: todos } = await supabase
    .from('todos')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <main className="max-w-xl mx-auto mt-16 px-4">
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-2xl font-bold">My Todos</h1>
        <SignOutButton />
      </div>
      <p className="text-xs text-gray-400 mb-6">{user.email}</p>
      <AddTodo />
      <TodoList todos={todos ?? []} />
    </main>
  )
}
