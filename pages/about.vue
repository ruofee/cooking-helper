<script type="ts" setup>
// import {} from 'nuxt'

const { pending, data: posts } = await useFetch('/api/hello', {
  server: false,
})
</script>

<template>
  <div>
    About
    <pre>{{ posts }}</pre>
  </div>
</template>
