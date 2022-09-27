<script setup lang="ts">
defineProps<{
  large?: boolean;
}>();
</script>

<template>
  <button
    class="uppercase text-sm w-[180px] py-1 rounded-md font-semibold border-2 border-scovilleHighness bg-white text-scovilleHighness hover:scale-[1.01] transition ease-in-out duration-300"
    :class="{
      'w-[200px] h-[75px]': large,
    }"
  >
    <slot></slot>
  </button>
</template>
