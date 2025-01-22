<script setup>
import { showToast } from 'vant'
const route = useRoute()
const router = useRouter()
const { recipes, loadRecipes, getRecipe, deleteRecipe } = useRecipes()
const showActions = ref(false)
const loading = ref(true)

onMounted(async () => {
  try {
    await loadRecipes()
  } finally {
    loading.value = false
  }
})

const recipe = computed(() => getRecipe(route.params.id))

// 监听 recipe 的变化，只有在数据加载完成后才判断是否存在
watch([recipe, loading], ([newRecipe, isLoading]) => {
  if (!isLoading && !newRecipe) {
    router.push('/recipes')
  }
})

const handleDelete = async () => {
  try {
    await deleteRecipe(recipe.value)
    showToast({
      type: 'success',
      message: '删除成功'
    })
    router.push('/recipes')
  } catch (error) {
    showToast({
      type: 'fail',
      message: '删除失败'
    })
  }
}

useHead({
  title: recipe.value ? `${recipe.value.name} - 菜谱详情` : '菜谱详情'
})
</script>

<template>
  <div class="recipe-detail-container">
    <van-nav-bar
      :title="recipe?.name"
      left-text="返回"
      left-arrow
      @click-left="router.back()"
      fixed
      placeholder
    >
      <template #right>
        <van-icon name="ellipsis" @click="showActions = true" />
      </template>
    </van-nav-bar>

    <van-loading v-if="loading" class="loading" type="spinner" />
    
    <div v-else-if="recipe" class="recipe-content">
      <div class="header-section">
        <van-image v-if="recipe.image" :src="recipe.image" width="80" height="80" fit="cover" radius="4" />
        <div class="header-info">
          <h1 class="title">{{ recipe.name }}</h1>
          <div class="rating-row">
            <van-rate v-model="recipe.rating" readonly color="#ff6b28" void-color="#eee" size="16" />
            <span class="date">{{ recipe.date }}</span>
          </div>
        </div>
      </div>

      <van-cell-group title="食材清单" inset>
        <van-cell>
          <template #value>
            <div class="ingredient-list">
              <div v-for="(line, index) in recipe.ingredients.split('\n')" 
                   :key="index" 
                   class="ingredient-item"
              >
                {{ line }}
              </div>
            </div>
          </template>
        </van-cell>
      </van-cell-group>

      <van-cell-group title="烹饪步骤" inset>
        <van-cell>
          <template #value>
            <div class="steps-list">
              <div v-for="(line, index) in recipe.steps.split('\n')" 
                   :key="index" 
                   class="step-item"
              >
                <span class="step-number">{{ index + 1 }}.</span>
                {{ line }}
              </div>
            </div>
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <!-- 添加操作菜单 -->
    <van-action-sheet
      v-model:show="showActions"
      cancel-text="取消"
    >
      <div class="action-sheet-content">
        <van-cell 
          title="删除" 
          @click="handleDelete"
          class="delete-action"
          :border="false"
        />
      </div>
    </van-action-sheet>
  </div>
</template>

<style scoped>
.header-section {
  margin: 16px;
  padding: 16px;
  background: #fff;
  border-radius: 8px;
  display: flex;
  gap: 16px;
}

.header-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.title {
  font-size: 18px;
  font-weight: bold;
  margin: 0;
  color: #333;
}

.rating-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.date {
  color: #999;
  font-size: 12px;
}

.recipe-detail-container {
  min-height: 100vh;
  background: #f7f8fa;
}

.recipe-content {
  padding-bottom: 20px;
}

.recipe-info {
  padding-top: 12px;
}

:deep(.van-cell-group) {
  margin-bottom: 12px;
}

:deep(.van-cell-group--inset) {
  margin: 0 12px 12px;
}

.ingredient-list,
.steps-list {
  padding: 8px 0;
}

.ingredient-item,
.step-item {
  line-height: 1.6;
  padding: 4px 0;
  color: #323233;
}

.step-item {
  display: flex;
  gap: 8px;
}

.step-number {
  color: #4caf50;
  font-weight: bold;
}

.recipe-footer {
  margin: 20px 16px;
  padding: 16px;
  background: #fff;
  border-radius: 8px;
}

.footer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}

.footer-item:not(:last-child) {
  border-bottom: 1px solid #f5f5f5;
}

.footer-item .label {
  color: #646566;
  font-size: 14px;
}

.footer-item .value {
  color: #323233;
  font-size: 14px;
}

.recipe-meta {
  text-align: center;
  padding: 16px;
  color: #969799;
  font-size: 14px;
}

.create-time {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.rating-wrapper {
  text-align: center;
  padding: 0 16px 24px;
  background: #fff;
}

:deep(.van-rate) {
  display: inline-flex;
}

:deep(.van-cell__value) {
  text-align: left;
}

.ingredient-list {
  text-align: left;
}

.ingredient-item {
  line-height: 1.6;
  padding: 4px 0;
  color: #323233;
}

.action-sheet-content {
  padding: 8px 0;
}

.delete-action {
  color: #ee0a24;
  text-align: center;
}

:deep(.delete-action .van-cell__title) {
  text-align: center;
}
.loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
}
</style>