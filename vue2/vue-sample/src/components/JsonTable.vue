<script>
// import vueJsonEditor from 'vue-json-editor';
import { nanoid } from "nanoid";
import Footer from "./Footer.vue";
import JsonTabs from "./JsonTabs.vue";
import Drag from "./Drag.vue";
import Group from "./Group.vue";
import JsonButton from "./JsonButton.vue";
export default {
  name: "JsonTable",
  components: {
    Footer,
    JsonTabs,
    Drag,
    Group,
    JsonButton,
    // VueJsonEditor: vueJsonEditor,
  },
  props: {
    name: {
      type: String,
      default: "",
    },
    schema: {
      type: Object,
      default: () => {
        return {
          name: "",
          description: "",
          attribs: {},
        };
      },
    },
  },
  data() {
    return {
      tableColumns: [
        {
          title: "标签名",
          key: "label",
          resizable: true,
        },
        {
          title: "类型",
          key: "type",
          resizable: true,
        },
        {
          title: "操作",
          width: 180,
          key: "action",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  on: {
                    click: () => this.deleteHandler(params.row),
                  },
                },
                "Delete"
              ),
              h(
                "Button",
                {
                  style: "margin-left:10px;",
                  on: {
                    click: () => this.editHandler(params.row),
                  },
                },
                "Edit"
              ),
            ]);
          },
        },
      ],
      labelShow: true,
      dragShow: false,
      dialogVisible: false,
      tableData: [],
      current: "",
      cardType: "",
      cardShow: true,
      type: "add",
      input: "",
      placeholder: "",
      description: "",
      colorTitle: "",
      size: "default",
      activeName: "first",
      defaultvalue: "",
      datetype: "",
      format: "",
      required: false,
      minvalue: 0,
      maxvalue: 0,
      len: {
        min: undefined,
        max: undefined,
      },
      min: false,
      max: false,
      group: "",
      groupKey: "",
      multiple: false,
      controllers: [{ relevancy: "", controlType: "", controlReg: "" }],
      buttonType: ["Radio", "RadioButton"],
      key: 0,
      sizeOptions: ["default", "small", "large"],
      formatOptions: [
        {
          label: "年份（四位）",
          value: "yyyy",
        },
        {
          label: "年份（两位）",
          value: "yy",
        },
        {
          label: "月份（两位）",
          value: "MM",
        },
        {
          label: "月份（一位）",
          value: "M",
        },
        {
          label: "月份（英文）",
          value: "MMMM",
        },
        {
          label: "月份（英文简写）",
          value: "MMM",
        },
        {
          label: "日期（两位）",
          value: "dd",
        },
        {
          label: "日期（一位）",
          value: "d",
        },
        {
          label: "日期（简写）",
          value: "Do",
        },
        {
          label: "星期（两位）",
          value: "DD",
        },
        {
          label: "星期（一位）",
          value: "D",
        },
        {
          label: "星期（英文）",
          value: "dddd",
        },
        {
          label: "星期（英文简写）",
          value: "ddd",
        },
        {
          label: "小时（24小时制两位）",
          value: "HH",
        },
        {
          label: "小时（24小时制一位）",
          value: "H",
        },
        {
          label: "小时（12小时制两位）",
          value: "hh",
        },
        {
          label: "小时（12小时制一位）",
          value: "h",
        },
        {
          label: "分钟（两位）",
          value: "mm",
        },
        {
          label: "分钟（一位）",
          value: "m",
        },
        {
          label: "秒钟（两位）",
          value: "ss",
        },
        {
          label: "秒钟（一位）",
          value: "s",
        },
        {
          label: "毫秒（三位）",
          value: "SSS",
        },
        {
          label: "毫秒（两位）",
          value: "SS",
        },
        {
          label: "毫秒（一位）",
          value: "S",
        },
        {
          label: "上午与下午（大写）",
          value: "A",
        },
        {
          label: "上午与下午（小写）",
          value: "a",
        },
        {
          label: "时区",
          value: "ZZ",
        },
      ],
      dateOptions: [
        {
          label: "时间",
          value: "time",
        },
        {
          label: "时间区间",
          value: "timezone",
        },
        {
          label: "日期",
          value: "date",
        },
        {
          label: "日期区间",
          value: "datezone",
        },
        {
          label: "日期时间",
          value: "datetime",
        },
        {
          label: "日期时间区间",
          value: "datetimezone",
        },
      ],
      mode: "code",
      json: "",
      types: [
        {
          name: "文本",
          description: "文本框",
          value: "Text",
        },
        {
          name: "单选",
          description: "单选框",
          value: "Radio",
        },
        {
          name: "富文本",
          description: "富文本",
          value: "RichText",
        },
        {
          name: "日期",
          description: "日期",
          value: "Date",
        },
        {
          name: "下拉选",
          description: "枚举",
          value: "Enumeration",
        },
        {
          name: "密码",
          description: "密码",
          value: "Password",
        },
        {
          name: "数字",
          description: "数字",
          value: "Number",
        },
        {
          name: "开关",
          description: "布尔",
          value: "Boolean",
        },
        {
          name: "多选框",
          description: "多选框",
          value: "Checkbox",
        },
        {
          name: "上传",
          description: "上传",
          value: "Upload",
        },
        {
          name: "级联选择",
          description: "级联选择",
          value: "Cascader",
        },
        {
          name: "按钮",
          description: "按钮",
          value: "Button",
        },
        {
          name: "组",
          description: "组合",
          value: "Group",
        },
      ],
      rules: [],
      controlTypes: ["value", "regExp"],
      showType: ["Radio", "RadioButton", "Checkbox", "CheckboxButton"],
      join: false,
      mapKey: "",
      options: [],
      option_label: "",
      option_value: "",
      groupOptions: [],
      buttonContent: "",
      groupValue: "",
      id:"",
    };
  },
  watch: {
    schema: {
      handler() {
        this.restoreData();
      },
      deep: true,
    },
  },
  mounted() {
    this.restoreData();
  },
  methods: {
    editHandler(row) {
      this.type = "edit";
      this.id = row.id
      if (row.type === "Group" || row.type === "Button") {
        this.cardShow = false;
        this.cardType = row.type;
        if (row.button) {
          this.groupValue = row.button.value;
          this.buttonContent = row.button.content;
          this.getGroupOptions();
        }
        return (this.dialogVisible = true);
      }
      if (row.type === "Checkbox")
        this.buttonType = ["Checkbox", "CheckboxButton"];
      else if (row.type === "Radio") this.buttonType = ["Radio", "RadioButton"];
      else if (row.type === "Date") {
        this.datetype = row.date.type;
        this.format = row.date.format;
      }
      this.controllers = row.show || [
        { relevancy: "", controlType: "", controlReg: "" },
      ];
      this.multiple = row.multiple;
      this.current = this.input = row.label;
      this.mapKey = row.mapKey;
      this.group = row.group;
      this.groupKey = row.groupKey;
      if (row.rules) {
        this.rules = row.rules.map((item) => ({
          regExp: item.regExp,
          errMsg: item.errMsg,
        }));
      }
      this.options = row.options;
      this.cardShow = false;
      this.cardType = row.type;
      this.labelShow = row.labelShow;
      this.join = !!row.join;
      this.defaultvalue = row.default;
      this.placeholder = row.placeholder;
      this.description = row.description;
      this.colorTitle = row.colorTitle;
      if (row.len) {
        this.len.min = row.len.min;
        if (this.len.min) this.min = true;
        this.len.max = row.len.max;
        if (this.len.max) this.max = true;
      } else
        this.len = {
          min: undefined,
          max: undefined,
        };
      this.size = row.size;
      this.required = row.required;
      this.activeName = "first";
      this.dialogVisible = true;
      this.focusName();
    },
    deleteHandler(row) {
      this.tableData = this.tableData.filter(
        (item) => item.label !== row.label
      );
    },
    sortEnd() {
      this.$emit("change", this.$refs.dragEl.save());
      this.dragShow = false;
    },
    getAllname() {
      return this.tableData.map((item) => item.label);
    },
    confirm() {
      if (this.cardType === "Button") return this.buttonConfirm();
      if (this.cardType === "Group") return this.groupConfirm();
      if (
        this.current !== this.input &&
        this.getAllname().includes(this.input)
      ) {
        return this.$Message.error("该字段名已存在.");
      }
      if (!this.input) {
        return this.$Message.error("Name 是必输项");
      }
      const r = this.controllers
        .map((item) => ({
          relevancy: item.relevancy,
          controlType: item.relevancy ? item.controlType : null,
          controlReg: item.controlType === "value" ? null : item.controlReg,
        }))
        .filter((item) => item.relevancy);

      const data = {
        id: this.id || nanoid(),
        placeholder: this.placeholder,
        description: this.description,
        label: this.input,
        type: this.cardType,
        rules: this.rules,
        default: this.defaultvalue || null,
        required: this.required,
        position: `0-${this.key - 1}`,
        colorTitle: this.colorTitle,
        size: this.size,
        labelShow: this.labelShow,
        mapKey: this.mapKey || this.input,
        options: this.options,
        len: this.len,
        multiple: this.multiple,
        join: this.join,
      };
      if (this.cardType === "Date") {
        data.date = {
          type: this.datetype,
          format: this.format,
        };
      }
      if (r.length) data["show"] = r;
      if (this.group) data["group"] = this.group;
      if (this.groupKey) data["groupKey"] = this.groupKey;

      this.key++;
      if (this.type === "add") {
        this.tableData = [...this.tableData, data];
      } else {
        const idx = this.tableData.findIndex(
          (item) => item.label === this.current
        );
        this.$set(
          this.tableData,
          idx,
          Object.assign(data, { position: this.tableData[idx].position })
        );
        this.current = null;
      }
      this.dialogVisible = false;
    },
    transformToJson() {
      const result = {
        name,
        description: "",
        attribs: {},
        id: nanoid(),
      };
      this.tableData.reduce((result, item) => {
        if (item.type === "Button") {
          result.button = result.button || {};
          result.button[item.button.value] = item.button.content;
        } else result[item.label] = item;
        return result;
      }, result.attribs);
      return result;
    },
    cancel() {
      this.dialogVisible = false;
    },
    selectChange() {
      const map = {};
      for (let i = 0; i < this.controllers.length; i++) {
        const item = this.controllers[i];
        if (map[item.relevancy]) {
          this.$Message.error("相同关联字段不能重复.");
          return (item.relevancy = "");
        }
        map[item.relevancy] = true;
      }
    },
    choose(type) {
      this.cardType = type;
      this.cardShow = false;
      if (this.cardType === "Checkbox")
        this.buttonType = ["Checkbox", "CheckboxButton"];
      if (this.cardType === "Radio") this.buttonType = ["Radio", "RadioButton"];
      if (this.cardType === "Button") this.getGroupOptions();
      this.focusName();
    },
    focusName() {
      if (this.cardType === "Group" || this.cardType === "Button") return;
      this.$nextTick(() => {
        this.$refs.nameEl.focus();
      });
    },
    handleClose() {
      this.resetData();
    },
    add() {
      this.resetData();
      this.dialogVisible = true;
    },
    resetData() {
      this.cardShow = true;
      this.mapKey = "";
      this.id = ''
      this.cardType = "";
      this.description = "";
      this.groupKey = "";
      this.placeholder = "";
      this.group = "";
      this.labelShow = true;
      this.join = false;
      this.rules = [];
      this.options = [];
      this.format = "";
      this.datetype = "";
      this.input = "";
      this.colorTitle = "";
      this.size = "default";
      this.defaultvalue = "";
      this.min = false;
      this.max = false;
      this.required = false;
      this.controllers = [{ relevancy: "", controlType: "", controlReg: "" }];
      this.activeName = "first";
      this.type = "add";
      this.multiple = false;
      this.datetype = "";
      this.key = this.key + 1;
      this.option_label = "";
      this.option_value = "";
      this.len = {
        min: undefined,
        max: undefined,
      };
    },
    sort() {
      this.dragShow = true;
      this.$nextTick(() => this.$refs.dragEl.update());
    },
    getFormData() {
      return this.transformToJson();
    },
    restoreData() {
      const attribs = JSON.parse(JSON.stringify(this.schema.attribs));
      this.tableData = Object.keys(attribs).map((key) => {
        if (key === "button") {
          const value = Object.keys(attribs[key])[0];
          const content = attribs[key][value];
          return {
            label: "button",
            type: "Button",
            button: {
              content,
              value,
            },
          };
        }
        return attribs[key] || {};
      });
    },
    deleteReg(i) {
      this.rules.splice(i, 1);
    },
    addTag() {
      if (!this.option_label || !this.option_value)
        return this.$Message.error("新增项的数据不能为空");
      this.options.push({
        label: this.option_label,
        value: this.option_value,
      });
      this.option_label = "";
      this.option_value = "";
    },
    closeTag(i) {
      this.options.splice(i, 1);
    },
    groupConfirm() {
      const { filters, group } = this.$refs.GroupEl.save();
      const data = {
        type: "Group",
        label: "group",
        filters,
        group,
      };
      if (this.type === "add") {
        if (this.hasGroup()) return this.$Message.error("只能添加一个分组");
        this.tableData = [...this.tableData, data];
      } else {
        const idx = this.tableData.findIndex((item) => item.type === "Group");
        this.$set(this.tableData, idx, data);
        this.current = null;
      }
      this.dialogVisible = false;
    },
    getGroupOptions() {
      this.groupOptions = this.tableData
        .map((item) => item.type === "Group" && (item.group[0] || []))
        .filter(Boolean)
        .map((item) => ({ label: item.label, value: item.key }));
    },
    hasGroup() {
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].type === "Group") return true;
      }
      return false;
    },
    buttonConfirm() {
      const { content, group } = this.$refs.JsonButtonEl.save();
      if (!group || !content)
        return this.$Message.error("按钮需要指定一个分组和内容");
      const data = {
        type: "Button",
        label: "button",
        button: {
          value: group,
          content,
        },
      };
      if (this.type === "add") {
        this.tableData = [...this.tableData, data];
      } else {
        const idx = this.tableData.findIndex(
          (item) => item.label === this.current
        );
        this.$set(
          this.tableData,
          idx,
          Object.assign(data, { position: this.tableData[idx].position })
        );
        this.current = null;
      }
      this.groupValue = "";
      this.buttonContent = "";
      this.dialogVisible = false;
    },
  },
  computed: {
    multipleShow() {
      const multipleType = ["Cascader", "Enumeration"];
      return multipleType.includes(this.cardType);
    },
    jsonShow() {
      return [
        "Radio",
        "RadioButton",
        "Checkbox",
        "CheckboxButton",
        "Cascader",
        "Enumeration",
      ].includes(this.cardType);
    },
    joinShow(){
      return ["Checkbox", "CheckboxButton", "Cascader", "Enumeration"].includes(this.cardType)
    }
  },
};
</script>

