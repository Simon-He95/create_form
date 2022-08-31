<script setup lang="ts">
import { Form } from '@json-manage/form'
import { useLocalStorage } from '@vueuse/core'
const data = ref<Record<string, any>>({
  attribs: {},
})
const formEl = ref()
const store = useLocalStorage<any>('store', ref({}))
const createShow = ref(false)
const name = ref('')
console.log(store.value)
const formList = reactive(Object.keys(store.value).map(item => ({ name: item })))
const current = ref<any>('')

function switchForm(i: any) {
  current.value = i
  const { name: curname } = formList[i]
  name.value = curname
}
function resetData() {
  current.value = ''
  name.value = ''
}
function createForm() {
  resetData()
  createShow.value = true
}
function next() {
  if (!name.value)
    return
  const newVal = {
    name: name.value,
  }
  if (current.value === '')
    formList.push(newVal)
  else
    formList[current.value] = newVal

  createShow.value = false
  resetData()
}
function editCreate() {
  createShow.value = true
}
function addField() {
  console.log(formEl.value)
  formEl.value.add()
}
function sortField() {
  formEl.value.sort()
}
function save() {
  console.log(formList, formEl.value.getFormData())
  store.value[name.value] = formEl.value.getFormData()
}
</script>

<template>
  <div id="json_form">
    <div font-sans p="x-4 y-10" text="center gray-700 dark:gray-200" flex="~">
      <div class="sc-dbqYyY sc-dOkGYn sc-jRSqCh jStIwK kpsMfe bUDExf" style="margin-right:20px" inline-flex w-50>
        <ol v-for="(item, i) in formList" id="subnav-list-4" :key="i">
          <li @click="switchForm(i)">
            <a class="sc-dbqYyY sc-cjwcjg joRjZF cfdPXz" :class="[
              current === i ? 'active' : '',
            ]" aria-current="page">
              <div class="sc-dbqYyY sc-dOkGYn jStIwK dNHUsO">
                <svg width="1em" height="1em" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg"
                  class="sc-kHTDnN cWLdcV">
                  <rect width="4" height="4" rx="2" fill="#A5A5BA" />
                </svg>
                <div class="sc-dbqYyY fvhnfw">
                  <span class="sc-lliPmu imwrmp">{{  item.name  }}</span>
                </div>
              </div>
            </a>
          </li>
        </ol>
        <div class="sc-gsDKAQ hjVlqg">
          <button aria-disabled="false" type="button" class="sc-fUCuFg sc-dSaQTq sc-HEwFl fZLKQx ciPgPo cJJTYc"
            @click="createForm">
            <span aria-hidden="true" class="sc-fUCuFg cLNaEJ"><svg width="1em" height="1em" viewBox="0 0 24 24"
                fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M24 13.604a.3.3 0 01-.3.3h-9.795V23.7a.3.3 0 01-.3.3h-3.21a.3.3 0 01-.3-.3v-9.795H.3a.3.3 0 01-.3-.3v-3.21a.3.3 0 01.3-.3h9.795V.3a.3.3 0 01.3-.3h3.21a.3.3 0 01.3.3v9.795H23.7a.3.3 0 01.3.3v3.21z"
                  fill="#212134" />
              </svg></span><span class="sc-hKysef kvRZkV">Create new collection type</span>
          </button>
        </div>
      </div>

      <!-- <div m-t-5>
      <Button @click="toJson">
        To Json
      </Button>
    </div> -->
      <div v-show="current !== ''" w-300>
        <div data-strapi-header="true" class="sc-cSyqtw eRZQkG">
          <div class="sc-cSyqtw eoRiGl">
            <a aria-current="page" class="sc-kLnunm gECLxk active"><span aria-hidden="true"
                class="sc-kNzDjo sc-hUplSX jPfCWb cGIMyh"><svg width="1em" height="1em" viewBox="0 0 24 24" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M24 13.3a.2.2 0 01-.2.2H5.74l8.239 8.239a.2.2 0 010 .282L12.14 23.86a.2.2 0 01-.282 0L.14 12.14a.2.2 0 010-.282L11.86.14a.2.2 0 01.282 0L13.98 1.98a.2.2 0 010 .282L5.74 10.5H23.8c.11 0 .2.09.2.2v2.6z"
                    fill="#212134" />
                </svg></span><span class="sc-bttaWv htjIaV">Back</span></a>
          </div>
          <div class="sc-cSyqtw sc-jounMn iTbWuz ULjhI">
            <div class="sc-cSyqtw sc-jounMn iTbWuz kCHDYf">
              <h1 id="title" class="sc-ccdLe lFjjs">
                {{  name  }}
              </h1>
              <div class="sc-cSyqtw kjnrkO">
                <button aria-disabled="false" type="button" class="sc-eCImPb igeLKl sc-iCfMLu iGNcld"
                  @click="editCreate">
                  <div aria-hidden="true" class="sc-hKwDye sc-gKclnd gEtyVN bEOvQm">
                    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M23.604 3.514c.528.528.528 1.36 0 1.887l-2.622 2.607-4.99-4.99L18.6.396a1.322 1.322 0 011.887 0l3.118 3.118zM0 24v-4.99l14.2-14.2 4.99 4.99L4.99 24H0z"
                        fill="#212134" />
                    </svg>
                  </div><span class="sc-dkPtRN kZdUHC">Edit</span>
                </button>
              </div>
            </div>
            <div spacing="2" class="sc-bUbRBg sc-tAExr sc-hZpJaK cNbIkO gxNiaA hLLTdc">
              <button aria-disabled="false" type="button" class="sc-eCImPb igeLKl sc-iCfMLu hxJchj" @click="addField">
                <div aria-hidden="true" class="sc-hKwDye sc-gKclnd gEtyVN bEOvQm">
                  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M24 13.604a.3.3 0 01-.3.3h-9.795V23.7a.3.3 0 01-.3.3h-3.21a.3.3 0 01-.3-.3v-9.795H.3a.3.3 0 01-.3-.3v-3.21a.3.3 0 01.3-.3h9.795V.3a.3.3 0 01.3-.3h3.21a.3.3 0 01.3.3v9.795H23.7a.3.3 0 01.3.3v3.21z"
                      fill="#212134" />
                  </svg>
                </div><span class="sc-dkPtRN kZdUHC">Add another field</span>
              </button><button aria-disabled="false" type="button" class="sc-eCImPb igeLKl sc-iCfMLu hxJchj"
                @click="sortField">
                <div aria-hidden="true" class="sc-hKwDye sc-gKclnd gEtyVN bEOvQm">
                  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M24 13.604a.3.3 0 01-.3.3h-9.795V23.7a.3.3 0 01-.3.3h-3.21a.3.3 0 01-.3-.3v-9.795H.3a.3.3 0 01-.3-.3v-3.21a.3.3 0 01.3-.3h9.795V.3a.3.3 0 01.3-.3h3.21a.3.3 0 01.3.3v9.795H23.7a.3.3 0 01.3.3v3.21z"
                      fill="#212134" />
                  </svg>
                </div><span class="sc-dkPtRN kZdUHC">Sort field</span>
              </button><button type="submit" style="align-items: center;" class="sc-eCImPb igeLKl sc-iCfMLu gFLWth"
                @click="save">
                <div aria-hidden="true" class="sc-hKwDye sc-gKclnd gEtyVN bEOvQm">
                  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M20.727 2.97a.2.2 0 01.286 0l2.85 2.89a.2.2 0 010 .28L9.554 20.854a.2.2 0 01-.285 0l-9.13-9.243a.2.2 0 010-.281l2.85-2.892a.2.2 0 01.284 0l6.14 6.209L20.726 2.97z"
                      fill="#212134" />
                  </svg>
                </div><span class="sc-dkPtRN kZdUHC">Save</span>
              </button>
            </div>
          </div>
          <p class="sc-ccdLe gZrVtp">
            Build the data architecture of your content
          </p>
        </div>
        <Form ref="formEl" :data="data" w-full />
      </div>
    </div>

    <Modal v-model="createShow" title="Create a collection type" width="30%">
      <div class="sc-gsDKAQ eFNFqr">
        <div>
          <div id="tabs-0-tabpanel" role="tabpanel" tabindex="0" aria-labelledby="tabs-0-tab">
            <div spacing="6" class="sc-bUbRBg sc-tAExr sc-dSfdvi cNbIkO dnrnLU eKrzGO">
              <div class="sc-gsDKAQ kMJSxT">
                <div class="sc-eZKLwX sc-bhnkmi dlOeuv ifvhOp">
                  <div class="sc-eqUgKp ejzBKL">
                    <div class="sc-eZKLwX dlOeuv">
                      <div>
                        <div>
                          <div spacing="1" class="sc-bGaVxB sc-fydGpi sc-dcgwPl dYaiIs eQrnpH kNXjGB">
                            <label for="displayName" class="sc-gnnDb fKPMiM">
                              <div class="sc-bGaVxB sc-fydGpi dYaiIs fVgflz">Display name</div>
                            </label>
                            <div class="sc-bGaVxB sc-fydGpi sc-gHjyzD dYaiIs dobAWM jsDPfk">
                              <input id="displayName" v-model="name" name="displayName" aria-invalid="false"
                                aria-disabled="false" placeholder="" type="text" class="sc-JEhMO iRbbcP">
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <div class="sc-cTAIfT sc-dYtuZ pmygK bkSVwu">
            <div class="sc-cTAIfT sc-ihINtW oSriV gREqRk">
              <div class="sc-cTAIfT sc-ihINtW sc-hAWBJg oSriV hhwqdj icqNfP" @click="createShow = false"><button
                  aria-disabled="false" type="button" class="sc-eCImPb igeLKl sc-iCfMLu iGNcld"><span
                    class="sc-dkPtRN kZdUHC">Cancel</span></button></div>
              <div class="sc-cTAIfT sc-ihINtW sc-hAWBJg oSriV hhwqdj icqNfP" @click="next"><button aria-disabled="false"
                  type="submit" class="sc-eCImPb igeLKl sc-iCfMLu hxJchj"><span
                    class="sc-dkPtRN kZdUHC">Continue</span></button>
              </div>
            </div>
          </div>
        </span>
      </template>
    </Modal>
  </div>
