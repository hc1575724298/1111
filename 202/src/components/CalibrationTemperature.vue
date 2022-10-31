<template>
  <div>
    <div class="temperture-title">
      <div class="t t1" :class="{'selected':temperture_option==1}" @click="changeOption('t1')">T1</div>
      <div class="t t2" :class="{'selected':temperture_option==2}" @click="changeOption('t2')">TA</div>
    </div>
    <div class="temperture-model" v-if="temperture_option==1">
      <Temperature1 class="temperture-div" :degree='10' :type='"T1"'></Temperature1>
      <div class="divider"><img src="../images/setting/divider.png" /></div>
      <Temperature1 class="temperture-div" :degree='40' :type='"T1"'></Temperature1>
      <div class="divider"><img src="../images/setting/divider.png" /></div>
      <Temperature1 class="temperture-div" :degree='100' :type='"T1"'></Temperature1>
    </div>
    <div class="temperture-model" v-if="temperture_option==2">
      <Temperature2 class="temperture-div" :degree='40' :type='"TA"'></Temperature2>
      <div class="divider"><img src="../images/setting/divider.png" /></div>
      <Temperature2 class="temperture-div" :degree='100' :type='"TA"'></Temperature2>
      <div class="divider"><img src="../images/setting/divider.png" /></div>
      <Temperature2 class="temperture-div" :degree='120' :type='"TA"'></Temperature2>
    </div>
    <div class="tube-info-button">
      <div class="button-div save" @click="save">{{this.$t("language.save")}}</div>
      <div class="button-div factory">{{this.$t("language.factory")}}</div>
    </div>
  </div>
</template>

<script>
  import Temperature1 from '@/components/Temperature'
  import Temperature2 from '@/components/Temperature'
  import {
    saveInstruments
  } from '@/api/setting.js'
  export default {
    components: {
      Temperature1,
      Temperature2
    },
    data() {
      return {
        temperture_option: 1
      }
    },
    mounted() {},
    methods: {
      changeOption(type) {
        if (type == 't1') {
          this.temperture_option = 1
        } else if (type == 't2') {
          this.temperture_option = 2
        }
      },
      save() {
        var labware = this.$store.getters.elutionData.concat(this.$store.getters.reagentData).concat(this.$store.getters
          .sampleData);
        var settings = this.$store.getters.setting;
        settings.labware = labware;
        settings.oem[3] = this.$store.getters.selectedImg;
        this.$store.commit('setSetting', settings)
        if (this.$store.getters.selectedImg == 1) {
          this.$store.commit('setBackSrc', settings.oem[0])
        } else if (this.$store.getters.selectedImg == 2) {
          this.$store.commit('setBackSrc', settings.oem[1])
        } else if (this.$store.getters.selectedImg == 3) {
          this.$store.commit('setBackSrc', settings.oem[2] + "?" + Math.random(100000000000))
        }
        var setting_tmp = JSON.parse(JSON.stringify(this.$store.getters.saveParameters));
        for (let i = 0; i < setting_tmp.length; i++) {
          if (setting_tmp[i].key == 'aspirate_delay' || setting_tmp[i].key == 'dispense_delay' || setting_tmp[i].key ==
            'tip_dispense_delay') {
            setting_tmp[i].value *= 1000;
          }
        }
        saveInstruments({
          'parameters': JSON.stringify(setting_tmp),
          'instruments': JSON.stringify(settings)
        }).then((res) => {
          if (res.code == 0) {
            this.$message({
              type: 'success',
              message: "保存设置成功"
            })
            this.$emit('refreshInstrument')
            console.log(JSON.stringify(settings))
          }
        })
      }
    }
  }
</script>

<style scoped="scoped">
  .temperture-title {
    width: fit-content;
    height: 50px;
    margin-top: 30px;
    margin-left: 30px;
    display: flex;
  }

  .t {
    width: 130px;
    height: 50px;
    background-color: #ceddf1;
    text-align: center;
    line-height: 50px;
    font-size: 24px;
  }

  .t1 {
    border-radius: 4px 0px 0px 4px;
  }

  .t2 {
    border-radius: 0px 4px 4px 0px;
  }

  .selected {
    background-color: #4c7cb2;
    color: white;
  }

  .temperture-model {
    width: 1466px;
    display: flex;
    margin-top: 15px;
    margin-left: 30px;
    height: 792px;
    background-color: #ffffff;
    border-radius: 6px;
    border: solid 1px #c2cbda;
  }

  .tube-info-button {
    margin-top: 22px;
    height: 64px;
    line-height: 64px;
    width: 100%;
    font-size: 24px;
  }

  .button-div {
    float: right;
    width: 193px;
    height: 100%;
    border-radius: 6px;
    line-height: 64px;
    font-size: 24px;
    text-align: center;
  }

  .save {
    color: white;
    background-color: #5187C3;
    margin-right: 30px;
  }

  .factory {
    border: solid 1px #4c7cb2;
    margin-right: 32px;
    box-sizing: border-box;
  }

  .temperture-div {
    margin-top: 30px;
  }

  .divider {
    margin-top: 49px;
  }
</style>
