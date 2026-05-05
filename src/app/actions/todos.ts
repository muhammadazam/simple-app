'use server'

import { z } from 'zod'
import { authActionClient, ActionError } from '@/lib/safe-action'
import { withRetry } from '@/lib/retry'

export const addTodoAction = authActionClient
  .schema(z.object({ title: z.string().min(1, 'Title cannot be empty') }))
  .action(async ({ parsedInput: { title }, ctx: { user, supabase } }) => {
    const { data, error } = await withRetry(() =>
      supabase
        .from('todos')
        .insert({ title, user_id: user.id })
        .select()
        .single()
    )
    if (error) throw new ActionError('Failed to add todo. Please try again.')
    return data
  })

export const toggleTodoAction = authActionClient
  .schema(z.object({ id: z.string().uuid(), is_complete: z.boolean() }))
  .action(async ({ parsedInput: { id, is_complete }, ctx: { user, supabase } }) => {
    const { error } = await withRetry(() =>
      supabase
        .from('todos')
        .update({ is_complete })
        .eq('id', id)
        .eq('user_id', user.id)
    )
    if (error) throw new ActionError('Failed to update todo. Please try again.')
  })

export const deleteTodoAction = authActionClient
  .schema(z.object({ id: z.string().uuid() }))
  .action(async ({ parsedInput: { id }, ctx: { user, supabase } }) => {
    const { error } = await withRetry(() =>
      supabase
        .from('todos')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id)
    )
    if (error) throw new ActionError('Failed to delete todo. Please try again.')
  })
