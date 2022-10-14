<template>
  <div class="view-container">
    <div class="view-step">
      <div class="step">Step</div>
      <div class="every-step">
        <div
          @click="clickEveryStep(step.order)"
          :class="['item', step.order === activeStep ? 'active' : '']"
          v-for="step in steps"
          :key="step.order"
        >
          <span>{{
            step.order >= 9 ? step.order + 1 : "0" + (step.order + 1)
          }}</span>
          <div class="pic">
            <img :src="require('@/images/run/' + step.type + '.png')" alt="" />
          </div>
          <span>{{ step.type | toUpperCase }}</span>
        </div>
      </div>
      <div class="btn">
        <button @click="clickRun" class="buleBtn">Run</button>
        <button @click="clickStepRun" class="whiteBtn">Step Run</button>
      </div>
    </div>
    <!-- 右侧 -->
    <div class="view-info">
      <div >
      <div class="toggleBtn">
        <button
          :class="['whiteBtn', currentBtn === 1 ? 'buleBtn' : '']"
          @click="clickBasicBtn"
        >
          Basic
        </button>
        <button
          :class="['whiteBtn', currentBtn === 0 ? 'buleBtn' : '']"
          @click="clickMageticBtn"
        >
          Magetic
        </button>
      </div>
      <div class="view-info-bottom">
        <template v-if="currentBtn === 1">
          <div class="info-item">
            Step: <span>{{activeStepInfo.type }}</span>
          </div>
          <div class="info-item" v-for="(item, i) in basicData" :key="i">
            {{ item.name |toUpperCase}}:<span>{{ item.value }}</span>
          </div>
        </template>
        <template v-if="currentBtn === 0">
          <div class="info-item" v-for="(item, i) in mageticData" :key="i">
            {{ item.name |toUpperCase}}:<span>{{ item.value }}</span>
          </div>
        </template>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import { getProtocolDetail } from "@/api/run";
export default {
  data() {
    return {
      activeStepType: '',
      activeStep: "",
      currentBtn: 1, // 1 ；Basic按钮  0： Magetic按钮
      steps: [],
      runStepIds:'',
      activeStepInfo: {},
      basicData: [],
      mageticData:[],
      commonArr:[
          {
            type:"incubator",
            basickey:[
              'source_well',
              'incubator_temperature',
              'incubator_time',
              ],
              magetickey:[]
          },
          {
            type:"transfer",
            basickey:[
              'source_well',
              'destination_well',
              'volume',
              'mix_number_before_aspirating',
              'mix_speed',
              'aspirate_position',
              'dispense_position'
              ],
              magetickey:[]
          },
          {
            type:"lysis",
            basickey:[
              'source_well',
              'volume',
              'mix_time',
              'mix_speed',
              'mix_height',
              'mix_volume',
              'temperature_on',
              'temperature',
              'pre_heating',
              'pre_heating_seconds',
              'pre_cooling',
              ],
              magetickey:[
                'magnet_type',
                'segments',
                'segments',
                'interval_stay_time',
                'cycle',
                'beat_speed',
                'drying_time'
              ]
          },
          {
            type:"bind",
            basickey:[
              'source_well',
              'volume',
              'mix_time',
              'mix_speed',
              'mix_height',
              'mix_volume',
              'temperature_on',
              'temperature',
              'pre_heating',
              'pre_heating_seconds',
              'pre_cooling',
              ],
              magetickey:[
                'magnet_type',
                'segments',
                'segments',
                'interval_stay_time',
                'cycle',
                'beat_speed',
                'drying_time'
              ]
          },
          {
            type:"elution",
            basickey:[
              'source_well',
              'volume',
              'mix_time',
              'mix_speed',
              'mix_height',
              'mix_volume',
              'temperature_on',
              'temperature',
              'pre_heating',
              'pre_heating_seconds',
              'pre_cooling',
              ],
              magetickey:[
                'magnet_type',
                'segments',
                'segments',
                'interval_stay_time',
                'cycle',
                'beat_speed',
                'drying_time'
              ]
          },
          {
            type:"wash",
            basickey:[
              'source_well',
              'volume',
              'mix_time',
              'mix_speed',
              'mix_height',
              'mix_volume'
              ],
              magetickey:[]
          },
          {
            type:"discard",
            basickey:[
              'source_well',
              'volume',
              'mix_time',
              'mix_speed',
              'mix_height',
              'mix_volume',
              ],
              magetickey:[]
          },

      ]
    };
  },

  async created() {
   await this.getProtocolDetail();
   this.clickEveryStep(0)
  },

  methods: {
    //获取程序详情
    async getProtocolDetail() {
      const {
        data: { steps }
      } = await getProtocolDetail(this.$store.state.protocols.protocalInfo.id);
      this.steps = steps;
      console.log(this.steps);
    },
    clickEveryStep(order) {
      this.basicData = []
      this.mageticData =[]
      this.activeStep = order;
      this.activeStepInfo = this.steps[order]

    //   for(let k in this.activeStepInfo) {
    //       if(this.commonArr[order].basickey.indexOf(k)!=-1){
    //         this.basicData.push({
    //           name: k,
    //           value: this.activeStepInfo[k]})
    //  }
    // }

    const index = this.commonArr.findIndex(item=>item.type===this.activeStepInfo.type)
    for(let k in this.activeStepInfo) {
          if (this.commonArr[index].basickey.includes(k)){
            this.basicData.push({
              name: k,
              value: this.activeStepInfo[k]})
          }   else if (this.commonArr[index].magetickey.includes(k)){
            this.mageticData.push({
              name: k,
              value: this.activeStepInfo[k]})
          }
        }
   console.log(this.basicData);
      if(this.activeStepInfo.type==='incubator'){
        this.basicData[0].name = 'source_well(1/B)'
      } else if ( this.activeStepInfo.type==='lysis'){
         if (this.activeStepInfo.temperature_on) {
          
         }
      }


    },
    handleData(){
      if(this.activeStep===0) {
        if(!this.basicData[0]){
          for(let k in this.activeStepInfo) {
          if ( k ==='source_well'||k==='incubator_temperature'||k==='incubator_time'){
            this.basicData.push({
              name: k,
              value: this.activeStepInfo[k]})
          }
        }
        }
      }
    },
    clickRun() {
      this.runStepIds =this.steps.map(item=>item.id).join()
      this.$store.commit('protocols/updatedStepIds',[this.steps[0].id,this.runStepIds])
      this.$router.push('/system/run/protocols/sampleSettings')
    },
    clickStepRun() {
      const index = this.steps.findIndex(item=>item.order === this.activeStep)
      this.runStepIds =this.steps.slice(index).map(item=>item.id).join()
      this.$store.commit('protocols/updatedStepIds', [this.activeStepInfo.id,this.runStepIds])
      this.$router.push('/system/run/protocols/sampleSettings')
    },
    clickBasicBtn() {
      this.currentBtn = 1;
    },
    clickMageticBtn() {
      this.currentBtn = 0;
    }
  },
  filters: {
    toUpperCase(val) {
      const first = val.charAt(0).toUpperCase();
      val = first + val.slice(1);
      switch(val){
        case 'Source_well':
          val = 'Source well(1-C)'
          break;
          case 'Source_well(1/B)':
          val = 'Source well(1/B)'
          break;
          case 'Incubator_temperature':
          val = 'Temp.(10-110℃)'
          break;
          case 'Incubator_time':
          val = 'Incubator time(0-999min)'
          break;
          case 'Destination_well':
          val = 'Destination well(1-C)'
          break;
          case 'Volume':
          val = 'Volume(5-1000uL)'
          break;
          case 'Mix_number_before_aspirating':
          val = 'Mix number before aspirating(0-10)'
          break;
          case 'Mix_speed':
          val = 'Mix speede(1-10)'
          break;
          case 'Aspirate_position':
          val = 'Aspirate position(0-100)'
          break;
          case 'Dispense_position':
          val = 'Dispense position(0-100)'
          break;
          case 'Mix_time':
          val = 'Mix time(1-99min)'
          break;
          case 'Mix_height':
          val = 'Mix height(0-50mm)'
          break;
          case 'Mix_volume':
          val = 'Mix volume(5-1000uL)'
          break;
          case 'Temperature_on':
          val = 'Temperature switch'
          break;
          case 'Temperature':
          val = 'Temperature'
          break;
          case 'Pre_heating':
          val = 'Heating setup'
          break;
          case 'Pre_heating_seconds':
          val = 'Elution well preheated advance seconds(1-999s)'
          break;
          case 'Pre_cooling':
          val = 'Cooling setup'
          break;
          case 'Magnet_on':
          val = 'Heating setup'
          break;
          case 'Magnet_type':
          val = 'Magnet type:'
          break;
          case 'Interval_stay_time':
          val = 'Interval stay time(1-999s)'
          break;
          case 'Cycle':
          val = 'Cycle(1-99)'
          break;
          case 'Beat_speed':
          val = 'Beat speed(0-10)'
          break;
          case 'Drying_time':
          val = 'Drying time(0-99min)'
          break;
          case 'Segments':
          val = 'Segments(1-5)'
          break;
      }
      return val
    }
  }
};
</script>

