<template>
  <div class="switch-model">
    <div class="switch-div">
      <div class="switch-img">
        <img src="../images/system/question.png" />
        <div class="delete-protocol-text">{{$t("language.delete_protocol")}}</div>
      </div>
      <div class="delete-icons">
        <div class="delete-user-cancel" @click="cancel">{{$t("language.cancel")}}</div>
        <div class="delete-user-ok" @click="ok">{{$t("language.ok")}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    deleteProtocols
  } from '@/api/protocols'
  export default {
    props:['selectedIds'],
    data() {
      return {

      }
    },
    mounted() {
      
    },
    methods: {
      cancel() {
        this.$emit('closeManage')
      },
      ok() {
        deleteProtocols({
          'protocol_ids': this.selectedIds
        }).then((res) => {
          if (res.code == 0) {
            this.$message({
              type: 'success',
              message: "删除成功"
            })
          }
        })
         this.$emit('closeManage')
      },
    }
  }
</script>

<style scoped="scoped">
  .switch-model {
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

  .switch-div {
    position: relative;
    width: 697px;
    height: 402px;
    background-color: #ffffff;
    border-radius: 8px;
  }

  .switch-img {
    width: 530px;
    height: 80px;
    display: flex;
    align-items: center;
    font-size: 26px;
    line-height: 80px;
    margin-left: 91px;
    margin-top: 112px;
  }

  .delete-icons {
    position: absolute;
    width: 100%;
    height: 60px;
    bottom: 36px;
  }

  .delete-icons>div {
    width: 190px;
    height: 100%;
    font-size: 24px;
    text-align: center;
    line-height: 60px;
  }

  .delete-user-cancel {
    color: black;
    float: left;
    margin-left: 64px;
    border-radius: 6px;
    border: solid 1px rgba(76, 124, 178, 1);
  }

  .delete-user-ok {
    float: right;
    color: white;
    float: right;
    border-radius: 6px;
    margin-right: 64px;
    background-color: #5187C3;
  }

  .delete-protocol-text {
    margin-left: 20px;
    width: 400px;
    height: 91px;
    line-height: 50px;
    font-size: 26px;
  }
</style>
