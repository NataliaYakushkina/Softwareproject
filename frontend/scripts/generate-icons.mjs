// Erzeugt die PWA-Icons (PNG) aus public/favicon.svg.
// Ausfuehren mit:  npm run icons
import sharp from 'sharp'
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const publicDir = resolve(here, '..', 'public')
const source = readFileSync(resolve(publicDir, 'favicon.svg'))

const icons = [
  { size: 192, name: 'pwa-192x192.png' },
  { size: 512, name: 'pwa-512x512.png' },
  { size: 180, name: 'apple-touch-icon-180x180.png' },
]

for (const { size, name } of icons) {
  await sharp(source, { density: 1024 })
    .resize(size, size, { fit: 'cover' })
    .png()
    .toFile(resolve(publicDir, name))
  console.log(`✓ ${name} (${size}×${size})`)
}

console.log('Fertig! Die Icons liegen jetzt in public/.')
