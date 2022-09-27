<script setup lang="ts">
defineProps<{
  large?: boolean;
}>();
</script>

<template>
  <button
    class="uppercase text-sm w-[180px] py-1 rounded-md font-semibold border-2 border-scovilleHighness bg-white text-scovilleHighness"
    :class="{
      'w-[200px] h-[75px]': large,
    }"
  >
    <slot> </slot>
  </button>
</template>
