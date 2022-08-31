<script>
import JsonTable from './components/JsonTable.vue'
import Menu from './components/Menu'
import Header from './components/Header'
import Manage from './components/Manage'
import MenuWrapper from './components/MenuWrapper.vue'
export default {
  name: 'App',
  components: {
    JsonTable,
    Menu,
    Header,
    Manage,
    MenuWrapper,
  },
  data() {
    return {
      data_data: {},
      name: '',
      result: localStorage.getItem('json_form_list')
        ? JSON.parse(localStorage.getItem('json_form_list'))
        : {},
      title: 'Content',
    }
  },
  watch: {
    name() {
      this.data_data = this.result[this.name] || {}
      this.setName(this.name)
    },
  },
  methods: {
    add() {
      this.$refs.formEl.add()
    },
    transform() {
      this.data_data = this.$refs.formEl.getFormData()
    },
    save() {
      this.$set(this.result, this.name, this.$refs.formEl.getFormData())
      localStorage.setItem('json_form_list', JSON.stringify(this.result))
      this.$Message.success('保存成功')
    },
    setName(name) {
      this.name = name
      this.data_data = this.result[name]
      this.$nextTick(() => {
        if (this.$refs.jsonFormEl)
          this.$refs.jsonFormEl.switchForm(this.name)
      })
    },
    drag() {
      this.$refs.formEl.sort()
    },
    changeHandler(data) {
      if (this.data_data) { this.data_data.attribs = data }
      else {
        this.data_data = {
          attribs: data,
        }
      }
    },
    clickMenu(i) {
      this.title = String(i) === '0' ? 'Content' : 'Content-Type Builder'
      this.setName(this.name)
    },

    edit() {
      this.$refs.menuEl.edit(this.name)
    },
  },
}
</script>

<template>
  <div id="json_form">
    <div class="sc-dvQaRk sc-TBWPX dPOXkr hAgEcW">
      <MenuWrapper @clickMenu="clickMenu" />
      <div class="fzVfup" style="width: 100%">
        <Menu ref="menuEl" :title="title" @click-list="setName" />
        <div v-if="title === 'Content-Type Builder' && name" class="right">
          <Header :name="name" @add="add" @save="save" @drag="drag" @edit="edit" />
          <JsonTable ref="formEl" :schema="data_data" :name="name" @change="changeHandler" />
        </div>
        <Manage v-if="title === 'Content' && name" ref="jsonFormEl" :title="name" />
      </div>
    </div>
  </div>
</template>

  <style scoped>
  .hAgEcW {
    align-items: flex-start;
    display: flex;
    flex-direction: row;
  }

  .fzVfup {
    display: grid;
    grid-template-columns: auto 1fr;
    background: rgb(246, 246, 249);
  }

  .right {
    box-sizing: border-box;
    background: rgb(246, 246, 249);
    padding: 24px 56px 40px;
    overflow-y: auto;
  }
  </style>

