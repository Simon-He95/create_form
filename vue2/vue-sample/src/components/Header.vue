<script>
export default {
  name: "Header",
  props: {
    name: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "build",
    },
    message: {
      type: String,
      default: "Build the data architecture of your content",
    },
  },
  emits: ["add", "save", "drag"],
  methods: {
    add() {
      this.$emit("add");
    },
    save() {
      this.$emit("save");
    },
    drag() {
      this.$emit("drag");
    },
    create() {
      this.$emit("create");
    },
    edit() {
      this.$emit("edit");
    },
  },
};
</script>

<template>
  <div style="height: 152.984px; text-align: left">
    <div data-strapi-header="true" class="sc-cSyqtw eRZQkG">
      <div class="sc-cSyqtw eoRiGl">
        <a aria-current="page" class="sc-kLnunm gECLxk active"
          ><span aria-hidden="true" class="sc-kNzDjo sc-hUplSX jPfCWb cGIMyh"
            ><svg
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 13.3a.2.2 0 01-.2.2H5.74l8.239 8.239a.2.2 0 010 .282L12.14 23.86a.2.2 0 01-.282 0L.14 12.14a.2.2 0 010-.282L11.86.14a.2.2 0 01.282 0L13.98 1.98a.2.2 0 010 .282L5.74 10.5H23.8c.11 0 .2.09.2.2v2.6z"
                fill="#212134"
              /></svg></span
          ><span class="sc-bttaWv htjIaV">Back</span></a
        >
      </div>
      <div class="sc-cSyqtw sc-jounMn iTbWuz ULjhI">
        <div class="sc-cSyqtw sc-jounMn iTbWuz kCHDYf">
          <div id="title" class="sc-ccdLe lFjjs">
            {{ name }}
          </div>
          <div v-show="type === 'build'" class="sc-cSyqtw kjnrkO">
            <button
              aria-disabled="false"
              type="button"
              class="sc-eCImPb igeLKl sc-iCfMLu iGNcld"
              @click="edit"
            >
              <div aria-hidden="true" class="sc-hKwDye sc-gKclnd gEtyVN bEOvQm">
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M23.604 3.514c.528.528.528 1.36 0 1.887l-2.622 2.607-4.99-4.99L18.6.396a1.322 1.322 0 011.887 0l3.118 3.118zM0 24v-4.99l14.2-14.2 4.99 4.99L4.99 24H0z"
                    fill="#212134"
                  ></path>
                </svg>
              </div>
              <span class="sc-dkPtRN kZdUHC">Edit</span>
            </button>
          </div>
        </div>
        <div
          spacing="2"
          class="sc-bUbRBg sc-tAExr sc-hZpJaK cNbIkO gxNiaA hLLTdc"
        >
          <button
            v-show="type === 'build'"
            aria-disabled="false"
            type="button"
            class="sc-eCImPb igeLKl sc-iCfMLu hxJchj"
            @click="add"
          >
            <div aria-hidden="true" class="sc-hKwDye sc-gKclnd gEtyVN bEOvQm">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24 13.604a.3.3 0 01-.3.3h-9.795V23.7a.3.3 0 01-.3.3h-3.21a.3.3 0 01-.3-.3v-9.795H.3a.3.3 0 01-.3-.3v-3.21a.3.3 0 01.3-.3h9.795V.3a.3.3 0 01.3-.3h3.21a.3.3 0 01.3.3v9.795H23.7a.3.3 0 01.3.3v3.21z"
                  fill="#212134"
                />
              </svg>
            </div>
            <span class="sc-dkPtRN kZdUHC">新增</span></button
          ><button
            v-show="type === 'build'"
            type="submit"
            class="sc-eCImPb igeLKl sc-iCfMLu gFLWth"
            @click="drag"
          >
            <div aria-hidden="true" class="sc-hKwDye sc-gKclnd gEtyVN bEOvQm">
              <svg
                t="1661585043940"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="3184"
              >
                <path
                  d="M873.28 681.28a32 32 0 0 1 45.44 45.44l-128 128a32 32 0 0 1-45.44-45.44z"
                  p-id="3185"
                />
                <path
                  d="M800 832a32 32 0 0 1-64 0V256a32 32 0 0 1 64 0zM192 288a32 32 0 0 1 0-64h448a32 32 0 0 1 0 64z m0 192a32 32 0 0 1 0-64h448a32 32 0 0 1 0 64z m0 192a32 32 0 0 1 0-64h448a32 32 0 0 1 0 64z m0 192a32 32 0 0 1 0-64h448a32 32 0 0 1 0 64z"
                  p-id="3186"
                />
              </svg>
            </div>
            <span class="sc-dkPtRN kZdUHC">布局</span></button
          ><button
            v-show="type === 'build'"
            type="submit"
            class="sc-eCImPb igeLKl sc-iCfMLu gFLWth save"
            @click="save"
          >
            <div aria-hidden="true" class="sc-hKwDye sc-gKclnd gEtyVN bEOvQm">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.727 2.97a.2.2 0 01.286 0l2.85 2.89a.2.2 0 010 .28L9.554 20.854a.2.2 0 01-.285 0l-9.13-9.243a.2.2 0 010-.281l2.85-2.892a.2.2 0 01.284 0l6.14 6.209L20.726 2.97z"
                  fill="#212134"
                />
              </svg>
            </div>
            <span class="sc-dkPtRN kZdUHC">保存</span>
          </button>
          <button
            v-show="type === 'manage'"
            type="submit"
            class="sc-eCImPb igeLKl sc-iCfMLu gFLWth"
            @click="create"
          >
            <div aria-hidden="true" class="sc-hKwDye sc-gKclnd gEtyVN bEOvQm">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.727 2.97a.2.2 0 01.286 0l2.85 2.89a.2.2 0 010 .28L9.554 20.854a.2.2 0 01-.285 0l-9.13-9.243a.2.2 0 010-.281l2.85-2.892a.2.2 0 01.284 0l6.14 6.209L20.726 2.97z"
                  fill="#212134"
                />
              </svg>
            </div>
            <span class="sc-dkPtRN kZdUHC">新增</span>
          </button>
        </div>
      </div>
      <div class="sc-ccdLe gZrVtp">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<style scoped>
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
.kjnrkO {
  padding-left: 16px;
}
.iGNcld {
  -webkit-box-align: center;
  align-items: center;
  padding: 8px 16px;
  border: 1px solid rgb(220, 220, 228);
  background: rgb(255, 255, 255);
}
.gECLxk {
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  text-decoration: none;
  position: relative;
  outline: none;
}

