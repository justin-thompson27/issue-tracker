import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { Navigate, useLocation, useSearchParams } from 'react-router'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useAuth } from '../auth/AuthContext'
import { authClient } from '../lib/authClient'
 
const signInSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
})
type SignInValues = z.infer<typeof signInSchema>
 
function describeProblem(code: string | null): string | null {
  if (code === null) return null
  if (code === 'account_not_linked') {
    return 'That Google email already belongs to a password account, so Google cannot sign you in to it. Sign in with your email and password instead.'
  }
  return 'Sign-in did not work. Please try again.'
}
 
export function SignInPage() {
  const auth = useAuth()
  const location = useLocation()
  const [params] = useSearchParams()
  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '' },
  })
 
  const from =
    typeof location.state === 'object' && location.state !== null && 'from' in location.state && typeof location.state.from === 'string'
      ? location.state.from
      : '/'
  const linkProblem = describeProblem(params.get('error'))
 
  async function onValid(values: SignInValues) {
    const { error } = await authClient.signIn.email(values)
    if (error) {
      form.setError('root.server', { message: error.message ?? 'Sign-in did not work' })
    }
    // On success there is nothing more to do here. When the session arrives, the
    // check below sees a signed-in person and sends them on their way.
  }
 
  if (auth.status === 'signed-in') {
    return <Navigate to={from} replace />
  }
 
  async function onGoogle() {
    await authClient.signIn.social({
      provider: 'google',
      callbackURL: `${window.location.origin}/`,
      errorCallbackURL: `${window.location.origin}/sign-in`,
    })
  }
 
  return (
    <section className="mx-auto flex max-w-sm flex-col gap-4">
      <h2 className="text-lg font-semibold">Sign in</h2>
      {linkProblem && (
        <p role="alert" className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
          {linkProblem}
        </p>
      )}
      <form onSubmit={form.handleSubmit(onValid)} noValidate>
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="sign-in-email">Email</FieldLabel>
                <Input {...field} id="sign-in-email" type="email" autoComplete="email" aria-invalid={fieldState.invalid} />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="sign-in-password">Password</FieldLabel>
                <Input {...field} id="sign-in-password" type="password" autoComplete="current-password" aria-invalid={fieldState.invalid} />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          {form.formState.errors.root?.server?.message && (
            <FieldError>{form.formState.errors.root.server.message}</FieldError>
          )}
          <Button type="submit" disabled={form.formState.isSubmitting}>
            Sign in
          </Button>
        </FieldGroup>
      </form>
      <Button type="button" variant="outline" onClick={onGoogle}>
        Sign in with Google
      </Button>
    </section>
  )
}
