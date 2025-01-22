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
  
  vant: {
    /** Vant 配置项 */
  }
})