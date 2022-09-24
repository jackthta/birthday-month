<script setup lang="ts">
import dayjs from 'dayjs';

const thisMonth = $computed(() => dayjs().format("MMMM"));
</script>

<template>
    <header class="w-[500px] px-4 mx-auto mt-40 border">
        <h1 class="text-5xl mb-3 -ml-1">Birthday Month</h1>

        <p class="text-lg text-neutral-500">See who has a birthday in this month of {{ thisMonth }}!</p>
    </header>
</template>