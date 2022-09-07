<template>
  <div
    id="jsonTable"
    style="display: flex; padding: 50px; box-sizing: border-box; width: 100%"
  >
    <div style="text-align: left; flex: 1">
      <Header
        :name="title"
        :message="message"
        type="manage"
        @create="createForm"
      />

      <div class="sc-gsDKAQ kMJSxT" v-show="deleteShow">
        <div class="sc-gsDKAQ dKbaYC">
          <div class="sc-dvQaRk sc-TBWPX dPOXkr eBvroI">
            <div class="sc-dvQaRk sc-TBWPX sc-cxVPaa dPOXkr fkEccH kAnngA">
              <span class="sc-bvFjSx ePBiQD">1 entry selected</span>
              <button
                aria-disabled="false"
                type="button"
                class="sc-eCImPb igeLKl sc-iCfMLu fuVXw"
                @click="deleteAll"
              >
                <div
                  aria-hidden="true"
                  class="sc-hKwDye sc-gKclnd gEtyVN bEOvQm"
                >
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.236 6.149a.2.2 0 00-.197.233L6 24h12l2.96-17.618a.2.2 0 00-.196-.233H3.236zM21.8 1.983c.11 0 .2.09.2.2v1.584a.2.2 0 01-.2.2H2.2a.2.2 0 01-.2-.2V2.183c0-.11.09-.2.2-.2h5.511c.9 0 1.631-1.09 1.631-1.983h5.316c0 .894.73 1.983 1.631 1.983H21.8z"
                      fill="#32324D"
                    ></path>
                  </svg>
                </div>
                <span class="sc-dkPtRN dWcbSp">Delete</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Table
        :data="tableData"
        :columns="tableColumns"
        @on-selection-change="selectAll"
      />
    </div>

    <Modal title="创建一个Form表单" v-model="dialogTableVisible" :modal="false">
      <JsonForm ref="formEl" :schema="json" style="z-index: 999"></JsonForm>
      <span slot="footer" class="dialog-footer">
        <div class="sc-cTAIfT sc-dYtuZ pmygK bkSVwu">
          <div class="sc-cTAIfT sc-ihINtW oSriV gREqRk">
            <div class="sc-cTAIfT sc-ihINtW sc-hAWBJg oSriV hhwqdj icqNfP">
              <button
                aria-disabled="false"
                type="button"
                class="sc-eCImPb igeLKl sc-iCfMLu iGNcld"
                @click="dialogTableVisible = false"
              >
                <span class="sc-dkPtRN kZdUHC">Cancel</span>
              </button>
            </div>
            <div class="sc-cTAIfT sc-ihINtW sc-hAWBJg oSriV hhwqdj icqNfP">
              <button
                aria-disabled="false"
                type="submit"
                class="sc-eCImPb igeLKl sc-iCfMLu hxJchj"
                @click="saveForm"
              >
                <span class="sc-dkPtRN kZdUHC">Save</span>
              </button>
            </div>
          </div>
        </div>
      </span>
    </Modal>
  </div>
</template>

