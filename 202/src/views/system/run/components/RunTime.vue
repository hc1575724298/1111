<!--
 * @Descripttion:
 * @version:
 * @Author: 苏
 * @email: 1373842098@qq.com
 * @Date: 2022-10-09 15:42:12
 * @LastEditors: sj
 * @LastEditTime: 2022-10-09 17:08:39
-->
<template>
  <div class="progress-container">
    <el-progress type="circle" :percentage="value" :show-text="false" color="#4c7cb2">
    </el-progress>
    <div class="content">
      <p>Remaining time</p>
      <p class="time">{{time | handleTime}}</p>
    </div>
    <div class="line">
      <div class="lineContainer">
        <div class="dot" :style="{
          transform: `translate(-50%, 0) rotate(${deg}deg)`
        }"></div>
      </div>
    </div>
    <div class="status">Status：<span>{{status}}</span></div>
  </div>
</template>

<script>
import utilsFunction from "@/utils/function";
export default {
  name: 'runTime',
  components: {},
  props:{
    time:{
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      value:0,
      deg:0,
      status: 'Running'
    }
  },
  computed: {},
  watch: {
    value() {
      this.deg = this.value/100 * 360
    }
  },
  created() {
  },
  filters:{
    //处理时间
    handleTime(time) {
     return utilsFunction.secondsToTime(time)
    },
  },
  mounted() {
    this.countdowm()
  },
  methods: {
    countdowm(){
      const part=100/this.time
      console.log(this.time);
				let timer = setInterval(()=>{
					if(this.time){
            this.$emit('countdown',1)
            this.value += part
					}else{
						clearInterval(timer);
						this.$emit('runEnd')
            this.value = 100
            this.status = 'Finished'
					}
				},1000);
			}
  },
}
</script>

<style scoped>
.progress-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.progress-container,
.el-progress>>>.el-progress-circle {
  width: 295px !important;
  height: 295px !important;
}
.content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 18px;
  color: #666;
}
.content .time {
    font-size: 34px;
    margin-top: 10px;
    color: #333;
    font-weight: 700;
  }
.line {
  width: 233px;
  height: 233px;
  border-radius: 50%;
  border: 1px solid #e5e9f2;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.lineContainer{
  position: relative;
   width: 233px;
  height: 233px;
   border-radius: 50%;
}
.lineContainer .dot {
  width: 1px;
  height: 116px;
  position: absolute;
  top: 0;
  left: 50%;
  transition: all .5s ease-out;
  transform-origin:bottom;
}
.lineContainer .dot::after{
    content: '';
    position: absolute;
    top: -6px;
    left: 0;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #4c7cb2;
  }
  .status {
    font-size: 28px;
    color: #333;
    margin-top: 34px;
  }
</style>
