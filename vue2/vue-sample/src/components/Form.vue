<script>
import vueJsonEditor from "vue-json-editor";
import { nanoid } from "nanoid";
import Footer from "./Footer.vue";
import Tabs from "./Tabs.vue";
import Drag from "./Drag.vue";
export default {
  name: "Form",
  components: {
    Footer,
    Tabs,
    Drag,
    VueJsonEditor: vueJsonEditor,
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
      required: false,
      minvalue: 0,
      maxvalue: 0,
      number: {
        min: "",
        max: "",
      },
      min: false,
      max: false,
      group: "",
      groupKey: "",
      cascader: {
        multiple: false,
      },
      limit: 1,
      controllers: [{ relevancy: "", controlType: "", controlReg: "" }],
      buttonType: ["Radio", "RadioButton"],
      key: 0,
      sizeOptions: ["default", "small", "large"],
      mode: "code",
      json: "",
      types: [
        {
          name: "Text",
          description: "文本框",
        },
        {
          name: "Radio",
          description: "单选框",
        },
        {
          name: "RichText",
          description: "富文本",
        },
        {
          name: "Date",
          description: "日期",
        },
        {
          name: "Enumeration",
          description: "枚举",
        },
        {
          name: "Password",
          description: "密码",
        },
        {
          name: "Number",
          description: "数字",
        },
        {
          name: "Boolean",
          description: "布尔",
        },
        {
          name: "Checkbox",
          description: "多选框",
        },
        {
          name: "Upload",
          description: "上传",
        },
        {
          name: "Cascader",
          description: "级联选择",
        },
        {
          name: "Relation",
          description: "关联",
        },
      ],
      rules: [],
      controlTypes: ["value", "regExp"],
      showType: [
        "Radio",
        "RadioButton",
        "Checkbox",
        "CheckboxButton",
        "Cascader",
        "Enumeration",
      ],
      mapKey: "",
      options: [],
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
      if (row.type === "Checkbox")
        this.buttonType = ["Checkbox", "CheckboxButton"];
      if (row.type === "Radio") this.buttonType = ["Radio", "RadioButton"];
      this.controllers = row.show || [
        { relevancy: "", controlType: "", controlReg: "" },
      ];
      this.type = "edit";
      if (row.upload) this.limit = row.upload.limit;
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
      if (row.cascader) {
        this.cascader.multiple = row.cascader.multiple;
        this.json = {
          multiple: row.cascader.multiple,
        };
      }
      this.options = row.options;
      this.cardShow = false;
      this.cardType = row.type;
      this.labelShow = row.labelShow;
      this.defaultvalue = row.default;
      this.placeholder = row.placeholder;
      this.description = row.description;
      this.colorTitle = row.colorTitle;
      if (row.number) {
        this.number.min = row.number.min;
        if (this.number.min) this.min = true;
        this.number.max = row.number.max;
        if (this.number.max) this.max = true;
      } else
        this.number = {
          min: "",
          max: "",
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
      if (
        this.current !== this.input &&
        this.getAllname().includes(this.input)
      ) {
        return this.$message({
          message: "该字段名已存在.",
          type: "error",
        });
      }
      if (!this.input) {
        return this.$message({
          message: "Name 是必输项",
          type: "error",
        });
      }
      const r = this.controllers
        .map((item) => ({
          relevancy: item.relevancy,
          controlType: item.relevancy ? item.controlType : null,
          controlReg: item.controlType === "value" ? null : item.controlReg,
        }))
        .filter((item) => item.relevancy);

      const data = {
        id: this.input,
        placeholder: this.placeholder,
        description: this.description,
        label: this.input,
        type: this.cardType,
        rules: this.rules,
        default: this.defaultvalue || null,
        required: this.required,
        key: this.key,
        position: `0-${this.key - 1}`,
        colorTitle: this.colorTitle,
        size: this.size,
        labelShow: this.labelShow,
        mapKey: this.mapKey || this.input,
        options: this.options,
      };
      if (this.cardType === "Cascader") {
        data.cascader = {
          multiple: this.cascader.multiple,
        };
      }
      if (r.length) data["show"] = r;
      if (this.group) data["group"] = this.group;
      if (this.groupKey) data["groupKey"] = this.groupKey;
      if (this.cardType === "Upload") {
        data.upload = {
          limit: this.limit,
        };
      }
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
        result[item.label] = item;
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
          this.$message({
            message: "相同关联字段不能重复.",
            type: "error",
          });
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
      this.$nextTick(() => {
        this.$refs.nameEl.focus();
      });
    },
    handleClose(done) {
      this.resetData();
      done();
    },
    add() {
      this.resetData();
      this.dialogVisible = true;
    },
    resetData() {
      this.cardShow = true;
      this.mapKey = "";
      this.cardType = "";
      this.description = "";
      this.groupKey = "";
      this.placeholder = "";
      this.group = "";
      this.rules = [];
      this.cascader.multiple = false;
      this.options = [
        {
          label: "",
          value: "",
        },
      ];
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
      this.limit = 1;
      this.key = this.key + 1;
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
    <el-dialog
      :visible.sync="dialogVisible"
      :title="name"
      width="50%"
      :modal="false"
      :before-close="handleClose"
    >
      <div v-show="cardShow" style="margin-bottom: 24px">
        <div class="sc-dvQaRk sc-TBWPX exyKSe fkEccH">
          <h2 class="sc-bvFjSx inqAba">
            Select a field for your collection type
          </h2>
        </div>
        <hr class="sc-ljMRFG sc-jwQYvw fYRdMc goLodl" />
      </div>
      <Tabs v-show="cardShow" :types="types" @choose="choose" />

      <div v-show="cardType" class="relative">
        <div
          class="absolute left-0 top-0 h-10 lh-10 text-5 font-600 text-black"
        >
          {{ type === "add" ? "Add new" : "Edit" }} {{ cardType }} field
        </div>
        <el-form>
          <el-tabs v-model="activeName" class="demo-tabs">
            <el-tab-pane label="Basic settings" name="first">
              <div v-show="cardType">
                <div class="wrapper">
                  <el-form-item label="标签名:" class="w30">
                    <el-input
                      ref="nameEl"
                      v-model="input"
                      placeholder="Please input Name"
                    />
                  </el-form-item>

                  <el-form-item label="占位符:" class="w30">
                    <el-input
                      v-model="placeholder"
                      placeholder="Please input Placeholder"
                    />
                  </el-form-item>
                  <el-form-item label="描述:" class="w30">
                    <el-input
                      v-model="description"
                      placeholder="Please input Description"
                    />
                  </el-form-item>
                  <el-form-item label="尺寸:" class="w30">
                    <el-select v-model="size" placeholder="Pick Size">
                      <el-option
                        v-for="item in sizeOptions"
                        :key="item"
                        :label="item"
                        :value="item"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="Key:" class="w30">
                    <el-input v-model="mapKey" placeholder="Please input Key" />
                  </el-form-item>
                  <el-form-item label="标签名可见:" style="margin-left: 10px">
                    <el-switch v-model="labelShow"></el-switch>
                  </el-form-item>
                  <el-form-item label="标题颜色:" class="w30">
                    <el-color-picker v-model="colorTitle" />
                  </el-form-item>
                  <el-form-item
                    v-show="showType.includes(cardType)"
                    label="Type:"
                    class="w30"
                  >
                    <el-select v-model="cardType" placeholder="Pick Size">
                      <el-option
                        v-for="item in buttonType"
                        :key="item"
                        :label="item"
                        :value="item"
                      />
                    </el-select>
                  </el-form-item>
                  <el-checkbox
                    v-show="cardType === 'Cascader'"
                    v-model="cascader.multiple"
                    label="Multiple"
                    class="w30"
                  />
                  <el-form-item
                    v-show="cardType === 'Upload'"
                    label="Limit:"
                    class="w30"
                  >
                    <el-input-number
                      v-model="limit"
                      :min="1"
                      :max="10"
                      controls-position="right"
                    />
                  </el-form-item>
                </div>
                <VueJsonEditor
                  v-if="showType.includes(cardType)"
                  style="margin-top: 20px"
                  v-model="options"
                  :expanded-on-start="true"
                  :mode="mode"
                />
              </div>
            </el-tab-pane>
            <el-tab-pane label="Advanced settings" name="second">
              <div class="flex gap-1">
                <el-form-item label="默认值" flex-col items-start class="w30">
                  <el-input v-model="defaultvalue" />
                </el-form-item>
                <el-form-item label="是否必输" style="margin-left: 20px">
                  <el-switch v-model="required"></el-switch>
                </el-form-item>
              </div>
              <div class="flex flex-col item-start">
                <h3 text-black text-6>表单组</h3>
                <div class="wrapper left">
                  <el-form-item label="Group" class="w30">
                    <el-input v-model="group" />
                  </el-form-item>
                  <el-form-item label="GroupKey" class="w30">
                    <el-input v-model="groupKey" />
                  </el-form-item>
                </div>
              </div>
              <div
                class="flex flex-col item-start"
                style="margin-bottom: ;20px;"
              >
                <h3 text-black text-6>规则校验</h3>
                <div class="wrapper left" v-for="(item, i) in rules">
                  <el-form-item label="正则" flex-col items-start class="w40">
                    <el-input v-model="item.regExp" />
                  </el-form-item>
                  <el-form-item
                    v-show="item.regExp"
                    label="错误消息"
                    flex-col
                    items-start
                    class="w40"
                  >
                    <el-input v-model="item.errMsg" />
                  </el-form-item>
                  <el-form-item label=" " flex-col items-start>
                    <el-button @click="deleteReg(i)">删除</el-button>
                  </el-form-item>
                </div>
                <el-button @click="rules.push({ regExp: '', errMsg: '' })"
                  >新增规则</el-button
                >
              </div>
              <div
                class="flex flex-col item-start"
                style="margin-bottom: ;20px;"
              >
                <h3 text-black text-6>设置</h3>
                <div class="wrapper left">
                  <div class="w45" text-left flex flex-col>
                    <el-checkbox v-model="min" label="最小值" size="large" />
                    <el-input-number
                      v-show="min"
                      v-model="number.min"
                      :min="0"
                      :max="10"
                      size="small"
                      controls-position="right"
                    />
                  </div>
                  <div class="w45" text-left flex flex-col>
                    <el-checkbox v-model="max" label="最大值" size="large" />
                    <el-input-number
                      v-show="max"
                      v-model="number.max"
                      :min="0"
                      :max="10"
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
                  style="margin-top: -20px"
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
                  <div class="wrapper gap-2">
                    <el-form-item
                      label="选择关联字段"
                      flex-col
                      items-start
                      class="w45"
                    >
                      <el-select
                        v-model="item.relevancy"
                        placeholder="Select"
                        clearable
                        @change="selectChange"
                      >
                        <el-option
                          v-for="i in tableData.filter(
                            (item) => item.label !== input
                          )"
                          :key="i.name"
                          :label="i.label"
                          :value="i.label"
                        />
                      </el-select>
                    </el-form-item>
                    <el-form-item
                      v-show="item.relevancy"
                      label="选择规则"
                      flex-col
                      items-start
                      class="w45"
                    >
                      <el-select
                        v-model="item.controlType"
                        placeholder="Select"
                      >
                        <el-option
                          v-for="i in controlTypes"
                          :key="i"
                          :label="i"
                          :value="i"
                        />
                      </el-select>
                    </el-form-item>
                    <el-form-item
                      v-show="item.controlType === 'regExp'"
                      label="regExp"
                      flex-col
                      items-start
                      class="w45"
                    >
                      <el-input
                        v-model="item.controlReg"
                        input-style="h-full"
                      />
                    </el-form-item>
                  </div>
                </div>
                <el-button
                  @click="
                    controllers.push({
                      relevancy: '',
                      controlType: '',
                      controlReg: '',
                    })
                  "
                >
                  新增关联
                </el-button>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-form>
      </div>
      <template #footer>
        <Footer @cancel="cancel" @confirm="confirm" />
      </template>
    </el-dialog>
    <el-dialog
      :visible.sync="dragShow"
      :modal="false"
      title="Drag & drop the fields to build the layout"
      width="50%"
    >
      <Drag ref="dragEl" :data="getFormData()" />
      <template #footer>
        <Footer @cancel="dragShow = false" @confirm="sortEnd" />
      </template>
    </el-dialog>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="label" label="Name" />
      <el-table-column prop="type" label="Type" />
      <el-table-column width="180">
        <template #default="scope">
          <el-button
            link
            type="danger"
            size="small"
            @click="deleteHandler(scope.row)"
          >
            Delete
          </el-button>
          <el-button link size="small" @click="editHandler(scope.row)">
            Edit
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

  <style scoped>
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

.demo-tabs /deep/ .el-tabs__nav-scroll {
  float: right !important;
}

:deep(.demo-tabs .el-form-item__content) {
  width: 100%;
  align-items: flex-start;
}

:deep(.el-form-item__content .el-select) {
  width: 100%;
}

:deep(.el-form-item__content .el-cascader) {
  width: 100%;
}
</style>

