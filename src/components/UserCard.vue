<script setup lang="ts">
import type { GithubUser } from '@/types/github';
const { user } = defineProps<
    { user: GithubUser }
>()
</script>
<template>
    <div class="info">
        <img :src="user.avatar_url" alt="avatar" />
        <p>{{ user.login }}</p>
        <p>{{ user.bio ?? 'No bio' }}</p>
        <p>{{ user.public_repos ?? 0 }}</p>
        <p>{{ user.followers ?? 0 }}</p>
    </div>
</template>