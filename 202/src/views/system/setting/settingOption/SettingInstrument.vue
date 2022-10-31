<template>
  <div class="setting-system-div">
    <div class="setting-system-siderbar">
      <div class="siderbar-div" :class="{'setting-system-siderbar-div': $store.getters.instrumentsiderbar==item.id}"
        v-for="(item,index) in tools_siderbar_lists" @click="changeSiderbar(item.id)">
        {{item.description}}
      </div>
    </div>
    <div class="setting-instrument" v-if="$store.getters.instrumentsiderbar==1">
      <Labware class="labware" @refreshInstrument='getInstrumentSetting'></Labware>
    </div>
    <div class="setting-paramters" v-if="$store.getters.instrumentsiderbar==2">
      <Paramters></Paramters>
    </div>
    <div class="setting-paramters" v-if="$store.getters.instrumentsiderbar==3">
      <CalibrationTemperature></CalibrationTemperature>
    </div>
    <div class="setting-paramters" v-if="$store.getters.instrumentsiderbar==4">
      <WorktableCalibration></WorktableCalibration>
    </div>
    <div class="setting-paramters" v-if="$store.getters.instrumentsiderbar==5">
      <TransferLiquid></TransferLiquid>
    </div>
    <div class="setting-paramters" v-if="$store.getters.instrumentsiderbar==6">
      <Oem></Oem>
    </div>
    <div class="setting-paramters" v-if="$store.getters.instrumentsiderbar==7">
      <PnNumber></PnNumber>
    </div>
  </div>
</template>

<script>
  import Labware from '@/components/Labware'
  import Paramters from '@/components/Paramters'
  import CalibrationTemperature from '@/components/CalibrationTemperature'
  import TransferLiquid from '@/components/TransferLiquid'
  import WorktableCalibration from '@/components/WorktableCalibration'
  import Oem from '@/components/Oem'
  import PnNumber from '@/components/PnNumber'
  import {
    instrumentGet
  } from '@/api/setting.js'
  import {
    stopCali
  } from '@/api/setting.js'
  export default {
    components: {
      Labware,
      Paramters,
      CalibrationTemperature,
      TransferLiquid,
      WorktableCalibration,
      Oem,
      PnNumber
    },
    data() {
      return {
        tools_siderbar_lists: [{
            id: 1,
            description: this.$t("language.labware")
          }, {
            id: 2,
            description: this.$t("language.parameters")
          },
          {
            id: 3,
            description: this.$t("language.calibration_temperture")
          },
          {
            id: 4,
            description: this.$t("language.worktable_calibration")
          },
          {
            id: 5,
            description: this.$t("language.transfer_liquid_calibration")
          },
          {
            id: 6,
            description: this.$t("language.oem")
          },
          {
            id: 7,
            description: this.$t("language.pn_number")
          },
        ],

      }
    },
    mounted() {
      this.getInstrumentSetting()
    },
    destroyed() {
      stopCali().then((res) => {
        this.$store.commit('setIsNotify', false)
      })
    },
    methods: {
      changeSiderbar(id) {
        this.$store.commit('setInstrumentSiderbar', id)
        this.$store.commit('setTubeType', "elution_tube")
        this.$store.commit('setPrameters', "motion")
        this.$store.commit('setSelectedWorktableStatus', 1)
      },
      getInstrumentSetting() {
        this.$store.commit('setTubeType', "elution_tube")
        this.$store.commit('setPrameters', "motion")
        this.$store.commit('setSelectedWorktableStatus', 1)
        instrumentGet().then((res) => {
          this.$store.commit('setSetting', res.data)
          this.$store.commit('setSelectedImg', res.data.oem[3])
          let param = [{
            key: 'horizontal_speed',
            value: res.data.parameters.horizontal_speed,
          }, {
            key: 'magnetic_rod_lifting_speed',
            value: res.data.parameters.magnetic_rod_lifting_speed,
          }, {
            key: 'magnetic_rod_sleeve_lifting_speed',
            value: res.data.parameters.magnetic_rod_sleeve_lifting_speed,
          }, {
            key: 'aspirate_speed',
            value: res.data.parameters.aspirate_speed,
          }, {
            key: 'aspirate_acceleration',
            value: res.data.parameters.aspirate_acceleration,
          }, {
            key: 'aspirate_delay',
            value: res.data.parameters.aspirate_delay,
          }, {
            key: 'dispense_speed',
            value: res.data.parameters.dispense_speed,
          }, {
            key: 'dispense_acceleration',
            value: res.data.parameters.dispense_acceleration,
          }, {
            key: 'dispense_delay',
            value: res.data.parameters.dispense_delay,
          }, {
            key: 'blow_liquid',
            value: res.data.parameters.blow_liquid,
          }, {
            key: 'air_gap',
            value: res.data.parameters.air_gap,
          }, {
            key: 'pre_wetting_cycle',
            value: res.data.parameters.pre_wetting_cycle,
          }, {
            key: 'tip_aspirate_speed',
            value: res.data.parameters.tip_aspirate_speed,
          }, {
            key: 'tip_dispense_speed',
            value: res.data.parameters.tip_dispense_speed,
          }, {
            key: 'tip_dispense_delay',
            value: res.data.parameters.tip_dispense_delay,
          }, {
            key: 'magnetic_speed',
            value: res.data.parameters.magnetic_speed,
          }]
          this.$store.commit('setSaveParameters', param)
        })
      },
    },
  }
</script>

<style scoped="scoped">
  .setting-system-div {
    display: flex;
    height: 100%;
    width: 100%;
    background-color: #F3F4F6;
  }

  .setting-system-siderbar {
    width: 392px;
    height: 100%;
    border-right: 2px solid #DAE0E8;
    background-color: white;
    box-sizing: border-box;
    flex-shrink: 0;
  }

  .siderbar-div {
    width: 100%;
    height: 98px;
    font-size: 26px;
    line-height: 98px;
    text-indent: 38px;
    border: solid 1px transparent;
  }

  .setting-system-siderbar-div {
    background-color: #e5eff9;
    border-color: #4c7cb2;
    box-sizing: border-box;
    color: #4C7CB2;
  }

  .setting-instrument {
    margin-top: 30px;
    margin-left: 30px;
    width: 1468px;
    height: 940px;
    background-color: #ffffff;
    border-radius: 6px;
    border: solid 1px #c2cbda;
  }

  .labware {
    height: 100%;
    width: 100%;
  }

  .setting-paramters {
    width: 1528px;
    height: 1108px;
    flex-shrink: 0;
  }
</style>
