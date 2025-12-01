import { ref } from 'vue'
import { useApi } from './useApi'

export const useImageUpload = () => {
  const files = ref<File[]>([])
  const uploading = ref(false)
  const uploadedUrls = ref<string[]>([])

  const upload = async () => {
    if (files.value.length === 0) return
    uploading.value = true

    const formData = new FormData()
    files.value.forEach(file => formData.append('images', file))

    try {
      const res = await useApi().post('/upload-images', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      uploadedUrls.value = res.data.urls || []
    } catch (err) {
      alert('Upload failed')
    } finally {
      uploading.value = false
    }
  }

  return { files, uploading, uploadedUrls, upload }
}
