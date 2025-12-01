// server/api/events/public.get.ts
import type { EventHandler } from 'h3'

const handler: EventHandler = async () => {
  return await $fetch('http://localhost:8080/events/public')
}

export default handler