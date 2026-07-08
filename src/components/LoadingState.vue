<script setup lang="ts">
const { text = "" } = defineProps<{
    text?: string
}>() 
</script>
<template>
    <div class="loading-text">
        {{ text || 'Loading...' }}
    </div>
</template>