interface Recipe {
  id: number
  name: string
  date: string
  rating: number
  ingredients: string
  steps: string
  image?: string
}

export const useRecipes = () => {
  const recipes = useState<Recipe[]>('recipes', () => [])

  const loadRecipes = async () => {
    const data = await $fetch<Recipe[]>('/api/recipes')
    recipes.value = data
  }

  const saveRecipes = async () => {
    await $fetch('/api/recipes', {
      method: 'POST',
      body: recipes.value
    })
  }

  const addRecipe = async (recipe: Recipe) => {
    recipes.value.unshift(recipe)
    await saveRecipes()
  }

  const deleteRecipe = async (recipe: Recipe) => {
    recipes.value = recipes.value.filter(r => r.id !== recipe.id)
    await saveRecipes()
  }

  const getRecipe = (id: number | string) => {
    return recipes.value.find(r => r.id === Number(id))
  }

  return {
    recipes,
    loadRecipes,
    addRecipe,
    deleteRecipe,
    getRecipe
  }
}