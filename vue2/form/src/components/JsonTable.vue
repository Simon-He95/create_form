<script>
// import vueJsonEditor from 'vue-json-editor';
import { nanoid } from "nanoid";
import Footer from "./Footer.vue";
import JsonTabs from "./JsonTabs.vue";
import Drag from "./Drag.vue";
import Group from "./Group.vue";
import { formateDate } from "../../utils";
export default {
  name: "JsonTable",
  components: {
    Footer,
    JsonTabs,
    Drag,
    Group,
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
          title: "键名",
          key: "key",
          resizable: true,
        },
        {
          title: "类型",
          key: "type",
          resizable: true,
        },
        {
          title: "默认值",
          key: "default",
          resizable: true,
        },
        {
          title: "管理员",
          key: "member",
          resizable: true,
          align: "center",
        },
        {
          title: "创建时间",
          key: "create_time",
          resizable: true,
          align: "center",
        },
        {
          title: "是否必填",
          key: "required",
          resizable: true,
          align: "center",
          render: (h, params) => h("span", params.row.required ? "是" : "否"),
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
      dragShow: false,
      dialogVisible: false,
      tableData: [],
      current: "",
      map: "",
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
      controllers: [],
      buttonType: ["Radio", "RadioButton"],
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
          name: "组",
          description: "组合",
          value: "Group",
        },
      ],
      rules: [],
      controlTypes: ["value", "regExp"],
      showType: ["Radio", "RadioButton", "Checkbox", "CheckboxButton"],
      join: false,
      key: "",
      options: [],
      option_label: "",
      option_value: "",
      groupOptions: [],
      buttonContent: "",
      groupValue: "",
      currentGroup: {},
      id: "",
      create_time: "",
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
      this.id = row.id;
      this.create_time = row.create_time;
      if (row.type === "Group") {
        this.cardShow = false;
        this.cardType = row.type;
        this.currentGroup = row;
        return (this.dialogVisible = true);
      }
      if (row.type === "Checkbox")
        this.buttonType = ["Checkbox", "CheckboxButton"];
      else if (row.type === "Radio") this.buttonType = ["Radio", "RadioButton"];
      else if (row.type === "Date") {
        this.datetype = row.date.type;
        this.format = row.date.format;
      }
      this.controllers = row.show || [];
      this.multiple = row.multiple;
      this.current = this.input = row.label;
      this.key = row.key;
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
    getAllKeys() {
      return this.tableData.map((item) => item.keys);
    },
    confirm() {
      if (this.cardType === "Group") return this.groupConfirm();
      if (
        this.current !== this.input &&
        this.getAllKeys().includes(this.input)
      ) {
        return this.$Message.error("该字段名已存在.");
      }
      if (!this.key) {
        return this.$Message.error("键名 是必输项");
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
        colorTitle: this.colorTitle,
        size: this.size,
        key: this.key || this.input,
        options: this.options,
        len: this.len,
        multiple: this.multiple,
        join: this.join,
        create_time:
          this.create_time || formateDate(new Date(), "yyyy-MM-dd hh:mm:ss"),
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
        result[item.key] = item;
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
      this.focusName();
    },
    focusName() {
      if (this.cardType === "Group") return;
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
      this.key = "";
      this.id = "";
      this.cardType = "";
      this.description = "";
      this.groupKey = "";
      this.placeholder = "";
      this.group = "";
      this.join = false;
      this.rules = [];
      this.options = [];
      this.format = "";
      this.datetype = "";
      this.input = "";
      this.colorTitle = "";
      this.size = "default";
      this.buttonContent = "";
      this.groupValue = "";
      this.defaultvalue = "";
      this.min = false;
      this.max = false;
      this.required = false;
      this.controllers = [];
      this.activeName = "first";
      this.type = "add";
      this.multiple = false;
      this.datetype = "";
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
      this.tableData = Object.keys(attribs).map((key) => attribs[key] || {});
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
      const { id, children } = group;
      const data = {
        type: "Group",
        label: group.label,
        key: group.key,
        filters,
        id,
        group: children,
      };
      if (this.type === "add") {
        this.tableData.push(data);
      } else {
        const idx = this.tableData.findIndex(
          (item) => item.id === this.currentGroup.id
        );
        this.$set(this.tableData, idx, data);
        this.current = null;
      }
      this.dialogVisible = false;
    },
    getGroupOptions() {
      const groups = this.tableData.filter((item) => item.type === "Group")[0];
      this.groupOptions = groups
        ? groups.group.map((item) => {
            return { label: item.label, value: item.key };
          })
        : [];
      console.log(this.groupOptions);
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
    joinShow() {
      return ["Checkbox", "CheckboxButton", "Cascader", "Enumeration"].includes(
        this.cardType
      );
    },
  },
};
</script>

