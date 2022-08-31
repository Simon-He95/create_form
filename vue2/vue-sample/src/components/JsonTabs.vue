<script>
export default {
  name: 'JsonTabs',
  props: {
    types: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['choose'],
  methods: {
    clickHandler(type) {
      this.$emit('choose', type)
    },
  },
}
</script>

<template>
  <div spacing="8" class="sc-bUbRBg sc-tAExr sc-dSfdvi cNbIkO dnrnLU eKrzJo">
    <div class="sc-eZKLwX sc-bhnkmi dlOeuv jHhZgG">
      <div v-for="i in types" :key="i.name" class="sc-eqUgKp ejzBKL">
        <div class="sc-eZKLwX dlOeuv" style="height: 100%;">
          <div class="sc-gsDKAQ jGQaIC" style="height: 100%;">
            <button type="button" class="sc-gsDKAQ sc-dmquGW jIMBLM eYoyCK" @click="clickHandler(i.name)">
              <div class="sc-dvQaRk sc-TBWPX dPOXkr fkEccH">
                <svg width="1em" height="1em" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                  class="sc-gsDKAQ sc-flAguQ kMJSxT gHoNIT">
                  <rect x="0.5" y="0.5" width="31" height="23" rx="2.5" fill="#EAFBE7" stroke="#C6F0C2" />
                  <path
                    d="M8.62 16h1.857l.627-2.05h2.982l.627 2.05h1.863l-2.941-8.455h-2.08L8.619 16zm3.925-6.768h.105l1.032 3.393h-2.174l1.037-3.393zM21.65 16.1c1.612 0 2.62-1.26 2.62-3.323v-.011c0-2.075-.985-3.323-2.62-3.323-.884 0-1.605.434-1.933 1.137h-.106V7.082h-1.71V16h1.71v-1.002h.106c.334.697 1.02 1.102 1.933 1.102zm-.585-1.418c-.903 0-1.471-.715-1.471-1.899v-.011c0-1.184.574-1.91 1.47-1.91.903 0 1.465.726 1.465 1.904v.011c0 1.19-.556 1.905-1.465 1.905z"
                    fill="#328048" />
                </svg>
                <div class="sc-gsDKAQ lgKdZK">
                  <div class="sc-dvQaRk sc-TBWPX dPOXkr fkEccH">
                    <span class="sc-bvFjSx feALMd">{{  i.name  }}</span>
                  </div>
                  <div class="sc-dvQaRk sc-TBWPX dPOXkr fkEccH">
                    <span class="sc-bvFjSx gtPYuT">{{  i.description
                      }}</span>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.jHhZgG {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 0px;
}

.eKrzJo>* {
  margin-top: 0px;
  margin-bottom: 0px;
}

.epKsEK {
  padding-top: 24px;
  padding-bottom: 16px;
}

.dnrnLU {
  -webkit-box-align: stretch;
  align-items: stretch;
  display: flex;
  flex-direction: column;
}

.dnrnLU {
  -webkit-box-align: stretch;
  align-items: stretch;
  display: flex;
  flex-direction: column;
}

.eKrzJo>* {
  margin-top: 0px;
  margin-bottom: 0px;
}

.ejzBKL {
  grid-column: span 6 / auto;
  max-width: 100%;
  margin-bottom: 4px;
}

.jGQaIC {
  padding-right: 8px;
  padding-left: 0px;
}

.eYoyCK {
  width: 100%;
  height: 100%;
  border: 1px solid rgb(220, 220, 228);
  text-align: left;
}

.jIMBLM {
  padding: 16px;
  border-radius: 4px;
  background-color: #fff;
}

.fkEccH {
  -webkit-box-align: center;
  align-items: center;
  display: flex;
  flex-direction: row;
}

.gHoNIT {
  width: 2rem;
  height: 1.5rem;
  box-sizing: content-box;
}

.lgKdZK {
  padding-left: 16px;
}

.fkEccH {
  -webkit-box-align: center;
  align-items: center;
  display: flex;
  flex-direction: row;
}

.feALMd {
  font-weight: 600;
  color: rgb(50, 50, 77);
  font-size: 0.875rem;
  line-height: 1.43;
}

.gtPYuT {
  color: rgb(102, 102, 135);
  font-size: 0.75rem;
  line-height: 1.33;
}
</style>
