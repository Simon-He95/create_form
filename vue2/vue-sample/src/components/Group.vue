<template>
  <div>
    <vue-drag-tree :data="data" @drop="dropHandler" v-slot="slotProps">
      <span
        :class="[
          slotProps.isClicked
            ? 'nodeClicked vue-drag-node-icon'
            : 'vue-drag-node-icon',
        ]"
      ></span>
      <span class="text">{{ slotProps.nodeName }}</span>
    </vue-drag-tree>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    dropHandler() {
      console.log(this.data);
    },
  },
};
</script>
