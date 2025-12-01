// server/api/events/create.post.ts
import type { EventHandler } from 'h3'

const handler: EventHandler = async (event) => {
  const body = await readBody(event)
  const authHeader = getHeader(event, 'authorization')

  try {
    return await $fetch('http://localhost:8080/events/create', {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader || ''
      }
    })
  } catch (error: any) {
    throw createError({
      statusCode: error.status || 500,
      statusMessage: error.data?.error || 'Failed to create event'
    })
  }
}

export default handler