/**
 * Produces a filesystem-safe and HTTP-header-safe ASCII filename.
 * Removes emojis, hashtags, unicode variation selectors, quotes, and invalid OS/URL characters.
 * Ensures the extension is always preserved and guaranteed.
 */
export function createSafeFilename(rawTitle: string, ext: string): string {
  const cleanExt = (ext || 'mp4').toLowerCase().replace(/[^a-z0-9]/g, '') || 'mp4'

  // Build the header-safe name from code points instead of relying on an
  // emoji range. Some platform titles contain unpaired surrogates or newer
  // symbols that can otherwise leak into a ByteString HTTP header.
  let name = Array.from(rawTitle || 'Media', (character) => {
    const codePoint = character.codePointAt(0) || 0
    return codePoint >= 0x20 && codePoint <= 0x7e ? character : ' '
  }).join('')
    // Remove quotes, slashes, colons, and other dangerous file/URL characters
    .replace(/[<>:"/\\|?*#%&;'`~=^$@!()[\]{}]/g, ' ')
    // Replace whitespace with a clean underscore
    .replace(/\s+/g, '_')
    // Clean up duplicate underscores
    .replace(/_+/g, '_')
    // Trim leading/trailing underscores and dots
    .replace(/^[_.]+|[_.]+$/g, '')
    .trim()

  // Remove any existing extension matching at the end
  const extRegex = new RegExp(`\\.${cleanExt}$`, 'i')
  name = name.replace(extRegex, '')

  // Clamp length to 60 characters so it fits safely within any filesystem path limits
  if (name.length > 60) {
    name = name.slice(0, 60).replace(/_+$/, '')
  }

  // Fallback to 'Media' if empty
  if (!name) {
    name = 'Media'
  }

  return `${name}.${cleanExt}`
}
