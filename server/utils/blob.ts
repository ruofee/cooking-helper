import { put } from '@vercel/blob'

export const uploadToBlob = async (base64Image: string) => {
  if (!base64Image) return null

  // 将 base64 转换为 Blob
  const response = await fetch(base64Image)
  const blob = await response.blob()

  // 上传到 Vercel Blob
  const { url } = await put(`recipes/${Date.now()}.jpg`, blob, {
    access: 'public',
    token: process.env.BLOB_READ_WRITE_TOKEN
  })

  return url
}