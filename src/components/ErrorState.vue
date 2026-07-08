<script setup lang="ts">
// 可通过defineProps，传入泛型参自动创建
// 两种声明不能混用，很明显 string 和 type String在结构性上也不兼容
// const props = defineProps<{ message: string }>({
//     message: {
//         type: String,
//         default: ''
//     }
// });
const { message } = defineProps<{
  message: string
}>()
</script>
<template>
  <div class="error-state">
    <p>{{ message }}</p>
  </div>
</template>
