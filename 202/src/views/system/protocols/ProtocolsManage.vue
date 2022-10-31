<template>
  <div>
    <UserHead :page_name='page_name' :path_router="path_router"></UserHead>
    <div class="title-div">
      <ContentTitle :title="list" class="content-title-div">
      </ContentTitle>
    </div>
    <el-table ref="protocolsTable" :data="protocolsList" class="protocols-list" :header-cell-style="{
             background: '#4C7CB2',
             color: '#ffffff',
             width: '100%',
             height: '69px',
             fontSize: '24px',
             boxSizing: 'border-box'
           }" max-height="894" @select='selectRow' @select-all='selectRow'>
      <el-table-column type="sort_id" :label="$t('language.no')" width="130" align="center">
        <template slot-scope="scope">
          {{(scope.$index+1)<10 ? '0'+(scope.$index+1):scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column type="selection" width="200" align="center">
      </el-table-column>
      <el-table-column prop="name" :label="$t('language.name_az')" align="center">
        <template slot="header">
          <div v-if="name_sort==true">
            <div v-if="name_flag==true">
              {{$t('language.name_az')}}
              <img src='../../../images/users/sort_down.png' @click="changeSort(1)" class="sort-icon" />
            </div>
            <div v-if="name_flag==false">
              {{$t('language.name_za')}}
              <img src='../../../images/users/sort_top.png' @click="changeSort(2)" class="sort-icon" />
            </div>
          </div>
          <div v-if="name_sort==false">
            {{$t('language.name_az')}}
            <img src='../../../images/setting/unselected.png' @click="changeSort(3)" class="sort-icon" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="cartridge" :label="$t('language.cartridge')" align="center">
      </el-table-column>
      <el-table-column prop="pre_packaged" :label="$t('language.pre_packaged')" align="center">
      </el-table-column>
      <el-table-column prop="creator_name" :label="$t('language.user_A_Z')" align="center" class="operation">
        <template slot="header">
          <div v-if="user_sort==true">
            <div v-if="user_flag==true">
              {{$t('language.user_A_Z')}}
              <img src='../../../images/users/sort_down.png' @click="changeSort(4)" class="sort-icon" />
            </div>
            <div v-if="user_flag==false">
              {{$t('language.user_Z_A')}}
              <img src='../../../images/users/sort_top.png' @click="changeSort(5)" class="sort-icon" />
            </div>
          </div>
          <div v-if="user_sort==false">
            {{$t('language.user_A_Z')}}
            <img src='../../../images/setting/unselected.png' @click="changeSort(6)" class="sort-icon" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="updated_at" align="center" :label="$t('language.timeNewToOld')">
        <template slot="header">
          <div v-if="time_sort==true">
            <div v-if="time_flag==true">
              {{$t('language.timeOldToNew')}}
              <img src='../../../images/users/sort_down.png' @click="changeSort(7)" class="sort-icon" />
            </div>
            <div v-if="time_flag==false">
              {{$t('language.timeNewToOld')}}
              <img src='../../../images/users/sort_top.png' @click="changeSort(8)" class="sort-icon" />
            </div>
          </div>
          <div v-if="time_sort==false">
            {{$t('language.timeOldToNew')}}
            <img src='../../../images/setting/unselected.png' @click="changeSort(9)" class="sort-icon" />
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="tube-info-button">
      <div class="button-div save" @click="delProtocol()">{{this.$t("language.delete")}}</div>
      <div class="button-div factory">{{this.$t("language.import")}}</div>
      <div class="button-div factory">{{this.$t("language.export")}}</div>
    </div>
    <ManageProtocol @closeManage='close' v-if="delete_Status" :selectedIds='selectedIds'></ManageProtocol>
  </div>
</template>

<script>
  import UserHead from '@/components/UserHead';
  import ContentTitle from '@/components/ContentTitle'
  import ManageProtocol from '@/components/ManageProtocol'
  import {
    getProtocols
  } from '@/api/protocols'
  import {
    deleteProtocols
  } from '@/api/protocols'
  export default {
    components: {
      UserHead,
      ContentTitle,
      ManageProtocol
    },
    data() {
      return {
        page_name: this.$t("language.manage"),
        path_router: "protocols",
        list: this.$t("language.list"),
        protocolsList: [],
        user_sort: false,
        name_sort: false,
        time_sort: true,
        name_flag: false,
        time_flag: true,
        user_flag: false,
        list: this.$t("language.list"),
        is_favorites: null,
        collation: 'updated_at',
        order: 0,
        selectedIds: null,
        delete_Status: false
      }
    },
    mounted() {
      this.getProtocolsData()
    },
    methods: {
      changeSort(type) {
        if (type == 1) {
          this.name_sort = true
          this.user_sort = false
          this.time_sort = false
          this.name_flag = false
          this.order = 0
          this.collation = 'protocol_name'
        } else if (type == 2) {
          this.name_sort = true
          this.user_sort = false
          this.time_sort = false
          this.name_flag = true
          this.order = 1
          this.collation = 'protocol_name'
        } else if (type == 3) {
          this.name_sort = true
          this.time_sort = false
          this.time_sort = false
          this.name_flag = true
          this.order = 1
          this.collation = 'protocol_name'
        } else if (type == 4) {
          this.name_sort = false
          this.user_sort = true
          this.time_sort = false
          this.user_flag = false
          this.collation = 'creator_name'
          this.order = 0
        } else if (type == 5) {
          this.name_sort = false
          this.user_sort = true
          this.time_sort = false
          this.user_flag = true
          this.collation = 'creator_name'
          this.order = 1
        } else if (type == 6) {
          this.name_sort = false
          this.user_sort = true
          this.time_sort = false
          this.user_flag = true
          this.collation = 'creator_name'
          this.order = 1
        } else if (type == 7) {
          this.name_sort = false
          this.user_sort = false
          this.time_sort = true
          this.time_flag = false
          this.collation = 'updated_at'
          this.order = 1
        } else if (type == 8) {
          this.name_sort = false
          this.user_sort = false
          this.time_sort = true
          this.time_flag = true
          this.collation = 'updated_at'
          this.order = 0
        } else if (type == 9) {
          this.name_sort = false
          this.user_sort = false
          this.time_sort = true
          this.time_flag = true
          this.collation = 'updated_at'
          this.order = 0
        }
        this.getProtocolsData()
      },
      getProtocolsData() {
        getProtocols({
          'collation': this.collation,
          'order': this.order
        }).then((res) => {
          if (res.code == 0) {
            this.protocolsList = res.data
          }
        })
      },
      selectRow(selection, row) {
        this.selectedIds = [];
        for (let i = 0; i < selection.length; i++) {
          if (i == selection.length - 1) {
            this.selectedIds += "" + selection[i].id;
          } else {
            this.selectedIds += "" + selection[i].id + ",";
          }
        }
      },
      delProtocol() {
        this.delete_Status = true
      },
      close() {
        this.delete_Status = false
        this.getProtocolsData()
      }
    }
  }
</script>

<style scoped="scoped">
  .run-list {
    height: 100%;
    width: 100%;
  }

  .protocols-list {
    width: 1850px;
    height: 894px;
    background-color: #ffffff;
    border-radius: 10px;
    border: solid 1px #c2cbda;
    color: #333333;
    font-size: 24px;
    box-sizing: border-box;
    margin-left: 35px;
  }

  .sort-icon {
    margin-left: 18px;
  }

  .el-table>>>.cell {
    line-height: 30px;
  }

  .title-div {
    width: 100%;
    margin-bottom: 32px;
    /* margin-left: 35px; */
    margin-top: 31px;
  }

  .img-div {
    float: right;
  }

  .img-new,
  .img-save {
    margin-right: 21px;
  }

  .button-div {
    float: right;
    width: 193px;
    height: 64px;
    border-radius: 6px;
    line-height: 64px;
    font-size: 24px;
    text-align: center;
    margin-top: 23px;
  }

  .save {
    color: white;
    background-color: #5187C3;
    margin-right: 35px;
  }

  .factory {
    border: solid 1px #4c7cb2;
    margin-right: 32px;
    background-color: white;
    box-sizing: border-box;
  }

  .content-title-div {
    float: left;
    margin-left: 34px;
    margin-bottom: 31px;
  }
</style>
<style>
  .protocols-list .el-checkbox__input.is-disabled .el-checkbox__inner {
    background-color: #edf2fc;
    border-color: #DCDFE6;
    cursor: not-allowed;
    width: 40px;
    height: 40px;
  }

  .protocols-list .el-checkbox__inner {
    width: 40px;
    height: 40px;
  }

  .protocols-list .el-checkbox__inner::after {
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

  .protocols-list .el-checkbox__input.is-checked .el-checkbox__inner,
  .protocols-list .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: white;
  }

  .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after {
    border-color: #4171BB;
  }
</style>