<template>
  <div id="form_wrapper" font-sans text="center gray-700 dark:gray-200">
    <Modal
      v-model="dialogVisible"
      :title="name"
      width="50%"
      :modal="false"
      :before-close="handleClose"
    >
      <div v-show="cardShow" mb6>
        <div class="sc-dvQaRk sc-TBWPX exyKSe fkEccH">
          <h2 class="sc-bvFjSx inqAba">请选择一个模板类型</h2>
        </div>
        <hr class="sc-ljMRFG sc-jwQYvw fYRdMc goLodl" />
      </div>
      <JsonTabs v-show="cardShow" :types="types" @choose="choose" />
      <Group
        v-if="cardType === 'Group'"
        :data="tableData"
        ref="GroupEl"
        :currentGroup="currentGroup"
        :type="type"
      />
      <template v-else>
        <div v-if="cardType" relative>
          <div absolute left-0 top-0 h-10 lh-10 text-4 font-600 text-black>
            {{ type === "add" ? "新增" : "编辑" }}{{ cardType }}项
          </div>

          <Form>
            <Tabs v-model="activeName" class="demo-tabs" px1>
              <TabPane label="基础设置" name="first">
                <div class="grid grid-cols-3 gap-2">
                  <FormItem label="标签名:">
                    <Input
                      ref="nameEl"
                      v-model="input"
                      placeholder="Please input Name"
                    />
                  </FormItem>
                  <FormItem v-show="cardType === 'Date'" label="日期类型:">
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
                  <FormItem label="占位符:">
                    <Input
                      v-model="placeholder"
                      placeholder="Please input Placeholder"
                    />
                  </FormItem>
                  <FormItem label="描述:">
                    <Input
                      v-model="description"
                      placeholder="Please input Description"
                    />
                  </FormItem>
                  <FormItem label="尺寸:">
                    <Select v-model="size" placeholder="Pick Size">
                      <Option
                        v-for="item in sizeOptions"
                        :key="item"
                        :label="item"
                        :value="item"
                      />
                    </Select>
                  </FormItem>
                  <FormItem label="键名:">
                    <Input v-model="key" placeholder="Please input Key" />
                  </FormItem>
                  <!-- <FormItem label="标签名可见:">
                      <i-switch v-model="labelShow"> </i-switch>
                    </FormItem> -->
                  <!-- <FormItem label="标题颜色:">
                      <ColorPicker v-model="colorTitle" />
                    </FormItem> -->
                  <FormItem v-show="showType.includes(cardType)" label="类型:">
                    <Select v-model="cardType" placeholder="Pick Size">
                      <Option
                        v-for="item in buttonType"
                        :key="item"
                        :label="item"
                        :value="item"
                      />
                    </Select>
                  </FormItem>
                  <FormItem v-if="multipleShow" label="是否多选:">
                    <i-switch v-model="multiple" />
                  </FormItem>
                  <FormItem
                    v-if="jsonShow"
                    label="选项"
                    style="grid-column-start: span 2"
                  >
                    <div flex="~ gap-2">
                      <Input v-model="option_label" placeholder="下拉项名" />
                      <Input v-model="option_value" placeholder="下拉项值" />
                      <Button type="info" @click="addTag">新增</Button>
                      <Tag
                        v-for="(item, i) in options"
                        :key="item.value"
                        :name="item.label"
                        closable
                        @on-close="closeTag(i)"
                        >{{ item.label }}/{{ item.value }}</Tag
                      >
                    </div>
                    <!-- <VueJsonEditor
                    style="margin-top: 20px; text-align: left"
                    v-model="options"
                    :expanded-on-start="true"
                    :mode="mode"
                  /> -->
                  </FormItem>
                  <FormItem v-if="joinShow" label="开启合并结果:">
                    <i-switch v-model="join" />
                  </FormItem>
                </div>
              </TabPane>
              <TabPane label="高级设置" name="second">
                <div grid gap-2 grid-cols-3>
                  <FormItem label="默认值">
                    <Input v-model="defaultvalue" />
                  </FormItem>
                  <FormItem label="是否必输">
                    <i-switch v-model="required"></i-switch>
                  </FormItem>
                </div>
                <div mb4>
                  <h3 mb2>设置</h3>
                  <div grid gap-2 grid-cols-2>
                    <div flex="~" v-if="cardType === 'Number'">
                      <Checkbox v-model="min" size="large">最小值</Checkbox>
                      <InputNumber
                        v-show="min"
                        v-model="len.min"
                        :min="0"
                        :max="30"
                        size="small"
                        ml-2
                        controls-position="right"
                      />
                    </div>
                    <div flex="~">
                      <Checkbox v-model="max" size="large">{{
                        cardType === "Number" ? "最大值" : "最大输入长度"
                      }}</Checkbox>
                      <InputNumber
                        v-show="max"
                        v-model="len.max"
                        :min="0"
                        :max="30"
                        size="small"
                        ml-2
                        controls-position="right"
                      />
                    </div>
                  </div>
                </div>
                <div mb4>
                  <h3 mb2>规则校验</h3>
                  <div
                    v-for="(item, i) in rules"
                    :key="i"
                    flex="~ gap-2"
                    relative
                  >
                    <FormItem label="正则" class="w-45%">
                      <Input v-model="item.regExp" />
                    </FormItem>
                    <FormItem
                      v-show="item.regExp"
                      label="错误消息"
                      class="w-45%"
                    >
                      <Input v-model="item.errMsg" />
                    </FormItem>
                    <div absolute top-2 right-0 @click="deleteReg(i)">
                      <Icon type="md-close" size="20" />
                    </div>
                  </div>

                  <Button
                    icon="md-add"
                    @click="rules.push({ regExp: '', errMsg: '' })"
                    >新增规则</Button
                  >
                </div>
                <div>
                  <h3 mb2>显隐关联</h3>
                  <div v-for="(item, idx) in controllers" :key="idx" relative>
                    <div
                      absolute
                      class="right-0 top-2"
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
                    <div grid grid-cols-3 gap-2>
                      <FormItem label="选择关联字段">
                        <Select
                          v-model="item.relevancy"
                          placeholder="Select"
                          clearable
                          @change="selectChange"
                        >
                          <Option
                            v-for="i in tableData.filter(
                              (item) => !item.group && item.label !== input
                            )"
                            :key="i.name"
                            :label="i.key"
                            :value="i.key"
                          />
                        </Select>
                      </FormItem>
                      <FormItem v-show="item.relevancy" label="选择规则">
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
                        label="正则"
                      >
                        <Input v-model="item.controlReg" input-style="h-full" />
                      </FormItem>
                    </div>
                  </div>
                  <Button
                    icon="md-add"
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
    <Table :data="tableData" :columns="tableColumns" w-full> </Table>
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

.demo-tabs /deep/ .ivu-tabs-nav {
  float: right !important;
}
.demo-tabs /deep/ .ivu-form-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.demo-tabs /deep/ .ivu-form-item .ivu-form-item-content {
  width: 100%;
}
.demo-tabs /deep/ .ivu-tabs-nav .ivu-tabs-tab {
  font-size: 12px;
  padding: 16px;
}
.demo-tabs /deep/ .ivu-checkbox-wrapper.ivu-checkbox-large {
  display: flex;
  align-items: center;
  font-size: 14px;
}
.demo-tabs /deep/ .ivu-checkbox-wrapper.ivu-checkbox-large .ivu-checkbox {
  padding-right: 8px;
}
</style>
