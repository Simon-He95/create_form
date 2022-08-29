<script>
import draggable from "vuedraggable";
import { nanoid } from "nanoid";
export default {
  name: "Drag",
  components: {
    Draggable: draggable,
  },
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      list1: [],
      list2: [],
      list3: [],
      returnValue: {},
    };
  },
  computed: {
    isShow() {
      return Object.keys(this.data.attribs).length;
    },
  },
  watch: {
    list1: {
      handler() {
        const lis1 = this.list1.length - 1;
        const lis2 = this.list2.length - 1;
        const lis3 = this.list3.length - 1;
        const max = Math.max(lis1, lis2, lis3);
        for (let i = 0; i < max - lis2 - 1; i++) {
          const id = `${nanoid()}empty`;
          this.list2.push({ label: "", id });
        }
        for (let i = 0; i < max - lis3 - 1; i++) {
          const id = `${nanoid()}empty-1`;
          this.list3.push({ label: "", id });
        }
      },
      immediate: true,
    },
  },
  methods: {
    update() {
      debugger
      this.returnValue = {};
      if (this.data) {
        const { attribs } = this.data;
        const map = Object.keys(attribs).map((key) => attribs[key]);
        const l1 = map
          .filter((item) => item.position.startsWith("0-"))
          .sort(sortIndex);
        const l2 = map
          .filter((item) => item.position.startsWith("1-"))
          .sort(sortIndex);
        const l3 = map
          .filter((item) => item.position.startsWith("2-"))
          .sort(sortIndex);
        function sortIndex(a, b) {
          return a.position.split("-")[1] - b.position.split("-")[1];
        }
        this.list1 = this.transformData(l1);
        this.list2 = this.transformData(l2);
        this.list3 = this.transformData(l3);
        this.moveEnd();
      }
    },
    transformData(data) {
      if (!data.length) return data;
      const [col, n] = data[0].position.split("-");
      if (+n === 0) return data;
      for (let i = +n - 1; i >= 0; i--) {
        data.unshift({
          label: "",
          id: nanoid(),
        });
      }
      return data;
    },
    save() {
      [this.list1, this.list2, this.list3].forEach((list, i) =>
        this.addPosition(list, i)
      );
      return this.returnValue;
    },
    addPosition(list, key) {
      list.forEach((item, idx) => {
        if (!item.label) return;
        item.position = `${key}-${idx}`;
        this.returnValue[item.id] = item;
      });
    },
    moveEnd() {
      const lis1 = this.list1.length;
      const lis2 = this.list2.length;
      const lis3 = this.list3.length;
      const max = Math.max(lis1, lis2, lis3);
      for (let i = 0; i <= max; i++) {
        const l1 = this.list1[i] ? this.list1[i].label : "";
        const l2 = this.list2[i] ? this.list2[i].label : "";
        const l3 = this.list3[i] ? this.list3[i].label : "";
        if (!l1 && !l2 && !l3) {
          this.list1.splice(i, 1);
          this.list2.splice(i, 1);
          this.list3.splice(i, 1);
        }
      }
      console.log(this.list1, this.list2, this.list3);
    },
  },
};
</script>

<template>
  <div v-show="isShow">
    <div class="wrapper" border-1 border-black border-rd-1 w-200 ma>
      <Draggable v-model="list1" class="list-group" group="people" item-key="label" @end="moveEnd">
        <div v-for="element in list1" :key="element.id" class="list-group-item" h-10 :class="element.label ? 'bd' : ''">
          {{  element.label.trim()  }}
        </div>
      </Draggable>

      <Draggable class="list-group" :list="list2" group="people" item-key="label" @end="moveEnd">
        <div v-for="element in list2" :key="element.id" class="list-group-item" :class="element.label ? 'bd' : ''">
          {{  element.label.trim()  }}
        </div>
      </Draggable>
      <Draggable class="list-group" :list="list3" group="people" item-key="label" @end="moveEnd">
        <div v-for="element in list3" :key="element.id" class="list-group-item" :class="element.label ? 'bd' : ''">
          {{  element.label.trim()  }}
        </div>
      </Draggable>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  gap: 0.5rem;
  padding: 16px;
  border-radius: 4px;
  border-style: dashed;
  border-width: 1px;
  border-color: rgb(192, 192, 207);
}

.list-group {
  width: 100%;
}

.list-group-item {
  width: 100%;
  width: 100%;
  min-height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
}

.bd {
  background: rgb(246, 246, 249);
  border-radius: 4px;
  border: 1px solid rgb(234, 234, 239);
}
</style>