</template>

<style>
#json_form .Modal__footer {
  padding: 0 !important
}

.eRZQkG {
  background: rgb(246, 246, 249);
  padding: 24px 56px 40px;
}

.eoRiGl {
  padding-bottom: 8px;
  text-align: left;
}

.bEOvQm {
  height: 100%;
}

.gFLWth .sc-hKwDye {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
}

.ULjhI {
  -webkit-box-align: center;
  align-items: center;
  display: flex;
  flex-direction: row;
  -webkit-box-pack: justify;
  justify-content: space-between;
}

.kCHDYf {
  -webkit-box-align: center;
  align-items: center;
  display: flex;
  flex-direction: row;
}

.hLLTdc>* {
  margin-left: 0px;
  margin-right: 0px;
}

.hxJchj .sc-hKwDye {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
}

.bEOvQm {
  height: 100%;
}

.gFLWth[aria-disabled="true"] {
  border: 1px solid rgb(220, 220, 228);
  background: rgb(234, 234, 239);
}

.iGNcld {
  -webkit-box-align: center;
  align-items: center;
  padding: 8px 16px;
  border: 1px solid rgb(220, 220, 228);
  background: rgb(255, 255, 255);
}

.gZrVtp {
  color: rgb(102, 102, 135);
  font-size: 1rem;
  line-height: 1.5;
  text-align: left;
}

