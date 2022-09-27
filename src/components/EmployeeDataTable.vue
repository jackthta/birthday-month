<script setup lang="ts">
import { watchEffect, ref } from "vue";
import { useScroll } from "@vueuse/core";
import type { Employees } from "@/types/employee";

defineProps<{
  employees: Employees;
}>();

/**
 * `table` needs to use regular `ref` instead of reactivity
 * transform macro `$ref`, because `useScroll` isn't compatible
 * with it (yet? 🤞🏼).
 */
const table = ref<HTMLElement | null>(null);
let tableOverflowed = $ref<boolean | null>(false);

const { y } = useScroll(table);

/**
 * Track if table element overflows to determine whether to
 * add a grey border bottom, which would otherwise be blank:
 *
 * `divide-y` only adds a separator in-between elements and
 * not the edges.
 * Source: https://tailwindcss.com/docs/divide-width
 */
watchEffect(() => {
  tableOverflowed =
    table.value && table.value.scrollHeight > table.value.clientHeight;
});
</script>

<template>
  <div class="w-full max-w-full min-h-0 max-h-full overflow-y-auto" ref="table">
    <table
      class="w-full rounded-md divide-y divide-neutral-300"
      :class="{
        'border-b border-b-neutral-300': !tableOverflowed,
        'border-b-0': tableOverflowed,
      }"
      data-test-employee-list
    >
      <!-- Table headers -->
      <!-- ... has shadow that shows once you start scrolling -->
      <tr
        class="sticky top-0 text-sm text-left tracking-wide uppercase bg-gray-100 transition-shadow-md duration-150 ease-in-out"
        :class="{ 'shadow-md': y > 0, 'shadow-none': y === 0 }"
      >
        <th class="font-medium px-6 py-3">Name</th>
        <th class="font-medium px-6 py-3">Birthday</th>
      </tr>

      <!-- Table data -->
      <EmployeeDataTableRow
        v-for="(employee, index) of employees"
        :employee="employee"
        :key="index"
      />
    </table>
  </div>
</template>
