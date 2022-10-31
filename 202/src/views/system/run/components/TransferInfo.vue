<template>
  <div :class="[whitchStyle==='view'?'info-view' : 'info-run']">
    <div class="parameter" v-if="whitchStyle==='run'">{{$t('language.basic')}}</div>
    <div> <span>{{$t('language.step')}}:</span>  <span>{{ info.step_name }}</span></div>
    <div> <span>{{$t('language.source_well')}}(1-C):</span>  <span>{{info.well}}</span></div>
    <div> <span>{{$t('language.destination_well')}}(1-C):</span>  <span>{{info.destination_well}}</span></div>
    <div> <span>{{$t('language.volume')}}(5-1000μl):</span>  <span>{{info.volume}}</span></div>
    <div> <span>{{$t('language.mix_before_aspirating')}}(0-10times):</span>  <span>{{info.mix_number_before_aspirating}}</span></div>
    <div> <span>{{$t('language.mix_speed')}}(1-10):</span>  <span>{{info.mix_speed}}</span></div>
    <div> <span>{{$t('language.aspirate_position')}}(0-100mm):</span>  <span>{{info.aspirate_position}}</span></div>
    <div> <span>{{$t('language.dispense_position')}}(0-100mm):</span>  <span>{{info.dispense_position}}</span></div>
  </div>
</template>

<script>
export default {
  name: 'transfer',
  data () {
    return {

    }
  },
  props:{
    info:{
      type: Object,
      default:()=>{}
    },
    whitchStyle:{
      type: String,
      default: 'view'
    }
    },
  created () {
  },

mounted(){

},
  methods: {

  }
}
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
