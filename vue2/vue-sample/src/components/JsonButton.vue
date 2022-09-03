<template>
  <Form class="main">
    <FormItem label="内容:" class="w30">
      <Input ref="content" v-model="input" placeholder="Please input Content" />
    </FormItem>
    <FormItem label="选择关联的组:" class="w30">
      <Select v-model="groupValue" placeholder="Pick group">
        <Option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </Select>
    </FormItem>
  </Form>
</template>
<script>
export default {
  name: "JsonButton",
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    content: {
      type: String,
      default: "",
    },
    group: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      input: "",
      groupValue: "",
    };
  },
  methods: {
    save() {
      return {
        content: this.input,
        group: this.groupValue,
      };
    },
  },
  mounted() {
    this.input = this.content;
    this.groupValue = this.group;
  },
};
</script>
