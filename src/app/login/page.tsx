import { Suspense } from 'react'
import { LoginForm } from '@/components/ui/LoginForm'

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
