<script setup lang="ts">
import { onMounted } from "vue";

const fileReader = new FileReader();
const acceptedFileTypes = "text/csv";

onMounted(() => {
  fileReader.onload = (e: any) => {
    // on successful read of the file (triggered with `fileReader.readAsText()`),
    // file content text will exist in `e.target.result`
    const fileText = e.target.result;

    // NOTE: need to decide whether to parse text here (i.e., convert text to array of objects)
    // OR do it in parent component (via emitting `fileText`). Maybe make a `FileService`?
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
  <label for="upload">Upload .csv</label>
  <input
    type="file"
    id="upload"
    :accept="acceptedFileTypes"
    @change="onFileUpload"
  />
</template>

<style>
/* TODO: Remove when styling with Tailwind CSS */
input {
  display: none;
}
</style>
