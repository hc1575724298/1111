<template>
  <div class="modified-username-model">
    <div class="modified-username-info">
      <div class="info-title">
        {{$t("language.modified")}}
      </div>
      <div class="input-username">
        <div>{{$t("language.table_username")}}</div>
        <div class="input-username-info"><input type="text" v-model="userinfo.username" /></div>
      </div>
      <div class="modified-warning">
        {{$t("language.modified_user_warning_sentence")}}
      </div>
      <div class="modified-buttons">
        <div class="modified-user-ok" @click="modifiedUserOk()">{{$t("language.ok")}}</div>
        <div class="modified-user-cancel" @click="backToManage()">{{$t("language.cancel")}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    editName
  } from "@/api/user"
  export default {
    props: ['userid'],
    data() {
      return {
        userinfo: {
          username: null,
          user_id: null
        }
      }
    },
    mounted() {

    },
    methods: {
      backToManage() {
        this.$emit('closeModified')
      },
      modifiedUserOk() {
        this.userinfo.user_id = this.userid;
        editName(this.userinfo).then((res) => {
          if (res.code == 0) {
            if (this.$store.getters.languageCode == 1) {
              this.$message({
                message: 'Modified successful!',
                type: 'success'
              })
            } else if (this.$store.getters.languageCode == 0) {
              this.$message({
                message: '修改成功！',
                type: 'success'
              })
            }
          }
          this.$emit('closeModified')
        })
      }
    }
  }
</script>

<style scoped="scoped">
  .modified-username-model {
    position: absolute;
    display: flex;
    z-index: 1000;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    top: 0%;
    left: 0%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .modified-username-info {
    width: 833px;
    height: 507px;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 10px;
  }

  .info-title {
    height: 74px;
    width: 791px;
    float: right;
    border-bottom: solid 1px rgba(194, 203, 218, 1);
    font-size: 26px;
    line-height: 74px;
    color: #4070BA;
  }

  .input-username {
    display: flex;
    align-items: center;
    width: 791px;
    height: 66px;
    margin-top: 40px;
    font-size: 26px;
    color: black;
    float: right;
  }

  .input-username-info {
    margin-left: 90px;
    width: 460px;
    height: 66px;
  }

  .input-username-info>input {
    border-radius: 2px;
    height: 100%;
    width: 100%;
    text-indent: 20px;
    border: solid 1px rgba(194, 203, 218, 1);
  }

  .modified-warning {
    height: 64px;
    width: 649px;
    font-size: 20px;
    float: left;
    margin-top: 44px;
    margin-left: 40px;
    color: rgba(249, 86, 86, 1);
  }

  .modified-buttons {
    width: 100%;
    height: 58px;
    font-size: 24px;
    float: right;
    margin-top: 133px;
  }

  .modified-buttons>div {
    width: 180px;
    height: 58px;
    border-radius: 6px;
    line-height: 58px;
    text-align: center;
  }

  .modified-user-cancel {
    float: right;
    color: black;
    border: solid 1px rgba(76, 124, 178, 1);
    margin-right: 30px;
  }

  .modified-user-ok {
    color: white;
    background-color: #4F83BE;
    color: white;
    margin-right: 27px;
    float: right;

  }
</style>
