<script setup lang="ts">
defineProps<{
  large?: boolean;
}>();
</script>

<template>
  <button
    class="bg-scovilleHighness uppercase text-sm text-white w-[180px] py-1 rounded-md font-semibold hover:scale-[1.01] transition ease-in-out duration-300"
    :class="{
      'w-[200px] h-[75px]': large,
    }"
  >
    <slot></slot>
  </button>
</template>
