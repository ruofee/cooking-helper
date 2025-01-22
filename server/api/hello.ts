export default defineEventHandler(async (event) => {
  const response = await new Promise(res => {
    setTimeout(() => {
      res('hello nuxt')
    }, 2000)
  })
  return response
})
