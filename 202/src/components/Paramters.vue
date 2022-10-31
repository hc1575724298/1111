<template>
  <div>
    <div class="paramters-title">
      <div class="paramter-buttons motion" :class="{'selected-buttons':$store.getters.parameters=='motion'}"
        @click="changeParamter('motion')">{{$t("language.motion")}}</div>
      <div class="paramter-buttons transfer" :class="{'selected-buttons':$store.getters.parameters=='transfer'}"
        @click="changeParamter('transfer')">{{$t("language.transfer")}}</div>
      <div class="paramter-buttons magnet" :class="{'selected-buttons':$store.getters.parameters=='magnet'}"
        @click="changeParamter('magnet')">{{$t("language.magnet")}}</div>
    </div>
    <div v-if="$store.getters.parameters=='motion'">
      <div class="motion-parameters" v-for="(item,index) in motion_setting" :key="index">
        <div style="float: left;" v-if="index==0">{{$t("language.horizontal_speed")}}</div>
        <div style="float: left;" v-if="index==1">{{$t("language.magnetic_lifting_speed")}}</div>
        <div style="float: left;" v-if="index==2">{{$t("language.magnetic_sleeve_speed")}}</div>
        <div class="img-div" @click="openModified(item.key)"><img src="../images/setting/more.png" /></div>
        <div style="float: right;">{{item.value}}</div>
      </div>
    </div>
    <div v-if="$store.getters.parameters=='transfer'">
      <div class="transfer-parameters" v-for="(item,index) in transfer_setting" :key="index">
        <div style="float: left;" v-if="index==0">{{$t("language.aspirate_speed")}}</div>
        <div style="float: left;" v-if="index==1">{{$t("language.aspirate_acceleration")}}</div>
        <div style="float: left;" v-if="index==2">{{$t("language.aspirate_delay")}}</div>
        <div style="float: left;" v-if="index==3">{{$t("language.dispense_speed")}}</div>
        <div style="float: left;" v-if="index==4">{{$t("language.dispense_acceleration")}}</div>
        <div style="float: left;" v-if="index==5">{{$t("language.dispense_delay")}}</div>
        <div style="float: left;" v-if="index==6">{{$t("language.blow_liquid")}}</div>
        <div style="float: left;" v-if="index==7">{{$t("language.air_gap")}}</div>
        <div style="float: left;" v-if="index==8">{{$t("language.prewetting_cycle")}}</div>
        <div class="img-div" @click="openModified(item.key)"><img src="../images/setting/more.png" /></div>
        <div style="float: right;">{{item.value}}</div>
      </div>
    </div>
    <div v-if="$store.getters.parameters=='magnet'">
      <div class="tip">{{$t("language.tip")}}</div>
      <div class="transfer-parameters">
        <div style="float: left;">{{$t("language.magnet_aspirate_speed")}}</div>
        <div class="img-div" @click="openModified(magnet_setting[0].key)"><img src="../images/setting/more.png" />
        </div>
        <div style="float: right;">{{magnet_setting[0].value}}</div>
      </div>
      <div class="transfer-parameters">
        <div style="float: left;">{{$t("language.magnet_dispense_speed")}}</div>
        <div class="img-div" @click="openModified(magnet_setting[1].key)"><img src="../images/setting/more.png" />
        </div>
        <div style="float: right;">{{this.magnet_setting[1].value}}</div>
      </div>
      <div class="transfer-parameters">
        <div style="float: left;">{{$t("language.magnet_dispense_delay")}}</div>
        <div class="img-div" @click="openModified(magnet_setting[2].key)"><img src="../images/setting/more.png" />
        </div>
        <div style="float: right;">{{magnet_setting[2].value}}</div>
      </div>
      <div class="tip">{{$t("language.sleeve")}}</div>
      <div class="transfer-parameters">
        <div style="float: left;">{{$t("language.magnet_speed")}}</div>
        <div class="img-div" @click="openModified(magnet_setting[3].key)"><img src="../images/setting/more.png" />
        </div>
        <div style="float: right;">{{magnet_setting[3].value}}</div>
      </div>
    </div>
    <div class="tube-info-button">
      <div class="button-div save" @click="saveParameters($store.getters.parameters)">{{this.$t("language.save")}}</div>
      <div class="button-div factory">{{this.$t("language.factory")}}</div>
    </div>
    <ModifiedParamters :paramters_name='paramter_name' v-if='modified_status' @ok='modifiedOk' @back='close'>
    </ModifiedParamters>
  </div>
