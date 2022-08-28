<script>
export default {
  name: "Footer",
  emits: ["cancel", "confirm"],
  props: {
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    confirm() {
      this.$emit("confirm");
    },
    deleteHandler() {
      this.$emit("delete");
    },
  },
};
</script>

<template>
  <div class="sc-cTAIfT sc-dYtuZ pmygK bkSVwu">
    <div class="sc-cTAIfT sc-ihINtW oSriV gREqRk">
      <div class="sc-cTAIfT sc-ihINtW sc-hAWBJg oSriV hhwqdj icqNfP">
        <button
          aria-disabled="false"
          type="button"
          class="sc-eCImPb igeLKl sc-iCfMLu iGNcld"
          @click="cancel"
        >
          <span class="sc-dkPtRN kZdUHC">Cancel</span>
        </button>
      </div>
      <div class="sc-cTAIfT sc-ihINtW sc-hAWBJg oSriV hhwqdj icqNfP">
        <button
          v-show="isDelete"
          aria-disabled="false"
          type="submit"
          class="sc-eCImPb igeLKl sc-iCfMLu iGJHaF"
          @click="deleteHandler"
        >
          <span class="sc-dkPtRN kZdUHC">Delete</span>
        </button>
        <button
          aria-disabled="false"
          type="submit"
          class="sc-eCImPb igeLKl sc-iCfMLu hxJchj"
          @click="confirm"
        >
          <span class="sc-dkPtRN kZdUHC">Continue</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bkSVwu {
  border-radius: 0px 0px 4px 4px;
  border-top: 1px solid rgb(234, 234, 239);
}

.pmygK {
  background: rgb(246, 246, 249);
  padding: 16px 20px;
}
.iGJHaF {
  -webkit-box-align: center;
  align-items: center;
  padding: 8px 16px !important;
  border: 1px solid rgb(208, 43, 32) !important;
  background: rgb(208, 43, 32) !important;
}
.iGJHaF .sc-dkPtRN {
  color: rgb(255, 255, 255);
}
.hxJchj {
  margin-left: 8px;
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

.hxJchj {
  -webkit-box-align: center;
  align-items: center;
  padding: 8px 16px;
  border: 1px solid rgb(217, 216, 255);
  background: rgb(240, 240, 255);
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

.hxJchj .sc-dkPtRN {
  color: rgb(39, 31, 224);
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
</style>
