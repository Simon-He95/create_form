<script setup>
import { Form } from '@simon_he/create_form'
const data = ref({
  attribs: {},
})
</script>

<template>
  <main font-sans p="x-4 y-10" text="center gray-700 dark:gray-200">
    <!-- <router-view /> -->
    <Form ref="formEl" :data="data" />

    <Footer />
  </main>
</template>
