<template>
  <div style="width: 488px;">
    <div class="temperature-option-name">
      {{ $t("language.temperature")}}({{degree}}°C)
    </div>
    <div class="adj-sv">
      <div class="sv">SV</div>
      <div class="adj">ADJ</div>
    </div>
    <div class="temperature-info-div">
      <div v-for="(item,index) in temperature_options" class="temperature-info" :key="index">
        <div class="adj-info">{{type}}{{item.description}}</div>
        <div class="sv-info">{{item.value}}</div>
        <input class="adj-input" v-model="item.adj_value" />
      </div>
    </div>
    <div class="start-cali" @click="startCali()"
      :class="{'unselected':$store.getters.temOption!=notifyObj.running&& $store.getters.isNotify}">
      <div v-if="type+degree!=notifyObj.running">{{$t("language.start_cali")}}</div>
      <div v-else>{{$t("language.stop_cali")}}</div>
    </div>
  </div>
</template>

<script>
  import {
    testCali
  } from '@/api/setting.js'
  import {
    stopCali
  } from '@/api/setting.js'
  export default {
    props: ['degree', 'type'],
    data() {
      return {
        temperature_options: [{
          id: 1,
          description: "(1-8):",
          value: '--',
          adj_value: null
        }, {
          id: 2,
          description: "(9-16):",
          value: '--',
          adj_value: null
        }, {
          id: 3,
          description: "(17-24):",
          value: '--',
          adj_value: null
        }],
        start_stop: false,
        notifyObj: {
          running: null
        },
      }
    },
    watch: {
      'temperature_options': {
        deep: true,
        handler(newval, oldval) {
          var setting = JSON.parse(JSON.stringify(this.$store.getters.setting))
          for (var i = 0; i < this.$store.getters.setting.temperature_calibration.length; i++) {
            if ((this.type + this.degree) == (this.$store.getters.setting.temperature_calibration[i].position + this
                .$store.getters.setting.temperature_calibration[i].temperature)) {
              for (var j = 0; j < newval.length; j++) {
                setting.temperature_calibration[i].adj_info['adj'+(j+1)]= newval[j].adj_value;
              }
            }
          }
          this.$store.commit('setSetting',setting)
        }
      }
    },
    mounted() {
      this.getTemData()
      this.EventBus.on(this.Notify.CODE_START_TEMPERATURE_CALIBRATION, (notify) => {
        this.$store.commit('setIsNotify', true)
        if ((this.type + this.degree) == (notify.Data.position + notify.Data.temperature)) {
          this.temperature_options[0].value = notify.Data.sv1;
          this.temperature_options[1].value = notify.Data.sv2
          this.temperature_options[2].value = notify.Data.sv3
          this.notifyObj.running = notify.Data.position + notify.Data.temperature;
        }
      })
    },
    methods: {
      startCali() {
        if (this.$store.getters.temOption != this.notifyObj.running && this.$store.getters.isNotify) {
          return
        }
        if (this.type + this.degree == this.notifyObj.running) {
          stopCali().then((res) => {
            this.notifyObj.running = null
            this.$store.commit('setIsNotify', false)
          })
        }
        testCali({
          'position': this.type,
          'temperature': this.degree
        }).then((res) => {
          this.$store.commit('setTemOption', this.type + this.degree)
        })
      },
      getTemData() {
        for (var i = 0; i < this.$store.getters.setting.temperature_calibration.length; i++) {
          if ((this.type + this.degree) == (this.$store.getters.setting.temperature_calibration[i].position + this
              .$store
              .getters.setting.temperature_calibration[i].temperature)) {
            this.temperature_options[0].adj_value = Number(this.$store.getters.setting.temperature_calibration[i]
              .adj_info.adj1).toFixed(1);
            this.temperature_options[1].adj_value = Number(this.$store.getters.setting.temperature_calibration[i]
              .adj_info.adj2).toFixed(1)
            this.temperature_options[2].adj_value = Number(this.$store.getters.setting.temperature_calibration[i]
              .adj_info.adj3).toFixed(1)
          }
        }
      }
    },
    destroyed() {}
  }
</script>

<style scoped="scoped">
  .temperature-option-name {
    font-size: 26px;
    margin-left: 30px;
  }

  .adj-sv {
    font-size: 26px;
    width: 100%;
    margin-top: 70px;
  }

  .adj {
    width: 160px;
    float: right;
    text-align: center;
    margin-left: 151px;
    margin-right: 30px;
  }

  .sv {
    width: 100px;
    height: 100%;
    margin-right: 20px;
    text-align: center;
    float: right;
  }

  .temperature-info-div {
    float: left;
    height: fit-content;
    width: 100%;
    margin-top: 40px;
    font-size: 26px;
  }

  .temperature-info:nth-child(1) {
    margin-top: 0;
  }

  .temperature-info {
    height: 55px;
    width: 100%;
    line-height: 55px;
    margin-top: 60px;
  }

  .adj-info {
    float: left;
    margin-left: 41px;
  }

  .adj-input {
    width: 160px;
    height: 100%;
    float: right;
    background-color: #ffffff;
    font-size: 24px;
    text-align: center;
    border-radius: 4px;
    margin-right: 30px;
    box-sizing: border-box;
    border: solid 1px #c2cbda;
  }

  .sv-info {
    float: right;
    width: 100px;
    height: 100%;
    margin-right: 20px;
    text-align: center;
  }

  .start-cali {
    float: left;
    margin-top: 77px;
    margin-left: 144px;
    width: 200px;
    height: 60px;
    border-radius: 4px;
    border: solid 1px #c2cbda;
    font-size: 24px;
    text-align: center;
    line-height: 60px;
    color: #4c7cb2;
  }

  .unselected {
    background-color: #c8c8c8;
    color: white;
  }
</style>
