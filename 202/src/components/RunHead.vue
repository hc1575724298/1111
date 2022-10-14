<template>
<div class="run-head">
  <div class="run-head-left"></div>
  <div class="run-head-title">{{$t("language.protocols")}}</div>
  <button class="run-head-right-btn" @click="clickIsOpenDoorBtn">
    <div>
      <img src="../images/run/open-door.png" alt="">
    </div>
    <div class="run-head-right-btn-text" v-if="doorState===0">{{$t("language.open_door")}}</div>
    <div class="run-head-right-btn-text" v-if="doorState===1">{{$t("language.close_door")}}</div>
  </button>

  <el-dialog
  top="500px"
  custom-class="openDoorDialog"
  width="600px"
  :show-close="false"
  :close-on-click-modal="false"
  :visible.sync="isShowOpenDoorDialog">
  <img src="@/images/run/wait.png" alt="">
  <span>Opening the door, please wait...</span>
</el-dialog>

</div>
</template>

<script>
import { openDoor,closeDoor } from '../api/run'
import { mapState as mapProtocolsState } from 'vuex'
export default {
  name: 'RunHead',
  components: {},
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
    this.EventBus.on(this.Notify.CODE_FZB_DOOR_OPEN, (notify) => {
       if(notify.Code===0x000C){
        this.isShowOpenDoorDialog=false
        this.$store.commit('protocols/updatedDoorState',1)
       }
      })
      this.EventBus.on(this.Notify.CODE_FZB_DOOR_CLOSE, (notify) => {
       if(notify.Code===0x000D){
        this.isShowOpenDoorDialog=false
        this.$store.commit('protocols/updatedDoorState',0)
       }
      })
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
  justify-content: space-evenly;
  width: 220px;
	height: 64px;
	background-image: linear-gradient(0deg,
		#ffffff 0%,
		#f2f7ff 100%);
	border: solid 1px #496f9a;
  border-radius: 4px;
  box-sizing: border-box;
}
.run-head-right-btn-text {
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
<style>
.run-head .openDoorDialog .el-dialog__header {
  padding: 0 ;
}
.run-head .openDoorDialog .el-dialog__body {
  padding: 47px 0 47px 60px;
  font-size: 26px;
  color: #333;
}
.run-head .openDoorDialog .el-dialog__body img{
  margin-right: 25px;
  vertical-align: middle;
}
</style>
