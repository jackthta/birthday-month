<script setup lang="ts">
import dayjs from "dayjs";

import type { Employee } from "@/types/employee";

const props = defineProps<{ employee: Employee }>();

const birthday = $computed(() =>
  dayjs(props.employee.birthday).format("MMMM DD, YYYY")
);
</script>

<template>
  <tr class="text-normal">
    <td class="px-6 py-3">{{ employee.name }}</td>
    <td class="px-6 py-3">{{ birthday }}</td>
  </tr>
</template>
