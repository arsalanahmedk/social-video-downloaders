'use client'

import { toast as sonnerToast } from 'sonner'

type ToastOptions = Parameters<typeof sonnerToast.success>[1]

type ToastType = 'success' | 'error' | 'warning' | 'info' | 'default'

export function toast() {
  return {
    success: (message: string, opts?: ToastOptions) => sonnerToast.success(message, opts),
    error: (message: string, opts?: ToastOptions) => sonnerToast.error(message, opts),
    warning: (message: string, opts?: ToastOptions) => sonnerToast.warning(message, opts),
    info: (message: string, opts?: ToastOptions) => sonnerToast.message(message, opts),
    promise: (
      promise: Promise<unknown>,
      msgs: { loading: string; success: string | ((data: any) => string); error: string },
      opts?: ToastOptions,
    ) => sonnerToast.promise(promise, msgs),
    dismiss: (id?: string | number) => sonnerToast.dismiss(id),
  }
}

export default toast
