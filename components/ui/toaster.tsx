'use client'

import { useEffect } from 'react'
import { Toaster } from 'sonner'
import { setViewportHeight } from '@/lib/hooks/use-device-detection'

export function DynamicViewportScript() {
  useEffect(() => {
    setViewportHeight()
    window.addEventListener('resize', setViewportHeight)
    return () => window.removeEventListener('resize', setViewportHeight)
  }, [])

  return null
}

export function AppToaster() {
  return (
    <Toaster
      position="bottom-right"
      richColors
      expand={false}
      duration={3000}
      toastOptions={{
        className: 'toast',
        style: {
          background: 'var(--bg-2)',
          color: 'var(--text-1)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--r-lg)',
          backdropFilter: 'blur(12px)',
        },
      }}
    />
  )
}
