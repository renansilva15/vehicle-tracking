'use client'

import { PropsWithChildren, useActionState } from 'react'
import { createRouteAction } from './create-route.action'

export function NewRouteForm(props: PropsWithChildren) {
  const [state, formAction] = useActionState<
    {
      error?: string
      success?: boolean
    } | null,
    FormData
  >(createRouteAction, null)

  return (
    <form action={formAction}>
      {state?.error && (
        <div className="rounded border bg-error p-4 text-contrast">
          {state.error}
        </div>
      )}
      {state?.success && (
        <div className="rounded border bg-success p-4 text-contrast">
          Rota criada com sucesso!
        </div>
      )}
      {props.children}
    </form>
  )
}
