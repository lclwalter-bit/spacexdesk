import express from 'express'
import { readFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dist = join(__dirname, 'dist')
const app = express()
const PORT = Number(process.env.PORT || 4173)

app.get(/^\/api\/yahoo(\/.*)?$/, async (req, res) => {
  try {
    const yahooPath = req.path.replace(/^\/api\/yahoo/, '') || '/'
    const qs = req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : ''
    const url = `https://query1.finance.yahoo.com${yahooPath}${qs}`
    const upstream = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SPCXDesk/1.0)',
        Accept: 'application/json',
      },
    })
    const text = await upstream.text()
    res.status(upstream.status)
    res.setHeader('Content-Type', upstream.headers.get('content-type') || 'application/json')
    res.setHeader('Cache-Control', 'public, max-age=15')
    res.send(text)
  } catch (err) {
    res.status(502).json({ error: String(err?.message || err) })
  }
})

if (existsSync(dist)) {
  app.use(express.static(dist))
  app.get(/.*/, (_req, res) => {
    res.type('html').send(readFileSync(join(dist, 'index.html'), 'utf8'))
  })
}

app.listen(PORT, () => {
  console.log(`SPCX Desk listening on http://localhost:${PORT}`)
})
