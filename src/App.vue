<script setup lang="ts">
import { ref, computed } from 'vue';
import { useFetch } from '@/composables/useFetch';
import type { GithubUser } from '@/types/github';

import ErrorState from './components/ErrorState.vue';
import LoadingState from './components/LoadingState.vue';
import UserCard from './components/UserCard.vue';
const username = ref('');
const link = computed(() => {
  if (!username.value) return '';
  return `https://api.github.com/users/${username.value}`;
});
const { state } = useFetch<GithubUser>(link);

</script>

<template>
  <div class="app">
    <h1>Input your name</h1>
    <input type="text" v-model="username" />
    <p>{{ link }}</p>
    <div class="info" v-if="state.status !== 'idle'">
      <LoadingState v-if="state.status === 'loading'" />
      <ErrorState v-else-if="state.status === 'error'" :message="state.message" />
      <UserCard v-else-if="state.status === 'success'" :user="state.data" />
    </div>
  </div>
</template>
