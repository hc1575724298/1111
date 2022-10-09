<template>
   <div class="container-top">
      <img src="@/images/run/51运行进度1.png" alt="" v-if="progressNum===1"/>
      <img src="@/images/run/52运行进度2.png" alt="" v-else-if="progressNum===2"/>
      <img src="@/images/run/53运行进度3.png" alt="" v-else-if="progressNum===3"/>
      <span class="progress-one">{{$t("language.sample_settings")}}</span>
      <span class="progress-two" :class="{'font-color': progressNum===2||progressNum===3}">{{$t("language.load_labware")}}</span>
      <span class="progress-three" :class="{'font-color': progressNum===3}">{{$t("language.run")}}</span>
    </div>
</template>

<script>
export default {
  props: {
    progressNum: {
      type: Number,
      default:1
    }
  },
  data () {
    return {

    }
  },

  created () {

  },

  methods: {

  }
}
</script>

<style scoped>
.container-top .font-color {
  color: #fff !important;
}
.container-top {
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}
.progress-one {
  position: absolute;
  left: 450px;
  top: 20px;
  font-size: 24px;
  color: #fff;
}
.progress-two {
  position: absolute;
  left: 895px;
  top: 20px;
  font-size: 24px;
  color: #333333;
}
.progress-three {
  position: absolute;
  left: 1345px;
  top: 20px;
  font-size: 24px;
  color: #333333;
}

</style>
