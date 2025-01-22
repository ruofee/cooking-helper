import { uploadToBlob } from '../utils/blob'

export default defineEventHandler(async (event) => {
  try {
    const { image } = await readBody(event)
    if (!image) {
      return null
    }
    
    const url = await uploadToBlob(image)
    return url
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: '图片上传失败'
    })
  }
})