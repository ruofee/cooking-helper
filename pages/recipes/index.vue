<script setup>
const { recipes, loadRecipes, deleteRecipe } = useRecipes()

onMounted(() => {
  loadRecipes()
})

const router = useRouter()

const goToNewRecipe = () => {
  router.push('/recipes/new')
}
</script>

<template>
  <div class="recipes-container">
    <van-nav-bar
      title="做饭笔记"
      fixed
      placeholder
    />

    <div class="recipes-content">
      <van-empty v-if="recipes.length === 0" description="还没有添加任何菜谱，开始记录第一道菜吧！" />
      
      <van-cell-group v-else>
        <transition-group name="list">
          <van-swipe-cell v-for="recipe in recipes" :key="recipe.id">
            <van-cell
              :title="recipe.name"
              :label="recipe.date"
              is-link
              center
              @click="router.push(`/recipes/${recipe.id}`)"
            >
              <template #icon>
                <div v-if="recipe.image" class="recipe-image-container">
                  <van-image
                    :src="recipe.image"
                    fit="cover"
                    position="center"
                    width="48"
                    height="48"
                  />
                </div>
              </template>
              <template #right-icon>
                <div class="rating">
                  <van-icon 
                    v-for="i in recipe.rating" 
                    :key="i" 
                    name="star" 
                    color="#ffd21e"
                  />
                </div>
              </template>
            </van-cell>
            
            <template #right>
              <van-button 
                square 
                text="删除" 
                type="danger" 
                class="delete-button" 
                @click="deleteRecipe(recipe)"
              />
            </template>
          </van-swipe-cell>
        </transition-group>
      </van-cell-group>
    </div>

    <van-tabbar fixed placeholder>
      <van-tabbar-item icon="bars">菜谱</van-tabbar-item>
      <van-tabbar-item icon="plus" @click="goToNewRecipe">添加</van-tabbar-item>
      <van-tabbar-item icon="setting-o">设置</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style scoped>
.recipe-image-container {
  width: 48px;
  height: 48px;
  margin-right: 12px;
  border-radius: 4px;
  overflow: hidden;
}

:deep(.van-image) {
  width: 100%;
  height: 100%;
}

.rating {
  display: flex;
  gap: 2px;
  margin-right: 8px;
}

:deep(.van-icon) {
  font-size: 16px;
}

.recipes-content {
  padding: 0;
}

:deep(.van-cell) {
  font-size: 16px;
  padding: 16px;
  height: 72px;
}

/* 自定义底部栏样式 */
:deep(.van-tabbar-item) {
  color: #666;
}

:deep(.van-tabbar-item--active) {
  color: #1989fa;
}

:deep(.van-tabbar-item:nth-child(2)) {
  .van-icon {
    font-size: 24px;
    color: #1989fa;
  }
}

.delete-button {
  height: 100%;
  width: 64px;
}

/* 添加删除过渡动画 */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>