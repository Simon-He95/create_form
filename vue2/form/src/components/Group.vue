<template>
  <div>
    <Form style="display: flex; gap: 0.5rem">
      <FormItem>
        <Input v-model="name" placeholder="请输入组名" />
      </FormItem>
      <FormItem>
        <Input v-model="key" placeholder="请输入组key" />
      </FormItem>
      <Button @click="add">新增组</Button>
    </Form>
    <vue-drag-tree :data="group" @drop="dropHandler" v-slot="slotProps">
      <span
        :class="[
          slotProps.isClicked
            ? 'nodeClicked vue-drag-node-icon'
            : 'vue-drag-node-icon',
        ]"
      ></span>
      <span class="text">{{ slotProps.label }} </span>
      <span></span>
    </vue-drag-tree>
  </div>
</template>
<script>
import VueDragTree from "../drag/VueDragTree.vue";
import { nanoid } from "nanoid";
export default {
  components: {
    VueDragTree,
  },
  data() {
    return {
      group: [],
      name: "",
      key: "",
    };
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    dropHandler() {
      console.log(this.group);
    },
    add() {
      if (!this.name || !this.key) {
        return this.$Message.error("请输入组名和组key");
      }
      this.group.push({
        label: this.name,
        key: this.key,
        children: [],
        group: true,
        removeFlag: true,
        id: nanoid(),
      });
      this.name = "";
      this.key = "";
    },
    save() {
      const filters = [];
      const group = [];
      this.group.forEach(
        (item) =>
          item.group &&
          group.push(item) &&
          item.children.forEach((child) => filters.push(child.label))
      );
      return {
        filters,
        group,
      };
    },
    updateGroup(group){
      return group.map(item=>{
        item.children = item.children.map(child=>{
          const children = child.children
          return Object.assign(this.findNewData(child.id)||child, {
            children:children.length
            ? this.updateGroup(children)
            : []
          })
        })
        return item
      })
    },
    findNewData(id){
      for(const item of this.data){
        if(item.id === id)
          return item
      }
    }
  },
  mounted() {
    const { filters = [], group = [] } =
      this.data
        .filter((item) => item.group)
        .map((item) => ({
          group: this.updateGroup(item.group),
          filters: item.filters,
        }))[0] || {};
    this.group = this.data
      .filter((item) => !item.group && !filters.includes(item.label) && item.type !=='Button',)
      .map((item) => {
        item = JSON.parse(JSON.stringify(item));
        item.children = item.children || [];
        return item;
      });
    group.forEach((item) => this.group.push(item));
  },
};
</script>
