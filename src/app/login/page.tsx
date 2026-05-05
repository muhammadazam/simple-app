import LoginForm from '@/components/LoginForm'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>
}) {
  const { message } = await searchParams

  return (
    <main className="max-w-sm mx-auto mt-24 px-4">
      <h1 className="text-2xl font-bold mb-6">Log in</h1>
      <LoginForm message={message} />
    </main>
  )
}
