export function getActionError(
  error: { serverError?: string; validationErrors?: unknown },
  fallback: string
): string {
  if (error.serverError) return error.serverError
  const ve = error.validationErrors
  if (ve && typeof ve === 'object') {
    for (const val of Object.values(ve)) {
      if (val && typeof val === 'object' && '_errors' in val) {
        const first = (val as { _errors?: string[] })._errors?.[0]
        if (first) return first
      }
    }
  }
  return fallback
}