</template>

<script>
  import {
    searchSetting
  } from '@/api/setting.js'
  import {
    saveInstruments
  } from '@/api/setting.js'
  import
  ModifiedParamters
  from '@/components/ModifiedParamters'
  export default {
    components: {
      ModifiedParamters
    },
    data() {
      return {
        modified_status: false,
        paramter_name: null,
        motion_setting: [{
          key: 'horizontal_speed',
          value: null,
        }, {
          key: 'magnetic_rod_lifting_speed',
          value: null,
        }, {
          key: 'magnetic_rod_sleeve_lifting_speed',
          value: null,
        }],
        transfer_setting: [{
          key: 'aspirate_speed',
          value: null,
        }, {
          key: 'aspirate_acceleration',
          value: null,
        }, {
          key: 'aspirate_delay',
          value: null,
        }, {
          key: 'dispense_speed',
          value: null,
        }, {
          key: 'dispense_acceleration',
          value: null,
        }, {
          key: 'dispense_delay',
          value: null,
        }, {
          key: 'blow_liquid',
          value: null,
        }, {
          key: 'air_gap',
          value: null,
        }, {
          key: 'pre_wetting_cycle',
          value: null,
        }],
        magnet_setting: [{
          key: 'tip_aspirate_speed',
          value: null,
        }, {
          key: 'tip_dispense_speed',
          value: null,
        }, {
          key: 'tip_dispense_delay',
          value: null,
        }, {
          key: 'magnetic_speed',
          value: null,
        }]
      }
    },
    watch: {
      'motion_setting': {
        deep: true,
        handler(newval, oldval) {
          this.$store.commit('setSaveParameters', JSON.parse(JSON.stringify(this.motion_setting.concat(this
            .transfer_setting).concat(this
            .magnet_setting))))
        }
      },
      'transfer_setting': {
        deep: true,
        handler(newval, oldval) {
          this.$store.commit('setSaveParameters', JSON.parse(JSON.stringify(this.motion_setting.concat(this
            .transfer_setting).concat(this
            .magnet_setting))))
        }
      },
      'magnet_setting': {
        deep: true,
        handler(newval, oldval) {
          this.$store.commit('setSaveParameters', JSON.parse(JSON.stringify(this.motion_setting.concat(this
            .transfer_setting).concat(this
            .magnet_setting))))
        }
      },
    },
    mounted() {
      this.getParameters()
    },
    methods: {
      close() {
        this.modified_status = false
      },
      openModified(type) {
        this.modified_status = true
        if (type == 'horizontal_speed') {
          this.paramter_name = this.$t("language.horizontal_speed")
          this.$store.getters.setting.parameters.horizontal_speed
        } else if (type == 'magnetic_rod_lifting_speed') {
          this.paramter_name = this.$t("language.magnetic_lifting_speed")
        } else if (type == 'magnetic_rod_sleeve_lifting_speed') {
          this.paramter_name = this.$t("language.magnetic_sleeve_speed")
        } else if (type == 'aspirate_speed') {
          this.paramter_name = this.$t("language.aspirate_speed")
        } else if (type == 'aspirate_acceleration') {
          this.paramter_name = this.$t("language.aspirate_acceleration")
        } else if (type == 'aspirate_delay') {
          this.paramter_name = this.$t("language.aspirate_delay")
        } else if (type == 'dispense_speed') {
          this.paramter_name = this.$t("language.dispense_speed")
        } else if (type == 'dispense_acceleration') {
          this.paramter_name = this.$t("language.dispense_acceleration")
        } else if (type == 'dispense_delay') {
          this.paramter_name = this.$t("language.dispense_delay")
        } else if (type == 'blow_liquid') {
          this.paramter_name = this.$t("language.blow_liquid")
        } else if (type == 'air_gap') {
          this.paramter_name = this.$t("language.air_gap")
        } else if (type == 'pre_wetting_cycle') {
          this.paramter_name = this.$t("language.prewetting_cycle")
        } else if (type == 'tip_aspirate_speed') {
          this.paramter_name = this.$t("language.magnet_aspirate_speed")
        } else if (type == 'tip_dispense_speed') {
          this.paramter_name = this.$t("language.magnet_dispense_speed")
        } else if (type == 'tip_dispense_delay') {
          this.paramter_name = this.$t("language.magnet_dispense_delay")
        } else if (type == 'magnetic_speed') {
          this.paramter_name = this.$t("language.magnet_speed")
        }
      },
      modifiedOk(data) {
        this.modified_status = false;
        let settings = this.$store.getters.setting;
        if (this.paramter_name == this.$t("language.horizontal_speed")) {
          settings.parameters.horizontal_speed = data;
          this.motion_setting[0].value = data;
          this.$store.commit('setSetting', settings);
        } else if (this.paramter_name == this.$t("language.magnetic_lifting_speed")) {
          this.motion_setting[1].value = data;
          settings.parameters.magnetic_rod_lifting_speed = data;
          this.$store.commit('setSetting', settings);
        } else if (this.paramter_name == this.$t("language.magnetic_sleeve_speed")) {
          this.motion_setting[2].value = data;
          settings.parameters.magnetic_rod_sleeve_lifting_speed = data;
          this.$store.commit('setSetting', settings);
        } else if (this.paramter_name == this.$t("language.aspirate_speed")) {
          this.transfer_setting[0].value = data;
          settings.parameters.aspirate_speed = data;
          this.$store.commit('setSetting', settings);
        } else if (this.paramter_name == this.$t("language.aspirate_acceleration")) {
          this.transfer_setting[1].value = data;
          settings.parameters.aspirate_acceleration = data;
          this.$store.commit('setSetting', settings);
        } else if (this.paramter_name == this.$t("language.aspirate_delay")) {
          this.transfer_setting[2].value = data;
          settings.parameters.aspirate_delay = data;
          this.$store.commit('setSetting', settings);
        } else if (this.paramter_name == this.$t("language.dispense_speed")) {
          this.transfer_setting[3].value = data;
          settings.parameters.dispense_speed = data;
          this.$store.commit('setSetting', settings);
        } else if (this.paramter_name == this.$t("language.dispense_acceleration")) {
          this.transfer_setting[4].value = data;
          settings.parameters.dispense_acceleration = data;
          this.$store.commit('setSetting', settings);
        } else if (this.paramter_name == this.$t("language.dispense_delay")) {
          this.transfer_setting[5].value = data;
          settings.parameters.dispense_delay = data;
          this.$store.commit('setSetting', settings);
        } else if (this.paramter_name == this.$t("language.blow_liquid")) {
          this.transfer_setting[6].value = data;
          settings.parameters.blow_liquid = data;
          this.$store.commit('setSetting', settings);
        } else if (this.paramter_name == this.$t("language.air_gap")) {
          this.transfer_setting[7].value = data;
          settings.parameters.air_gap = data;
          this.$store.commit('setSetting', settings);
        } else if (this.paramter_name == this.$t("language.prewetting_cycle")) {
          this.transfer_setting[8].value = data;
          settings.parameters.pre_wetting_cycle = data;
          this.$store.commit('setSetting', settings);
        } else if (this.paramter_name == this.$t("language.magnet_aspirate_speed")) {
          this.magnet_setting[0].value = data;
          settings.parameters.tip_aspirate_speed = data;
          this.$store.commit('setSetting', settings);
        } else if (this.paramter_name == this.$t("language.magnet_dispense_speed")) {
          this.magnet_setting[1].value = data;
          settings.parameters.tip_dispense_speed = data;
          this.$store.commit('setSetting', settings);
        } else if (this.paramter_name == this.$t("language.magnet_dispense_delay")) {
          this.magnet_setting[2].value = data;
          settings.parameters.tip_dispense_delay = data;
          this.$store.commit('setSetting', settings);
        } else if (this.paramter_name == this.$t("language.magnet_speed")) {
          this.magnet_setting[3].value = data;
          settings.parameters.magnetic_speed = data;
          this.$store.commit('setSetting', settings);
        }
      },
      changeParamter(type) {
        this.$store.commit('setPrameters', type)
      },
      getParameters() {
        this.motion_setting[0].value = this.$store.getters.setting.parameters.horizontal_speed;
        this.motion_setting[1].value = this.$store.getters.setting.parameters.magnetic_rod_lifting_speed;
        this.motion_setting[2].value = this.$store.getters.setting.parameters.magnetic_rod_sleeve_lifting_speed;
        this.transfer_setting[0].value = this.$store.getters.setting.parameters.aspirate_speed;
        this.transfer_setting[1].value = this.$store.getters.setting.parameters.aspirate_acceleration;
        this.transfer_setting[2].value = this.$store.getters.setting.parameters.aspirate_delay;
        this.transfer_setting[3].value = this.$store.getters.setting.parameters.dispense_speed;
        this.transfer_setting[4].value = this.$store.getters.setting.parameters.dispense_acceleration;
        this.transfer_setting[5].value = this.$store.getters.setting.parameters.dispense_delay;
        this.transfer_setting[6].value = this.$store.getters.setting.parameters.blow_liquid;
        this.transfer_setting[7].value = this.$store.getters.setting.parameters.air_gap;
        this.transfer_setting[8].value = this.$store.getters.setting.parameters.pre_wetting_cycle;
        this.magnet_setting[0].value = this.$store.getters.setting.parameters.tip_aspirate_speed;
        this.magnet_setting[1].value = this.$store.getters.setting.parameters.tip_dispense_speed;
        this.magnet_setting[2].value = this.$store.getters.setting.parameters.tip_dispense_delay;
        this.magnet_setting[3].value = this.$store.getters.setting.parameters.magnetic_speed;
      },
      saveParameters(type) {
        var setting;
        var setting_tmp;
        setting_tmp = JSON.parse(JSON.stringify(this.motion_setting.concat(this.transfer_setting).concat(this
          .magnet_setting)));
        for (let i = 0; i < setting_tmp.length; i++) {
          if (setting_tmp[i].key == 'aspirate_delay' || setting_tmp[i].key == 'dispense_delay' || setting_tmp[i].key ==
            'tip_dispense_delay') {
            setting_tmp[i].value *= 1000;
          }
        }
        setting = JSON.stringify(setting_tmp)
        var instruments = this.$store.getters.setting;
        instruments.oem[3] = this.$store.getters.selectedImg;
        if (this.$store.getters.selectedImg == 1) {
          this.$store.commit('setBackSrc', instruments.oem[0])
        }else if(this.$store.getters.selectedImg == 2){
          this.$store.commit('setBackSrc', instruments.oem[1])
        }else if(this.$store.getters.selectedImg == 3){
          this.$store.commit('setBackSrc', instruments.oem[2]+ "?" +Math.random(100000000000))
        }
        saveInstruments({
          'parameters': setting,
          'instruments': JSON.stringify(instruments)
        }).then((res) => {
          if (res.code == 0) {
            this.getParameters()
            this.$message({
              type: 'success',
              message: "保存设置成功"
            })
          }
        })
      }
    },
  }
