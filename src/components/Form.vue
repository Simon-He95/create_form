<script setup lang="ts">
import { defineProps, ref, watch } from 'vue'
import JsonEditorVue from 'json-editor-vue'
import { ElButton, ElCard, ElCheckbox, ElColorPicker, ElDialog, ElFormItem, ElInput, ElInputNumber, ElMessage, ElOption, ElSelect, ElTabPane, ElTable, ElTableColumn, ElTabs } from 'element-plus'
const props = defineProps<{ name?: String; data: Record<string, any> }>()
watch(props, restoreData)
const dialogVisible = ref(false)
const cardShow = ref(true)
const type = ref('add')
const current = ref(null)
function add() {
  type.value = 'add'
  dialogVisible.value = true
}
const cardType = ref('')
const input = ref('')
const placeholder = ref('')
const activeName = ref('first')
const tableData = ref<Record<string, any>[]>([])
const defaultvalue = ref('')
const regExp = ref('')
const min = ref(false)
const minvalue = ref(0)
const max = ref(false)
const maxvalue = ref(0)
const required = ref(false)
const textarea = ref('')
const errMsg = ref('')
const description = ref('')
const colorTitle = ref('')
const key = ref(0)
const size = ref('default')
const sizeOptions = ['large', 'default', 'small']
const buttonType = ref<string[]>([])
const limit = ref(1)
const cascaderType = ref(false)
const showType = ['Radio', 'RadioButton', 'Checkbox', 'CheckboxButton']
const mode = ref('text')
const jsonTemp = JSON.stringify({
  options: [],
}, undefined, 2)
const json = ref(jsonTemp)
const nameEl = ref()

interface Icontrollers {
  relevancy: string
  controlType: string
  controlReg: string
}
const controllers = ref<Icontrollers[]>([{ relevancy: '', controlType: '', controlReg: '' }])

function choose(e: any) {
  try {
    cardType.value = e.target.parentNode.attributes.type.nodeValue
    cardShow.value = false
    if (cardType.value === 'Checkbox')
      buttonType.value = ['Checkbox', 'CheckboxButton']
    if (cardType.value === 'Radio')
      buttonType.value = ['Radio', 'RadioButton']
    focusName()
  }
  catch (error) {
  }
}
function confirm() {
  if (current.value !== input.value && getAllname().includes(input.value)) {
    return ElMessage({
      message: '该字段名已存在.',
      type: 'error',
    })
  }
  if (!input.value) {
    return ElMessage({
      message: 'Name 是必输项',
      type: 'error',
    })
  }
  const t = textarea.value.replace(/ /g, '').split('\n').filter(Boolean)
  const r = controllers.value.map(item => ({
    relevancy: item.relevancy,
    controlType: item.relevancy ? item.controlType : null,
    controlReg: item.controlType === 'value' ? null : item.controlReg,
  })).filter(item => item.relevancy)
  const min = minvalue.value === 0 ? null : minvalue.value
  const max = maxvalue.value === 0 ? null : maxvalue.value
  const data = {
    id: input.value,
    json: JSON.parse(json.value),
    placeholder: placeholder.value,
    description: description.value,
    label: input.value,
    type: cardType.value,
    errMsg: errMsg.value,
    default: defaultvalue.value || null,
    min,
    max,
    cascaderType: cascaderType.value,
    required: required.value,
    regExp: regExp.value || null,
    options: t.length ? t : null,
    show: r.length ? r : null,
    key: ++key.value,
    position: `0-${key.value - 1}`,
    colorTitle: colorTitle.value,
    size: size.value,
    limit: limit.value,
  }
  if (type.value === 'add') { tableData.value = [...tableData.value, data] }
  else {
    const idx = tableData.value.findIndex(item => item.label === current.value)
    tableData.value[idx] = Object.assign(data, { position: tableData.value[idx].position })
    current.value = null
  }
  dialogVisible.value = false
  resetData()
}

function cancel() {
  dialogVisible.value = false
  resetData()
}

