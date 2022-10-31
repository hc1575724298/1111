<template>
  <div class="model">
    <div class="step-name">
      {{$t("language.step")}}:
      <input class="input-step-name" @blur="saveData()" v-model="transfer.step_name" />
    </div>
    <div class="step-name" @click="is_arraw()">
      {{$t("language.source_well_1c")}}:
      <div class="select-well">
        {{transfer.well}}<img src="../images/protocols/down-prto.png" class="arraw-well" />
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
    <div class="step-name" @click="is_arraw_second()">
      {{$t("language.destination_well_1c")}}:
      <div class="select-well">
        {{transfer.destination_well}}<img src="../images/protocols/down-prto.png" class="arraw-well" />
      </div>
      <div class="select-list" v-if="arraw_status_second">
        <div class="arrawclass" @click="selectWellSecond('1')">1</div>
        <div class="arrawclass" @click="selectWellSecond('2')">2</div>
        <div class="arrawclass" @click="selectWellSecond('3')">3</div>
        <div class="arrawclass" @click="selectWellSecond('4')">4</div>
        <div class="arrawclass" @click="selectWellSecond('5')">5</div>
        <div class="arrawclass" @click="selectWellSecond('6')" v-if="$store.getters.protocol.cartridge!=5">6</div>
        <div class="arrawclass" @click="selectWellSecond('7')" v-if="$store.getters.protocol.cartridge!=5">7</div>
        <div class="arrawclass" @click="selectWellSecond('8')" v-if="$store.getters.protocol.cartridge!=5">8</div>
        <div class="arrawclass" @click="selectWellSecond('A')">A</div>
        <div class="arrawclass" @click="selectWellSecond('B')">B</div>
        <div class="arrawclass" @click="selectWellSecond('C')">C</div>
      </div>
    </div>
    <div class="step-name">
      {{$t("language.volume_5")}}:
      <input class="input-step-name" @blur="saveData()" v-model="transfer.volume"/>
    </div>
    <div class="step-name">
      {{$t("language.mix_before")}}:
      <input class="input-step-name" @blur="saveData()" v-model="transfer.mix_number_before_aspirating"/>
    </div>
    <div class="step-name">
      {{$t("language.mix_speed")}}:
      <input class="input-step-name" @blur="saveData()" v-model="transfer.mix_speed"/>
    </div>
    <div class="step-name">
      {{$t("language.aspirate_position")}}:
      <input class="input-step-name" @blur="saveData()" v-model="transfer.aspirate_position"/>
    </div>
    <div class="step-name">
      {{$t("language.dispense_position")}}:
      <input class="input-step-name" @blur="saveData()" v-model="transfer.dispense_position"/>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['order'],
    data() {
      return {
        arraw_status: false,
        arraw_status_second: false,
        transfer: {
          step_name: null,
          well: 1,
          destination_well: 1,
          volume:null,
          mix_number_before_aspirating: null,
          mix_speed: null,
          aspirate_position: null,
          dispense_position: null
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
        this.transfer.well = type
        protocol.steps[this.order - 1].well = type
        this.$store.commit('setProtocol', protocol)
      },
      is_arraw_second() {
        this.arraw_status_second = !this.arraw_status_second
      },
      selectWellSecond(type) {
        var protocol = JSON.parse(JSON.stringify(this.$store.getters.protocol))
        this.transfer.destination_well = type
        protocol.steps[this.order - 1].destination_well = type
        this.$store.commit('setProtocol', protocol)
      },
      getData() {
        this.transfer.step_name = this.$store.getters.protocol.steps[this.order - 1].step_name
        this.transfer.well = this.$store.getters.protocol.steps[this.order - 1].well
        this.transfer.destination_well = this.$store.getters.protocol.steps[this.order - 1].destination_well
        this.transfer.volume = this.$store.getters.protocol.steps[this.order - 1].volume
        this.transfer.mix_number_before_aspirating = this.$store.getters.protocol.steps[this.order - 1]
          .mix_number_before_aspirating
        this.transfer.mix_speed = this.$store.getters.protocol.steps[this.order - 1].mix_speed
        this.transfer.aspirate_position = this.$store.getters.protocol.steps[this.order - 1].aspirate_position
        this.transfer.dispense_position = this.$store.getters.protocol.steps[this.order - 1].dispense_position
      },
      saveData() {
        var protocol = JSON.parse(JSON.stringify(this.$store.getters.protocol))
        protocol.steps[this.order - 1].step_name = this.transfer.step_name
        protocol.steps[this.order - 1].mix_number_before_aspirating = this.transfer.mix_number_before_aspirating
        protocol.steps[this.order - 1].mix_speed = this.transfer.mix_speed
        protocol.steps[this.order - 1].aspirate_position = this.transfer.aspirate_position
        protocol.steps[this.order - 1].dispense_position = this.transfer.dispense_position
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
    width: 310px;
    border: solid 1px #c2cbda;
    box-sizing: border-box;
    border-top: none;
    overflow-y: auto;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    margin-left: 513px;
  }

  .arrawclass {
    border-top: 1px solid #c2cbda;
    text-align: center;
  }
</style>
