<script setup lang="ts">
import dayjs from "dayjs";
import { nextTick } from "vue";
import { compileCSVData } from "../utilities/file";

import type { Employees } from "@/types/employee";

const props = defineProps<{
  data: any | Employees;
  large?: boolean;
}>();

const anchor: HTMLAnchorElement = $ref();
let url: any = $ref("");
const suggestedFileName = `${dayjs().format("MMMM")}_employee_birthdays`;

async function downloadCSV() {
  const csvData = compileCSVData(props.data);

  // blob containing CSV data
  const blob = new Blob([csvData], { type: "text/csv" });

  // url responsible for downloading CSV file
  url = window.URL.createObjectURL(blob);

  // fix for `url` not updating in time for anchor
  // before anchor click. leads to downloading an
  // empty file
  await nextTick();

  // trigger anchor click to download CSV
  anchor.click();
}
</script>

<template>
  <PrimaryButton :large="large" @click="downloadCSV" v-bind="$attrs"
    >Export as CSV</PrimaryButton
  >
  <a class="hidden" ref="anchor" :href="url" :download="suggestedFileName"></a>
</template>