<template>
  <div
    id="form_wrapper"
    font-sans
    p="x-4 y-10"
    text="center gray-700 dark:gray-200"
  >
    <Modal
      v-model="dialogVisible"
      :title="name"
      width="50%"
      :modal="false"
      :before-close="handleClose"
    >
      <div v-show="cardShow" style="margin-bottom: 24px">
        <div class="sc-dvQaRk sc-TBWPX exyKSe fkEccH">
          <h2 class="sc-bvFjSx inqAba">请选择一个模板类型</h2>
        </div>
        <hr class="sc-ljMRFG sc-jwQYvw fYRdMc goLodl" />
      </div>
      <JsonTabs v-show="cardShow" :types="types" @choose="choose" />
      <json-button
        v-if="cardType === 'Button'"
        :options="groupOptions"
        :group="groupValue"
        :content="buttonContent"
        ref="JsonButtonEl"
      />
      <Group v-else-if="cardType === 'Group'" :data="tableData" ref="GroupEl" />

      <template v-else>
        <div v-if="cardType" class="relative">
          <div
            class="absolute left-0 top-0 h-10 lh-10 text-5 font-600 text-black"
          >
            {{ type === "add" ? "新增" : "编辑" }}{{ cardType }}项
          </div>

          <Form>
            <Tabs v-model="activeName" class="demo-tabs">
              <TabPane label="基础设置" name="first">
                <div class="wrapper">
                  <FormItem label="标签名:" class="w30">
                    <Input
                      ref="nameEl"
                      v-model="input"
                      placeholder="Please input Name"
                    />
                  </FormItem>
                  <FormItem
                    v-show="cardType === 'Date'"
                    label="日期类型:"
                    class="w30"
                  >
                    <Select v-model="datetype" placeholder="Pick datetype">
                      <Option
                        v-for="item in dateOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </Select>
                  </FormItem>
                  <FormItem
                    v-show="cardType === 'Date'"
                    label="展示的时间格式:"
                    class="w30"
                  >
                    <Select
                      v-model="format"
                      placeholder="Pick format"
                      clearable
                    >
                      <Option
                        v-for="item in formatOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </Select>
                  </FormItem>
                  <FormItem label="占位符:" class="w30">
                    <Input
                      v-model="placeholder"
                      placeholder="Please input Placeholder"
                    />
                  </FormItem>
                  <FormItem label="描述:" class="w30">
                    <Input
                      v-model="description"
                      placeholder="Please input Description"
                    />
                  </FormItem>
                  <FormItem label="尺寸:" class="w30">
                    <Select v-model="size" placeholder="Pick Size">
                      <Option
                        v-for="item in sizeOptions"
                        :key="item"
                        :label="item"
                        :value="item"
                      />
                    </Select>
                  </FormItem>
                  <FormItem label="Key:" class="w30">
                    <Input v-model="mapKey" placeholder="Please input Key" />
                  </FormItem>
                  <FormItem label="标签名可见:" style="margin-left: 10px">
                    <i-switch v-model="labelShow"> </i-switch>
                  </FormItem>
                  <FormItem label="标题颜色:" class="w30">
                    <ColorPicker v-model="colorTitle" />
                  </FormItem>
                  <FormItem
                    v-show="showType.includes(cardType)"
                    label="类型:"
                    class="w30"
                  >
                    <Select v-model="cardType" placeholder="Pick Size">
                      <Option
                        v-for="item in buttonType"
                        :key="item"
                        :label="item"
                        :value="item"
                      />
                    </Select>
                  </FormItem>
                  <FormItem
                    v-if="multipleShow"
                    label="是否多选:"
                    style="margin-left: 10px"
                  >
                    <i-switch v-model="multiple" />
                  </FormItem>
                  <FormItem
                    v-if="joinShow"
                    label="开启合并结果:"
                    style="margin-left: 10px"
                  >
                    <i-switch v-model="join" />
                  </FormItem>

                  <div style="margin-top: 20px; width: 100%" v-if="jsonShow">
                    <div style="display: flex; gap: 0.5rem; margin-bottom: 5px">
                      <Input
                        v-model="option_label"
                        placeholder="下拉项名"
                        class="w30"
                      />
                      <Input
                        v-model="option_value"
                        placeholder="下拉项值"
                        class="w30"
                      />
                      <Button type="info" @click="addTag">新增</Button>
                    </div>
                    <Tag
                      v-for="(item, i) in options"
                      :key="item.value"
                      :name="item.label"
                      closable
                      @on-close="closeTag(i)"
                      >{{ item.label }}/{{ item.value }}</Tag
                    >
                    <!-- <VueJsonEditor
                  style="margin-top: 20px; text-align: left"
                  v-model="options"
                  :expanded-on-start="true"
                  :mode="mode"
                /> -->
                  </div>
                </div>
              </TabPane>
              <TabPane label="高级设置" name="second">
                <div class="flex gap-1">
                  <FormItem label="默认值" flex-col items-start class="w30">
                    <Input v-model="defaultvalue" />
                  </FormItem>
                  <FormItem label="是否必输" style="margin-left: 20px">
                    <i-switch v-model="required"></i-switch>
                  </FormItem>
                </div>
                <!-- <div class="flex flex-col item-start">
                  <h3 text-black text-6>表单组</h3>
                  <div class="wrapper left">
                    <FormItem label="Group" class="w30">
                      <Input v-model="group" />
                    </FormItem>
                    <FormItem label="GroupKey" class="w30">
                      <Input v-model="groupKey" />
                    </FormItem>
                  </div>
                </div> -->
                <div
                  class="flex flex-col item-start"
                  style="margin-bottom: 20px"
                >
                  <h3 style="margin-bottom: 10px">规则校验</h3>
                  <div class="wrapper left" v-for="(item, i) in rules" :key="i">
                    <FormItem label="正则" flex-col items-start class="w40">
                      <Input v-model="item.regExp" />
                    </FormItem>
                    <FormItem
                      v-show="item.regExp"
                      label="错误消息"
                      flex-col
                      items-start
                      class="w40"
                    >
                      <Input v-model="item.errMsg" />
                    </FormItem>
                    <FormItem label=" " flex-col items-start>
                      <Button @click="deleteReg(i)">删除</Button>
                    </FormItem>
                  </div>
                  <Button @click="rules.push({ regExp: '', errMsg: '' })"
                    >新增规则</Button
                  >
                </div>
                <div
                  class="flex flex-col item-start"
                  style="margin-bottom: 20px"
                >
                  <h3 text-black text-6>设置</h3>
                  <div class="wrapper left">
                    <div class="w45" text-left flex flex-col>
                      <Checkbox v-model="min" size="large">最小值</Checkbox>
                      <InputNumber
                        v-show="min"
                        v-model="len.min"
                        :min="0"
                        :max="30"
                        size="small"
                        controls-position="right"
                      />
                    </div>
                    <div class="w45" text-left flex flex-col>
                      <Checkbox v-model="max" size="large">最大值</Checkbox>
                      <InputNumber
                        v-show="max"
                        v-model="len.max"
                        :min="0"
                        :max="30"
                        size="small"
                        controls-position="right"
                      />
                    </div>
                  </div>
                </div>
                <div class="wrapper">
                  <h3 text-black text-6>显隐关联</h3>
                  <div
                    v-for="(item, idx) in controllers"
                    :key="idx"
                    class="wrapper gap-2 relative"
                  >
                    <div
                      v-show="idx > 0"
                      absolute
                      right-0
                      top-2
                      @click="controllers.splice(idx, 1)"
                    >
                      <svg
                        viewBox="0 0 1024 1024"
                        xmlns="http://www.w3.org/2000/svg"
                        data-v-029747aa=""
                        w-4
                      >
                        <path
                          fill="currentColor"
                          d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z"
                        />
                      </svg>
                    </div>
                    <div class="wrapper gap-2" style="flex-wrap: nowrap">
                      <FormItem
                        label="选择关联字段"
                        flex-col
                        items-start
                        class="w45"
                      >
                        <Select
                          v-model="item.relevancy"
                          placeholder="Select"
                          clearable
                          @change="selectChange"
                        >
                          <Option
                            v-for="i in tableData.filter(
                              (item) => item.id && item.label !== input
                            )"
                            :key="i.name"
                            :label="i.label"
                            :value="i.label"
                          />
                        </Select>
                      </FormItem>
                      <FormItem
                        v-show="item.relevancy"
                        label="选择规则"
                        flex-col
                        items-start
                        class="w45"
                      >
                        <Select v-model="item.controlType" placeholder="Select">
                          <Option
                            v-for="i in controlTypes"
                            :key="i"
                            :label="i"
                            :value="i"
                          />
                        </Select>
                      </FormItem>
                      <FormItem
                        v-show="item.controlType === 'regExp'"
                        label="regExp"
                        flex-col
                        items-start
                        class="w45"
                      >
                        <Input v-model="item.controlReg" input-style="h-full" />
                      </FormItem>
                    </div>
                  </div>
                  <Button
                    @click="
                      controllers.push({
                        relevancy: '',
                        controlType: '',
                        controlReg: '',
                      })
                    "
                  >
                    新增关联
                  </Button>
                </div>
              </TabPane>
            </Tabs>
          </Form>
        </div>
      </template>
      <template #footer>
        <Footer @cancel="cancel" @confirm="confirm" />
      </template>
    </Modal>
    <Modal
      v-model="dragShow"
      :modal="false"
      title="Drag & drop the fields to build the layout"
      width="50%"
    >
      <Drag ref="dragEl" :data="getFormData()" />
      <template #footer>
        <Footer @cancel="dragShow = false" @confirm="sortEnd" />
      </template>
    </Modal>
    <Table :data="tableData" :columns="tableColumns"> </Table>
  </div>
