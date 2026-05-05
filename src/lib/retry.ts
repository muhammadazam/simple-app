type SupabaseResult<T> = { data: T | null; error: unknown }

export async function withRetry<T>(
  fn: () => PromiseLike<SupabaseResult<T>>,
  retries = 3
): Promise<SupabaseResult<T>> {
  let result: SupabaseResult<T> = { data: null, error: null }
  for (let attempt = 0; attempt < retries; attempt++) {
    result = await fn()
    if (!result.error) return result
    if (attempt < retries - 1) {
      await new Promise((r) => setTimeout(r, 300 * Math.pow(3, attempt) + Math.random() * 100))
    }
  }
  return result
}
