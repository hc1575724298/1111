<template>
  <div class="container">
    <RunProgress :progressNum="2"/>

    <div class="container-bottom">
      <div class="container-bottom-left">
        <div class="title-left">{{$t("language.labware_list")}}</div>
        <div class="left">
          <div class="item">
            <div class="pic">
              <img src="@/images/run/图像 73.png" v-if="protocalInfo.cartridge===7">
              <img src="@/images/run/图像 73.png" v-if="protocalInfo.cartridge===8">
              <img src="@/images/run/图像 73.png" v-if="protocalInfo.cartridge===5">
            </div>
            <div class="info">
              <div>{{$t("language.cartridge_rack")}}:<span>{{protocalInfo.cartridge+$t('language.well_other')}}</span></div>
              <div>{{$t("language.well")}}：1-{{protocalInfo.cartridge}}</div>
            </div>
          </div>
          <div class="item">
            <div class="pic">
              <img src="@/images/run/试剂管2.png">
            </div>
            <div class="info">
              <div>{{protocalInfo.reagent_tube_info}}</div>
              <div>{{$t("language.well")}}：A</div>
            </div>
          </div>
          <div class="item">
            <div class="pic">
              <img src="@/images/run/洗脱管2.png">
            </div>
            <div class="info">
              <div>{{protocalInfo.elution_tube_info}}</div>
              <div>{{$t("language.well")}}：B</div>
            </div>
          </div>
          <div class="item">
            <div class="pic">
              <img src="@/images/run/图像 48.png" v-if="protocalInfo.sample_tube_info.substr(0,1)==5">
              <img src="@/images/run/图像 48.png" v-else>
            </div>
            <div class="info">
              <div>{{protocalInfo.sample_tube_info}}</div>
              <div>{{$t("language.well")}}：C</div>
            </div>
          </div>
          <div class="item">
            <div class="pic">
              <img src="@/images/run/{406ECB75-8D2E-459E-8064-5B8FB20990A3}SC.png">
            </div>
            <div class="info">
              <div style="color: #666">{{$t("language.tip_1000ul")}}</div>
              <div>{{$t("language.well")}}：D</div>
            </div>
          </div>
          <div class="item">
            <div class="pic">
              <img src="@/images/run/图像 44.png">
            </div>
            <div class="info">
              <div style="color: #666">{{$t("language.magnetic_sleeve")}}</div>
              <div>{{$t("language.well")}}：E</div>
            </div>
          </div>
        </div>
      </div>
         <!-- 右侧 -->
         <div class="container-bottom-right">
        <div class="title">
         <div>{{$t('language.place_the_labware_in_the_same_positions_with_list_and_click_Run_for_start')}}</div>
         <div style="color: #666666;">{{$t('language.pre_packaged')}}：<span>{{$store.state.protocols.protocalInfo.pre_packaged ? $t('language.yes'):$t('language.no')}}</span></div>
        </div>
        <TubeGroup
        :isDisabled="isDisabled"
        :checkedList="$store.state.protocols.selectedTubeList"
        />
        <div class="bottom">
          <div class="bottom-left">
            <div>
              {{$t('language.selected')}}：<span>{{ $store.state.protocols.selectedTubeList.length }}</span>
            </div>
          </div>
          <div class="bottom-right">
            <button class="sampleId" @click="clickBack">{{$t('language.back')}}</button>
            <button class="next" @click="clickRun">{{$t('language.run')}}</button>
          </div>
        </div>
      </div>
    </div>

    <OpenDoorDialog :isShowOpenDoorDialog="isShowOpenDoorDialog"/>
  </div>
</template>

<script>
import TubeGroup from "@/components/TubeGroup.vue";
import RunProgress from "@/components/RunProgress.vue";
import OpenDoorDialog from '@/components/OpenDoorDialog.vue'
import { mapState as mapProtocolsState } from 'vuex'
import {closeDoor} from "@/api/run";
export default {
  components:{
    RunProgress,
    TubeGroup,
    OpenDoorDialog
  },
  data () {
    return {
      isShowOpenDoorDialog: false,
      isDisabled: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10","11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"],
    }
  },
  created () {

  },
  computed:{
      ...mapProtocolsState('protocols',['doorState','protocalInfo',])
    },
  methods: {
    clickBack() {
      this.$router.push('sampleSettings')
    },
    async clickRun() {
      this.$store.commit("protocols/updatedStartRunTime", Date.now()/1000);
      if(this.doorState){
        this.isShowOpenDoorDialog=true
        await closeDoor()
        this.EventBus.on(this.Notify.CODE_FZB_DOOR_CLOSE,async (notify) => {
       if(notify.Code===this.Notify.CODE_FZB_DOOR_CLOSE){
        this.isShowOpenDoorDialog=false
        setTimeout(()=>{
          this.$router.push('runprogressthree')
        },400)
       }
    })
       }else {
        this.$router.push('runprogressthree')
       }
    },
  },
  mounted(){

  },
  destroyed() {
    // this.EventBus.unregisterAllCallbacks();
    this.EventBus.unregisterCallbacksForEvent(this.Notify.CODE_FZB_DOOR_CLOSE)
  }
}
</script>

<style scoped>
  div {
    box-sizing: border-box !important;
  }
.container {
  padding: 20px 34px 30px;
  background-color: #f3f4f6;
}
.container-bottom {
  display: flex;
}
.container-bottom-left {
  flex: 1;
  margin-right: 30px;
  height: 967px;
  background-color: #ffffff;
  border-radius: 6px;
  border: solid 1px #c2cbda;
}

.container-bottom-right {
  width: 1418px;
  height: 967px;
  background-color: #ffffff;
  border-radius: 6px;
  border: solid 1px #c2cbda;
}
.title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 26px;
  color: #333;
  margin: 22px 38px 19px 29px;
}
.bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #333333;
  font-size: 24px;
  padding: 40px 30px 0 52px;
}
.bottom-left {
  display: flex;
  align-items: center;
}
.sampleId {
  width: 190px;
  height: 64px;
  background-image: linear-gradient(0deg, #ffffff 0%, #f2f7ff 100%);
  border: solid 1px #c2cbda;
  border-radius: 6px;
  margin-right: 25px;
}
.next {
  float: right;
  width: 190px;
  height: 64px;
  color: #ffffff;
  background-image: linear-gradient(0deg, #5792d5 0%, #4c7cb2 100%);
  border-radius: 6px;
  border: none;
}

/* 左侧 */
.title-left {
  height: 74px;
  padding:22px 0 0 26px;
  font-size: 26px;
  color: #333333;
  border-bottom: solid 1px #c2cbda;
}
.left {
  padding: 31px 25px 0;
}
 .item {
  display:flex;
  /* width: 354px;
   */
   width: 100%;
	height: 110px;
	background-color: #ffffff;
	border-radius: 4px;
	border: solid 1px #4c7cb2;
  color: #4171bb;
  font-size: 22px;
  margin-bottom: 20px;
 }
 .pic {
   width:130px;
   height: 100%;
   display:flex;
   align-items: center;
  justify-content: center;

 }
 .info {
  padding-top: 23px;
 }
 .info div {
   margin-bottom: 16px;
 }
</style>
