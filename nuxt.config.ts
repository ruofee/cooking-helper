// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-21',
  devtools: { enabled: true },
  devServer: {
    host: '0.0.0.0',  // 允许所有 IP 访问
    port: 3000 
  },
  
  modules: [
    '@vant/nuxt'
  ],
  
  runtimeConfig: {
    // 私有 key（仅在服务端可用）
    blobToken: process.env.BLOB_READ_WRITE_TOKEN,
    // public key（服务端和客户端都可用）
    public: {
      kvRestApiUrl: process.env.KV_URL,
      kvRestApiToken: process.env.KV_REST_API_TOKEN,
    }
  },
  
  vant: {
    /** Vant 配置项 */
  }
})