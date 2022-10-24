<template>
  <el-dialog
    append-to-body
    top="450px"
    class="abortDialog"
    width="600px"
    :show-close="false"
    :close-on-click-modal="false"
    :visible="isShowAbortDialog"
    @close="handleClose"
  >
    <img src="@/images/run/7疑问.png" alt="" />
    <div>{{$t('language.abort_protocol')}}</div>
    <template slot="footer" class="dialog-footer">
      <button class="cancel" @click="clickCancelBtn">{{$t('language.cancel')}}</button>
      <button class="ok" @click="clickOkBtn">{{$t('language.ok')}}</button>
    </template>
  </el-dialog>
</template>

<script>
import { stopRun } from "@/api/run";
export default {
  data () {
    return {

    }
  },
  props: {
    isShowAbortDialog: {
      type: Boolean,
      default: false
    }
  },
  created () {

  },

  methods: {
 //关闭弹窗
 handleClose() {
      this.$emit("close");
    },
    clickCancelBtn(){
      this.handleClose()
    },
    async clickOkBtn (){
      await stopRun()
      this.handleClose()
    }
  }
}
</script>

<style scoped>
.abortDialog >>> .el-dialog {
  border-radius: 6px;
}
.abortDialog >>> .el-dialog__body {
  display: flex;
  align-items: center;
  padding: 30px 60px;
}
.abortDialog .el-dialog__body div {
  flex: 1;
  font-size: 26px;
  color: #333;
}
.abortDialog .el-dialog__body img {
  width: 85px;
  height: 85px;
  margin-right: 25px;
  vertical-align: middle;
}
.cancel {
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
.abortDialog >>> .el-dialog__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 60px 30px;
}
</style>
