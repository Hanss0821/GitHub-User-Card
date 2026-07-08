<script setup lang="ts">
import { ref, computed } from 'vue';
import { useFetch } from '@/composables/useFetch';
import { GithubUserSchema, type GithubUser } from '@/types/github';
import ErrorState from '@/components/ErrorState.vue';
import LoadingState from '@/components/LoadingState.vue';
import UserCard from '@/components/UserCard.vue';
const username = ref('');
const link = computed(() => {
  if (!username.value) return '';
  return `https://api.github.com/users/${username.value}`;
});
const { state } = useFetch<GithubUser>(GithubUserSchema, link);

</script>

<template>
  <div class="app">
    <h1>Input your name</h1>
    <input v-model="username" type="text" />
    <p>{{ link }}</p>
    <div v-if="state.status !== 'idle'" class="info">
      <LoadingState v-if="state.status === 'loading'" />
      <ErrorState v-else-if="state.status === 'error'" :message="state.message" />
      <UserCard v-else-if="state.status === 'success'" :user="state.data" />
    </div>
  </div>
</template>
