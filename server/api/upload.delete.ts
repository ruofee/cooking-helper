import { deleteFromBlob } from '../utils/blob'

export default defineEventHandler(async (event) => {
  try {
    const { url } = await readBody(event)
    await deleteFromBlob(url)
    return { success: true }
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: '图片删除失败'
    })
  }
})