</template>

<style scoped>
/deep/ .ivu-modal-footer {
  padding: 0;
  position: sticky;
  bottom: 0;
  z-index: 10;
}

.fkEccH {
  -webkit-box-align: center;
  align-items: center;
  display: flex;
  flex-direction: row;
}

.inqAba {
  color: rgb(50, 50, 77);
  font-weight: 600;
  font-size: 1.125rem;
  line-height: 40px;
}

.goLodl {
  height: 1px;
  border: none;
  margin: 0px;
}

.fYRdMc {
  background: rgb(234, 234, 239);
}

.wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  width: 100%;
  align-items: center;
}

.left {
  text-align: left;
}

.flex-col {
  flex-direction: column;
}

.item-start {
  align-items: flex-start;
}

.flex {
  display: flex;
}

.gap-2 {
  gap: 0.5rem;
}

.gap-1 {
  gap: 0.25rem;
}

.w45 {
  width: 45%;
}

.w30 {
  width: 30%;
}

.absolute {
  position: absolute;
}

.left-0 {
  left: 0;
}

.w40 {
  width: 40%;
}

.h-10 {
  height: 2.5rem;
}

.lh-10 {
  line-height: 2.5rem;
}

.text-5 {
  font-size: 1.5rem;
}

.font-600 {
  font-weight: 600;
}

.text-black {
  color: #000;
}

.top-0 {
  top: 0;
}

.relative {
  position: relative;
}

.w-full {
  width: 100%;
}

.demo-tabs /deep/ .ivu-tabs-nav {
  float: right !important;
}
</style>
