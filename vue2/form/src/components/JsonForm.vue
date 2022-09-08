<script>
import { nanoid } from "nanoid";
function addStyle(str) {
  const s = document.createElement("style");
  s.type = "text/css";
  s.innerHTML = str;
  document.head.appendChild(s);
  return () => document.head.removeChild(s);
}

function isPlanObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}

let remove;
let styles = "";
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
      groupData: {},
      dialogShow: false,
      previewSrc: "",
      count: 0,
      groupKeys: [],
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
      this.groupKeys.forEach((key) => {
        this.model[key] = this.model[key].map((item) => {
          Object.keys(item).forEach((_key) => {
            const value = item[_key];
            if (isPlanObject(value) && value.value) item[_key] = value.value;
          });
          return item;
        });
      });
      return this.model;
    },
    validators(validator, key, rules) {
      if (validator) {
        this.rules[key] = [
          {
            validator,
          },
        ];
      } else if (rules.length) {
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
    },
    onPreview(uploadFile) {
      this.previewSrc = uploadFile.url;
      this.dialogShow = true;
    },
    uploadChange(data) {
      if (!this.model[key]) this.model[key] = [];
      if (this.model[key].length < limit) this.model[key].push(data);
      this.schema.attribs[key].default = this.model[key];
    },
    removeFile(data) {
      this.model[key].splice(data, 1);
      this.schema.attribs[key].default = this.model[key];
    },
    modelValue(val, model, key) {
      this.$set(model, key, val);
      // this.schema.attribs[key].default = val;
    },
    getTypeComponent(h, form, model, key) {
      let flag = false;
      if (key === true) {
        flag = true;
        key = undefined;
      }
      const {
        type,
        cascader,
        date,
        class: className,
        multiple,
        default: value,
        style,
        len,
        options,
        disabled,
        border,
        precision,
        upload = {},
        step,
        debounce = 300,
        placeholder,
        group,
        key: mapKey,
        label,
        customRender,
        description,
        required,
      } = form[key] || form;
      if (key && value) model[key] = value;
      key = key || mapKey;
      const { min, max } = len || {};
      if (group) {
        return this.renderGroup(group, h, form, model, key);
      }
      const typeComponent = {
        Text: (type = "text") =>
          h("Input", {
            props: {
              value: model[key],
              type,
              maxlength: max,
              placeholder,
              disabled,
              key,
            },
            class: className,
            on: {
              input: (val) => this.modelValue(val, model, key),
            },
          }),
        Email: () => typeComponent.Text(),
        RichText: () => typeComponent.Text("textarea"),
        Password: () => typeComponent.Text("password"),
        Date: () => {
          const { type, format } = date || {};
          switch (type) {
            case "time":
              return h("TimePicker", {
                props: {
                  value: model[key] || "",
                  type: "time",
                  confirm: true,
                  placeholder,
                  disabled,
                },
                on: {
                  input: (val) => this.modelValue(val, model, key),
                },
              });
            case "timezone":
              return h("TimePicker", {
                props: {
                  value: model[key] || [],
                  type: "timerange",
                  confirm: true,
                  disabled,
                },
                on: {
                  input: (val) => this.modelValue(val, model, key),
                },
              });
            case "datetime":
              return h("DatePicker", {
                props: {
                  value: model[key] || "",
                  type: "datetime",
                  format,
                  placeholder,
                },
                on: {
                  input: (val) => this.modelValue(val, model, key),
                },
              });
            case "datetimezone":
              return h("DatePicker", {
                props: {
                  value: model[key] || [],
                  type: "datetimerange",
                  format,
                  disabled,
                },
                on: {
                  input: (val) => this.modelValue(val, model, key),
                },
              });
            case "datezone":
              return h("DatePicker", {
                props: {
                  value: model[key],
                  type: "daterange",
                  format,
                  disabled,
                },
                on: {
                  input: (val) => this.modelValue(val, model, key),
                },
              });
            default:
              return h("DatePicker", {
                props: {
                  value: model[key],
                  type: "date",
                  placeholder,
                  format,
                  disabled,
                },
                on: {
                  input: (val) => this.modelValue(val, model, key),
                },
              });
          }
        },
        Number: () =>
          h("InputNumber", {
            props: {
              value: model[key] ? model[key] : null,
              class: className,
              style,
              disabled,
              min: min || undefined,
              max: max || undefined,
              precision,
              step,
            },
            on: {
              input: (val) => this.modelValue(val, model, key),
            },
          }),
        Enumeration: () =>
          h(
            "Select",
            {
              props: {
                value: isPlanObject(model[key]) ? model[key].value : model[key],
                class: className,
                style,
                disabled,
                placeholder,
                multiple,
                labelInValue: true,
              },
              on: {
                "on-change": (val) => this.modelValue(val, model, key),
              },
            },
            (options || []).map((item, i) =>
              h("Option", {
                props: {
                  value: item.value,
                  label: item.label,
                  disabled: item.disabled,
                },
              })
            )
          ),
        Boolean: () =>
          h("i-switch", {
            props: {
              value: model[key] || false,
              class: className,
              style,
              disabled,
            },
            on: {
              input: (val) => this.modelValue(val, model, key),
            },
          }),
        Radio: (type = "radio") =>
          h(
            "RadioGroup",
            {
              props: {
                value: model[key],
                class: className,
                style,
                disabled,
              },
              on: {
                input: (val) => this.modelValue(val, model, key),
              },
            },
            (options || []).map((item) =>
              h(
                type === "radio" ? "Radio" : "Radio-button",
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
            "CheckboxGroup",
            {
              props: {
                value: model[key] || [],
                class: className,
                style,
                disabled,
              },
              on: {
                input: (val) => this.modelValue(val, model, key),
              },
            },

            (options || []).map((item, i) =>
              h(
                type === "checkbox" ? "Checkbox" : "Checkbox-button",
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
          h("Cascader", {
            props: {
              value: model[key] || [],
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
              input: (val) => this.modelValue(val, model, key),
            },
          }),
        Upload: () => [
          h(
            "Upload",
            {
              props: {
                fileList: model[key] || [],
                class: className,
                action: upload.action || "#",
                autoUpload: false,
                multiple: !!upload.multiple,
                headers: upload.headers || {},
                data: upload.data || {},
                maxSize: upload.maxSize,
                accept: upload.accept,
                type: "drag",
                disabled,
                onChange: this.uploadChange,
                onRemove: this.removeFile,
                onPreview: this.onPreview,
              },
              style: "display: inline-block;width:58px;",
              on: {
                input: this.modelValue,
              },
            },
            [
              h(
                "div",
                {
                  style: "width: 58px;height:58px;line-height: 58px;",
                },
                [
                  h("Icon", {
                    type: "ios-camera",
                    props: {
                      type: "ios-camera",
                      size: 20,
                    },
                  }),
                ]
              ),
            ]
          ),
          h(
            "Modal",
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

      return flag
        ? h(
            "FormItem",
            {
              props: {
                label,
                prop: key,
                required: !!required,
              },
              class: `json_${nanoid()} mb4!`,
            },
            [
              h(
                "div",
                {
                  style:
                    "width:100%;font-size:0.25rem;display:flex;line-height:1rem;color: rgba(75, 85, 99, 0.5); margin-bottom: 0.25rem;",
                },
                description
              ),
              customRender
                ? customRender(h, function (val) {
                    model[key] = val;
                  })
                : typeComponent[type](),
            ]
          )
        : typeComponent[type]
        ? typeComponent[type]()
        : "";
    },
    renderGroup(group, h, form, model, key) {
      return h("div", [
        group.map((item) =>
          this.getTypeComponent(h, item, this.groupData[key], true)
        ),
        h(
          "Button",
          {
            on: {
              click: () => {
                model[key].push(
                  JSON.parse(JSON.stringify(this.groupData[key]))
                );
                Object.keys(this.groupData[key]).forEach(
                  (k) => (this.groupData[key][k] = "")
                );
                this.forceUpdate();
              },
            },
          },
          "新增"
        ),
        model[key]
          ? h(
              "div",
              model[key].map((item, i) =>
                h(
                  "Tag",
                  {
                    props: {
                      closable: true,
                    },
                    on: {
                      "on-close": () => {
                        model[form[key].key].splice(i, 1);
                        this.forceUpdate();
                      },
                    },
                  },
                  item
                    ? Object.values(item)
                        .map((i) => (isPlanObject(i) ? i.label : i))
                        .join(" / ")
                    : ""
                )
              )
            )
          : "",
      ]);
    },
    renderForm(h, form = {}) {
      let filters = [];
      const groupKeys = [];
      Object.keys(form).forEach((key) => {
        const item = form[key];
        if (!item.group) return;
        groupKeys.push(item.key);
        filters = [...new Set([...filters, ...item.filters])];
        if (!this.groupData[item.key]) this.$set(this.groupData, item.key, {});
        this.model[item.key] = this.model[item.key] || [];
      });
      this.groupKeys = groupKeys;
      filters.forEach((filter) => delete form[filter]);
      return Object.keys(form).reduce((formList, key) => {
        const {
          colorTitle,
          label,
          rules = [],
          required,
          description,
          show,
          validator,
          customRender,
        } = form[key];
        const formItemClass = `json_${nanoid()}`;
        setTimeout(() => this.judgeShow(formItemClass, show));

        // 规则检验
        this.validators(validator, key, rules);

        // 注入style
        this.insertStyle(colorTitle, formItemClass, label);

        formList.push(
          h(
            "FormItem",
            {
              props: {
                label,
                prop: key,
                required: !!required,
              },
              class: formItemClass,
            },
            [
              h(
                "div",
                {
                  class: "mb1 w-full text-1 flex lh-1 text-gray-500",
                },
                description
              ),
              customRender
                ? customRender(h, function (val) {
                    this.model[key] = val;
                  })
                : this.getTypeComponent(h, form, this.model, key),
            ]
          )
        );
        return formList;
      }, []);
    },
    insertStyle(colorTitle, formItemClass, labelShow) {
      styles += `
      .${formItemClass} .ivu-form-item-label{
          padding:0!important;
          margin-bottom:4px;
        }
      `;
      if (colorTitle) {
        styles += `
                .${formItemClass} .ivu-form-item-label{
                  color:${colorTitle};
                  ${!labelShow ? "visibility: hidden" : ""}
                }
                `;
      } else if (!labelShow) {
        styles += `.${formItemClass} .ivu-form-item-label{
            visibility: hidden;
                }
                `;
      }
    },
    forceUpdate() {
      this.count++;
    },
  },
  render(h) {
    this.count;
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
              "Form",
              {
                props: {
                  ref: "formEl",
                  model: this.model,
                  rules: this.rules,
                  class: this.schema.class,
                },
              },
              wrapper.call(this, this.renderForm(h, this.schema.attribs))
            ),
          ]
        )
      : "";

    function wrapper(data = []) {
      if (remove) remove();
      remove = addStyle(styles);
      return data;
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
              "Col",
              { props: { span: level === 3 ? 8 : level === 2 ? 12 : 24 } },
              [g1[i]]
            )
          );
        l_2 &&
          col.push(
            h(
              "Col",
              { props: { span: level === 3 ? 8 : level === 2 ? 12 : 24 } },
              [g2[i]]
            )
          );
        l_3 &&
          col.push(
            h(
              "Col",
              { props: { span: level === 3 ? 8 : level === 2 ? 12 : 24 } },
              [g3[i]]
            )
          );
        const group = g1[i].data ? g1[i].data.props.group : undefined;
        const data = h("Row", { props: { gutter: 10 } }, col);
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
