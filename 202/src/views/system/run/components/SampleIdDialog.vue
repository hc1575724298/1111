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
  :data="sampleIdData">
    <el-table-column property="position" label="Position" width="245"></el-table-column>
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
    <el-button @click="handleClose" class="cancel">Cancel</el-button>
    <el-button class="ok" @click="clickOk">OK</el-button>
  </span>
</el-dialog>
</template>

<script>
import { mapState as mapProtocolsState,mapGetters as mapProtocolsGetters} from 'vuex'
export default {
  props:{
    isShowSampleidDialog:{
      type: Boolean,
      default: false
    }
  },

  computed:{
    ...mapProtocolsState('protocols',['selectedTubeList','sampleIdDataStore','showCountSampleidDialog']),
    ...mapProtocolsGetters('protocols',['sampleIdInfo'])
  },
  data () {
    return {
      sampleIdData: [],
      showCount:0
    }
  },

  watch:{
    isShowSampleidDialog(){
      if(this.sampleIdInfo[0]){
        this.$store.commit('protocols/updatedShowCountSampleidDialog')
      }
      if(this.showCountSampleidDialog===1){
        const data =JSON.parse(JSON.stringify(this.sampleIdInfo))
        this.$store.commit('protocols/updatedSampleIdInfo',data)
        const data2 =JSON.parse(JSON.stringify(this.sampleIdDataStore))
        this.sampleIdData = data2
        return
      }else {
        const data =JSON.parse(JSON.stringify(this.sampleIdDataStore))
        this.sampleIdData = data
      }
    },
  },
  methods: {
    handleClose() {
      this.$emit('close');
    },
    clickOk() {
       this.$store.commit('protocols/updatedSampleIdInfo',this.sampleIdData)
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
