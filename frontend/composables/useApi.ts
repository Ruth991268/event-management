export const useApi = () => {
  const config = useRuntimeConfig()
  const apiUrl = config.public.apiBase

  const post = async (path: string, body: any) => {
    return await $fetch(`${apiUrl}${path}`, { method: 'POST', body })
  }

  return { post }
}
