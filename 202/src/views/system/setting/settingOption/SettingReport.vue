<template>
  <div>
    <ContentTitle class="report-content-title" :title="title_name"></ContentTitle>
    <div class="reports-div">
      <el-table :data="reports" :default-sort="{prop: 'date', order: 'descending'}" class="reports-all"
        :header-cell-style="{ background: '#4C7CB2', color: '#ffffff',height:'69px'}" height="894" width="100%">
        <el-table-column prop="sort_id" :label="$t('language.no')" width="150" align="center">
          <template slot-scope="scope">
            {{(scope.$index+1)<10 ? '0'+(scope.$index+1):scope.$index+1}}
          </template>
        </el-table-column>
        <el-table-column type="selection" width="200" align="right">
        </el-table-column>
        <el-table-column prop="name" width="520" align="center">
          <template slot="header">
            <div v-if="name_sort==true">
              <div v-if="name_flag==true">
                {{$t('language.name_az')}}
                <img src='../../../../images/users/sort_down.png' @click="changeSort(1)" class="sort-icon" />
              </div>
              <div v-if="name_flag==false">
                {{$t('language.name_za')}}
                <img src='../../../../images/users/sort_top.png' @click="changeSort(2)" class="sort-icon" />
              </div>
            </div>
            <div v-if="name_sort==false">
              {{$t('language.name_az')}}
              <img src='../../../../images/setting/unselected.png' @click="changeSort(3)" class="sort-icon" />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="cartridge" :label="$t('language.cartridge')" width="160" align="center">
        </el-table-column>
        <el-table-column prop="pre_packaged" :label="$t('language.pre_packaged')" width="500" align="center">
        </el-table-column>
        <el-table-column prop="updated_at" align="center">
          <template slot="header">
            <div v-if="time_sort==true">
              <div v-if="time_flag==false">
                {{$t('language.finished')}}
                <img src='../../../../images/users/sort_top.png' @click="changeSort(4)" class="sort-icon" />
              </div>
              <div v-if="time_flag==true">
                {{$t('language.finished')}}
                <img src='../../../../images/users/sort_down.png' @click="changeSort(5)" class="sort-icon" />
              </div>
            </div>
            <div v-if="time_sort==false">
              {{$t('language.finished')}}
              <img src='../../../../images/setting/unselected.png' @click="changeSort(6)" class="sort-icon" />
            </div>
          </template>
        </el-table-column>


      </el-table>
    </div>

  </div>
</template>

<script>
  import ContentTitle from '@/components/ContentTitle'
  export default {
    components: {
      ContentTitle
    },
    data() {
      return {
        title_name: this.$t("language.list"),
        reports: [],
        name_sort: false,
        time_sort: true,
        name_flag: false,
        time_flag: true
      }
    },
    mounted() {

    },
    methods: {
      changeSort(type) {
        if (type == 1) {
          this.name_sort = true
            this.time_sort = false
            this.name_flag = false
        } else if (type == 2) {
          this.name_sort = true
            this.time_sort = false
            this.name_flag = true
        } else if (type == 3) {
          this.name_sort = true
            this.time_sort = false
            this.name_flag = true
        } else if (type == 4) {
          this.name_sort = false
            this.time_sort = true
            this.time_flag = true
        } else if (type == 5) {
          this.name_sort = false
            this.time_sort = true
            this.time_flag = false
        } else if (type == 6) {
          this.name_sort = false
            this.time_sort = true
            this.time_flag = true
        }

      }
    }
  }
</script>

<style scoped="scoped">
  .report-content-title {
    margin-left: 35px;
    margin-top: 31px;
    margin-bottom: 32px;
  }

  .reports-div {
    width: 1850px;
    height: 69px;
  }

  .reports-all {
    width: 1852px;
    margin-left: 35px;
    border-radius: 5px;
    border: solid 1px #c2cbda;
    font-size: 24px;

  }
</style>
<style>
  .reports-all .el-checkbox__input.is-disabled .el-checkbox__inner {
    background-color: #edf2fc;
    border-color: #DCDFE6;
    cursor: not-allowed;
    width: 40px;
    height: 40px;
  }


  .reports-all .el-checkbox__inner::after {
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

  .reports-all .el-checkbox__input.is-checked .el-checkbox__inner,
  .reports-all .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: white;
  }

  .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after {
    border-color: #4171BB;
  }
</style>