<script>
import { nanoid } from "nanoid";
import Header from "./Header.vue";
import JsonForm from "./JsonForm.vue";
export default {
  name: "Manage",
  components: {
    Header,
    JsonForm,
  },
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      json: {},
      originJSON: undefined,
      formList: {},
      tableData: [],
      tableColumns: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "ID",
          width: 120,
          type: "index",
          key: "id",
        },
        {
          title: "Text",
          key: "text",
        },
        {
          title: "EMAIL",
          key: "email",
        },
        {
          title: "Action",
          width: 260,
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              {
                style: "display:flex;justify-content:space-evenly",
              },
              [
                h(
                  "Button",
                  {
                    on: {
                      click: () => this.editRow(params.row, params.index),
                    },
                  },
                  "edit"
                ),
                h(
                  "Button",
                  {
                    on: {
                      click: () => this.copyRow(params.row, params.index),
                    },
                  },
                  "copy"
                ),
                h(
                  "Button",
                  {
                    on: {
                      click: () => this.deleteRow(params.index),
                    },
                  },
                  "delete"
                ),
              ]
            );
          },
        },
      ],
      name: "",
      deleteShow: false,
      dialogTableVisible: false,
      type: "add",
      currentCOl: "",
      deleteItems: [],
    };
  },
  mounted() {
    this.formList = localStorage.getItem("json_form_list")
      ? JSON.parse(localStorage.getItem("json_form_list"))
      : {};
  },
  watch: {
    name() {
      this.tableData = localStorage.getItem("json_form_table")
        ? JSON.parse(localStorage.getItem("json_form_table"))[this.name] || []
        : [];
    },
  },
  computed: {
    message() {
      return (this.tableData ? this.tableData.length : "0") + " entry found";
    },
  },
  methods: {
    deleteAll() {
      this.tableData = this.tableData.filter((item) => {
        return !this.deleteItems.includes(item.id);
      });
      const store = {
        [this.name]: this.tableData,
      };
      localStorage.setItem("json_form_table", JSON.stringify(store));
      this.deleteShow = false;
    },
    editRow(row, i) {
      Object.keys(row).forEach((key) => {
        if (key in this.json.attribs) this.json.attribs[key].default = row[key];
      });
      this.$refs.formEl.forceUpdate()
      this.type = "edit";
      this.setJson(i);
    },
    copyRow(row,i) {
      Object.keys(row).forEach((key) => {
        if (key in this.json.attribs) this.json.attribs[key].default = row[key];
      });
      this.type = "add";
      this.setJson(i);
    },
    deleteRow(i) {
      this.tableData.splice(i, 1);
      const store = {
        [this.name]: this.tableData,
      };
      localStorage.setItem("json_form_table", JSON.stringify(store));
    },
    setJson(i) {
      this.currentCOl = i;
      this.dialogTableVisible = true;
    },
    switchForm(key) {
      this.name = key;
      this.json = this.formList[key];
      this.originJSON = JSON.stringify(this.json);
    },
    saveForm() {
      this.json.id = nanoid();
      const value = this.$refs.formEl.getFormData();
      if (this.type === "add") {
        this.tableData.push(value);
      } else this.tableData[this.currentCOl] = value;
      this.dialogTableVisible = false;
      const store = {
        [this.name]: this.tableData,
      };
      localStorage.setItem("json_form_table", JSON.stringify(store));
    },
    selectAll(selection) {
      this.deleteShow = selection.length;
      this.deleteItems = selection.map((item) => item.id);
    },
    createForm() {
      if (!this.originJSON) return this.$Message.error("当前还没有可用的模板");
      this.json = JSON.parse(this.originJSON);
      this.type = "add";
      this.dialogTableVisible = true;
    },
  },
};
</script>

<style scoped>
/deep/ .ivu-modal-footer {
  padding: 0;
  position: sticky;
  bottom: 0;
  z-index: 10;
}

.dKbaYC {
  padding-bottom: 16px;
}

.fkEccH {
  -webkit-box-align: center;
  align-items: center;
  display: flex;
  flex-direction: row;
}

.ePBiQD {
  color: rgb(102, 102, 135);
  font-size: 1rem;
  line-height: 1.5;
}

.fuVXw {
  -webkit-box-align: center;
  align-items: center;
  padding: 10px 16px !important;
  border: 1px solid rgb(245, 192, 184) !important;
  background: rgb(252, 236, 234) !important;
}

.kAnngA > * + * {
  margin-left: 8px;
}

.eBvroI {
  -webkit-box-align: center;
  align-items: center;
  display: flex;
  flex-direction: row;
  -webkit-box-pack: justify;
  justify-content: space-between;
}

.bkSVwu {
  border-radius: 0px 0px 4px 4px;
  border-top: 1px solid rgb(234, 234, 239);
}

.pmygK {
  background: rgb(246, 246, 249);
  padding: 16px 20px;
}

.gREqRk {
  -webkit-box-align: center;
  align-items: center;
  display: flex;
  flex-direction: row;
  -webkit-box-pack: justify;
  justify-content: space-between;
}

.hhwqdj {
  -webkit-box-align: center;
  align-items: center;
  display: flex;
  flex-direction: row;
}

.iGNcld {
  -webkit-box-align: center;
  align-items: center;
  padding: 8px 16px;
  border: 1px solid rgb(220, 220, 228);
  background: rgb(255, 255, 255);
}

.fuVXw:hover {
  background-color: rgb(255, 255, 255);
}

.fuVXw .sc-hKwDye {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
}

.igeLKl {
  display: flex;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  background: rgb(255, 255, 255);
  border: 1px solid rgb(220, 220, 228);
  position: relative;
  outline: none;
}

