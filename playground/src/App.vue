<script setup>
import { Drag, Form } from '@simon_he/create_form'
const data = ref({
  attribs: {},
})
const formEl = ref(null)
function save() {
  data.value = formEl.value.transformToJson()
}
</script>

<template>
  <main font-sans p="x-4 y-10" text="center gray-700 dark:gray-200">
    <!-- <router-view /> -->
    <Form ref="formEl" :data="data" />
    <div>
      <button @click="save">
        save
      </button>
    </div>
    <Drag :data="data" />
    <Footer />
  </main>
</template>
