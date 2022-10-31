<template>
  <div>
    <el-dialog
      append-to-body
      class="pauseStepDialog"
      width="600px"
      :show-close="false"
      :close-on-click-modal="false"
      :visible="isShowPauseStepDialog"
      top="450px"
      @close="handleClose"
    >
      <img src="@/images/run/pause-dialog.png" alt="" />
      <div>{{tips}}</div>

      <template slot="footer" class="dialog-footer">
        <el-button class="door" @click="clickDoorBtn">{{
          doorState ? $t('language.close_the_door') :$t('language.open_the_door')
        }}</el-button>
        <el-button class="ok" @click="clickOk">{{$t('language.ok')}}</el-button>
      </template>
    </el-dialog>
    <OpenDoorDialog :isShowOpenDoorDialog="isShowOpenDoorDialog" />
  </div>
</template>

<script>
import OpenDoorDialog from "./OpenDoorDialog.vue";
import { openDoor, closeDoor, goOnRun } from "@/api/run";
import { mapState as mapProtocolsState } from "vuex";
export default {
  name: "PauseStepDialog",
  data() {
    return {
      isShowOpenDoorDialog: false
    };
  },
  components: {
    OpenDoorDialog
  },
  props: {
    isShowPauseStepDialog: {
      type: Boolean,
      default: true
    },
    tips: {
      type: String,
      default: ""
    }
  },
  computed: {
    ...mapProtocolsState("protocols", ["doorState"])
  },
  created() {},

  methods: {
    async clickOk() {
      if (this.doorState) {
        this.isShowOpenDoorDialog = true;
        await closeDoor();
        this.EventBus.on(this.Notify.CODE_FZB_DOOR_CLOSE, notify => {
      if (notify.Code === this.Notify.CODE_FZB_DOOR_CLOSE) {
        this.isShowOpenDoorDialog = false;
        setTimeout(()=>{
          this.handleClose();
          this.goOnRunApi()
        },100)

      }
    });
      }else {
        this.handleClose();
        this.goOnRunApi()
      }

    },
    async clickDoorBtn() {
      const type = this.doorState ? 'CODE_FZB_DOOR_CLOSE':'CODE_FZB_DOOR_OPEN'
      this.isShowOpenDoorDialog = true;
      this.doorState ? await closeDoor() : await openDoor();
      this.EventBus.on(this.Notify[type], notify => {
      if (notify.Code === this.Notify[type]) {
        this.isShowOpenDoorDialog = false;
      }
    })
    },
    //关闭弹窗
    handleClose() {
      this.$emit("close");
    },
    //继续运行接口
    async goOnRunApi() {
      await goOnRun();
    },
  },
  mounted() {

  },
  destroyed() {
    this.EventBus.unregisterAllCallbacks();
    // this.EventBus.unregisterCallbacksForEvent(this.Notify.CODE_FZB_DOOR_CLOSE)
  }
};
</script>

<style scoped>
.pauseStepDialog >>> .el-dialog {
  border-radius: 6px;
}
.pauseStepDialog >>> .el-dialog__body {
  display: flex;
  align-items: center;
  padding: 30px 60px;
}
.pauseStepDialog .el-dialog__body div {
  flex: 1;
  font-size: 26px;
  color: #333;
}
.pauseStepDialog .el-dialog__body img {
  width: 85px;
  height: 85px;
  margin-right: 25px;
  vertical-align: middle;
}
.door {
  padding: 0;
  width: 180px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background-image: linear-gradient(0deg, #ffffff 0%, #f2f7ff 100%);
  border-radius: 6px;
  border: solid 1px #5691d3;
  font-size: 24px;
  color: #333333;
  border-radius: 6px;
}
.ok {
  line-height: 50px;
  text-align: center;
  width: 150px;
  height: 50px;
  font-size: 24px;
  border-radius: 6px;
  background-image: linear-gradient(0deg, #5792d5 0%, #4c7cb2 100%);
  border: solid 1px #5a89c7;
  color: #ffffff;
  padding: 0;
}
.pauseStepDialog >>> .el-dialog__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 60px 30px;
}
</style>
