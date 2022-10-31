<template>
  <div class="model">
    <div class="step-name">
      {{$t("language.step")}}:
      <input class="input-step-name" v-model="incubator.step_name" @blur="saveData()" />
    </div>
    <div class="step-name" @click="is_arraw()" ref="well1A">
      {{$t("language.well1a")}}:
      <div class="select-well">
        {{incubator.well}}<img src="../images/protocols/down-prto.png" class="arraw-well" />
      </div>
      <div class="select-list" v-if="arraw_status">
        <div class="arrawclass" @click="selectWell('1')">1</div>
        <div class="arrawclass" @click="selectWell('2')">2</div>
        <div class="arrawclass" @click="selectWell('3')">3</div>
        <div class="arrawclass" @click="selectWell('4')">4</div>
        <div class="arrawclass" @click="selectWell('5')">5</div>
        <div class="arrawclass" @click="selectWell('6')" v-if="$store.getters.protocol.cartridge!=5">6</div>
        <div class="arrawclass" @click="selectWell('7')" v-if="$store.getters.protocol.cartridge!=5">7</div>
        <div class="arrawclass" @click="selectWell('8')" v-if="$store.getters.protocol.cartridge!=5">8</div>
        <div class="arrawclass" @click="selectWell('A')">A</div>
        <div class="arrawclass" @click="selectWell('B')">B</div>
        <div class="arrawclass" @click="selectWell('C')">C</div>
      </div>
    </div>
    <div class="step-name">
      {{$t("language.temp10100")}}:
      <input class="input-step-name" v-model="incubator.incubator_temperature" @blur="saveData()" />
    </div>
    <div class="step-name">
      {{$t("language.time999")}}:
      <input class="input-step-name" v-model="incubator.incubator_time" @blur="saveData()" />
    </div>
  </div>
</template>

<script>
  export default {
    props: ['order'],
    data() {
      return {
        arraw_status: false,
        incubator: {
        }
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
      is_arraw() {
        this.arraw_status = !this.arraw_status
      },
      selectWell(type) {
        var protocol = JSON.parse(JSON.stringify(this.$store.getters.protocol))
        this.incubator.well = type
        protocol.steps[this.order - 1].well = type
        this.$store.commit('setProtocol', protocol)
      },
      getData() {
        this.incubator = this.$store.getters.protocol.steps[this.order - 1]
      },
      saveData() {
        var protocol = JSON.parse(JSON.stringify(this.$store.getters.protocol))
        protocol.steps[this.order - 1].step_name = this.incubator.step_name
        protocol.steps[this.order - 1].incubator_temperature = this.incubator.incubator_temperature
        protocol.steps[this.order - 1].incubator_time = this.incubator.incubator_time
        this.$store.commit('setProtocol', protocol)
        this.$emit('changeName')
      }
    }
  }
</script>

<style scoped="scoped">
  .model {
    font-size: 24px;
    margin-left: 37px;
    margin-top: 26px;
  }

  .step-name {
    position: relative;
    width: 100%;
    height: 54px;
    line-height: 54px;
    margin-bottom: 30px;
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

  .arrawclass {
    border-top: 1px solid #c2cbda;
    text-align: center;
  }
</style>
