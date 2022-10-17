<template>
  <div class="container">
    <RunProgress :progressNum="3" />
    <div class="run-info">
      <!-- 左侧 -->
      <div class="info-left">
          <div class="protocol-title">
            <div class="protocol" v-if="isShowtime">
              Protocol：<span>{{ $store.state.protocols.protocalInfo.name }}</span>
            </div>
            <div v-if="isShowList" class="parameter">
              Parameter
            </div>
            <div class="pic">
              <div @click="clickTime">
                <img src="@/images/run/37.timechecked.png" v-if="isShowtime" />
                <img src="@/images/run/38时间显示未选中 (2).png" v-else />
              </div>
              <div @click="clickList" v-if="$store.state.user.group!=='user'">
                <img src="@/images/run/39列表选中.png" v-if="isShowList" />
                <img src="@/images/run/40列表未选中.png" v-else />
              </div>
            </div>
          </div>
          <!-- time -->
          <div v-if="isShowtime">
            <div class="protocol">Run started at：<span>{{$route.query.runStartTime}}</span></div>
          <div class="protocol">Sample number：<span>{{$store.state.protocols.selectedTubeList.length}}</span></div>
          <div class="time">
            <RunTime :time="runTime" @countdown="handleRunTime" @runEnd="runTime=0"/>
          </div>
          </div>
          <!-- list -->
          <div v-if="isShowList">
            <div class="parameter">Basic</div>
            <div class="info" v-for="(item,index) in 6" :key="index">
              <span class="info-title">Step:</span>
              <span class="info-content">06 Wash2</span>
            </div>
            <div class="basic parameter">Magnetic</div>
            <div class="info" v-for="(item,index) in 6" :key="index">
              <span class="info-title">Step:</span>
              <span class="info-content">06 Wash2</span>
            </div>
          </div>
      </div>
      <!-- 右侧 -->
      <div class="info-right">
        <div class="step">Step</div>
        <div class="item" v-for="item in stepList" :key="item.id">
          <div class="stepImg"><img :src="item.imgName" /></div>
          <span style="margin-right: 5px;">{{ item.id >= 10 ? item.id : "0" + item.id }} </span>
          <span>{{ item.stepName }}</span>
          <div class="line"></div>
          <img src="@/images/run/41完成.png" alt="" v-if="item.done === true" />
          <img
            src="@/images/run/42进行中.png"
            alt=""
            v-else-if="item.done === 'running'"
          />
          <img src="@/images/run/43等待.png" alt="" v-else />
        </div>
        <div class="footer-btn">
          <button class="abort" @click="clickAbortBtn">Abort</button>
          <button class="pause" @click="clickPauseBtn">Pause</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RunProgress from "@/components/RunProgress.vue";
import RunTime from "./components/RunTime";
export default {
  components: {
    RunProgress,
    RunTime
  },
  data() {
    return {
      runTime:3,
      isShowtime: true,
      isShowList: false,
      stepList: [
        {
          id: 1,
          imgName: require("@/images/run/incubator.png"),
          stepName: "Incubator",
          done: true // false 未完成  true 完成  running  进行中
        },
        {
          id: 2,
          imgName: require("@/images/run/transfer.png"),
          stepName: "Transfer",
          done: true
        },
        {
          id: 3,
          imgName: require("@/images/run/lysis.png"),
          stepName: "Lysis",
          done: false
        },
        {
          id: 4,
          imgName: require("@/images/run/bind.png"),
          stepName: "Bind",
          done: "running"
        },
        {
          id: 5,
          imgName: require("@/images/run/wash.png"),
          stepName: "Wash1",
          done: false
        },
        {
          id: 6,
          imgName: require("@/images/run/wash.png"),
          stepName: "Wash2",
          done: false
        },
        {
          id: 7,
          imgName: require("@/images/run/wash.png"),
          stepName: "Wash3",
          done: false
        },
        {
          id: 8,
          imgName: require("@/images/run/wash.png"),
          stepName: "Wash4",
          done: false
        },
        {
          id: 9,
          imgName: require("@/images/run/elution.png"),
          stepName: "Elution",
          done: false
        },
        {
          id: 10,
          imgName: require("@/images/run/discard.png"),
          stepName: "Discard",
          done: false
        },
        {
          id: 11,
          imgName: require("@/images/run/unload labware.png"),
          stepName: "Unload labware",
          done: false
        }
      ]
    };
  },

  created(){

  },

  methods: {
    clickTime() {
      this.isShowtime = true;
      this.isShowList = false;
    },
    clickList() {
      this.isShowList = true;
      this.isShowtime = false;
    },
    handleRunTime(val){
      this.runTime -= val
    },
    clickAbortBtn(){
      console.log('点击Abort');
    },
    clickPauseBtn(){
      console.log('点击Pause');
    },
  }
};
</script>

<style scoped>
div {
  box-sizing: border-box !important;
}
.container {
  padding: 20px 34px 30px;
  background-color: #f3f4f6;
}
.run-info {
  display: flex;
  width: 1851px;
  height: 967px;
  background-color: #ffffff;
  border-radius: 6px;
  border: solid 1px #c2cbda;
  padding: 30px;
}
.info-left {
  width: 855px;
  height: 100%;
  border-right: solid 1px #c2cbda;
}
.protocol-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.protocol {
  font-size: 22px;
  color: #666;
  margin-bottom: 20px;
}
.parameter {
  font-size: 24px;
  color: #333333;
  font-weight: 700;
}
.protocol span {
  color: #000;
}
.pic {
  display: flex;
}
.pic img {
  margin-right: 30px;
}
.info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 22px;
  margin: 15px 0;
}
.info-title {
  color: #666;
}
.info-content {
  margin-right: 26px;
  color: #333;
}
/* 右侧 */
.info-right {
  padding-left: 34px;
}
.step {
  font-size: 26px;
  color: #000;
  font-weight: 700;
  margin-bottom: 29px;
}
.item {
  width: 904px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}
.item span {
  font-size: 24px;
  color: #333333;
}
.stepImg {
  width: 45px;
  height: 45px;
  margin-right: 30px;
}
.stepImg img {
  max-width: 45px;
  max-height: 45px;
}
.line {
  flex: 1;
  height: 1px;
  border-top: 1px dashed #707070;
  margin: 0 29px 0 27px;
}
.footer-btn {
  display: flex;
  align-items: center;
  justify-content: end;
  margin-top: 50px;
  font-size: 24px;

}
.abort {
  width: 190px;
  height: 64px;
  background-image: linear-gradient(0deg, #fe6e6e 0%, #de4a4a 100%);
  border: none;
  margin-right: 26px;
  border-radius: 6px;
  color: #fff;
}
.pause {
  width: 190px;
  height: 64px;
  color: #fff;
  background-image: linear-gradient(0deg, #5792d5 0%, #4c7cb2 100%);
  border-radius: 6px;
  border: none;
}
.time {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 550px;
}
</style>
