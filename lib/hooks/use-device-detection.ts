'use client'

import * as React from 'react'
import { useState, useEffect, useCallback } from 'react'

export type DeviceInfo = {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isTouchDevice: boolean
  isInAppBrowser: boolean
  prefersReducedMotion: boolean
  breakpoint: 'sm' | 'md' | 'lg' | 'xl'
}

/**
 * Detects the current device and context.
 * Used to adapt the UI (simplify 3D on mobile, adjust heights, etc.)
 */
export function useDeviceDetection(): DeviceInfo {
  const [info, setInfo] = useState<DeviceInfo>(() => detect())

  useEffect(() => {
    function onResize() {
      setInfo(detect())
    }
    window.addEventListener('resize', onResize, { passive: true })
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    mql.addEventListener('change', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      mql.removeEventListener('change', onResize)
    }
  }, [])

  return info
}

function detect(): DeviceInfo {
  const w = typeof window !== 'undefined' ? window.innerWidth : 1024
  const ua = typeof navigator !== 'undefined' ? navigator.userAgent.toLowerCase() : ''
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 2
  const isInApp = /(instagram|twitter|linkedin|facebook|fbav|snapchat|tiktok)\b/i.test(ua) ||
    /webview/i.test(ua) ||
    (typeof window !== 'undefined' && 'standalone' in navigator && (navigator as any).standalone)

  let isMobile = w < 768
  let isTablet = w >= 768 && w < 1024
  const isDesktop = w >= 1024

  // Check actual device classes too
  if (isTouch && !isDesktop) {
    if (w < 600) isMobile = true
    else if (w < 1024) isTablet = true
  }

  let breakpoint: DeviceInfo['breakpoint'] = 'xl'
  if (w < 640) breakpoint = 'sm'
  else if (w < 768) breakpoint = 'md'
  else if (w < 1024) breakpoint = 'lg'

  const reducedMotion = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return { isMobile, isTablet, isDesktop, isTouchDevice: isTouch, isInAppBrowser: isInApp, prefersReducedMotion: reducedMotion, breakpoint }
}

/**
 * Sets a dynamic CSS custom property `--vh` equal to 1% of the real viewport height.
 * This fixes the `100vh` bug on mobile browsers (where browser chrome shrinks the viewport).
 * Call once on mount and on resize.
 */
export function setViewportHeight(): void {
  if (typeof document === 'undefined') return
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
}

/**
 * React hook that sets `--vh` on mount and on resize.
 * Use this in any component that needs accurate viewport height.
 */
export function useViewportHeight() {
  const [vh, setVh] = React.useState(1)

  React.useEffect(() => {
    const update = () => {
      const value = window.innerHeight * 0.01
      setVh(value)
      if (typeof document !== 'undefined') {
        document.documentElement.style.setProperty('--vh', `${value}px`)
      }
    }
    update()
    window.addEventListener('resize', update, { passive: true })
    return () => window.removeEventListener('resize', update)
  }, [])

  return { vh, setVh }
}
