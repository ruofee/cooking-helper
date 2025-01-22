<script setup>
const router = useRouter()

const navigateToRecipes = () => {
  router.push('/recipes')
}

useHead({
  title: '做饭笔记 - 记录美味生活'
})
</script>

<template>
  <div class="home-container">
    <div class="content">
      <!-- 应用图标 -->
      <div class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
        </svg>
      </div>
      
      <!-- 应用名称 -->
      <h1>做饭笔记</h1>
      <p>记录美味，分享快乐</p>
      <div class="features">
        <span>📝 记录食材</span>
        <span>👨‍🍳 保存步骤</span>
        <span>⭐️ 标记推荐度</span>
      </div>
      
      <!-- 新增开始按钮 -->
      <!-- 修改开始按钮为 Vant 按钮 -->
      <div class="start-button-container">
        <van-button 
          type="primary" 
          size="large" 
          round
          @click="navigateToRecipes"
        >
          开始
        </van-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
}

/* 移除之前的按钮渐变样式 */
:deep(.van-button--primary) {
  font-size: 1.1rem;
  padding: 12px 36px;
  width: 200px;  /* 添加固定宽度 */
}

.start-button-container {
  margin-top: 32px;
  display: flex;      /* 添加这行 */
  justify-content: center;  /* 添加这行 */
  width: 100%;       /* 添加这行 */
}

.icon svg {
  width: 120px;  /* 从 96px 改为 120px */
  height: 120px; /* 从 96px 改为 120px */
  margin: 0 auto;
  color: #4caf50;
}

h1 {
  font-size: 2.5rem;  /* 从 2rem 改为 2.5rem */
  font-weight: bold;
  background: linear-gradient(to right, #f44336, #4caf50);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 8px;
}

p {
  font-size: 1.125rem;
  color: #4b5563;
}

.content {
  text-align: center;
  animation: fadeIn 1s ease-out;
  width: 100%;
  max-width: 800px;
  padding: 0 20px;
}

.features {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: #4b5563;
  font-size: 1rem;
  align-items: center;  /* 添加这行 */
}

.features span {
  display: inline-block;  /* 修改为 inline-block */
  text-align: center;     /* 添加这行 */
}
@keyframes fadeIn {
  from { 
    opacity: 0; 
    transform: translateY(20px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

.start-button-container {
  margin-top: 32px;
}

.start-button {
  background-color: #059669;
  color: white;
  padding: 12px 36px;
  border-radius: 8px;
  border: none;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
}

.start-button:hover {
  background-color: #047857;
}

.start-button:active {
  transform: scale(0.98);
}
</style>