.cGIMyh {
  display: flex;
}

.jPfCWb {
  padding-right: 8px;
}

.gECLxk::after {
  transition-property: all;
  transition-duration: 0.2s;
  border-radius: 8px;
  content: "";
  position: absolute;
  inset: -4px;
  border: 2px solid transparent;
}

.gECLxk svg {
  font-size: 0.625rem;
}

.gECLxk svg path {
  fill: rgb(73, 69, 255);
}

.htjIaV {
  color: rgb(73, 69, 255);
  font-size: 0.75rem;
  line-height: 1.33;
}

.kCHDYf {
  -webkit-box-align: center;
  align-items: center;
  display: flex;
  flex-direction: row;
}

.gxNiaA {
  -webkit-box-align: center;
  align-items: center;
  display: flex;
  flex-direction: row;
}

.lFjjs {
  color: rgb(50, 50, 77);
  font-weight: 600;
  font-size: 2rem;
  line-height: 1.25;
}

.hLLTdc > * {
  margin-left: 0px;
  margin-right: 0px;
}

.hxJchj {
  -webkit-box-align: center;
  align-items: center;
  padding: 8px 16px;
  border: 1px solid rgb(217, 216, 255);
  background: rgb(240, 240, 255);
}

.save:hover {
  background-color: rgb(198, 240, 194) !important;
  border: rgb(198, 240, 194) !important ;
}

.gFLWth:hover {
  border: 1px solid rgb(123, 121, 255);
  background: rgb(123, 121, 255);
}
.gFLWth[aria-disabled="true"] {
  border: 1px solid rgb(220, 220, 228);
  background: rgb(234, 234, 239);
}

.gFLWth svg > g,
.gFLWth svg path {
  fill: rgb(255, 255, 255);
}
.gFLWth .sc-dkPtRN {
  color: rgb(255, 255, 255);
}
.iGNcld .sc-hKwDye {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
}
.igeLKl[aria-disabled="true"] {
  pointer-events: none;
}

.hLLTdc > * + * {
  margin-left: 8px;
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
  border-radius: 4px;
  border: 1px solid rgb(220, 220, 228);
  position: relative;
  outline: none;
}

.gFLWth .sc-hKwDye {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
}

.bEOvQm {
  height: 100%;
}
.iGNcld .sc-dkPtRN {
  color: rgb(50, 50, 77);
}
.gEtyVN {
  padding-right: 8px;
}

.gFLWth[aria-disabled="true"] .sc-dkPtRN {
  color: rgb(102, 102, 135);
}

.kZdUHC {
  font-weight: 600;
  color: rgb(50, 50, 77);
  font-size: 0.75rem;
  line-height: 1.33;
}

.hxJchj:hover {
  background-color: rgb(255, 255, 255);
}

.hxJchj .sc-hKwDye {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
}

.hxJchj svg > g,
.hxJchj svg path {
  fill: rgb(39, 31, 224);
}

.hxJchj .sc-dkPtRN {
  color: rgb(39, 31, 224);
}

.hxJchj {
  -webkit-box-align: center;
  align-items: center;
  padding: 8px 16px;
  border: 1px solid rgb(217, 216, 255);
  background: rgb(240, 240, 255);
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

.igeLKl svg {
  height: 12px;
  width: 12px;
}

.gFLWth[aria-disabled="true"] svg > g,
.gFLWth[aria-disabled="true"] svg path {
  fill: rgb(102, 102, 135);
}
</style>
