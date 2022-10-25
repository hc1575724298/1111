<template>
  <el-dialog
<<<<<<< HEAD
    :close-on-click-modal="false"
=======
>>>>>>> 91f7dd1835b78245eba537ed5352d67aa569d630
    class="dialog"
    title="SampleID"
    width="1120px"
    :show-close="false"
    :visible="isShowSampleidDialog"
    @close="handleClose"
<<<<<<< HEAD
    append-to-body
=======
>>>>>>> 91f7dd1835b78245eba537ed5352d67aa569d630
  >
    <el-table
      class="el-table"
      :header-cell-style="{
        background: '#8fb9e3',
        height: '60px',
        color: '#FFF',
        'font-size': '26px',
        fontWeight: '400',
        boxSizing: 'border-box'
      }"
      height="420px"
      :data="sampleIdData"
    >
      <el-table-column
        property="position"
        label="Position"
        width="245"
      ></el-table-column>
      <el-table-column property="sample_id" label="SampleID" width="350">
        <template slot-scope="scope">
          <el-input class="el-input" v-model="scope.row.sample_id"></el-input>
        </template>
      </el-table-column>
      <el-table-column property="note" label="note(optional)">
        <template slot-scope="scope">
          <el-input class="el-input" v-model="scope.row.note"></el-input>
        </template>
      </el-table-column>
    </el-table>

    <!-- 按钮 -->
    <span slot="footer" class="dialog-footer">
<<<<<<< HEAD
      <el-button @click="handleClose" class="cancel">{{$t('language.cancel')}}</el-button>
      <el-button class="ok" @click="clickOk">{{$t('language.ok')}}</el-button>
=======
      <el-button @click="handleClose" class="cancel">Cancel</el-button>
      <el-button class="ok" @click="clickOk">OK</el-button>
>>>>>>> 91f7dd1835b78245eba537ed5352d67aa569d630
    </span>
  </el-dialog>
</template>

<script>
import {
  mapState as mapProtocolsState,
  mapGetters as mapProtocolsGetters
} from "vuex";
export default {
  props: {
    isShowSampleidDialog: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    ...mapProtocolsState("protocols", [
      "selectedTubeList",
      "sampleIdDataStore",
      "showCountSampleidDialog"
    ]),
    ...mapProtocolsGetters("protocols", ["sampleIdInfo"])
  },
  data() {
    return {
<<<<<<< HEAD
      sampleIdData: []
=======
      sampleIdData: [],
      showCount: 0
>>>>>>> 91f7dd1835b78245eba537ed5352d67aa569d630
    };
  },

  watch: {
    isShowSampleidDialog(n) {
      if (!n) return;
<<<<<<< HEAD
      this.sampleIdData = this.selectedTubeList.map((item, index) => ({
=======
      console.log("sampleIdDataStore", this.sampleIdDataStore);
      const data = this.selectedTubeList.map((item, index) => ({
>>>>>>> 91f7dd1835b78245eba537ed5352d67aa569d630
        position: item,
        sample_id: this.sampleIdDataStore[index]
          ? this.sampleIdDataStore[index].sample_id
          : "",
        note: this.sampleIdDataStore[index]
          ? this.sampleIdDataStore[index].note
          : ""
      }));
<<<<<<< HEAD
=======
      this.sampleIdData = data;
>>>>>>> 91f7dd1835b78245eba537ed5352d67aa569d630
    }
  },
  methods: {
    handleClose() {
      this.$emit("close");
    },
    clickOk() {
      this.$store.commit("protocols/updatedSampleIdInfo", this.sampleIdData);
      this.handleClose();
    }
  }
};
</script>

<style scoped>
div {
  box-sizing: border-box !important;
}
.dialog >>> .el-dialog__title {
  font-size: 26px;
  color: #4171bb;
}
.dialog >>> .el-dialog__header {
  border-bottom: solid 1px #8fb9e3;
  padding: 17px 0;
  margin: 0 20px;
  box-sizing: border-box;
}
.dialog >>> .el-dialog__body {
  box-sizing: border-box;
  padding-top: 25px;
}
.el-table {
  width: 940px;
  margin: 0 auto;
  border-radius: 6px;
}
.el-input >>> .el-input__inner {
  padding: 0;
  width: 260px;
  height: 38px;
  font-size: 20px;
}
.el-table >>> .el-table__cell {
  padding: 10px 0;
  box-sizing: border-box;
}
.el-table >>> .cell {
  font-size: 24px !important;
  padding-left: 60px;
}
.el-table >>> th.el-table__cell > .cell:nth-child(1) {
  padding-left: 60px;
}
.el-table--scrollable-y >>> .el-table__body-wrapper {
  height: 360px !important;
}
/* 按钮 */
.dialog >>> .el-dialog__footer {
  position: relative;
  height: 105px;
}
.cancel {
  position: absolute;
  left: 150px;
  top: 12px;
  width: 180px;
  height: 58px;
  background-image: linear-gradient(0deg, #ffffff 0%, #f2f7ff 100%);
  border: solid 1px #4c7cb2;
  font-size: 24px;
  color: #666;
}
.ok {
  position: absolute;
  right: 140px;
  top: 12px;
  width: 180px;
  height: 58px;
  background-image: linear-gradient(0deg, #5792d5 0%, #4c7cb2 100%);
  border-radius: 6px;
  border: solid 1px #5a89c7;
  font-size: 24px;
  color: #fff;
}
<<<<<<< HEAD
.dialog .el-table >>> .el-table__cell.gutter {
  background-color: #8fb9e3 !important;
  background-color: transparent;
  border-bottom: 1px solid #ebeef5;
  border-bottom-width: 1px !important;
}
=======
>>>>>>> 91f7dd1835b78245eba537ed5352d67aa569d630
</style>
<style></style>
