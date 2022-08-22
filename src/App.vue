<script lang="ts" setup>
import { ref } from 'vue'
import Form from './components/Form.vue'
import Drag from './components/Drag.vue'
const data = ref<Record<string, any>>({
  attribs: {},
})
const formEl = ref<{ transformToJson: () => Record<string, any> }>()
function transform() {
  data.value = formEl.value!.transformToJson()
}
</script>

<template>
  <Form ref="formEl" :data="data" />

  <div m-5 align-center>
    <el-button @click="transform">
      transform json to form
    </el-button>
  </div>
  <Drag :data="data" />
</template>
