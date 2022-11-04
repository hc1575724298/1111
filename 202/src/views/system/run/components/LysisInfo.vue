<template>
  <div :class="[whitchStyle==='view'?'info-view' : 'info-run']">
    <!-- basic -->
    <template v-if="isBasic||whitchStyle==='run'">
      <div class="parameter" v-if="whitchStyle==='run'">{{$t('language.basic')}}</div>
      <div>
        <span>{{$t('language.step')}}:</span>  <span>{{ info.step_name }}</span>
      </div>
      <div>
        <span> {{$t('language.well')}}(1-C):</span> <span>{{ info.well }}</span>
      </div>
      <div>
        <span>{{$t('language.volume')}}(5-1000μl):</span>  <span>{{ info.volume }}</span>
      </div>
      <div>
        <span>{{$t('language.mix_time')}}(1-99min):</span> <span>{{ info.mix_time }}</span>
      </div>
      <div>
        <span>{{$t('language.mix_speed')}}(1-10):</span>  <span>{{ info.mix_speed }}</span>
      </div>
      <div>
       <span>{{$t('language.mix_height')}}(0-50mm):</span>   <span>{{ info.mix_height }}</span>
      </div>
      <div>
        <span>{{$t('language.mix_volume')}}(5-1000μl):</span>  <span>{{ info.mix_volume }}</span>
      </div>
      <template v-if="info.type !== 'wash'">
        <div>
          <span>{{$t('language.temperature_switch')}}:</span>
          <span>{{ info.temperature_on ? "On" : "Off" }}</span>
        </div>
        <template v-if="info.temperature_on">
          <div>
            <span>{{$t('language.temperature')}}（10-110℃):</span>  <span>{{ info.temperature }}</span>
          </div>
          <div>
            <span>{{$t('language.heating_setup')}}:</span>
            <span>{{ info.pre_heating ? $t('language.preheating') : $t('language.heating_sync') }}</span>
          </div>
          <div v-if="info.pre_heating">
            <span>{{$t('language.elution_well_preheated_advance_seconds')}}(1-999s):</span>
            <span>{{ info.pre_heating_seconds }}</span>
          </div>
          <div>
            <span>{{$t('language.cooling_setup')}}:</span>
            <span>{{ info.pre_cooling ? $t('language.precooling') : $t('language.precooling') }}</span>
          </div>
        </template>
      </template>
    </template>
    <!-- Magnetic -->
    <template v-if="!isBasic||whitchStyle==='run'">
      <div class="parameter" v-if="whitchStyle==='run'">{{$t('language.magnetic')}}</div>
      <div>
        <span>{{$t('language.magnet')}}:</span>  <span>{{ info.magnet_on ? $t('language.yes') : $t('language.no') }}</span>
      </div>
      <template v-if="info.magnet_on">
        <div>
          <span>{{$t('language.magnet_type')}}:</span> <span>{{ info.magnet_type==='tip'? $t('language.magnet_type_tip') :$t('language.magnet_type_sleeve')  }}</span>
        </div>
        <div>
          <span>{{$t('language.segments')}}(1-5):</span>  <span>{{ info.segments }}</span>
        </div>
        <template v-if="info.magnet_type === 'tip'">
          <div>
            <span> {{$t('language.interval_stay_time')}}(1-999s):</span>
            <span>{{ info.interval_stay_time }}</span>
          </div>
          <div>
            <span>{{$t('language.cycle')}}(1-99):</span>  <span>{{ info.cycle }}</span>
          </div>
          <div>
            <span>{{$t('language.beat_speed')}}(0-10):</span> <span>{{ info.beat_speed }}</span>
          </div>
          <div>
            <span>{{$t('language.drying_time')}}(0-99min):</span>  <span>{{ info.drying_time }}</span>
          </div>
          <div>
            <span>{{$t('language.expected_magnetic_total_time')}}(0-99999s):</span>
            <span>{{ info.expected_magnetic_total_time }}</span>
          </div>
        </template>
        <template v-if="info.magnet_type === 'sleeve'">
          <div>
            <span>{{$t('language.every_magnetic_time')}}(1-999s):</span>
            <span>{{ info.every_magnetic_time }}</span>
          </div>
          <div>
           <span>{{$t('language.liquid_level_magnetic_time')}}(0-999s):</span>
            <span>{{ info.liquid_level_magnetic_time }}</span>
          </div>
          <div>
            <span>{{$t('language.cycle')}}(1-99):</span>  <span>{{ info.cycle }}</span>
          </div>
          <div>
            <span>{{$t('language.magnetic_speed')}}(1-10):</span>  <span>{{ info.magnetic_speed }}</span>
          </div>
          <div>
            <span>{{$t('language.lowest_magnetic_position')}}(0-40%):</span>
            <span>{{ info.lowest_magnetic_position }}</span>
          </div>
          <div>
            <span>{{$t('language.drying_time')}}(0-99min):</span>  <span>{{ info.drying_time }}</span>
          </div>
          <div>
            <span>{{$t('language.drying_position')}}(5-50mm):</span>  <span>{{ info.drying_position }}</span>
          </div>
          <div>
            <span>{{$t('language.expected_magnetic_total_time')}}(0-99999s):</span>
            <span>{{ info.expected_magnetic_total_time }}</span>
          </div>
          <div><span>{{$t('language.discard_beads')}}</span>  <span></span></div>
          <div>
            <span>{{$t('language.mix_time')}}(1-99min):</span>  <span>{{ info.mix_time }}</span>
          </div>
          <div>
            <span>{{$t('language.mix_height')}}(0-50mm):</span>  <span>{{ info.mix_height }}</span>
          </div>
          <div>
            <span> {{$t('language.mix_volume')}}(5-1000μl):</span> <span>{{ info.mix_volume }}</span>
          </div>
        </template>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  name: "lysis",
  data() {
    return {};
  },
  props: {
    info: {
      type: Object,
      default: () => {}
    },
    isBasic: {
      type: Number,
      default: 1
    },
    whitchStyle:{
      type: String,
      default: 'view'
    }
  },
  created() {},

  methods: {}
};
</script>

<style scoped>
.info-view {
  height: 890px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
.info-view div {
  width: 704px;
  margin-bottom: 70px;
  font-size: 26px;
}
.info-view div:nth-child(9n) {
  margin-bottom: 0;
}
.info-view div span:nth-child(2) {
  margin-left: 20px;
  color: #4171bb;
}

.info-run {
  height: 855px;
  overflow: auto;
}
.info-run div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 22px;
  margin: 15px 0;
}
.info-run .parameter {
  font-size: 24px;
  color: #333333;
  font-weight: 700;
}
.info-run div span:nth-child(1) {
  color: #666;
}
.info-run div span:nth-child(2) {
  margin-right: 26px;
  color: #333;
}
</style>
