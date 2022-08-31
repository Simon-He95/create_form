<script>
import Footer from './Footer';
export default {
  name: 'Menu',
  components: {
    Footer,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  emits: ['click-list'],
  data() {
    return {
      list: localStorage.getItem('store_json')
        ? JSON.parse(localStorage.getItem('store_json'))
        : [],
      current: '',
      collpase: true,
      createShow: false,
      name: '',
      isDelete: false,
      type: 'add',
    };
  },
  watch: {
    title() {
      this.collpase = true;
    },
  },
  mounted() {
    const pos = +(localStorage.getItem('json_menu_pos') || 0)
    this.clickList(pos, this.list[pos]);
  },
  methods: {
    collpaseHandler() {
      this.collpase = !this.collpase;
    },
    clickList(i, name) {
      this.current = i;
      this.$emit('click-list', name);
      this.saveMenuPosition()
    },
    saveMenuPosition() {
      localStorage.setItem('json_menu_pos', this.current)
    },
    createHandler() {
      this.type = 'add';
      this.createShow = true;
      this.name = '';
    },
    confirm() {
      if (this.list.includes(this.name))
        return this.$Message.error('已存在该名称');
      if (this.type === 'add') this.list.push(this.name);
      else this.list[this.current] = this.name;
      localStorage.setItem('store_json', JSON.stringify(this.list));
      this.createShow = false;
      this.isDelete = false;
    },
    edit(name) {
      this.type = 'edit';
      this.name = name;
      this.createShow = true;
      this.isDelete = true;
    },
    deleteHandler() {
      this.list.splice(this.current, 1);
      localStorage.setItem('store_json', JSON.stringify(this.list));
      const data = localStorage.getItem('json_form_list')
        ? JSON.parse(localStorage.getItem('json_form_list'))
        : {};
      delete data[this.name];
      localStorage.setItem('json_form_list', JSON.stringify(data));
      this.isDelete = false;
      this.createShow = false;
      const pos = this.current - 1
      this.clickList(pos, this.list[pos])
    },
  },
};
</script>

  <template>
  <div>
    <nav aria-label="Content-Type Builder" class="sc-kBHgYv dEPNRG">
      <div class="sc-bcGyXE erdTfC">
        <div class="sc-bcGyXE sc-kiowOE hyPoxK bwmCs">
          <h2 class="sc-ijeLaK heUJcp">{{  title || 'Content'  }}</h2>
        </div>
        <div class="sc-bcGyXE epXjzL">
          <hr class="sc-bcGyXE sc-dbqYyY gdIlBK lexqVX sc-dBGsNe cyIHrr" />
        </div>
      </div>
      <div class="sc-dbqYyY UmRPd">
        <ol spacing="2" class="sc-dbqYyY sc-dOkGYn sc-jRSqCh jStIwK kpsMfe bUDExr">
          <li>
            <div spacing="1" class="sc-dbqYyY sc-dOkGYn sc-jRSqCh jStIwK kpsMfe bUDExf">
              <div class="sc-dbqYyY sc-jdXHFF fFvRvU iQyFFF">
                <div class="sc-dbqYyY bWTwLx">
                  <button aria-controls="subnav-list-119" class="sc-dbqYyY sc-dOkGYn sc-jPGhGf jqVvPJ dNHUsO bRUAVn"
                    @click="collpaseHandler">
                    <div class="sc-dbqYyY lndfAL">
                      <span class="sc-lliPmu idVbRw">Collection Types</span>
                    </div>
                    <div class="sc-fXiGvq" :class="[collpase ? 'exddHz' : 'eaRphy']">
                      <svg width="1em" height="1em" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M14 .889a.86.86 0 01-.26.625L7.615 7.736A.834.834 0 017 8a.834.834 0 01-.615-.264L.26 1.514A.861.861 0 010 .889c0-.24.087-.45.26-.625A.834.834 0 01.875 0h12.25c.237 0 .442.088.615.264a.86.86 0 01.26.625z"
                          fill="#32324D" />
                      </svg>
                    </div>
                  </button>
                  <div transform="translateY(-50%)" class="sc-dbqYyY sc-dOkGYn hafWQs hYndWV">
                    <span class="sc-lliPmu idVbRw">{{  list.length  }}</span>
                  </div>
                </div>
              </div>
              <ol v-show="collpase" id="subnav-list-119">
                <li v-for="(item, i) in list" :key="i" @click="clickList(i, item)">
                  <a aria-current="page" class="sc-dbqYyY sc-cjwcjg joRjZF cfdPXz"
                    :class="[current === i ? 'active' : '']">
                    <div class="sc-dbqYyY sc-dOkGYn jStIwK dNHUsO">
                      <svg width="1em" height="1em" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg"
                        class="sc-kHTDnN cWLdcV">
                        <rect width="4" height="4" rx="2" fill="#A5A5BA" />
                      </svg>
                      <div class="sc-dbqYyY fvhnfw">
                        <span class="sc-lliPmu imwrmp">{{  item  }}</span>
                      </div>
                    </div>
                  </a>
                </li>
              </ol>
            </div>
            <div v-show="title !== 'Content'" class="sc-gsDKAQ hjVlqg">
              <button aria-disabled="false" type="button" class="sc-fUCuFg sc-dSaQTq sc-HEwFl fZLKQx ciPgPo cJJTYc"
                @click="createHandler">
                <span aria-hidden="true" class="sc-fUCuFg cLNaEJ"><svg width="1em" height="1em" viewBox="0 0 24 24"
                    fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M24 13.604a.3.3 0 01-.3.3h-9.795V23.7a.3.3 0 01-.3.3h-3.21a.3.3 0 01-.3-.3v-9.795H.3a.3.3 0 01-.3-.3v-3.21a.3.3 0 01.3-.3h9.795V.3a.3.3 0 01.3-.3h3.21a.3.3 0 01.3.3v9.795H23.7a.3.3 0 01.3.3v3.21z"
                      fill="#212134" />
                  </svg></span><span class="sc-hKysef kvRZkV">Create new collection type</span>
              </button>
            </div>
          </li>
        </ol>
      </div>
    </nav>
    <Modal v-model="createShow" title="Create a collection type" width="50%" :mask="false">
      <Form>
        <FormItem label="Display name">
          <Input ref="nameEl" v-model="name" placeholder="Please input Name" />
        </FormItem>
      </Form>
      <template #footer>
        <Footer :is-delete="isDelete" @cancel="createShow = false" @confirm="confirm" @delete="deleteHandler" />
      </template>
    </Modal>
  </div>
</template>

  <style scoped>
  /deep/ .ivu-modal-footer {
    padding: 0;
    position: sticky;
    bottom: 0;
    z-index: 10;
  }

  .erdTfC {
    padding: 24px 16px 8px 24px;
  }

  .bwmCs {
    align-items: flex-start;
    display: flex;
    flex-direction: row;
    -webkit-box-pack: justify;
    justify-content: space-between;
  }

  .heUJcp {
    color: rgb(50, 50, 77);
    font-weight: 600;
    font-size: 1.125rem;
    line-height: 1.22;
  }

  .gdIlBK {
    background: rgb(234, 234, 239);
  }

  .lexqVX {
    height: 1px;
    border: none;
    margin: 0px;
  }

  .cyIHrr {
    width: 1.5rem;
    background-color: rgb(220, 220, 228);
  }

  .epXjzL {
    padding-top: 16px;
  }

  .dEPNRG {
    width: 14.5rem;
    background: rgb(246, 246, 249);
    position: sticky;
    top: 0px;
    height: 100vh;
    overflow-y: auto;
    border-right: 1px solid rgb(220, 220, 228);
    z-index: 1;
  }

  .eaRphy {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    transform: rotateX(180deg);
  }

  .UmRPd {
    padding-top: 8px;
    padding-bottom: 16px;
  }

  .kpsMfe {
    -webkit-box-align: stretch;
    align-items: stretch;
    display: flex;
    flex-direction: column;
  }

  .bUDExr>* {
    margin-top: 0px;
    margin-bottom: 0px;
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
    cursor: pointer;
  }

  .cLNaEJ {
    padding-right: 8px;
  }

  .kvRZkV {
    color: rgb(73, 69, 255);
    font-size: 0.75rem;
  }

  .cJJTYc::after {
    transition-property: all;
    transition-duration: 0.2s;
    border-radius: 8px;
    content: '';
    position: absolute;
    inset: -4px;
    border: 2px solid transparent;
  }

  .cJJTYc svg {
    display: flex;
    font-size: 0.625rem;
  }

  .cJJTYc svg path {
    fill: rgb(73, 69, 255);
  }

  .fFvRvU {
    padding: 8px 16px 8px 24px;
  }

  .bUDExf>*+* {
    margin-top: 4px;
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
    cursor: pointer;
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

  .cfdPXz.active svg>* {
    fill: rgb(39, 31, 224);
  }

  .fvhnfw {
    padding-left: 8px;
  }

  .cfdPXz.active .sc-lliPmu {
    color: rgb(39, 31, 224);
    font-weight: 500;
  }

  .imwrmp {
    color: rgb(50, 50, 77);
    font-size: 0.875rem;
    line-height: 1.43;
  }

  .cfdPXz.active svg>* {
    fill: rgb(39, 31, 224);
  }

  .bUDExf>* {
    margin-top: 0px;
    margin-bottom: 0px;
  }

  .bWTwLx {
    padding-right: 24px;
    position: relative;
  }

  .bRUAVn {
    border: none;
    padding: 0px;
    background: transparent;
  }

  .dNHUsO {
    -webkit-box-align: center;
    align-items: center;
    display: flex;
    flex-direction: row;
  }

  .jqVvPJ {
    text-align: left;
    cursor: pointer;
  }

  .lndfAL {
    padding-right: 4px;
  }

  .exddHz {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    transform: rotateX(0deg);
  }

  .iQyFFF svg {
    height: 0.25rem;
  }

  .iQyFFF svg path {
    fill: rgb(142, 142, 169);
  }

  .idVbRw {
    color: rgb(102, 102, 135);
    font-weight: 600;
    font-size: 0.6875rem;
    text-transform: uppercase;
  }

  ol,
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .hYndWV {
    -webkit-box-align: center;
    align-items: center;
    display: inline-flex;
    flex-direction: row;
    -webkit-box-pack: center;
    justify-content: center;
  }

  .hafWQs {
    background: rgb(234, 234, 239);
    padding: 4px;
    border-radius: 4px;
    position: absolute;
    right: 0px;
    top: 50%;
    min-width: 20px;
    transform: translateY(-50%);
  }
  </style>
