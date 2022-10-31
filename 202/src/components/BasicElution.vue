<template>
  <div class="model" v-if="title_type==1">
    <div class="step-name">
      {{$t("language.step")}}:
      <input class="input-step-name" v-model="elution.step_name" @blur="saveData()" />
    </div>
    <div class="step-name" @click="is_arraw()" ref="well1A">
      {{$t("language.well1a")}}:
      <div class="select-well">
        {{elution.well}}<img src="../images/protocols/down-prto.png" class="arraw-well" />
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
      {{$t("language.volume_5_2000")}}:
      <input class="input-step-name" v-model="elution.volume" @blur="saveData()" />
    </div>
    <div class="step-name">
      {{$t("language.mix_time")}}:
      <input class="input-step-name" v-model="elution.mix_time" @blur="saveData()" />
    </div>
    <div class="step-name">
      {{$t("language.mix_speed")}}:
      <input class="input-step-name" v-model="elution.mix_speed" @blur="saveData()" />
    </div>
    <div class="step-name">
      {{$t("language.mix_height")}}:
      <input class="input-step-name" v-model="elution.mix_height" @blur="saveData()" />
    </div>
    <div class="step-name">
      {{$t("language.mix_volume")}}:
      <input class="input-step-name" v-model="elution.mix_volume" @blur="saveData()" />
    </div>
    <div>
      <div v-if="elution.well!=2">
        <div class="step-name" style="margin-bottom: 10px;">
          {{$t("language.temperature_switch")}} :
          <span class="switch">
            <el-switch active-color="#13ce66" inactive-color="#DCDFE6" :width="66" @change="saveData()"
              v-model="temperature_on">
            </el-switch>
          </span>
        </div>
        <div class="step-name" style="margin-bottom: 10px;">
          {{$t("language.temperature")}}(10-110℃):
          <input class="input-step-name" v-model="elution.temperature" @blur="saveData()" />
        </div>
        <div class="step-name" style="margin-bottom: 10px;">
          {{$t("language.heating_step")}}:
          <div class="heating-step">
            <div class="circle" :class="{'selected-heating':elution.pre_heating==0}" @click="showWarning(0)">
              <div class="circle-inner"></div>
            </div>
            <div class="circle-text">{{$t("language.hearting_sync")}}</div>
            <div class="circle" :class="{'selected-heating':elution.pre_heating==1}" @click="showWarning(1)">
              <div class="circle-inner"></div>
            </div>
            <div class="circle-text">{{$t("language.preheating")}}</div>
          </div>
        </div>
        <div class="warning" v-if="elution.pre_heating==1">
          <div class="warning-div" @click="selectHeatStatus"><img src="../images/login/remember_selected.png"
              class="img-ok" v-if="heat_stauts" />
          </div>
          <div>{{$t("language.elution_warning")}}</div>
          <input class="warning-input" v-model="elution.pre_heating_seconds" @blur="saveData()" />
        </div>
        <div class="step-name" style="margin-bottom: 10px;">
          {{$t("language.cool_step")}}:
          <div class="heating-step">
            <div class="circle" :class="{'selected-heating':elution.pre_cooling==0}" @click="changeCool(0)">
              <div class="circle-inner"></div>
            </div>
            <div class="circle-text">{{$t("language.cool_sync")}}</div>
            <div class="circle" :class="{'selected-heating':elution.pre_cooling==1}" @click="changeCool(1)">
              <div class="circle-inner"></div>
            </div>
            <div class="circle-text">{{$t("language.precooling")}}</div>
          </div>
        </div>
      </div>
    </div>

  </div>
  <div v-else-if="title_type==2" class="model">
    <div class="step-name" style="margin-bottom: 10px;">
      {{$t("language.magnet")}} :
      <span class="switch">
        <el-switch active-color="#13ce66" inactive-color="#DCDFE6" :width="66" @change="saveData()" v-model="magnet_on">
        </el-switch>
      </span>
    </div>
    <div class="step-name" @click="is_magnet()" ref="well1A">
      {{$t("language.magnet_type")}}:
      <div class="select-well">
        {{magnet_type}}<img src="../images/protocols/down-prto.png" class="arraw-well" />
      </div>
      <div class="select-list-magnet" v-if="magnet_status">
        <div class="arrawclass" @click="selectMagnet('tip')">{{$t("language.tip")}}</div>
        <div class="arrawclass" @click="selectMagnet('sleeve')">{{$t("language.sleeve")}}</div>
      </div>
    </div>
    <div class="step-name" @click="is_Segment()" ref="well1A">
      {{$t("language.segments")}}:
      <div class="select-well">
        {{elution.segments}}<img src="../images/protocols/down-prto.png" class="arraw-well" />
      </div>
      <div class="select-list-segments" v-if="segments_status">
        <div class="arrawclass" @click="selectSegments('1')">1</div>
        <div class="arrawclass" @click="selectSegments('2')">2</div>
        <div class="arrawclass" @click="selectSegments('3')">3</div>
        <div class="arrawclass" @click="selectSegments('4')">4</div>
        <div class="arrawclass" @click="selectSegments('5')">5</div>
      </div>
    </div>
    <div v-if="elution.magnet_type=='tip'">
      <div class="step-name">
        {{$t("language.interval_stay")}}:
        <input class="input-step-name" v-model="elution.interval_stay_time" @blur="saveData()" />
      </div>
      <div class="step-name">
        {{$t("language.cycle_1_99")}}:
        <input class="input-step-name" v-model="elution.cycle" @blur="saveData()" />
      </div>
      <div class="step-name">
        {{$t("language.beat_speed")}}:
        <input class="input-step-name" v-model="elution.beat_speed" @blur="saveData()" />
      </div>
      <div class="step-name">
        {{$t("language.dry_time")}}:
        <input class="input-step-name" v-model="elution.drying_time" @blur="saveData()" />
      </div>
      <div class="step-name">
        {{$t("language.expected_magnetic")}}:
        <div class="expect-div" @blur="saveData()">{{elution.expected_magnetic_total_time}}</div>
      </div>
    </div>
    <div v-if="elution.magnet_type=='sleeve'">
      <div class="step-name">
        {{$t("language.every_magnetic")}}:
        <input class="input-step-name" v-model="elution.every_magnetic_time" @blur="saveData()" />
      </div>
      <div class="step-name">
        {{$t("language.liquid_level")}}:
        <input class="input-step-name" v-model="elution.liquid_level_magnetic_time" @blur="saveData()" />
      </div>
      <div class="step-name">
        {{$t("language.cycle_1_99")}}:
        <input class="input-step-name" v-model="elution.cycle" @blur="saveData()" />
      </div>
      <div class="step-name">
        {{$t("language.magnetic_speed")}}:
        <input class="input-step-name" v-model="elution.magnetic_speed" @blur="saveData()" />
      </div>
      <div class="step-name">
        {{$t("language.lowest_magnetic")}}:
        <input class="input-step-name" @blur="saveData()" v-model="elution.lowest_magnetic_position" />
      </div>
      <div class="step-name">
        {{$t("language.dry_time")}}:
        <input class="input-step-name" v-model="elution.drying_time" @blur="saveData()" />
      </div>
      <div class="step-name">
        {{$t("language.dry_position")}}:
        <input class="input-step-name" @blur="saveData()" v-model="elution.drying_position" />
      </div>
      <div class="step-name">
        {{$t("language.expected_magnetic")}}:
        <div class="expect-div">{{elution.expected_magnetic_total_time}}</div>
      </div>
      <div class="step-name">
        {{$t("language.discard_beads")}}
      </div>
      <div class="step-name">
        {{$t("language.mix_time")}}:
        <input class="input-step-name" @blur="saveData()" v-model="elution.mix_time" />
      </div>
      <div class="step-name">
        {{$t("language.mix_height")}}:
        <input class="input-step-name" @blur="saveData()" v-model="elution.mix_height" />
      </div>
      <div class="step-name">
        {{$t("language.mix_volume")}}:
        <input class="input-step-name" @blur="saveData()" v-model="elution.mix_volume" />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['order', 'title_type'],
    data() {
      return {
        arraw_status: false,
        elution: {},
        magnet_status: false,
        segments_status: false,
        magnet_type: null,
        temperature_on: null,
        magnet_on: null,
        heat_stauts: false
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
        this.elution.well = type
        protocol.steps[this.order - 1].well = type
        this.$store.commit('setProtocol', protocol)
      },
      getData() {
        this.elution = this.$store.getters.protocol.steps[this.order - 1]
        if (this.elution.magnet_type == 'tip') {
          this.magnet_type = this.$t("language.tip")
        } else if (this.elution.magnet_type == 'sleeve') {
          this.magnet_type = this.$t("language.sleeve")
        }
        if (this.elution.temperature_on == 1) {
          this.temperature_on = true
        } else if (this.elution.magnet_type == 0) {
          this.temperature_on = false
        }
        if (this.elution.magnet_on == 1) {
          this.magnet_on = true
        } else if (this.elution.magnet_on == 0) {
          this.magnet_on = false
        }
        if (this.elution.pre_heating_seconds != 0) {
          this.heat_stauts = true
        } else {
          this.heat_stauts = false
        }
      },
      saveData() {
        var protocol = JSON.parse(JSON.stringify(this.$store.getters.protocol))
        protocol.steps[this.order - 1] = this.elution
        protocol.steps[this.order - 1].magnet_on = protocol.steps[this.order - 1].magnet_on ? 1 : 0
        protocol.steps[this.order - 1].temperature_on = protocol.steps[this.order - 1].temperature_on ? 1 : 0
        this.$store.commit('setProtocol', protocol)
        this.$emit('changeName')
      },
      showWarning(type) {
        var protocol = JSON.parse(JSON.stringify(this.$store.getters.protocol))
        this.elution.pre_heating = type
        protocol.steps[this.order - 1].pre_heating = type
        this.$store.commit('setProtocol', protocol)
      },
      changeCool(type) {
        var protocol = JSON.parse(JSON.stringify(this.$store.getters.protocol))
        this.elution.pre_cooling = type
        protocol.steps[this.order - 1].pre_cooling = type
        this.$store.commit('setProtocol', protocol)
      },
      selectMagnet(type) {
        var protocol = JSON.parse(JSON.stringify(this.$store.getters.protocol))
        this.elution.magnet_type = type
        protocol.steps[this.order - 1].magnet_type = type
        this.$store.commit('setProtocol', protocol)
      },
      selectSegments(type) {
        var protocol = JSON.parse(JSON.stringify(this.$store.getters.protocol))
        this.elution.segments = type
        protocol.steps[this.order - 1].segments = type
        this.$store.commit('setProtocol', protocol)
      },
      is_magnet() {
        this.magnet_status = !this.magnet_status
      },
      is_Segment() {
        this.segments_status = !this.segments_status
      },
      selectHeatStatus() {
        this.heat_stauts = !this.heat_stauts
        if (this.heat_stauts == false) {
          this.elution.pre_heating_seconds = 0
        }
      }

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
