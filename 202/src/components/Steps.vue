<template>
  <div class="step-div">
    <div class="step-list">
      <div class="step-list-title">
        {{$t("language.step_list")}}
      </div>
      <div class="steps-lists">
        <div v-for="(item,index) in steps" :key="index" class="steps-all"
          :class="{'selected-step':select_step==item.id}" @click="changeStep(item.id)">
          <div class="item-id">{{item.id}}.</div>
          <div class="img-step-div"><img :src="item.src" class="img-step"></div>
          <div style="margin-left: 26px;">{{item.description}}</div>
        </div>
      </div>
      <div class="deal-step">
        <img src="../images/protocols/add-protocol.png" style="margin-left: 24px;" @click="isOpenAdd" />
        <img src="../images/protocols/delete-no.png" style="margin-left: 29px;" v-if="select_step==steps.length" />
        <img src="../images/protocols/delete-protocol.png" style="margin-left: 29px;" v-else @click="deleteStep" />
        <img src="../images/protocols/rise-no.png" style="margin-left: 29px;" v-if="select_step==1" />
        <img src="../images/protocols/rise.png" style="margin-left: 29px;" v-else @click="riseStep" />
        <img src="../images/protocols/down-no.png" style="margin-left: 29px;" v-if="select_step==steps.length||select_step==steps.length-1" />
        <img src="../images/protocols/down-sort.png" style="margin-left: 29px;" v-else @click="downStep" />
      </div>
    </div>
    <div class="step-model">
      <div class="step-title">
        <div class="step-title-basic" :class="{'selected':selected_title==1}" @click="changeOption(1)">
          {{$t("language.basic")}}
        </div>
        <div class="step-title-magnetic" :class="{'selected':selected_title==2}" @click="changeOption(2)"
          v-if="step_in.step_type=='lysis'||step_in.step_type=='bind'||step_in.step_type=='custom'||step_in.step_type=='wash'||step_in.step_type=='elution'">
          {{$t("language.magnetic")}}
        </div>
      </div>
      <AddStep v-if="add_step_status" @close='closeAdd' @okAdd='newStep'></AddStep>
      <BasicIncubator v-if="step_in.step_type=='incubator'&&selected_title==1" :order='select_step'
        @changeName="changeStepName"></BasicIncubator>
      <BasicBind v-if="step_in.step_type=='bind'&&selected_title==1" :order='select_step' @changeName="changeStepName"
        :title_type='selected_title'>
      </BasicBind>
      <BasicBind v-if="step_in.step_type=='bind'&&selected_title==2" :order='select_step' @changeName="changeStepName"
        :title_type='selected_title'>
      </BasicBind>
      <BasicLysis v-if="step_in.step_type=='lysis'&&selected_title==1" :order='select_step' :title_type='selected_title'
        @changeName="changeStepName">
      </BasicLysis>
      <BasicLysis v-if="step_in.step_type=='lysis'&&selected_title==2" :order='select_step' :title_type='selected_title'
        @changeName="changeStepName">
      </BasicLysis>
      <BasicTransfer v-if="step_in.step_type=='transfer'&&selected_title==1" :order='select_step'
        :title_type='selected_title' @changeName="changeStepName">
      </BasicTransfer>
      <BasicWash v-if="step_in.step_type=='wash'&&selected_title==1" :order='select_step' @changeName="changeStepName"
        :title_type='selected_title'>
      </BasicWash>
      <BasicWash v-if="step_in.step_type=='wash'&&selected_title==2" :order='select_step' @changeName="changeStepName"
        :title_type='selected_title'>
      </BasicWash>
      <BasicElution v-if="step_in.step_type=='elution'&&selected_title==1" :order='select_step'
        @changeName="changeStepName" :title_type='selected_title'>
      </BasicElution>
      <BasicElution v-if="step_in.step_type=='elution'&&selected_title==2" :order='select_step'
        @changeName="changeStepName" :title_type='selected_title'>
      </BasicElution>
      <BasicDiscard v-if="step_in.step_type=='discard'&&selected_title==1" :order='select_step'
        @changeName="changeStepName" :title_type='selected_title'>
      </BasicDiscard>
      <BasicCustom v-if="step_in.step_type=='custom'&&selected_title==1" :order='select_step'
        @changeName="changeStepName" :title_type='selected_title'>
      </BasicCustom>
      <BasicCustom v-if="step_in.step_type=='custom'&&selected_title==2" :order='select_step'
        @changeName="changeStepName" :title_type='selected_title'>
      </BasicCustom>
      <BasicPause v-if="step_in.step_type=='pause'&&selected_title==1" :order='select_step' @changeName="changeStepName"
        :title_type='selected_title'>
      </BasicPause>
      <BasicUnload v-if="step_in.step_type=='unload_labware'&&selected_title==1" :order='select_step'
        @changeName="changeStepName" :title_type='selected_title'></BasicUnload>
    </div>
  </div>
