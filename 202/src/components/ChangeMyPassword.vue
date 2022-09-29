<template>
  <div class="deal-password-model">
    <div class="deal-password-info">
      <div class="password-info-title">
        <div class="password-info-title-text">
           {{$t("language.change_password")}}
        </div>
      </div>
      <div class="password-rows">
        <div class="input-row">
          <div class="row-text">{{$t("language.original_password")}}</div> <input type="password" v-model="passwordObject.original_password"/>
        </div>
        <div class="input-row">
          <div class="row-text">{{$t("language.new_password")}}</div> <input type="password" v-model="passwordObject.new_password"/>
        </div>
        <div class="input-row">
          <div class="row-text">{{$t("language.input_again")}}</div> <input type="password" v-model="password_again"/>
        </div>
      </div>
      <div class="buttons">
        <div class="cancel" @click="backToParent()">{{$t("language.cancel")}}</div>
        <div class="ok" @click="changePasswordOk()">{{$t("language.ok")}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {changePassword} from '../api/user.js'
  
  export default{
    data(){
      return{
        passwordObject:{
          original_password:null,
          new_password:null,
        },
        password_again:null
      }
    },
    mounted(){

    },
    methods:{
      backToParent(){
        this.$emit('close');
      },
      changePasswordOk(){
        if(this.passwordObject.new_password!=this.password_again){
          alert("前后输入不一致")
        }else{
          changePassword(this.passwordObject).then((res)=>{
            alert("修改成功")
            this.$emit('close')
          })
        }
      }
    }
  }
</script>

<style scoped="scoped">
  .deal-password-model {
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    top: 0%;
    left: 0%;
  }

  .deal-password-info {
    position: absolute;
    width: 860px;
    height: 560px;
    left: 530px;
    top: 320px;
    background-color: white;
    border-radius: 10px;
  }

  .password-info-title {
    width: 95%;
    float: right;
    font-size: 25px;
    font-weight: 550;
    height: 75px;
    color: #4473BC;
    border-bottom: 2pt solid #C2CBDA;
  }

  .password-info-title-text {
    float: left;
    line-height: 75px;
  }

  .password-rows {
    float: right;
    width: 95%;
    height: 485px;
  }

  .input-row {
    display: flex;
    align-items: center;
    width: 100%;
    margin-top: 34px;
    line-height: 58px;
    height: 58px;
    font-size: 24px;
    flex-shrink: 0;
  }

  .row-text {
    display: flex;
    width: 325px;
  }

  input {
    font-size: 24px;
    height: 64px;
    flex-shrink: 0;
    border: 1px solid #C2CBDA;
    text-indent: 20px;
    margin-right: 76px;
    width: 460px;
  }

  .buttons {
    display: flex;
    position: absolute;
    height: 80px;
    width: fit-content;
    font-size: 24px;
    right: 0;
    bottom: 0;
  }

  .cancel,
  .ok {
    width: 180px;
    height: 58px;
    margin-right: 30px;
    line-height: 58px;
     flex-shrink: 0;
    border-radius: 8px;
    text-align: center;

  }
    .cancel{
      border: 2px solid #93ADE2;
      color: black;
    }
     .ok{
      background-image: linear-gradient(to bottom, #588DCF,#4D7DB4);
      color: white;
     }
</style>
