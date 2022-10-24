<template>
<div class="run-head">
  <div class="run-head-left"></div>
  <div class="run-head-title">{{$t("language.protocols")}}</div>
  <button class="run-head-right-btn" @click="clickIsOpenDoorBtn">
    <template v-if="doorState===0">
      <img src="../images/run/open-door.png"  alt="">
      <span>{{$t("language.open_door")}}</span>
    </template>
    <template v-if="doorState===1">
      <img src="../images/run/close-door.png"  alt="">
      <span>{{$t("language.close_door")}}</span>
    </template>
  </button>

  <OpenDoorDialog :isShowOpenDoorDialog="isShowOpenDoorDialog"/>
</div>
</template>

<script>
import { openDoor,closeDoor } from '../api/run'
import { mapState as mapProtocolsState } from 'vuex'
import OpenDoorDialog from './OpenDoorDialog.vue'
export default {
  name: 'RunHead',
  components: { OpenDoorDialog },
  props: {},
  data() {
    return {
      isShowOpenDoorDialog: false,
    };
  },
  watch: {},
  computed:{
      ...mapProtocolsState('protocols',['doorState',])
    },
  methods: {
    clickIsOpenDoorBtn(){
      if(this.doorState){
        this.isShowOpenDoorDialog=true
        this.closeDoorApi()
      }else{
        this.isShowOpenDoorDialog=true
        this.openDoorApi()
        this.EventBus.on(this.Notify.CODE_FZB_DOOR_OPEN, (notify) => {
       if(notify.Code===this.Notify.CODE_FZB_DOOR_OPEN){
        this.isShowOpenDoorDialog=false
        this.$store.commit('protocols/updatedDoorState',1)
       }
      })
      }

    },
    async openDoorApi(){
      await openDoor()
    },
    async closeDoorApi(){
       await closeDoor()
    },
  },
  created() {},
  mounted() {
      this.EventBus.on(this.Notify.CODE_FZB_DOOR_CLOSE, (notify) => {
       if(notify.Code===this.Notify.CODE_FZB_DOOR_CLOSE){
        this.isShowOpenDoorDialog=false
        this.$store.commit('protocols/updatedDoorState',0)
       }
      })
  },
  destroyed() {
    this.EventBus.unregisterAllCallbacks();
    // this.EventBus.unregisterCallbacksForEvent(this.Notify.CODE_FZB_DOOR_CLOSE)
  }
};
</script>
<style scoped>
.run-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 26px;
}
.run-head-left {
	  width: 5px;
    height: 28px;
    background-color: #4C7CB2;
}
.run-head-title{
  flex: 1;
  margin-left: 20px;
  font-size: 28px;
  color: black;
}
.run-head-right-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 220px;
	height: 64px;
	background-image: linear-gradient(0deg,
		#ffffff 0%,
		#f2f7ff 100%);
	border: solid 1px #496f9a;
  border-radius: 4px;
  box-sizing: border-box;
}
button img {
  width: 43px;
  height: 35px;
  margin-right: 15px;
}
button {
  font-family: Arial;
	font-size: 24px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 28px;
	letter-spacing: 0px;
	color: #5a89c7;
  box-sizing: border-box;
}

</style>