.lFjjs {
  color: rgb(50, 50, 77);
  font-weight: 600;
  font-size: 2rem;
  line-height: 1.25;
}

.igeLKl[aria-disabled="true"] {
  pointer-events: none;
}

.hLLTdc>*+* {
  margin-left: 8px;
}

.gEtyVN {
  padding-right: 8px;
}

.kjnrkO {
  padding-left: 16px;
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

.iGNcld .sc-hKwDye {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
}

.bEOvQm {
  height: 100%;
}

.gEtyVN {
  padding-right: 8px;
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

.gxNiaA {
  -webkit-box-align: center;
  align-items: center;
  display: flex;
  flex-direction: row;
}

.gZrVtp {
  color: rgb(102, 102, 135);
  font-size: 1rem;
  line-height: 1.5;
}

.gECLxk {
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  text-decoration: none;
  position: relative;
  outline: none;
}

.jPfCWb {
  padding-right: 8px;
}

.cGIMyh {
  display: flex;
}

.htjIaV {
  color: rgb(73, 69, 255);
  font-size: 0.75rem;
  line-height: 1.33;
}

.gECLxk svg {
  font-size: 0.625rem;
}

.gECLxk svg path {
  fill: rgb(73, 69, 255);
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

.bkSVwu {
  border-radius: 0px 0px 4px 4px;
  border-top: 1px solid rgb(234, 234, 239);
}

.pmygK {
  background: rgb(246, 246, 249);
  padding: 16px 20px;
}

.hxJchj {
  -webkit-box-align: center;
  align-items: center;
  padding: 8px 16px;
  border: 1px solid rgb(217, 216, 255);
  background: rgb(240, 240, 255);
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

.iGNcld .sc-dkPtRN {
  color: rgb(50, 50, 77);
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

.igeLKl::after {
  transition-property: all;
  transition-duration: 0.2s;
  border-radius: 8px;
  content: "";
  position: absolute;
  inset: -4px;
  border: 2px solid transparent;
}

.kNXjGB>*+* {
  margin-top: 4px;
}

.dnrnLU {
  -webkit-box-align: stretch;
  align-items: stretch;
  display: flex;
  flex-direction: column;
}

.eKrzGO>* {
  margin-top: 0px;
  margin-bottom: 0px;
}

.ifvhOp {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 16px;
}

.ejzBKL {
  grid-column: span 6 / auto;
  max-width: 100%;
}

.eQrnpH {
  -webkit-box-align: stretch;
  align-items: stretch;
  display: flex;
  flex-direction: column;
}

.kNXjGB>* {
  margin-top: 0px;
  margin-bottom: 0px;
}

.fKPMiM {
  font-weight: 600;
  color: rgb(50, 50, 77);
  font-size: 0.75rem;
  line-height: 1.33;
}

.fVgflz {
  -webkit-box-align: center;
  align-items: center;
  display: flex;
  flex-direction: row;
}

.kNXjGB>*+* {
  margin-top: 4px;
}

.kNXjGB>* {
  margin-top: 0px;
  margin-bottom: 0px;
}

.jsDPfk {
  border: 1px solid rgb(220, 220, 228);
  border-radius: 4px;
  background: rgb(255, 255, 255);
  outline: none;
  transition-property: border-color, box-shadow, fill;
  transition-duration: 0.2s;
}

.dobAWM {
  margin-top: 4px;
  -webkit-box-align: center;
  align-items: center;
  display: flex;
  flex-direction: row;
  -webkit-box-pack: justify;
  justify-content: space-between;
}

.iRbbcP {
  border: none;
  border-radius: 4px;
  padding: 0.65625rem 16px;
  color: rgb(50, 50, 77);
  font-weight: 400;
  font-size: 0.875rem;
  display: block;
  width: 100%;
  background: inherit;
}

.hjVlqg {
  padding-left: 32px;
}

.cJJTYc {
  background: transparent;
  border: none;
  position: relative;
  outline: none;
}

.ciPgPo {
  -webkit-box-align: center;
  align-items: center;
  display: flex;
  flex-direction: row;
}

.fZLKQx {
  margin-top: 8px;
}

.cLNaEJ {
  padding-right: 8px;
}

.kvRZkV {
  color: rgb(73, 69, 255);
  font-size: 0.75rem;
  line-height: 1.33;
}

.cJJTYc svg path {
  fill: rgb(73, 69, 255);
}

.cJJTYc::after {
  transition-property: all;
  transition-duration: 0.2s;
  border-radius: 8px;
  content: "";
  position: absolute;
  inset: -4px;
  border: 2px solid transparent;
}

.cJJTYc svg {
  display: flex;
  font-size: 0.625rem;
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
  display: inline-flex;
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

<style scoped>
:deep(.demo-tabs .FormItem__content) {
  width: 100%;
  align-items: flex-start;
}

:deep(.FormItem__content .Select) {
  width: 100%;
}
</style>