function transformToJson() {
  const result = {
    name,
    description: 'xxx',
    attribs: {},
  }
  tableData.value.reduce((result, item) => {
    result[item.label] = item
    return result
  }, result.attribs)
  return result
}
function resetData() {
  cardShow.value = true
  cardType.value = ''
  textarea.value = ''
  cascaderType.value = false
  json.value = jsonTemp
  size.value = 'default'
  colorTitle.value = ''
  input.value = ''
  min.value = false
  limit.value = 1
  max.value = false
  required.value = false
  minvalue.value = 0
  maxvalue.value = 0
  defaultvalue.value = ''
  regExp.value = ''
  activeName.value = 'first'
  controllers.value = [{ relevancy: '', controlType: '', controlReg: '' }]
}
function editHandler(row: any) {
  if (row.type === 'Checkbox')
    buttonType.value = ['Checkbox', 'CheckboxButton']
  if (row.type === 'Radio')
    buttonType.value = ['Radio', 'RadioButton']
  controllers.value = row.show || [{ relevancy: '', controlType: '', controlReg: '' }]
  json.value = JSON.stringify(row.json, undefined, 2)
  type.value = 'edit'
  limit.value = row.limit
  current.value = input.value = row.label
  cascaderType.value = row.cascaderType
  if (row.options)
    textarea.value = row.options.join('\n')
  cardShow.value = false
  cardType.value = row.type
  defaultvalue.value = row.default
  regExp.value = row.regExp
  errMsg.value = row.errMsg
  placeholder.value = row.placeholder
  description.value = row.description
  colorTitle.value = row.colorTitle
  size.value = row.size
  if (row.min) {
    min.value = true
    minvalue.value = row.min
  }
  if (row.max) {
    max.value = true
    maxvalue.value = row.max
  }
  required.value = row.required
  activeName.value = 'first'
  dialogVisible.value = true
  focusName()
}
function getAllname() {
  return tableData.value.map(item => item.label)
}
function deleteHandler(row: any) {
  tableData.value = tableData.value.filter(item => item.label !== row.label)
}
const types = ['Text', 'Radio', 'RichText', 'Date', 'Enumeration', 'Password', 'Number', 'Boolean', 'Checkbox', 'Upload', 'Cascader', 'Relation']
function handleClose(done: () => void) {
  resetData()
  done()
}
const controlTypes = ['value', 'regExp']
function selectChange() {
  const map: any = {}
  for (let i = 0; i < controllers.value.length; i++) {
    const item = controllers.value[i]
    if (map[item.relevancy]) {
      ElMessage({
        message: '相同关联字段不能重复.',
        type: 'error',
      })
      return item.relevancy = ''
    }
    map[item.relevancy] = true
  }
}

function restoreData() {
  const attribs = props.data.attribs
  tableData.value = Object.keys(attribs).map(key => attribs?.[key] || {})
}
if (props.data)
  restoreData()

function focusName() {
  nameEl.value.focus()
}

defineExpose({
  transformToJson,
})
</script>

<template>
  <div font-sans p="x-4 y-10" text="center gray-700 dark:gray-200">
    <div class="wrapper">
      <ElButton @click="add">
        add
      </ElButton>
    </div>

    <ElDialog v-model="dialogVisible" title="Type" width="50%" :before-close="handleClose">
      <div v-show="cardShow" flex="~ gap-2" w-full flex-wrap @click="choose">
        <ElCard v-for="i in types" :key="i" shadow="hover" class="w-49%" :type="i">
          {{ i }}
        </ElCard>
      </div>

      <div v-show="cardType" relative>
        <h2 absolute left-0 top-0 h-10 lh-10 text-5 font-600 text-black>
          {{ type === 'add' ? 'Add new' : 'Edit' }} {{ cardType }} field
        </h2>
        <ElTabs v-model="activeName" class="demo-tabs">
          <ElTabPane label="Basic settings" name="first">
            <div v-show="cardType">
              <div flex="~ gap-5 wrap">
                <ElFormItem label="Name:" class="w-30%">
                  <ElInput ref="nameEl" v-model="input" placeholder="Please input Name" />
                </ElFormItem>
                <ElFormItem label="Placeholder:" class="w-30%">
                  <ElInput v-model="placeholder" placeholder="Please input Placeholder" />
                </ElFormItem>
                <ElFormItem label="Description:" class="w-30%">
                  <ElInput v-model="description" placeholder="Please input Description" />
                </ElFormItem>
                <ElFormItem label="TitleColor:" class="w-30%">
                  <ElColorPicker v-model="colorTitle" />
                </ElFormItem>
                <ElFormItem label="Size:" class="w-30%">
                  <ElSelect v-model="size" placeholder="Pick Size">
                    <ElOption v-for="item in sizeOptions" :key="item" :label="item" :value="item" />
                  </ElSelect>
                </ElFormItem>
                <ElFormItem v-show="showType.includes(cardType)" label="Type:" class="w-30%">
                  <ElSelect v-model="cardType" placeholder="Pick Size">
                    <ElOption v-for="item in buttonType" :key="item" :label="item" :value="item" />
                  </ElSelect>
                </ElFormItem>
                <ElCheckbox v-show="cardType === 'Cascader'" v-model="cascaderType" label="Multiple" class="w-30%" />
                <ElFormItem v-show="cardType === 'Upload'" label="Limit:" class="w-30%">
                  <ElInputNumber v-model="limit" :min="1" :max="10" controls-position="right" />
                </ElFormItem>
              </div>
              <JsonEditorVue v-show="cardType === 'Cascader'" v-model="json" class="editor_vue" :mode="mode" />

              <ElInput
                v-show="cardType === 'Enumeration' || showType.includes(cardType)" v-model="textarea" :rows="5"
                type="textarea" placeholder="Ex:
