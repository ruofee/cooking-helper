import { createClient } from '@vercel/kv'

const config = useRuntimeConfig()

export const kv = createClient({
  url: config.public.kvRestApiUrl,
  token: config.public.kvRestApiToken,
})