</template>

<script>
  import BasicBind from '@/components/BasicBind'
  import BasicIncubator from '@/components/BasicIncubator'
  import BasicLysis from '@/components/BasicLysis'
  import BasicTransfer from '@/components/BasicTransfer'
  import BasicWash from '@/components/BasicWash'
  import BasicElution from '@/components/BasicElution'
  import BasicCustom from '@/components/BasicCustom'
  import BasicDiscard from '@/components/BasicDiscard'
  import BasicPause from '@/components/BasicPause'
  import BasicUnload from '@/components/BasicUnload'
  import AddStep from '@/components/AddStep'
  export default {
    components: {
      BasicBind,
      BasicIncubator,
      BasicLysis,
      BasicTransfer,
      BasicWash,
      BasicElution,
      BasicCustom,
      BasicDiscard,
      BasicPause,
      BasicUnload,
      AddStep
    },
    data() {
      return {
        selected_title: 1,
        steps: [],
        select_step: 1,
        step_in: {
          id: 1,
          description: this.$t("language.unload_labware"),
          src: require("../images/protocols/unload.png"),
          step_type: 'null',
        },
        add_step_status: false,
        step: {
          aspirate_position: 0,
          beat_speed: 0,
          cycle: 0,
          destination_well: null,
          discard_mix_height: 0,
          discard_mix_time: 0,
          discard_mix_volume: 0,
          dispense_position: 0,
          drying_position: 0,
          drying_time: 0,
          every_magnetic_time: 0,
          expected_magnetic_total_time: 0,
          incubator_temperature: 0,
          incubator_time: 0,
          interval_stay_time: 0,
          liquid_level_magnetic_time: 0,
          lowest_magnetic_position: 0,
          magnet_on: 0,
          magnet_type: null,
          magnetic_speed: 0,
          mix_height: 0,
          mix_number_before_aspirating: 0,
          mix_speed: 0,
          mix_time: 0,
          mix_volume: 0,
          order: 0,
          pre_cooling: 0,
          pre_heating: 0,
          pre_heating_seconds: 0,
          segments: 0,
          step_name: null,
          step_run_time: 0,
          temperature: 0,
          temperature_on: 0,
          tips: null,
          type: null,
          volume: 0,
          well: null,
        },
      }
    },
    mounted() {
      this.getSteps()
    },
    methods: {
      changeOption(type) {
        this.selected_title = type
      },
      getSteps() {
        this.steps = [];
        for (var i = 0; i < this.$store.getters.protocol.steps.length; i++) {
          let step_info = {};
          step_info.id = this.$store.getters.protocol.steps[i].order + 1;
          step_info.description = this.$store.getters.protocol.steps[i].step_name;
          if (this.$store.getters.protocol.steps[i].type == 'incubator') {
            step_info.src = require("../images/protocols/incubator.png")
          } else if (this.$store.getters.protocol.steps[i].type == 'transfer') {
            step_info.src = require("../images/protocols/transfer.png")
          } else if (this.$store.getters.protocol.steps[i].type == 'lysis') {
            step_info.src = require("../images/protocols/lysis.png")
          } else if (this.$store.getters.protocol.steps[i].type == 'bind') {
            step_info.src = require("../images/protocols/bind.png")
          } else if (this.$store.getters.protocol.steps[i].type == 'elution') {
            step_info.src = require("../images/protocols/elution.png")
          } else if (this.$store.getters.protocol.steps[i].type == 'custom') {
            step_info.src = require("../images/protocols/custom.png")
          } else if (this.$store.getters.protocol.steps[i].type == 'wash') {
            step_info.src = require("../images/protocols/wash.png")
          } else if (this.$store.getters.protocol.steps[i].type == 'discard') {
            step_info.src = require("../images/protocols/discard.png")
          } else if (this.$store.getters.protocol.steps[i].type == 'pause') {
            step_info.src = require("../images/protocols/pause.png")
          } else if (this.$store.getters.protocol.steps[i].type == 'unload_labware') {
            step_info.src = require("../images/protocols/unload.png")
          }
          this.steps.push(step_info)
        }
        this.step_in.step_type = this.$store.getters.protocol.steps[0].type
      },
      changeStep(type) {
        this.select_step = type
        this.selected_title = 1
        this.step_in.step_type = this.$store.getters.protocol.steps[type - 1].type
      },
      changeStepName() {
        this.steps[this.select_step - 1].description = this.$store.getters.protocol.steps[this.select_step - 1]
          .step_name;
      },
      isOpenAdd() {
        this.add_step_status = true
      },
      closeAdd() {
        this.add_step_status = false
      },
      newStep(type) {
        this.add_step_status = false
        var protocol = JSON.parse(JSON.stringify(this.$store.getters.protocol))
        if (protocol.steps.length == 99) {
          return null
        } else {
          this.step.type = type
          this.step.step_name = type
          this.step.order = protocol.steps.length
          if (type == 'incubator') {
            this.step.well = '1'
            this.step.incubator_temperature = '90.0'
            this.step.incubator_time = '20.0'
          } else if (type == 'transfer') {
            this.step.well = '1'
            this.step.destination_well = '3'
            this.step.volume = '200'
            this.step.mix_number_before_aspirating = '5'
            this.step.mix_speed = '5'
            this.step.aspirate_position = '2'
            this.step.dispense_position = '2'
          } else if (type == 'lysis') {
            this.step.well = '1'
            this.step.mix_time = '1.0'
            this.step.volume = '1000'
            this.step.mix_speed = '5'
            this.step.mix_height = '5'
            this.step.mix_volume = '1000'
            this.step.temperature_on = '1'
            this.step.temperature = '90.0'
            this.step.pre_heating = '1'
            this.step.pre_heating_seconds = '1'
            this.step.magnet_on = '1'
            this.step.magnet_type = 'tip'
            this.step.segments = '1'
            this.step.interval_stay_time = '1'
            this.step.cycle = '1'
            this.step.beat_speed = '1'
            this.step.drying_time = '0.0'
            this.step.every_magnetic_time = '1'
            this.step.liquid_level_magnetic_time = '1'
            this.step.cycle = '1'
            this.step.magnetic_speed = '1'
            this.step.lowest_magnetic_position = '0'
            this.step.drying_time = '0.0'
            this.step.drying_position = '45'
            this.step.discard_mix_time = '1.0'
            this.step.discard_mix_height = '10'
            this.step.discard_mix_volume = '60'
          } else if (type == 'bind') {
            this.step.well = '1'
            this.step.mix_time = '1.0'
            this.step.volume = '1000'
            this.step.mix_speed = '5'
            this.step.mix_height = '5'
            this.step.mix_volume = '1000'
            this.step.temperature_on = '1'
            this.step.temperature = '90.0'
            this.step.pre_heating = '1'
            this.step.pre_heating_seconds = '1'
            this.step.magnet_on = '1'
            this.step.magnet_type = 'tip'
            this.step.segments = '1'
            this.step.interval_stay_time = '1'
            this.step.cycle = '1'
            this.step.beat_speed = '1'
            this.step.drying_time = '0.0'
            this.step.every_magnetic_time = '1'
            this.step.liquid_level_magnetic_time = '1'
            this.step.cycle = '1'
            this.step.magnetic_speed = '1'
            this.step.lowest_magnetic_position = '0'
            this.step.drying_time = '0.0'
            this.step.drying_position = '45'
            this.step.discard_mix_time = '1.0'
            this.step.discard_mix_height = '10'
            this.step.discard_mix_volume = '60'
          } else if (type == 'wash') {
            this.step.well = '1'
            this.step.mix_time = '1.0'
            this.step.volume = '1000'
            this.step.mix_speed = '5'
            this.step.mix_height = '5'
            this.step.mix_volume = '1000'
            this.step.temperature = '90.0'
            this.step.pre_heating = '1'
            this.step.pre_heating_seconds = '1'
            this.step.magnet_on = '1'
            this.step.magnet_type = 'tip'
            this.step.segments = '1'
            this.step.interval_stay_time = '1'
            this.step.cycle = '1'
            this.step.beat_speed = '1'
            this.step.drying_time = '0.0'
            this.step.every_magnetic_time = '1'
            this.step.liquid_level_magnetic_time = '1'
            this.step.cycle = '1'
            this.step.magnetic_speed = '1'
            this.step.lowest_magnetic_position = '0'
            this.step.drying_time = '0.0'
            this.step.drying_position = '45'
            this.step.discard_mix_time = '1.0'
            this.step.discard_mix_height = '10'
            this.step.discard_mix_volume = '60'
          } else if (type == 'elution') {
            this.step.well = '1'
            this.step.mix_time = '1.0'
            this.step.volume = '1000'
            this.step.mix_speed = '5'
            this.step.mix_height = '5'
            this.step.mix_volume = '1000'
            this.step.temperature_on = '1'
            this.step.temperature = '90.0'
            this.step.pre_heating = '1'
            this.step.pre_heating_seconds = '1'
            this.step.magnet_on = '1'
            this.step.magnet_type = 'tip'
            this.step.segments = '1'
            this.step.interval_stay_time = '1'
            this.step.cycle = '1'
            this.step.beat_speed = '1'
            this.step.drying_time = '0.0'
            this.step.every_magnetic_time = '1'
            this.step.liquid_level_magnetic_time = '1'
            this.step.cycle = '1'
            this.step.magnetic_speed = '1'
            this.step.lowest_magnetic_position = '0'
            this.step.drying_time = '0.0'
            this.step.drying_position = '45'
            this.step.discard_mix_time = '1.0'
            this.step.discard_mix_height = '10'
            this.step.discard_mix_volume = '60'
          } else if (type == 'custom') {
            this.step.well = '1'
            this.step.mix_time = '1.0'
            this.step.volume = '1000'
            this.step.mix_speed = '5'
            this.step.mix_height = '5'
            this.step.mix_volume = '1000'
            this.step.temperature_on = '1'
            this.step.temperature = '90.0'
            this.step.pre_heating = '1'
            this.step.pre_heating_seconds = '1'
            this.step.magnet_on = '1'
            this.step.magnet_type = 'tip'
            this.step.segments = '1'
            this.step.interval_stay_time = '1'
            this.step.cycle = '1'
            this.step.beat_speed = '1'
            this.step.drying_time = '0.0'
            this.step.every_magnetic_time = '1'
            this.step.liquid_level_magnetic_time = '1'
            this.step.cycle = '1'
            this.step.magnetic_speed = '1'
            this.step.lowest_magnetic_position = '0'
            this.step.drying_time = '0.0'
            this.step.drying_position = '45'
            this.step.discard_mix_time = '1.0'
            this.step.discard_mix_height = '10'
            this.step.discard_mix_volume = '60'
          } else if (type == 'discard') {
            this.step.well = '3'
            this.step.mix_time = '1.0'
            this.step.volume = '1000'
            this.step.mix_speed = '5'
            this.step.mix_height = '5'
            this.step.mix_volume = '1000'
          } else if (type == 'pause') {
            this.step.tips = 'add reagent'
          }
          if (this.select_step == protocol.steps.length) {
            protocol.steps.splice(this.select_step - 1, 0, this.step)
          } else {
            protocol.steps.splice(this.select_step, 0, this.step)
          }
          for (var i = 0; i < protocol.steps.length; i++) {
            protocol.steps[i].order = i;
          }
          this.$store.commit('setProtocol', protocol)
          this.getSteps()
        }
      },
      deleteStep() {
        var protocol = JSON.parse(JSON.stringify(this.$store.getters.protocol))
        protocol.steps.splice(this.select_step - 1, 1)
        for (var i = 0; i < protocol.steps.length; i++) {
          protocol.steps[i].order = i;
        }
        this.$store.commit('setProtocol', protocol)
        this.getSteps()
        this.changeStep(this.select_step)
      },
      riseStep() {
        var protocol = JSON.parse(JSON.stringify(this.$store.getters.protocol))
        var temp;
        protocol.steps[this.select_step - 1].order = protocol.steps[this.select_step - 1].order - 1
        temp = protocol.steps[this.select_step - 1]
        protocol.steps[this.select_step - 2].order = protocol.steps[this.select_step - 2].order + 1
        protocol.steps[this.select_step - 1] = protocol.steps[this.select_step - 2]
        protocol.steps[this.select_step - 2] = temp
        this.$store.commit('setProtocol', protocol)
        this.getSteps()
        this.select_step = this.select_step - 1
        this.step_in.step_type = this.$store.getters.protocol.steps[this.select_step - 1].type
      },
      downStep() {
        var protocol = JSON.parse(JSON.stringify(this.$store.getters.protocol))
        var temp;
        protocol.steps[this.select_step - 1].order = protocol.steps[this.select_step - 1].order + 1
        temp = protocol.steps[this.select_step - 1]
        protocol.steps[this.select_step].order = protocol.steps[this.select_step].order - 1
        protocol.steps[this.select_step - 1] = protocol.steps[this.select_step]
        protocol.steps[this.select_step] = temp
        this.$store.commit('setProtocol', protocol)
        this.getSteps()
        this.select_step = this.select_step + 1
        this.step_in.step_type = this.$store.getters.protocol.steps[this.select_step - 1].type
      }
    }
  }
