import { useApi } from './useApi'

export const useEvents = () => {
  const api = useApi()

  const toggleFollow = async (eventId: number) => {
    await api.post('/events/follow', null, { params: { event_id: eventId } })
  }

  const toggleBookmark = async (eventId: number) => {
    await api.post('/events/bookmark', null, { params: { event_id: eventId } })
  }

  return { toggleFollow, toggleBookmark }
}
