// Minimal jsdom setup. Kept intentionally small: only polyfills the browser
// APIs the validator/component tests touch.
if (typeof window !== 'undefined') {
  window.scrollTo = window.scrollTo || (() => {})
}
