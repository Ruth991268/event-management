// server/api/auth/login.post.ts
import type { EventHandler } from 'h3'

const handler: EventHandler = async (event) => {
  const body = await readBody(event)
  return await $fetch('http://localhost:8080/login', {
    method: 'POST',
    body,
    headers: { 'Content-Type': 'application/json' }
  })
}

export default handler