</script>

<style scoped="scoped">
  .step-div {
    width: 1685px;
    height: 1048px;
    background-color: #ffffff;
    border-radius: 6px;
    border: solid 1px #c2cbda;
  }

  .step-list {
    float: left;
    width: 377px;
    height: 100%;
    box-sizing: border-box;
    border-right: solid 1px #c2cbda;
  }

  .step-model {
    float: left;
    width: 1308px;
    height: 100%;
  }

  .step-list-title {
    font-size: 24px;
    line-height: 72px;
    height: 72px;
    text-indent: 28px;
    border-bottom: solid 1px #c2cbda;
  }

  .step-title {
    font-size: 24px;
    height: 72px;
    border-bottom: solid 1px #c2cbda;
  }

  .step-title-basic {
    float: left;
    margin-left: 37px;
    height: 100%;
    width: fit-content;
    line-height: 72px;
  }

  .step-title-magnetic {
    float: left;
    margin-left: 50px;
    height: 100%;
    width: fit-content;
    line-height: 72px;
  }

  .selected {
    color: #4c7cb2;
    box-sizing: border-box;
    border-bottom: solid 2px #4C7CB2;
  }

  .steps-lists {
    height: 877px;
    overflow-y: auto;
    overflow-x: hidden;
    width: 100%;
  }

  .steps-all {
    width: 100%;
    font-size: 24px;
    line-height: 93px;
    display: flex;
    align-items: center;
    height: 93px;
  }

  .selected-step {
    background-color: #e1f0ff;
    border: solid 1px #4171bb;
    box-sizing: border-box;
  }

  .deal-step {
    height: 99px;
    width: 100%;
    border-top: solid 1px #c2cbda;
    display: flex;
    align-items: center;
  }

  .img-step-div {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
  }

  .item-id {
    margin-left: 28px;
    margin-right: 20px;
    width: 40px;
    height: 100%;
  }

  *::-webkit-scrollbar {
    width: 10px;
    height: 100px;
  }

  *::-webkit-scrollbar-thumb {
    width: 10px;
    height: 200px;
    background-color: #c2cbda !important;
    border-radius: 8px;
  }

  *::-webkit-scrollbar-track {
    background: #FFFFFF;
  }
</style>
