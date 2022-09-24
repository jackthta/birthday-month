<script setup lang="ts">
import dayjs from "dayjs";

import type { Employee } from "@/types/employee";

const props = defineProps<{ employee: Employee }>();

const birthday = $computed(() => dayjs(props.employee.birthday).format("MMMM DD, YYYY"));
</script>

<template>
    <li>
        <span>{{ employee.name }}</span>
        <span>{{ birthday }}</span>
    </li>
</template>