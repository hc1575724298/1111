<template>
  <div class="add-user-background">
    <div class="add-user-info">
      <div class="add-info-title">
        <div class="add-info-title-text">
            {{$t("language.add_user")}}
        </div>
      </div>
      <div class="add-rows">
        <div class="input-row">
          <div class="row-text">{{$t("language.table_username")}}</div> <input type="text" v-model="new_user.username"/>
        </div>
        <div class="input-row">
          <div class="row-text">{{$t("language.password")}}</div> <input type="password" v-model="new_user.password"/>
        </div>
        <div class="input-row">
          <div class="row-text">{{$t("language.input_again")}}</div> <input type="password" v-model="repeat_password"/>
        </div>
      </div>
      <div class="buttons">
        <div class="cancel" @click="backToManage()">{{$t("language.cancel")}}</div>
        <div class="ok" @click="AddUserOk()">{{$t("language.ok")}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {addUser} from "@/api/user"
  export default {
    props:['add_type'],
    data() {
      return {
        new_user:{
          username:null,
          password:null,
          group:null
        },
        repeat_password:null
      }
    },
    mounted() {

    },
    methods: {
      backToManage(){
        this.$emit('closeAddUser');
      },
      AddUserOk(){
        this.new_user.group = this.add_type;
        addUser(this.new_user).then((res)=>{
          console.log(this.new_user);
          if(res.code==0){
            alert("增加成功")
            this.$emit('closeAddUser');
          }
        })
      }
    }
  }
</script>

<style scoped="scoped">
  .add-user-background {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    top: 0%;
    left: 0%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .add-user-info {
    position: absolute;
    width: 839px;
    height: 561px;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 10px;
  }
  .add-info-title{
    width: 95%;
    float: right;
    font-size: 25px;
    font-weight: 550;
    height: 75px;
    color: #4473BC;
    border-bottom: 2pt solid #C2CBDA;
  }
  .add-info-title-text{
    float: left;
    line-height: 75px;
  }
  .add-rows{
    float: right;
    width: 95%;
    height: 485px;
  }
  .input-row {
    display: flex;
    align-items: center;
    width: 100%;
    margin-left: 23px;
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