.iGNcld .sc-dkPtRN {
  color: rgb(50, 50, 77);
}

.kZdUHC {
  font-weight: 600;
  color: rgb(50, 50, 77);
  font-size: 0.75rem;
  line-height: 1.33;
}

.igeLKl::after {
  transition-property: all;
  transition-duration: 0.2s;
  border-radius: 8px;
  content: "";
  position: absolute;
  inset: -4px;
  border: 2px solid transparent;
}

.hxJchj {
  -webkit-box-align: center;
  align-items: center;
  padding: 8px 16px;
  border: 1px solid rgb(217, 216, 255);
  background: rgb(240, 240, 255);
}

.igeLKl {
  display: flex;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  background: rgb(255, 255, 255);
  border: 1px solid rgb(220, 220, 228);
  position: relative;
  outline: none;
}

.hxJchj .sc-dkPtRN {
  color: rgb(39, 31, 224);
}

.kZdUHC {
  font-weight: 600;
  color: rgb(50, 50, 77);
  font-size: 0.75rem;
  line-height: 1.33;
}

.eRZQkG {
  background: rgb(246, 246, 249);
}

.eoRiGl {
  padding-bottom: 8px;
}

.ULjhI {
  -webkit-box-align: center;
  align-items: center;
  display: flex;
  flex-direction: row;
  -webkit-box-pack: justify;
  justify-content: space-between;
}

.gZrVtp {
  color: rgb(102, 102, 135);
  font-size: 1rem;
  line-height: 1.5;
}

.fuVXw .sc-dkPtRN {
  color: rgb(183, 43, 26);
}

.kCHDYf {
  -webkit-box-align: center;
  align-items: center;
  display: flex;
  flex-direction: row;
}

.dWcbSp {
  font-weight: 600;
  color: rgb(50, 50, 77);
  font-size: 0.875rem;
  line-height: 1.43;
}

.gFLWth {
  -webkit-box-align: center;
  align-items: center;
  padding: 8px 16px;
  background: rgb(73, 69, 255);
  border: 1px solid rgb(73, 69, 255);
}

.igeLKl {
  display: flex;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid rgb(220, 220, 228);
  position: relative;
  outline: none;
}

.lFjjs {
  color: rgb(50, 50, 77);
  font-weight: 600;
  font-size: 2rem;
  line-height: 1.25;
}

.gFLWth .sc-hKwDye {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
}

.gEtyVN {
  padding-right: 8px;
}

.bEOvQm {
  height: 100%;
}

.gFLWth .sc-dkPtRN {
  color: rgb(255, 255, 255);
}

.kZdUHC {
  font-weight: 600;
  color: rgb(50, 50, 77);
  font-size: 0.75rem;
  line-height: 1.33;
}

.igeLKl svg {
  height: 12px;
  width: 12px;
}

.fuVXw svg > g,
.fuVXw svg path {
  fill: rgb(183, 43, 26);
}

path {
  fill: rgb(255, 255, 255);
}

.cfdPXz.active {
  background-color: rgb(240, 240, 255);
  border-right: 2px solid rgb(73, 69, 255);
}

.cfdPXz {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  text-decoration: none;
  color: rgb(50, 50, 77);
}

.joRjZF {
  background: rgb(246, 246, 249);
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 32px;
}

.kpsMfe {
  -webkit-box-align: stretch;
  align-items: stretch;
  display: flex;
  flex-direction: column;
}

.kHJIUp {
  background: rgb(246, 246, 249);
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 32px;
}

.jXLMkq {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  text-decoration: none;
  color: rgb(50, 50, 77);
}

.jXLMkq.active {
  background-color: rgb(240, 240, 255);
  border-right: 2px solid rgb(73, 69, 255);
}

.dNHUsO {
  -webkit-box-align: center;
  align-items: center;
  display: flex;
  flex-direction: row;
}

.cWLdcV {
  width: 0.75rem;
  height: 0.25rem;
}

.fvhnfw {
  padding-left: 8px;
}

.UhwnQ {
  background: rgb(234, 245, 255);
  padding: 4px 8px;
  border-radius: 4px;
}

.fzRNeY {
  font-weight: 600;
  color: rgb(0, 96, 150);
  font-size: 0.875rem;
  line-height: 1.43;
}
</style>