morning
noon
evening"
              />
            </div>
          </ElTabPane>
          <ElTabPane label="Advanced settings" name="second">
            <div flex="~ gap-2">
              <ElFormItem label="Default value" flex-col items-start class="w-50%">
                <ElInput v-model="defaultvalue" />
              </ElFormItem>
              <ElFormItem label="RegExp pattern" flex-col items-start class="w-50%">
                <ElInput v-model="regExp" />
              </ElFormItem>
              <ElFormItem v-show="regExp" label="Error message" flex-col items-start class="w-50%">
                <ElInput v-model="errMsg" />
              </ElFormItem>
            </div>
            <div flex="~" flex-col items-start>
              <h3 text-black text-6>
                Settings
              </h3>
              <div flex="~ gap-2" w-full flex-wrap>
                <ElCheckbox v-model="required" label="Required field" size="large" class="w-45%" />
                <div class="w-45%" text-left flex flex-col>
                  <ElCheckbox v-model="min" label="Minimum value" size="large" />
                  <ElInputNumber
                    v-show="min" v-model="minvalue" :min="0" :max="10" size="small"
                    controls-position="right"
                  />
                </div>
                <div class="w-45%" text-left flex flex-col>
                  <ElCheckbox v-model="max" label="Maximum value" size="large" />
                  <ElInputNumber
                    v-show="max" v-model="maxvalue" :min="0" :max="10" size="small"
                    controls-position="right"
                  />
                </div>
              </div>
            </div>
            <div flex="~" flex-col items-start>
              <h3 text-black text-6>
                relevancy
              </h3>
              <div v-for="(item, idx) in controllers" :key="idx" flex="~ gap-2" w-full flex-wrap relative>
                <div v-show="idx > 0" absolute right-0 top-2 @click="controllers.splice(idx, 1)">
                  <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-029747aa="" w-4>
                    <path
                      fill="currentColor"
                      d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z"
                    />
                  </svg>
                </div>
                <div flex="~ gap-2" w-full>
                  <ElFormItem label="Controller" flex-col items-start class="w-45%">
                    <ElSelect v-model="item.relevancy" placeholder="Select" clearable @change="selectChange">
                      <ElOption
                        v-for="i in tableData.filter(item => item.label !== input)" :key="i.name"
                        :label="i.label" :value="i.label"
                      />
                    </ElSelect>
                  </ElFormItem>
                  <ElFormItem v-show="item.relevancy" label="Control show" flex-col items-start class="w-45%">
                    <ElSelect v-model="item.controlType" placeholder="Select">
                      <ElOption v-for="i in controlTypes" :key="i" :label="i" :value="i" />
                    </ElSelect>
                  </ElFormItem>
                  <ElFormItem
                    v-show="item.controlType === 'regExp'" label="regExp" flex-col items-start
                    class="w-45%"
                  >
                    <ElInput v-model="item.controlReg" input-style="h-full" />
                  </ElFormItem>
                </div>
              </div>
              <ElButton @click="controllers.push({ relevancy: '', controlType: '', controlReg: '' })">
                add controller
              </ElButton>
            </div>
          </ElTabPane>
        </ElTabs>
      </div>

      <template #footer>
        <span class="dialog-footer">
          <ElButton @click="cancel">Cancel
          </ElButton>
          <ElButton @click="confirm">Confirm</ElButton>
        </span>
      </template>
    </ElDialog>
    <ElTable :data="tableData" w-200 ma>
      <ElTableColumn prop="label" label="Name" />
      <ElTableColumn prop="type" label="Type" />
      <ElTableColumn fixed="right" width="120">
        <template #default="scope">
          <ElButton link type="primary" size="small" @click="deleteHandler(scope.row)">
            Delete
          </ElButton>
          <ElButton link type="primary" size="small" @click="editHandler(scope.row)">
            Edit
          </ElButton>
        </template>
      </ElTableColumn>
    </ElTable>
  </div>
</template>

<style>
.demo-tabs .el-tabs__nav {
  float: right !important;
}

.demo-tabs .el-form-item__content {
  width: 100%;
  align-items: flex-start;
}

.el-form-item__content .el-select {
  width: 100%;
}

.editor_vue .cm-line {
  text-align: left;
}

.el-form-item__content .el-cascader {
  width: 100%;
}
</style>
