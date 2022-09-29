<template>
  <div class="setting-system-div">
    <div class="setting-system-siderbar">
      <div class="siderbar-div" :class="{'setting-system-siderbar-div': $store.getters.instrumentsiderbar==item.id}"
        v-for="(item,index) in tools_siderbar_lists" @click="changeSiderbar(item.id)">
        {{item.description}}
      </div>
    </div>
    <div class="setting-instrument" >
      <Labware v-if="$store.getters.instrumentsiderbar==1"></Labware>
    </div>
  </div>
</template>

<script>
import Labware from '@/components/Labware'
  export default {
    components: {
      Labware
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
            description: this.$t("language.transfer_liquid_calibration")
          },
          {
            id: 5,
            description: this.$t("language.worktable_calibration")
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

    },
    methods: {
      changeSiderbar(id) {
        this.$store.commit('setInstrumentSiderbar', id)
      }
    }
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
</style>
