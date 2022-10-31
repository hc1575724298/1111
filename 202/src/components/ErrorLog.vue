<template>
  <div class="error-log-model">
    <div class="error-div">
      <el-table ref="protocolsTable" :data="error_lists" class="error-list" :header-cell-style="{
               background: '#4C7CB2',
               color: '#ffffff',
               width: '100%',
               height: '69px',
               fontSize: '24px',
               boxSizing: 'border-box'
             }" max-height="894" >
        <el-table-column type="sort_id" :label="$t('language.no')" width="130" align="center">
          <template slot-scope="scope">
            {{(scope.$index+1)<10 ? '0'+(scope.$index+1):scope.$index+1}}
          </template>
        </el-table-column>
        <el-table-column type="selection" width="200" align="center">
        </el-table-column>
        <el-table-column prop="error_code" :label="$t('language.error_code')" align="center">
        </el-table-column>
        <el-table-column prop="time" :label="$t('language.time')" align="center">
        </el-table-column>
        <el-table-column prop="details" :label="$t('language.details')" align="center">
          <template slot-scope="scope">
            <img src="../images/setting/error_log.png"/>
          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        error_lists:null
      }
    },
    mounted() {

    },
    methods: {

    }
  }
</script>

<style scoped="scoped">
  .error-log-model {
    width: 1468px;
    height: 1048px;
    margin-left: 30px;
    margin-top: 30px;
    background-color: #ffffff;
  }

  .error-div {
    width: fit-content;
    height: fit-content;
    background-color: #ffffff;
    border-radius: 10px;
    font-size: 24px;
    margin-left: 26px;
    padding-top: 30px;
  }

  .error-list {
    width: 1414px;
    height: 902px;
    background-color: #ffffff;
    border-radius: 10px;
    border: solid 1px #c2cbda;
    color: #333333;
    font-size: 24px;
    box-sizing: border-box;
  }
</style>
<style>
  .error-list .el-checkbox__input.is-disabled .el-checkbox__inner {
    background-color: #edf2fc;
    border-color: #DCDFE6;
    cursor: not-allowed;
    width: 40px;
    height: 40px;
  }

  .error-list .el-checkbox__inner {
    width: 40px;
    height: 40px;
  }

  .error-list .el-checkbox__inner::after {
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
    content: "";
    border: 3px solid #4171BB;
    border-left: 0;
    border-top: 0;
    height: 30px;
    width: 16px;
    left: 9px;
    position: absolute;
    top: -3px;
    transition: transform .01s ease-in .03s;
    transform-origin: center;
  }

  .error-list .el-checkbox__input.is-checked .el-checkbox__inner,
  .error-list .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: white;
  }

  .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after {
    border-color: #4171BB;
  }
</style>
