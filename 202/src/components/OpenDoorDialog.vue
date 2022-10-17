<template>
  <el-dialog
    top="500px"
    class="openDoorDialog"
    width="600px"
    :show-close="false"
    :close-on-click-modal="false"
    :visible.sync="isShowOpenDoorDialog"
  >
    <div v-if="doorState === 0">
      <img src="@/images/run/wait.png" alt="" />
      <span>Opening the door, please wait...</span>
    </div>
    <div v-if="doorState === 1">
      <img src="@/images/run/wait.png" alt="" />
      <span>Close the door, please wait...</span>
    </div>
  </el-dialog>
</template>

<script>
import { mapState as mapProtocolsState } from "vuex";
export default {
  props: {
    isShowOpenDoorDialog: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapProtocolsState("protocols", ["doorState"])
  },
  data() {
    return {};
  },

  created() {},

  methods: {}
};
</script>

<style>
.openDoorDialog .el-dialog__header {
  padding: 0;
}
.openDoorDialog .el-dialog__body {
  padding: 47px 0 47px 60px;
  font-size: 26px;
  color: #333;
}
.openDoorDialog .el-dialog__body img {
  margin-right: 25px;
  vertical-align: middle;
}
</style>
