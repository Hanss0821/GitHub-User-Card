<script setup lang="ts">
import type { GithubUser } from '@/types/github'
const { user } = defineProps<{ user: GithubUser }>()
</script>
<template>
  <div class="info">
    <img
      :src="user.avatar_url"
      alt="avatar"
    />
    <p>{{ user.login }}</p>
    <p>{{ user.bio ?? 'No bio' }}</p>
    <p>{{ user.public_repos }}</p>
    <p>{{ user.followers }}</p>
  </div>
</template>
