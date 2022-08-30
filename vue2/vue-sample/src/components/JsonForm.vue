<script>
import { nanoid } from "nanoid";
function addStyle(str) {
  const s = document.createElement("style");
  s.type = "text/css";
  s.innerHTML = str;
  document.head.appendChild(s);
  return () => document.head.removeChild(s);
}

let remove;
export default {
  name: "JsonForm",
  props: {
    schema: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      model: {},
      rules: {},
      dialogShow: false,
      previewSrc: "",
    };
  },
  watch: {
    schema() {
      this.model = {};
    },
  },
  methods: {
    judgeShow(formItemClass, show) {
      const el = document.querySelector(`.${formItemClass}`);
      if (!el) return;
      if (!show) return (el.style.display = "block");
      for (let i = 0; i < show.length; i++) {
        const item = show[i];
        const val = this.model[item.relevancy];
        const type = item.controlType;
        if (type === "value") {
          if (!val) return (el.style.display = "none");
        } else {
          if (!item.controlReg) continue;
          const reg = new RegExp(item.controlReg);
          if (!reg.test(val)) return (el.style.display = "none");
        }
      }
      return (el.style.display = "block");
    },
    getFormData() {
      return this.model;
    },
  },
  render(h) {
    let styles = "";
    return this.schema
      ? h(
          "div",
          {
            style: {
              textAlign: "left",
            },
            class: "json_schema",
          },
          [
            h(
              "h3",
              {
                class: "text-2xl mb-2",
              },
              this.schema.name
            ),
            h(
              "h1",
              {
                class: "text-sm mb-3",
              },
              this.schema.description
            ),
            h(
              "el-form",
              {
                props: {
                  ref: "formEl",
                  model: this.model,
                  rules: this.rules,
                  size: this.schema.size,
                  class: this.schema.class,
                },
              },
              wrapper.call(this, renderForm.call(this, this.schema.attribs))
            ),
          ]
        )
      : "";

    function renderForm(form) {
      const formList = [];
      for (const key in form) {
        const {
          default: value,
          key: _key,
          type,
          size,
          group,
          limit = 1,
          colorTitle,
          cascader,
          label,
          rules,
          required,
          labelShow,
          class: className,
          position,
          style,
          description,
          show,
          len,
          options,
          disabled,
          border,
          precision,
          step,
          debounce = 300,
          placeholder,
          children,
        } = form[key];
        const { min, max } = len || {};
        const formItemClass = `json_${type + _key}`;
        setTimeout(() => this.judgeShow(formItemClass, show));
        if (value !== undefined) this.$set(this.model, key, value || "");
        if (rules.length) {
          this.rules[key] = [
            {
              validator: (o, value, callback) => {
                for (const item of rules) {
                  if (!new RegExp(item.regExp).test(value))
                    return callback(
                      new Error(item.errMsg || `${key} is invalid`)
                    );
                }
                callback();
              },
            },
          ];
        }

        const typeComponent = {
          Text: (type = "text") =>
            h("el-input", {
              props: {
                value: this.model[key],
                type,
                placeholder,
              },
              class: className,
              on: {
                input: (val) => {
                  if (val.length > max) val = val.slice(0, max);
                  that.model[key] = val;
                  that.schema.attribs[key].default = val;
                },
              },
            }),
          Email: () => typeComponent.Text(),
          RichText: () => typeComponent.Text("textarea"),
          Password: () => typeComponent.Text("password"),
          Date: () =>
            h("el-date-picker", {
              props: {
                value: this.model[key],
                class: className,
                style,
                disabled,
              },
              on: {
                input: modelValue,
              },
            }),
          Number: () =>
            h("el-input-number", {
              props: {
                value: this.model[key],
                class: className,
                style,
                disabled,
                min,
                max,
                precision,
                step,
              },
              on: {
                input: modelValue,
              },
            }),
          Enumeration: () =>
            h(
              "el-select",
              {
                props: {
                  value: this.model[key],
                  class: className,
                  style,
                  disabled,
                  placeholder,
                },
                on: {
                  input: modelValue,
                },
              },
              (options || []).map((item, i) =>
                h("el-option", {
                  props: {
                    value: item.value,
                    label: item.label,
                    disabled: item.disabled,
                  },
                })
              )
            ),
          Boolean: () =>
            h("el-switch", {
              props: {
                value: this.model[key] || false,
                class: className,
                style,
                disabled,
              },
              on: {
                input: modelValue,
              },
            }),
          Radio: (type = "radio") =>
            h(
              "el-radio-group",
              {
                props: {
                  value: this.model[key],
                  class: className,
                  style,
                  disabled,
                },
                on: {
                  input: modelValue,
                },
              },
              (options || []).map((item) =>
                h(
                  type === "radio" ? "el-radio" : "el-radio-button",
                  {
                    props: {
                      label: item.label,
                      disabled: item.disabled || false,
                      border,
                    },
                  },
                  item
                )
              )
            ),
          Checkbox: (type = "checkbox") =>
            h(
              "el-checkbox-group",
              {
                props: {
                  value: this.model[key] || [],
                  class: className,
                  style,
                  disabled,
                },
                on: {
                  input: modelValue,
                },
              },

              (options || []).map((item, i) =>
                h(
                  type === "checkbox" ? "el-checkbox" : "el-checkbox-button",
                  {
                    props: {
                      label: item.label,
                      disabled: item.disabled || false,
                      value: item.value,
                      border,
                    },
                  },
                  item
                )
              )
            ),
          CheckboxButton: () => typeComponent.Checkbox("checkboxButton"),
          RadioButton: () => typeComponent.Radio("radioButton"),
          Cascader: () =>
            h("el-cascader", {
              props: {
                value: this.model[key] || [],
                class: className,
                options: options || [],
                debounce,
                style,
                disabled,
                multiple: cascader.multiple,
                placeholder,
                filterable: true,
                "collapse-tags-tooltip": true,
              },
              on: {
                input: modelValue,
              },
            }),
          Upload: () => [
            h(
              "el-upload",
              {
                props: {
                  fileList: this.model[key] || [],
                  class: className,
                  listType: "picture-card",
                  action: "#",
                  autoUpload: false,
                  limit,
                  style,
                  disabled,
                  onChange: uploadChange,
                  onRemove: removeFile,
                  onPreview,
                  placeholder,
                },
                on: {
                  input: modelValue,
                },
              },
              [
                h("i", {
                  class: "el-icon-plus avatar-uploader-icon",
                }),
              ]
            ),
            h(
              "el-dialog",
              {
                props: {
                  visible: this.dialogShow,
                  modal: false,
                },
                on: {
                  close: () => {
                    this.dialogShow = false;
                  },
                },
              },

              [
                h("img", {
                  class: "w-full",
                  attrs: {
                    alt: "Preview Image",
                    src: this.previewSrc,
                  },
                }),
              ]
            ),
          ],
        };
        if (!type) throw new Error(`type is required in ${form}`);
        if (colorTitle) {
          styles += `
          .${formItemClass} .el-form-item__label{
            color:${colorTitle};
            ${!labelShow ? "display:none" : ""}
          }
          .el-form-item__content{
            width:100%
          }
          `;
        } else {
          styles += `

          .el-form-item__content{
            width:100%
          }
          `;
          if (!labelShow)
            styles += `.${formItemClass} .el-form-item__label{
           display:none;
          }
          `;
        }
        formList.push(
          h(
            "el-form-item",
            {
              props: {
                label,
                prop: key,
                required: !!required,
                position,
                size,
                group,
              },
              class: formItemClass,
            },
            [
              h("el-input", {
                props: {
                  value: label,
                },
                ref: formItemClass,
                class: className,
                style: "display:none",
                on: {
                  input: (val) => {
                    form[key].id = val;
                    form[key].label = val;
                  },
                  blur: () => {
                    const vm = this.$refs[formItemClass].$el;
                    vm.nextSibling.style.display = "block";
                    vm.style.display = "none";
                  },
                },
              }),
              h(
                "div",
                {
                  on: {
                    click: () => {
                      const vm = this.$refs[formItemClass].$el;
                      vm.nextElementSibling.style.display = "none";
                      vm.style.display = "block";
                      this.$nextTick(() => this.$refs[formItemClass].focus());
                    },
                  },
                  attrs: {
                    style: "height:40px;",
                  },
                },
                label
              ),
              h(
                "div",
                {
                  style:
                    "width:100%;font-size:0.25rem;display:flex;line-height:1rem;color: rgba(75, 85, 99, 0.5); margin-bottom: 0.25rem;",
                },
                description
              ),
              typeComponent[type].call(this),
            ]
          )
        );
        if (children) formList.push(...renderForm.call(this, children));
        function onPreview(uploadFile) {
          that.previewSrc = uploadFile.url;
          that.dialogShow = true;
        }
        function uploadChange(data) {
          if (!that.model[key]) that.model[key] = [];
          if (that.model[key].length < limit) that.model[key].push(data);
          that.schema.attribs[key].default = that.model[key];
        }
        function removeFile(data) {
          that.model[key].splice(data, 1);
          that.schema.attribs[key].default = that.model[key];
        }
        let that = this;
        function modelValue(val) {
          that.model[key] = val;
          that.schema.attribs[key].default = val;
        }
      }
      return formList;
    }
    function wrapper(data) {
      if (remove) remove();
      remove = addStyle(styles);
      const g1 = transformData(
        data
          .filter((item) => item.data.props.position.startsWith("0-"))
          .sort(sortIndex)
      );
      const g2 = transformData(
        data
          .filter((item) => item.data.props.position.startsWith("1-"))
          .sort(sortIndex)
      );
      const g3 = transformData(
        data
          .filter((item) => item.data.props.position.startsWith("2-"))
          .sort(sortIndex)
      );
      const result = Array.from({
        length: Math.max(g1.length, g2.length, g3.length),
      }).map((item, i) => {
        const col = [];
        const l_1 = g1[i] ? (g1[i].data && g1[i].data.props.label ? 1 : 0) : 0;
        const l_2 = g2[i] ? (g2[i].data && g2[i].data.props.label ? 1 : 0) : 0;
        const l_3 = g3[i] ? (g3[i].data && g3[i].data.props.label ? 1 : 0) : 0;
        const level = l_1 + l_2 + l_3;
        l_1 &&
          col.push(
            h(
              "el-col",
              { props: { span: level === 3 ? 8 : level === 2 ? 12 : 24 } },
              [g1[i]]
            )
          );
        l_2 &&
          col.push(
            h(
              "el-col",
              { props: { span: level === 3 ? 8 : level === 2 ? 12 : 24 } },
              [g2[i]]
            )
          );
        l_3 &&
          col.push(
            h(
              "el-col",
              { props: { span: level === 3 ? 8 : level === 2 ? 12 : 24 } },
              [g3[i]]
            )
          );
        const group = g1[i].data ? g1[i].data.props.group : undefined;
        const data = h("el-row", { props: { gutter: 10 } }, col);
        return group
          ? h("div", [
              h(
                "div",
                {
                  attrs: {
                    style: "height:40px;line-height:40px;",
                  },
                },
                group
              ),
              data,
            ])
          : data;
      });

      return result;
      function sortIndex(a, b) {
        return !b
          ? -1
          : a.data.props.position.split("-")[1] -
              b.data.props.position.split("-")[1];
      }
      function transformData(data) {
        if (!data.length) return [];
        const [col, n] = data[0].data.props.position.split("-");
        if (+n === 0) return data;
        for (let i = +n - 1; i >= 0; i--) {
          data.unshift({
            label: "",
            id: nanoid(),
          });
        }
        return data;
      }
    }
  },
};
</script>
