<template>
  <div class="model" v-if="title_type==1">
    <div class="step-name">
      {{$t("language.step")}}:
      <input class="input-step-name" v-model="pause.step_name" @blur="saveData()" />
    </div>
      <div class="step-name">
        {{$t("language.tips")}}:
        <input class="input-step-name" @blur="saveData()" v-model="pause.tips" />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['order', 'title_type'],
    data() {
      return {
        pause: {},
      }
    },
    watch: {
      'order': {
        immediate: true,
        handler(newval, oldval) {
          this.getData()
        }
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      getData() {
        this.pause = this.$store.getters.protocol.steps[this.order - 1]
      },
      saveData() {
        var protocol = JSON.parse(JSON.stringify(this.$store.getters.protocol))
        protocol.steps[this.order - 1] = this.pause
        this.$store.commit('setProtocol', protocol)
        this.$emit('changeName')
      },
    }
  }
</script>

<style scoped="scoped">
  .model {
    font-size: 24px;
    margin-left: 37px;
    margin-top: 26px;
    /* background-color: red; */
    height: 952px;
    overflow-y: auto;
  }

  .step-name {
    position: relative;
    width: 100%;
    height: 54px;
    line-height: 54px;
    margin-bottom: 25px;
  }

  .input-step-name {
    position: absolute;
    width: 310px;
    height: 54px;
    left: 513px;
    text-align: center;
    background-color: #ffffff;
    border-radius: 2px;
    box-sizing: border-box;
    border: solid 1px #c2cbda;
  }

  .select-well {
    position: absolute;
    width: 310px;
    height: 54px;
    left: 513px;
    text-align: center;
    background-color: #ffffff;
    border-radius: 2px;
    border: solid 1px #c2cbda;
    box-sizing: border-box;
    top: 0;
  }

  .arraw-well {
    position: absolute;
    /* margin-left: 269px; */
    top: 35%;
    right: 12px;
  }

  .select-list {
    position: absolute;
    z-index: 1000;
    background-color: #ffffff;
    height: 216px;
    overflow-y: auto;
    width: 310px;
    border: solid 1px #c2cbda;
    box-sizing: border-box;
    border-top: none;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    margin-left: 513px;
  }

  .select-list-magnet {
    position: absolute;
    z-index: 1000;
    background-color: #ffffff;
    height: 108px;
    width: 310px;
    border: solid 1px #c2cbda;
    box-sizing: border-box;
    border-top: none;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    margin-left: 513px;
  }

  .select-list-segments {
    position: absolute;
    z-index: 1000;
    background-color: #ffffff;
    height: 270px;
    width: 310px;
    border: solid 1px #c2cbda;
    box-sizing: border-box;
    border-top: none;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    margin-left: 513px;
  }

  .arrawclass {
    border-top: 1px solid #c2cbda;
    text-align: center;
  }

  .switch {
    position: absolute;
    left: 513px;
  }

  .heating-step {
    position: absolute;
    width: 500px;
    height: 54px;
    left: 513px;
    display: flex;
    align-items: center;
    top: 0;
  }

  .circle {
    width: 30px;
    height: 30px;
    background-color: #ffffff;
    border: solid 1px #5691d3;
    border-radius: 15px;
    margin-right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .circle-text {
    margin-right: 60px;
  }

  .circle-inner {
    width: 14px;
    height: 14px;
    border-radius: 7px;
    background-color: #ffffff;
  }

  .selected-heating {
    background-color: #5691D3;
  }

  .warning {
    position: relative;
    width: 100%;
    height: 40px;
    line-height: 40px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    font-size: 20px;
    color: #666666;
  }

  .warning-div {
    width: 28px;
    height: 28px;
    background-color: #ffffff;
    border-radius: 2px;
    border: solid 1px #5a89c7;
    margin-right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .warning-input {
    width: 170px;
    height: 40px;
    background-color: #ffffff;
    border-radius: 2px;
    border: solid 1px #c2cbda;
    position: absolute;
    left: 513px;
    text-indent: 22px;
  }

  .img-ok {
    transform: scale(0.6);
  }

  .expect-div {
    position: absolute;
    width: 310px;
    height: 54px;
    background-color: #e1e1e1;
    border-radius: 2px;
    border: solid 1px #c2cbda;
    left: 513px;
    text-align: center;
    top: 0;
  }
</style>
<style>
  .step-name .el-switch__core {
    height: 30px;
    border-radius: 21px;
  }

  .step-name .el-switch__core:after {
    height: 28px;
    width: 29px;
    top: 0;
  }

  .step-name .is-checked .el-switch__core:after {
    height: 28px;
    width: 29px;
    top: 0;
    -webkit-transform: translateX(-11px);
  }
</style>
