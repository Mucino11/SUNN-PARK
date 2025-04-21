import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'

// Initialize the Hono app
const app = new Hono()

// Middleware
app.use('*', logger())
app.use('*', cors())

// Basic health check route
app.get('/', (c) => {
  return c.json({
    status: 'ok',
    message: 'Parking App API is running'
  })
})

// Error handling
app.onError((err, c) => {
  console.error(`${err}`)
  return c.json({ error: 'Internal Server Error' }, 500)
})

export default app