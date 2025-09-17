<script setup lang="ts">
import UploadModal from '@/components/UploadModal.vue';
import { ref } from 'vue';

  const isUploadOpen = ref<boolean>(false);
  const uploadFiles = ref<File[]>([]);

function onError(message: string){
  alert(message);
}

function onAdded(files: File[]){
  if (!files.length){
    alert('فایلی انتخاب نشد');
    return;
  }
  const names = files.map(f => f.name).join('، ');
  alert(`آپلود با موفقیت انجام شد:\n${names}`);
}

</script>

<template>
  <div class="container">
    <div style="display:flex; gap:8px; margin-bottom:12px; justify-content:center">
      <button class="btn" @click="isUploadOpen = true">آپلود</button>
    </div>

    <UploadModal
      v-model="isUploadOpen"
      v-model:files="uploadFiles"
      acceptExtensions="jpg,jpeg,png,webp,mp4"
      :maxSizeMB="10"
      @error="onError"
      @added="onAdded"
    />
  </div>
</template>

<style scoped>
h2{ margin: 0 0 12px 0 }
</style>


