<script setup lang="ts">
import { onMounted } from "vue";
import { parseFileContent } from "@/utilities/file";

import type { Employees } from "@/types/employee";

const emit = defineEmits<{ (e: 'upload', employees: Employees): void }>();

const fileReader = new FileReader();
const acceptedFileTypes = "text/csv";

onMounted(() => {
  fileReader.onload = (e: any) => {
    // on successful read of the file (triggered with `fileReader.readAsText()`),
    // file content text will exist in `e.target.result`
    const fileContent = e.target.result;

    const employees = parseFileContent(fileContent);

    emit('upload', employees);
  };
});

function onFileUpload(e: any) {
  // input set to only allow single file uploads,
  // so file will exist in the 0th index of `e.target.files`
  const file = e.target.files[0];

  fileReader.readAsText(file);
}
</script>

<template>
  <label class="inline-block border rounded-sm px-4 py-1" for="upload">
    <span>Upload File</span>
    <input type="file" id="upload" class="hidden" :accept="acceptedFileTypes" @change="onFileUpload" />
  </label>

</template>