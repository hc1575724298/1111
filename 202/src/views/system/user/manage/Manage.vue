<template>
  <div class="user-manage">
    <div class="manage-list">
      <div class="manage-list-icon"></div>
      <div class="manage-list-text">{{$t("language.list")}}</div>
    </div>
    <el-table :data="user_lists" :default-sort="{prop: 'date', order: 'descending'}" class="user-all"
      :header-cell-style="{ background: '#4C7CB2', color: '#ffffff'}" max-height="894" >
      <el-table-column prop="sort_id" :label="$t('language.no')" width="130" align="center">
        <template slot-scope="scope">
          {{(scope.$index+1)<10 ? '0'+(scope.$index+1):scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column prop="username" :label="$t('language.table_username')" width="380" align="center">
      </el-table-column>
      <el-table-column prop="group" :label="$t('language.group')" width="270" align="center">
      </el-table-column>
      <el-table-column prop="updated_at" width="320" align="center">
        <template slot="header">
          <div v-if="sort_code==true" class="time-sort">
            {{$t('language.timeNewToOld')}}
            <img src='../../../../images/users/sort_down.png' @click="changeSort()" class="sort-icon" />
          </div>
          <div v-if="sort_code==false" class="time-sort">
            {{$t('language.timeOldToNew')}}
            <img src='../../../../images/users/sort_top.png' @click="changeSort()" class="sort-icon" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="operation" :label="$t('language.operation')" width="430" align="center" class="operation">
        <template slot-scope="scope">
          <img src="../../../../images/users/edit_name.png" class="edit-icon"
            @click="showEdit(scope.$index, scope.row)" />
          <img src="../../../../images/users/change_password.png" class="change-password-icon"
            @click="changeUsersPassword(scope.$index, scope.row)" />
          <img src="../../../../images/users/delete_user.png" class="delete-user-icon"
            @click="deleteUser(scope.$index,scope.row)" />
        </template>
      </el-table-column>
    </el-table>
    <div class="add-user" v-if="group=='admin'||group=='advanced_user'" @click="add_option_code=!add_option_code">
      {{$t("language.add")}}
    </div>
    <AddUserOption v-if="add_option_code==1" @hide="add_option_code=0" @addUserinfo='addUserinfo'>
    </AddUserOption>
    <DeleteUser :deleteUserName='delete_name' v-if="delete_code" @closeDelete="closeDelete()" :user_id='userId'>
    </DeleteUser>
    <ModifiedUserName v-if="modified_code" @closeModified="closeModifiedUser()" :userid='userId'></ModifiedUserName>
    <ChangePassword v-if="show_change_password" @closeChangePassword="closeChangePassword()" :userPasswordId='userObject'>
    </ChangePassword>
    <AddUser v-if="show_add_code" @closeAddUser="show_add_code=0,getAll();" :add_type='selectedGroup'></AddUser>
  </div>
</template>

<script>
  import {
    getUsersAll
  } from "@/api/user"
  import {
    deletePassword
  } from "@/api/user"
  import AddUserOption from '@/components/AddUserOption'
  import DeleteUser from '@/components/DeleteUser'
  import ModifiedUserName from '@/components/ModifiedUserName'
  import ChangePassword from '@/components/ChangePassword'
  import AddUser from '@/components/AddUser'
  export default {
    components: {
      AddUserOption,
      DeleteUser,
      ModifiedUserName,
      ChangePassword,
      AddUser
    },
    data() {
      return {
        group: "",
        userObject: null,
        selectedGroup: null,
        show_change_password: 0,
        modified_code: 0,
        delete_code: 0,
        delete_name: "",
        add_option_code: 0,
        show_add_code: 0,
        sort_code: true,
        user_lists:null
      }
    },
    mounted() {
      this.getAll();
      this.getCurrentUser();
    },
    methods: {
      getCurrentUser() {
        this.group = this.$store.getters.user.group;
      },
      getAll() {
        getUsersAll().then((res) => {
          this.user_lists = res.data;
        })
      },
      changeSort() {
        this.sort_code = !this.sort_code;
        this.user_lists = this.user_lists.reverse();
      },
      showEdit(index, row) {
        this.userId = row.id;
        this.modified_code = 1;
      },
      changeUsersPassword(index, row) {
        this.userObject = row;
        this.show_change_password = 1;
      },
      deleteUser(index, row) {
        this.userId = row.id;
        this.delete_name = "‘" + row.username + "’";
        this.delete_code = 1;
      },
      closeDelete() {
        this.delete_code = 0;
        this.getAll();
      },
      closeModifiedUser() {
        this.modified_code = 0;
        this.getAll();
      },
      closeChangePassword() {
        this.show_change_password = 0;
        this.getAll();
      },
      addUserinfo(type) {
        this.add_option_code = 0;
        this.show_add_code = 1;
        this.selectedGroup = type;
      }
    }
  }
</script>
<style scoped="scoped">
  .manage-list {
    display: flex;
    height: 30px;
    width: 100%;
    margin-top: 30px;
  }

  .manage-list-icon {
    height: 27px;
    width: 5px;
    background-color: #4C7CB2;
    margin-left: 30px;
  }

  .manage-list-text {
    height: 100%;
    font-size: 27px;
    font-weight: 500;
    margin-left: 18px;
    color: black;
  }

  .user-all {
    width: 1530px;
    height: 894px;
    margin-left: 30px;
    margin-top: 30px;
    border-radius: 5px;
    font-size: 22px;
  }

  .time-sort {
    align-items: center;
  }

  .sort-icon {
    margin-left: 18px;
  }

  .edit-icon {
    width: 31px;
    height: 31px;
    float: left;
    margin-left: 60px;
  }

  .change-password-icon {
    width: 32px;
    height: 31px;
    margin-right: 60px;
    margin-left: 20px;
  }

  .delete-user-icon {
    margin-left: 20px;
  }

  .add-user {
    position: absolute;
    width: 210px;
    height: 70px;
    background-color: #5187C3;
    color: white;
    font-size: 24px;
    right: 34px;
    bottom: 26px;
    line-height: 70px;
    text-align: center;
    border-radius: 6px;
  }
</style>
