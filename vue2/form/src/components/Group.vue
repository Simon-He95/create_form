<template>
  <div>
    <Form style="display: flex; gap: 0.5rem">
      <FormItem>
        <Input v-model="name" @input="change" placeholder="请输入组名" />
      </FormItem>
      <FormItem>
        <Input v-model="key" @input="change" placeholder="请输入组key" />
      </FormItem>
    </Form>
    <vue-drag-tree
      :data="group"
      :allowDrag="allowDrag"
      :allowDrop="allowDrop"
      v-slot="slotProps"
    >
      <span
        :class="[
          slotProps.group
            ? slotProps.isClicked
              ? 'nodeClicked vue-drag-node-icon'
              : 'vue-drag-node-icon'
            : 'temp',
        ]"
      ></span>
      <span class="text"
        >{{ slotProps.label }}
        <span v-if="slotProps.group"
          ><Icon type="md-key" /> {{ slotProps.key }}
        </span></span
      >
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
    type: {
      type: String,
      default: "add",
    },
    currentGroup: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    allowDrop(model) {
      return model.group;
    },
    change() {
      this.group.forEach((item) => {
        if (!item.group) return;
        item.label = this.name;
        item.key = this.key;
      });
    },
    allowDrag(model) {
      return !model.group;
    },
    save() {
      const group = this.group.filter((item) => item.group)[0];
      const filters = group.children.map((item) => item.key);
      return {
        filters,
        group,
      };
    },
    updateGroup(group) {
      return group.map((item) => {
        item.children = item.children.map((child) => {
          const children = child.children;
          return Object.assign(this.findNewData(child.id) || child, {
            children: children.length ? this.updateGroup(children) : [],
          });
        });
        return item;
      });
    },
    findNewData(id) {
      for (const item of this.data) {
        if (item.id === id) return item;
      }
    },
  },
  mounted() {
    let _group;
    if (this.type === "add") {
      _group = this.data.filter((item) => !item.group);
      _group.push({
        label: this.name,
        key: this.key,
        children: [],
        group: true,
        id: nanoid(),
      });
    } else {
      const { filters, label, key } = this.currentGroup;
      this.currentGroup.children = this.currentGroup.group;
      this.name = label;
      this.key = key;
      _group = this.data.filter(
        (item) => !item.group && !filters.includes(item.key)
      );
      _group.push(this.currentGroup);
    }
    this.group = _group;
  },
};
</script>

<style scoped>
.temp {
  width: 18px;
}
</style>
