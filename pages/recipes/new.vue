<script setup>
const router = useRouter()
const recipes = useState('recipes')
const fileList = ref([])

const formData = ref({
  name: '',
  ingredients: '',
  steps: '',
  rating: 3,
  date: new Date().toISOString().split('T')[0],
  image: ''
})

const handleImageUpload = (file) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    formData.value.image = e.target.result
    fileList.value = [{ url: e.target.result }]  // 更新文件列表显示
  }
  reader.readAsDataURL(file.file)
}

const submitForm = () => {
  // 表单验证
  if (!formData.value.name || !formData.value.ingredients || !formData.value.steps) {
    return
  }

  // 创建新菜谱
  const newRecipe = {
    id: Date.now(),
    name: formData.value.name,
    date: formData.value.date,
    rating: formData.value.rating,
    ingredients: formData.value.ingredients,
    steps: formData.value.steps,
    image: formData.value.image
  }
  
  // 添加到菜谱列表
  if (!recipes.value) {
    recipes.value = []  // 确保 recipes 已初始化
  }
  recipes.value.unshift(newRecipe)
  
  // 保存到本地存储
  if (import.meta.client) {
    try {
      localStorage.setItem('recipes', JSON.stringify(recipes.value))
      router.push('/recipes')
    } catch (error) {
      console.error('保存失败:', error)
    }
  }
}
</script>

<template>
  <div class="new-recipe-container">
    <van-nav-bar
      title="新增菜谱"
      left-text="返回"
      left-arrow
      @click-left="router.back()"
      fixed
      placeholder
    />

    <van-form @submit="submitForm">
      <van-cell-group>
        <van-field
          v-model="formData.name"
          name="name"
          label="菜品名称"
          placeholder="例如：红烧肉"
          :rules="[{ required: true, message: '请输入菜品名称' }]"
        />

        <van-field
          v-model="formData.ingredients"
          name="ingredients"
          label="食材清单"
          type="textarea"
          rows="4"
          placeholder="每行一个食材，例如：&#10;五花肉 500g&#10;生抽 2勺"
          :rules="[{ required: true, message: '请输入食材清单' }]"
        />

        <van-field
          v-model="formData.steps"
          name="steps"
          label="烹饪步骤"
          type="textarea"
          rows="6"
          placeholder="详细的制作步骤..."
          :rules="[{ required: true, message: '请输入烹饪步骤' }]"
        />

        <van-cell title="推荐指数">
          <template #right-icon>
            <van-rate v-model="formData.rating" :count="5" />
          </template>
        </van-cell>

        <van-cell title="上传图片">
          <van-uploader
            v-model="fileList"
            :max-count="1"
            :after-read="handleImageUpload"
          />
        </van-cell>
      </van-cell-group>

      <div class="submit-btn">
        <van-button round block type="primary" native-type="submit">
          保存
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<style scoped>
.new-recipe-container {
  min-height: 100vh;
  background: #fff;
}

/* 移除 inset 样式的外边距 */
:deep(.van-cell-group) {
  margin: 0;
}

/* 调整提交按钮的间距 */
.submit-btn {
  padding: 16px;
  background: #fff;
}

:deep(.van-field__label) {
  width: 5em !important;
}

:deep(.van-cell:not(:last-child)::after) {
  left: 0;
}
</style>