<script setup lang="ts">
import dayjs from "dayjs";
import { toRaw, nextTick } from "vue";

import type { Employees } from "@/types/employee";

const props = defineProps<{
  data: any | Employees;
  large?: boolean;
}>();

const anchor: HTMLAnchorElement = $ref();
let url: any = $ref("");
const suggestedFileName = `${dayjs().format("MMMM")}_employee_birthdays`;

async function downloadCSV() {
  const csvData = compileCSVData();

  const blob = new Blob([csvData], { type: "text/csv" });

  url = window.URL.createObjectURL(blob);

  // fix for `url` not updating in time for anchor
  // before anchor click. leads to downloading an
  // empty file
  await nextTick();

  anchor.click();
}

function compileCSVData() {
  // unwrap `props.data` proxy into raw object form
  // to conveniently iterate through
  const data: Employees = toRaw(props.data);

  const csvRows = [];

  // add headers to CSV
  const headers = Object.keys(data[0]).join(",");
  csvRows.push(headers);

  // add employee data to CSV
  for (const row of data) {
    const values = Object.values({
      ...row,
      birthday: dayjs(row.birthday).format('["]MMMM DD, YYYY["]'),
    });

    csvRows.push(values.join(","));
  }

  return csvRows.join("\n");
}
</script>

<template>
  <PrimaryButton :large="large" @click="downloadCSV" v-bind="$attrs"
    >Export as CSV</PrimaryButton
  >
  <a class="hidden" ref="anchor" :href="url" :download="suggestedFileName"></a>
</template>
