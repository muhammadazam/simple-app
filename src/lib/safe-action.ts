import { createSafeActionClient } from 'next-safe-action'
import { createClient } from '@/lib/supabase/server'

export class ActionError extends Error {}

export const actionClient = createSafeActionClient({
  handleServerError(e) {
    if (e instanceof ActionError) return e.message
    return 'An unexpected error occurred'
  },
})

export const authActionClient = actionClient.use(async ({ next }) => {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new ActionError('Not authenticated')
  return next({ ctx: { user, supabase } })
})