</script>

<style scoped="scoped">
  .paramters-title {
    height: 58px;
    width: 60%;
    display: flex;
    margin-left: 30px;
    margin-top: 20px;
  }

  .paramter-buttons {
    width: 180px;
    height: 58px;
    font-size: 22px;
    line-height: 58px;
    text-align: center;
    border: solid 1px #c2cbda;
    box-sizing: border-box;
    background-color: white;
  }

  .motion {
    border-radius: 4px 0px 0px 4px;
  }


  .magnet {
    border-radius: 0px 4px 4px 0px;
  }

  .selected-buttons {
    color: white;
    background-color: #548CCC;
  }

  .motion-parameters {
    width: 1466px;
    height: 85px;
    background-color: #ffffff;
    border-radius: 6px;
    border: solid 1px #c2cbda;
    margin-top: 20px;
    margin-left: 30px;
    font-size: 26px;
    line-height: 85px;
    text-indent: 32px;
  }

  .transfer-parameters {
    width: 1466px;
    height: 85px;
    background-color: #ffffff;
    border-radius: 6px;
    border: solid 1px #c2cbda;
    margin-top: 15px;
    margin-left: 30px;
    font-size: 26px;
    line-height: 85px;
    text-indent: 32px;
  }

  .img-div {
    float: right;
    margin-right: 32px;
    margin-top: 10px;
    width: fit-content;
  }

  .tube-info-button {
    position: absolute;
    bottom: 30px;
    right: 30px;
  }

  .button-div {
    float: right;
    width: 193px;
    height: 64px;
    border-radius: 6px;
    line-height: 64px;
    font-size: 24px;
    text-align: center;
  }

  .save {
    color: white;
    background-color: #5187C3;
  }

  .factory {
    border: solid 1px #4c7cb2;
    margin-right: 32px;
    background-color: white;
    box-sizing: border-box;
  }

  .tip {
    font-size: 26px;
    margin-top: 20px;
    margin-left: 30px;
  }
</style>
