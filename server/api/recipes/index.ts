import { kv } from '~/server/utils/kv'

export default defineEventHandler(async (event) => {
  switch (event.method) {
    case 'GET':
      return await kv.get('recipes') || []
      
    case 'POST':
      try {
        const recipes = await readBody(event)
        await kv.set('recipes', recipes)
        return { success: true }
      } catch (error) {
        throw createError({
          statusCode: 500,
          message: '保存失败'
        })
      }
  }
})