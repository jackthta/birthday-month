<script setup lang="ts">
import type { Employees } from '@/types/employee';

defineProps<{
    employees: Employees
}>();
</script>

<template>
    <ul>
        <EmployeeBirthdayListItem v-for="(employee, index) of employees" :employee="employee" :key="index" />
    </ul>
</template>