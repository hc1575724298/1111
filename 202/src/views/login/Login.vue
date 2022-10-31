<template>
  <div @click='remember_status=false'>
    <div class="login-back" :style="{background: 'url('+$store.getters.backSrc+') no-repeat'}">
      <!-- 登录框 -->
    </div>
    <div class="login-page">
      <div class="login-info">
        <!-- 登录头像 -->
        <div class="info-img">
          <img src="../../images/login/head_sculpture.png">
        </div>
        <!-- 账户 -->
        <div class="info-username">
          <input :placeholder="$t('language.username_placeholder')" v-model="user.username" />
          <div class="remembered" @click.stop="getRemember()"><img src="../../images/login/arrow_down.png"
              class="icon-arrow-down" /></div>
        </div>
        <div class="remember_lists" v-if="remember_status">
          <div class="single-remember" v-for="(item,index) in remember" :key="index" @click="getUserinfo(item)">
            {{item.username}}
          </div>
        </div>
        <!-- 密码 -->
        <input type="password" :placeholder="$t('language.password_placeholder')" class="info-password"
          v-model="user.password">
        <!-- 登录按钮 -->
        <div class="log-in" @click="loginSystem()">
          {{ $t("language.log")}}
        </div>
        <!-- 是否记住密码 -->
        <div class="is-remember">
          <div class="check" @click="rememberPassword">
            <img src="../../images/login/remember_selected.png" v-if="is_check==1" class="icon-check">
          </div>
          &nbsp;&nbsp;{{$t("language.remember")}}
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import {
    login
  } from "../../api/user.js"
  import {
    getRememberedUsers
  } from "../../api/user.js"
  export default {
    data() {
      return {
        user: {
          username: "",
          password: "",
          remember: 0
        },
        remember:null,
        is_check: false,
        remember_status: false,
      }
    },
    mounted() {
    },
    methods: {
      rememberPassword() {
        this.is_check = !this.is_check;
        if (this.is_check == true) {
          this.user.remember = 1;
        }
      },
      loginSystem() {
        login(this.user).then((res) => {
          if (res.code == 0) {
            this.$store.commit("setMenuIndex", 1)
            this.$store.commit("setSystemMenu", 1)
            this.$store.commit("setSystemHeadMenu", 1)
            this.$store.commit("setSettingOption", 1)
            this.$store.commit("setUser", res.data)
            this.$router.push({
              name: "system"
            })
          }
        })
      },
      getRemember() {
        this.remember_status = !this.remember_status
        getRememberedUsers().then((res) => {
          this.remember = res.data;
        })
      },
      getUserinfo(item) {
        this.remember_status = false;
        this.is_check = true;
        this.user.username = item.username;
        this.user.password = item.password;
        this.user.remember = 1;
      }
    },
  }
</script>

<style scoped>
  .login-back {
    position: absolute;
    height: 100%;
    width: 100%;
    background-size: 100% 100% !important;
  }

  .login-page {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
  }

  .login-info {
    width: 599px;
    height: 683px;
  }

  .info-img {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 177px;
    width: 100%;
  }

  .info-img>img {
    width: 170px;
    height: 100%;
  }

  .info-username,
  .info-password,
  .log-in {
    height: 90px;
    font-size: 32px;
    width: 100%;
    border-radius: 4px;
  }

  .info-username>input,
  .info-password {
    width: 598px;
    height: 89px;
    border: 1px solid #C2CBDA;
  }

  .info-username {
    display: flex;
    margin-top: 60px;
  }

  .info-username>input {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    width: 536px;
    line-height: 89px;
    text-indent: 1em;
  }

  .remembered {
    display: flex;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    width: 62px;
    height: 91px;
    align-items: center;
    justify-content: center;
    background-color: #3286d1;
  }

  .icon-arrow-down {
    width: 46px;
    height: 25px;
  }

  .info-password {
    text-indent: 1em;
    margin-top: 40px;
    box-sizing: border-box;
  }

  .log-in {
    margin-top: 40px;
    color: white;
    font-size: 33px;
    text-align: center;
    background-color: #F3932D;
    line-height: 90px;
  }

  .is-remember {
    display: flex;
    font-size: 29px;
    height: 50px;
    width: 100%;
    color: white;
    align-items: center;
    margin-top: 46px;
  }

  .check {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 50px;
    border-radius: 3px;
    background-color: white;
    border: solid 1px #c2cbda;
  }

  .icon-check {
    width: 40px;
    height: 32px;
  }

  .remember_lists {
    position: absolute;
    height: 330px;
    width: 598px;
    background-color: white;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border: solid 1px #c2cbda;
    box-sizing: border-box;
    overflow-y: auto;
    scroll-button: no-button;
  }

  .single-remember {
    height: 25%;
    width: 100%;
    line-height: 82.5px;
    font-size: 28px;
    text-indent: 37px;
    color: #333333;
  }

  *::-webkit-scrollbar {
    width: 12px;
  }

  *::-webkit-scrollbar-thumb {
    width: 10px;
    height: 112px;
    background-color: #c2cbda !important;
    border-radius: 8px;
  }

  *::-webkit-scrollbar-track {
    background: #FFFFFF;
  }

  .single-remember:hover {
    background-color: #deedfc;
    color: #5A89C7;
  }
</style>