<style scoped>
div {
  box-sizing: border-box !important;
}
.active {
  background-color: #e1f0ff;
  border: solid 1px #4171bb;
}
.view-container {
  display: flex;
  background-color: #f3f4f6;
}
.view-step {
  display: flex;
  flex-direction: column;
  width: 390px;
  height: 1108px;
  background-color: #fff;
  border-right: solid 1px #c2cbda;
}
.step {
  height: 80px;
  line-height: 80px;
  color: #333333;
  font-size: 28px;
  border-bottom: solid 1px #c2cbda;
  padding-left: 30px;
}
.every-step {
  flex: 1;
  overflow: auto;
}
.every-step .item {
  padding-left: 30px;
  height: 102px;
  display: flex;
  align-items: center;
  color: #333333;
  font-size: 26px;
}
.pic {
  width: 45px;
  height: 45px;
  text-align: center;
  margin: 0 22px 0 25px;
}
.pic img {
  max-width: 45px;
  max-height: 45px;
}
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 110px;
  border-top: solid 1px #c2cbda;
}
.btn button {
  width: 160px;
  height: 64px;
  border-radius: 6px;
  font-size: 22px;
}
.btn button:nth-child(1) {
  margin-right: 28px;
}
.whiteBtn {
  background-color: #fff;
  border: solid 1px #4c7cb2;
}
.buleBtn {
  color: #fff;
  background-image: linear-gradient(0deg, #5792d5 0%, #4c7cb2 100%);
  border: none;
}

/* 右侧 */
.view-info {
  flex: 1;
  padding: 30px;
}
.view-info>div {
  padding: 30px 30px 0;
  border-radius: 6px;
  border: solid 1px #c2cbda;
  background-color: #fff;
}
.toggleBtn {
  font-size: 0;
  margin-bottom: 60px;
}
.toggleBtn button {
  width: 200px;
  height: 64px;
  border-radius: 3px;
  font-size: 28px;
}
.info-item {
  width: 50%;
  margin-bottom: 70px;
  font-size: 26px;
}
.info-item:nth-child(9n) {
  margin-bottom: 30px;
}
.info-item span {
  margin-left: 20px;
  color: #4171bb;
}
.view-info-bottom {
  height: 890px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
</style>
