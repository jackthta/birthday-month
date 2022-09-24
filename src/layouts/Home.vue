<script setup lang="ts">
import { filterCurrentMonthBirthdays } from '@/utilities/birthday';

import type { Employees } from '@/types/employee';

let birthdayMonthEmployees = $ref<Employees>([]);

function listCurrentBirthdayMonthEmployees(employees: Employees) {
  birthdayMonthEmployees = filterCurrentMonthBirthdays(employees)
}
</script>

<template>
  <main class="w-[500px] p-4 mx-auto border h-96">
    <FileUpload @upload="listCurrentBirthdayMonthEmployees" />

    <EmployeeBirthdayList :employees="birthdayMonthEmployees" />
  </main>
</template>