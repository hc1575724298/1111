<template>
  <el-dialog
  class="dialog"
  title="SampleID"
  width="1120px"
  :show-close="false"
  :visible="isShowSampleidDialog"
   @close="handleClose">
  <el-table
  class="el-table"
  :header-cell-style="{
    background: '#8fb9e3',
    height: '60px',
    color: '#FFF',
    'font-size': '26px',
    fontWeight: '400',
    boxSizing: 'border-box',
  }"
  height="420px"
  :data="gridData">
    <el-table-column property="position" label="Position" width="245"></el-table-column>
    <el-table-column property="sampleID" label="SampleID" width="350">
      <template slot-scope="scope">
        <el-input class="el-input" v-model="scope.row.SampleID"></el-input>
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
    <el-button @click="handleClose" class="cancel">Cancel</el-button>
    <el-button class="ok">Ok</el-button>
  </span>
</el-dialog>
</template>

<script>
export default {
  props:{
    isShowSampleidDialog:{
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      gridData: [{
        position: 1,
        SampleID: '',
        note: '',
        }, {
          position:2,
          SampleID: '',
           note: '',
        }, {
          position:3,
          SampleID: '',
          note: '',
        }, {
          position: 4,
          SampleID: '',
          note: '',
        },{
          position: 5,
          SampleID: '',
          note: '',
        },{
          position: 6,
          SampleID: '',
          note: '',
        },
        {
          position: 7,
          SampleID: '',
          note: '',
        },{
          position: 8,
          SampleID: '',
          note: '',
        },{
          position: 9,
          SampleID: '',
          note: '',
        },{
          position: 10,
          SampleID: '',
          note: '',
        },{
          position: 11,
          SampleID: '',
          note: '',
        },{
          position: 12,
          SampleID: '',
          note: '',
        },{
          position: 13,
          SampleID: '',
          note: '',
        },{
          position: 14,
          SampleID: '',
          note: '',
        },{
          position: 15,
          SampleID: '',
          note: '',
        },{
          position: 16,
          SampleID: '',
          note: '',
        },{
          position: 17,
          SampleID: '',
          note: '',
        },{
          position: 18,
          SampleID: '',
          note: '',
        },{
          position: 19,
          SampleID: '',
          note: '',
        },{
          position: 20,
          SampleID: '',
          note: '',
        },{
          position: 21,
          SampleID: '',
          note: '',
        },{
          position: 22,
          SampleID: '',
          note: '',
        },{
          position: 23,
          SampleID: '',
          note: '',
        },{
          position: 24,
          SampleID: '',
          note: '',
        }],
    }
  },

  created () {

  },

  methods: {
    handleClose() {
      this.$emit('close');
    }
  }
}
</script>

<style scoped>
  div {
    box-sizing: border-box !important;
  }
 .dialog>>>.el-dialog__title {
    font-size: 26px;
    color: #4171bb;
  }
  .dialog>>>.el-dialog__header {
    border-bottom: solid 1px #8fb9e3;
    padding: 17px 0;
    margin: 0 20px;
    box-sizing: border-box;
  }
  .dialog>>>.el-dialog__body {
    box-sizing: border-box;
    padding-top: 25px;
  }
  .el-table {
     width: 940px;
     margin: 0 auto;
     border-radius: 6px;
  }
  .el-input>>>.el-input__inner {
    padding: 0;
    width: 260px;
    height: 38px;
    font-size: 20px;
  }
  .el-table >>>.el-table__cell {
    padding: 10px 0;
    box-sizing: border-box;
  }
  .el-table >>>.cell{
  font-size: 24px !important;
  padding-left: 60px;
 }
 .el-table >>>th.el-table__cell>.cell:nth-child(1) {
  padding-left: 60px;
 }
 .el-table--scrollable-y >>>.el-table__body-wrapper {
  height: 360px!important;
 }
  /* 按钮 */
 .dialog>>>.el-dialog__footer {
    position: relative;
    height: 105px;
  }
  .cancel {
    position: absolute;
    left: 150px;
    top: 12px;
  width: 180px;
	height: 58px;
	background-image: linear-gradient(0deg,
		#ffffff 0%,
		#f2f7ff 100%);
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
	background-image: linear-gradient(0deg,
		#5792d5 0%,
		#4c7cb2 100%);
	border-radius: 6px;
	border: solid 1px #5a89c7;
  font-size: 24px;
  color: #fff;
   }
</style>
