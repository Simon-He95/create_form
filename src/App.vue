<script lang="ts" setup>
import { ref } from 'vue'
import Form from './components/Form.vue'
// import { Form } from '@json-manage/form'

const data = ref<Record<string, any>>({
  attribs: {},
})
const formEl = ref<{ getFormData: () => Record<string, any>; add: () => void; sort: () => void }>()
const current = ref('')
function transform() {
  data.value = formEl.value!.getFormData()
}
function switchForm(i) {
  current.value = i
}
function add() {
  formEl.value.add()
}
</script>

<template>
  <button @click="add">
    add
  </button>
  <Form ref="formEl" :data="data" />
  <div m-5 align-center>
    <Button @click="transform">
      transform json to form
    </Button>
  </div>
</template>

<style scoped>
</style>
