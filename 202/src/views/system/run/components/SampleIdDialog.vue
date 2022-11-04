<template>
  <el-dialog
    :close-on-click-modal="false"
    class="sampleIdDialog"
    :title="$t('language.sampleID')"
    width="1120px"
    :show-close="false"
    :visible="isShowSampleidDialog"
    @close="handleClose"
    append-to-body
    top="3vh"
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
        :label="$t('language.position')"
        width="245"
      ></el-table-column>
      <el-table-column
        property="sample_id"
        :label="$t('language.sampleID')"
        width="350"
      >
        <template slot-scope="scope">
          <el-input
          :maxlength="15"
            class="el-input"
            v-model="scope.row.sample_id"
            @focus="onFocus(scope.$index, 'sample_id', $event)"

          >
          </el-input>
        </template>
      </el-table-column>
      <el-table-column property="note" :label="$t('language.note_optional')">
        <template slot-scope="scope">
          <el-input
          :title="scope.row.note"
           :maxlength="15"
            class="el-input"
            v-model="scope.row.note"
            @focus="onFocus(scope.$index, 'note', $event)"

          >
          </el-input>
        </template>
      </el-table-column>
    </el-table>
    <!-- 按钮 -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose" class="cancel">{{
        $t("language.cancel")
      }}</el-button>
      <el-button class="ok" @click="clickOk">{{ $t("language.ok") }}</el-button>
    </span>

    <div class="keyboard-mask" v-if="isShowKeyboard">
      <SimpleKeyboard
        @colseKeyboard="isShowKeyboard = false"
        @onChange="onChange"
        :input="input"
      />
    </div>
  </el-dialog>
</template>

<script>
import SimpleKeyboard from "@/components/SimpleKeyboard";
import { mapState as mapProtocolsState } from "vuex";
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
    ])
  },
  data() {
    return {
      sampleIdData: [],
      input: "",
      isShowKeyboard: false,
      currentIndex: 0,
      value: "",
      event: null
    };
  },
  components: {
    SimpleKeyboard
  },
  watch: {
    isShowSampleidDialog(n) {
      if (!n) return;
      this.sampleIdData = this.selectedTubeList.map((item, index) => ({
        position: item,
        sample_id: this.sampleIdDataStore[index]
          ? this.sampleIdDataStore[index].sample_id
          : "",
        note: this.sampleIdDataStore[index]
          ? this.sampleIdDataStore[index].note
          : ""
      }));
    }
  },
  methods: {
    handleClose() {
      this.isShowKeyboard = false;
      this.$emit("close");
    },
    clickOk() {
      this.$store.commit("protocols/updatedSampleIdInfo", this.sampleIdData);
      this.handleClose();
    },
    onFocus(index, value, e) {
      this.pub.openKeyboardApi()
      this.isShowKeyboard = true;
      this.currentIndex = index;
      this.value = value;
      this.event = e;
      if (value === "sample_id") {
        this.input = this.sampleIdData[index].sample_id;
      } else {
        this.input = this.sampleIdData[index].note;
      }
    },
    onChange(input) {
      console.log(input);
      if(input.length>15)return this.$message(this.$t('language.maximum15'))
      this.input = input;
      this.event.target.value = this.input;
      this.event.target.dispatchEvent(new Event("input"));
    }
  }
};
</script>

<style scoped>
div {
  box-sizing: border-box !important;
}
.sampleIdDialog >>> .el-dialog__title {
  font-size: 26px;
  color: #4171bb;
}
.sampleIdDialog >>> .el-dialog__header {
  border-bottom: solid 1px #8fb9e3;
  padding: 17px 0;
  margin: 0 20px;
  box-sizing: border-box;
}
.sampleIdDialog >>> .el-dialog__body {
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
  font-size: 24px;
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
.sampleIdDialog >>> .el-dialog__footer {
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
.sampleIdDialog .el-table >>> .el-table__cell.gutter {
  background-color: #8fb9e3 !important;
  background-color: transparent;
  border-bottom: 1px solid #ebeef5;
  border-bottom-width: 1px !important;
}


</style>
<style>
.sampleIdDialog,
.sampleIdDialog div,
.sampleIdDialog span,
.sampleIdDialog table,
.sampleIdDialog tbody,
.sampleIdDialog td,
.sampleIdDialog tr,
.sampleIdDialog .el-input,
.sampleIdDialog .el-input input{
  touch-action: pan-y !important;
}
</style>
