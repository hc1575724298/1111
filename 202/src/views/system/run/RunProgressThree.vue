<template>
  <div class="container">
    <RunProgress :progressNum="3" />
    <div class="run-info">
      <div class="info-left">
        <div class="protocol-title">
          <div class="protocol">
            Protocol：<span>{{ $store.state.protocols.pageName }}</span>
          </div>
          <div class="pic">
            <img src="@/images/run/37.timechecked.png" v-if="isShowtime" />
            <img src="@/images/run/38时间显示未选中 (2).png" v-else />
            <img src="@/images/run/39列表选中.png" v-if="isShowList" />
            <img src="@/images/run/40列表未选中.png" v-else />
          </div>
        </div>
        <div class="protocol">Run started at：<span>2022/22/</span></div>
        <div class="protocol">Sample number：<span>8</span></div>
      </div>
      <div class="info-right">
        <div class="step">Step</div>
        <div class="item" v-for="item in stepList" :key="item.id">
          <img :src="item.imgName" class="stepImg" />
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
          <button class="abort">Abort</button>
          <button class="pause">Pause</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RunProgress from "@/components/RunProgress.vue";
export default {
  components: {
    RunProgress
  },
  data() {
    return {
      isShowtime: false,
      isShowList: false,
      stepList: [
        {
          id: 1,
          imgName: require("@/images/run/21孵育.png"),
          stepName: "01  Incubator",
          done: true // false 未完成  true 完成  running  进行中
        },
        {
          id: 2,
          imgName: require("@/images/run/22分液.png"),
          stepName: "02 Transfer",
          done: true
        },
        {
          id: 3,
          imgName: require("@/images/run/33裂解.png"),
          stepName: "03 Lysis",
          done: false
        },
        {
          id: 4,
          imgName: require("@/images/run/34结合.png"),
          stepName: "04 Bind",
          done: "running"
        },
        {
          id: 5,
          imgName: require("@/images/run/35洗涤.png"),
          stepName: "05 Wash1",
          done: false
        },
        {
          id: 6,
          imgName: require("@/images/run/35洗涤.png"),
          stepName: "06 Wash2",
          done: false
        },
        {
          id: 7,
          imgName: require("@/images/run/35洗涤.png"),
          stepName: "07 Wash3",
          done: false
        },
        {
          id: 8,
          imgName: require("@/images/run/35洗涤.png"),
          stepName: "08 Wash4",
          done: false
        },
        {
          id: 9,
          imgName: require("@/images/run/36洗脱.png"),
          stepName: "09 Elution",
          done: false
        },
        {
          id: 10,
          imgName: require("@/images/run/35弃磁未选中.png"),
          stepName: "10 Discard",
          done: false
        },
        {
          id: 11,
          imgName: require("@/images/run/{00ECBBB5-F09C-4842-BCCB-3ABE42A13984}.png"),
          stepName: "11 Unload labware",
          done: false
        }
      ]
    };
  },

  created() {},

  methods: {}
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
.protocol span {
  color: #000;
}
.pic img {
  margin-right: 30px;
}
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
  margin-right: 35px;
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
	background-image: linear-gradient(0deg,
		#fe6e6e 0%,
		#de4a4a 100%);
    border: none;
    margin-right: 26px;
    border-radius: 6px;
}
.pause {
  width: 190px;
	height: 64px;
  color: #fff;
	background-image: linear-gradient(0deg,
		#5792d5 0%,
		#4c7cb2 100%);
	border-radius: 6px;
  border: none;
}
</style>
