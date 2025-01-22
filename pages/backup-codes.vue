<script setup>
const codes = ref([
  '888999', '888999', 'Already Used', 'Already Used', 'Already Used',
  '888999', '888999', '888999', '888999', '888999'
])

const copyAll = () => {
  const validCodes = codes.value
    .filter(code => code !== 'Already Used')
    .join('\n')
  navigator.clipboard.writeText(validCodes)
}

useHead({
  title: '备份验证码'
})
</script>

<template>
  <div class="backup-codes-container">
    <div class="modal">
      <header class="modal-header">
        <h2>Backup Verification Code</h2>
        <button class="close-button">×</button>
      </header>

      <div class="codes-grid">
        <div 
          v-for="(code, index) in codes" 
          :key="index"
          :class="['code-item', { 'used': code === 'Already Used' }]"
        >
          {{ code }}
        </div>
      </div>

      <div class="info-text">
        <span class="info-icon">ℹ️</span>
        You can also <a href="#" class="link">generate new code</a>.
      </div>

      <div class="modal-footer">
        <button class="cancel-button">Cancel</button>
        <button class="copy-button" @click="copyAll">Copy All</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.backup-codes-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px;
}

.modal {
  background: white;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  padding: 20px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.modal-header h2 {
  font-size: 1.25rem;
  color: #1f2937;
  margin: 0;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #6b7280;
  cursor: pointer;
}

.codes-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
  margin-bottom: 20px;
}

.code-item {
  padding: 8px;
  text-align: center;
  font-family: monospace;
  font-size: 0.9rem;
  color: #1f2937;
}

.code-item.used {
  color: #9ca3af;
  font-style: italic;
}

.info-text {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  color: #6b7280;
  font-size: 0.9rem;
}

.link {
  color: #2563eb;
  text-decoration: none;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.cancel-button,
.copy-button {
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
}

.cancel-button {
  background: white;
  border: 1px solid #d1d5db;
  color: #374151;
}

.copy-button {
  background: #2563eb;
  border: none;
  color: white;
}

.copy-button:hover {
  background: #1d4ed8;
}
</style>