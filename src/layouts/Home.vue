<script setup lang="ts">
import { filterCurrentMonthBirthdays } from "@/utilities/birthday";

import type { Employees } from "@/types/employee";

let birthdayMonthEmployees = $ref<Employees>([]);
let uploaded = $ref(false);

function listCurrentBirthdayMonthEmployees(employees: Employees) {
  uploaded = true;
  birthdayMonthEmployees = filterCurrentMonthBirthdays(employees);
}

function onNewList() {
  uploaded = false;
  birthdayMonthEmployees = [];
}
</script>

<template>
  <div
    class="w-[800px] h-[550px] max-h-full flex justify-center items-center bg-white rounded-md border border-neutral-300 drop-shadow"
  >
    <FileUpload v-if="!uploaded" @upload="listCurrentBirthdayMonthEmployees" />

    <div
      v-if="uploaded"
      class="w-full h-full max-h-full flex justify-center items-start"
    >
      <!-- Button controls -->
      <div class="w-1/2 h-full flex flex-col justify-start items-center">
        <OutlineButton
          large
          class="mt-10"
          @click="onNewList"
          data-test-gen-new-list-button
          >Generate a new list</OutlineButton
        >

        <!-- Horizontal separator -->
        <div class="w-[90%] my-[27px] border-t border-neutral-200"></div>

        <ExportAsCSVButton
          class="mb-10"
          large
          :data="birthdayMonthEmployees"
          data-test-export-csv-button
           />
      </div>

      <!-- Vertical separator -->
      <div class="h-full border-l border-neutral-300"></div>

      <EmployeeDataTable :employees="birthdayMonthEmployees" />
    </div>
  </div>
</template>
