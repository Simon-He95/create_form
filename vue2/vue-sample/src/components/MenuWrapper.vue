<script>
export default {
  name: "MenuWrapper",
  emits: ["click-list"],
  data() {
    return {
      current: 0,
    };
  },
  methods: {
    clickHandler(i) {
      this.current = i;
      this.$emit("clickMenu", i);
    },
  },
};
</script>

<template>
  <nav class="sc-jgaZKu jlYhXk">
    <div class="sc-cVEUmN cvODL">
      <ul spacing="4" class="sc-cVEUmN sc-jEItEs sc-gloWDX JekOu hdVFxG dWcEbi">
        <li>
          <a
            :class="['sc-hrJiTw', 'eZisQs', current === 0 ? 'active' : '']"
            @click="clickHandler(0)"
          >
            <span class="sc-cVEUmN sc-jEItEs sc-eALazh JekOu gCUuJl hxQoRa">
              <div class="sc-cVEUmN sc-jEItEs JekOu gASrTW">
                <span
                  aria-hidden="true"
                  class="sc-cVEUmN sc-ojmzf fqnhmc rLUmP"
                >
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
                      d="M23.707.297A1 1 0 0023 .004h-2a13.907 13.907 0 00-5.38 1.077 1 1 0 00-.615.923V4.92a.035.035 0 01-.022.038l-2-1.47a1 1 0 00-1.265.052A14 14 0 007 14.004v1.585l-2.707 2.707a1 1 0 101.415 1.415l2.707-2.708H10a14.014 14.014 0 0014-14v-2a1 1 0 00-.293-.706zM18 23.999H3a3 3 0 01-3-3V6A3 3 0 013 3h3a1 1 0 110 2H3a1 1 0 00-1 1v15a1 1 0 001 1h15a1 1 0 001-1v-3a1 1 0 112 0v3a3 3 0 01-3 3z"
                      fill="#212134"
                    ></path>
                  </svg>
                </span>
                <span class="sc-chKlql hiAzsh">Content Manager</span>
              </div>
            </span>
          </a>
        </li>
        <li>
          <a
            :class="['sc-hrJiTw', 'eZisQs', current === 1 ? 'active' : '']"
            @click="clickHandler(1)"
          >
            <span class="sc-cVEUmN sc-jEItEs sc-eALazh JekOu gCUuJl hxQoRa"
              ><div class="sc-cVEUmN sc-jEItEs JekOu gASrTW">
                <span aria-hidden="true" class="sc-cVEUmN sc-ojmzf fqnhmc rLUmP"
                  ><svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M2.182 0A2.182 2.182 0 000 2.182v19.636C0 23.023.977 24 2.182 24h19.636A2.182 2.182 0 0024 21.818V2.182A2.182 2.182 0 0021.818 0H2.182zm9.354 11.987h7.539c.314 0 .55.209.55.549v6.539c0 .34-.236.55-.55.55h-7.539c-.34 0-.55-.236-.55-.55v-6.539c0-.34.236-.55.55-.55zm-6.638-2.27h14.177c.314 0 .549-.209.549-.549v-4.27c0-.34-.21-.549-.55-.549H4.899c-.313 0-.549.21-.549.55v4.269c0 .34.236.55.55.55zm3.27 9.907h-3.27a.536.536 0 01-.549-.55v-6.538c0-.34.236-.55.55-.55h3.269c.34 0 .55.21.55.55v6.539c0 .34-.236.55-.55.55z"
                      fill="#212134"
                    ></path></svg></span
                ><span class="sc-chKlql hiAzsh">Content-Type Builder</span>
              </div></span
            ></a
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.cvODL {
  padding-top: 12px;
  padding-right: 8px;
  padding-left: 12px;
}
.jlYhXk {
  width: 14rem;
  background: rgb(255, 255, 255);
  position: sticky;
  top: 0px;
  height: 100vh;
  z-index: 2;
  border-right: 1px solid rgb(234, 234, 239);
}
ul {
  list-style: none;
  padding: 0;
}
.hdVFxG {
  -webkit-box-align: stretch;
  align-items: stretch;
  display: flex;
  flex-direction: column;
}
.dWcEbi > * {
  margin-top: 0px;
  margin-bottom: 0px;
}
.eZisQs.active {
  background: rgb(240, 240, 255);
}
.eZisQs {
  position: relative;
  text-decoration: none;
  display: block;
  border-radius: 4px;
  background: rgb(255, 255, 255);
}
.hxQoRa {
  padding: 8px 12px;
}
.gCUuJl {
  -webkit-box-align: center;
  align-items: center;
  display: flex;
  flex-direction: row;
  -webkit-box-pack: justify;
  justify-content: space-between;
}
.gASrTW {
  -webkit-box-align: center;
  align-items: center;
  display: flex;
  flex-direction: row;
}
.fqnhmc {
  padding-right: 12px;
}
.eZisQs.active .sc-chKlql {
  color: rgb(73, 69, 255);
  font-weight: 500;
}
.hiAzsh {
  color: rgb(50, 50, 77);
  font-size: 0.875rem;
  line-height: 1.43;
}
.rLUmP svg {
  width: 1rem;
  height: 1rem;
}
.eZisQs.active svg path {
  fill: rgb(73, 69, 255);
}
.eZisQs svg path {
  fill: rgb(142, 142, 169);
}
</style>
