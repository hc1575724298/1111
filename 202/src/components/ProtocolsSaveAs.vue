<template>
  <div class="protocols-save-as">
    <div class="protocols-save-model">
      <div class="title-option-div">
        {{titleName}}
      </div>
      <div class="input-div">
        <div style="margin-left: 30px;">{{$t("language.rename_protocols")}}</div>
        <input class="input-model" v-model="protocol_name"/>
      </div>
      <div class="ok-cancel-div">
        <div class="ok-cancel-model ok" @click="okSaveAs()">{{$t("language.ok")}}</div>
        <div class="ok-cancel-model cancel" @click="cancelRename()">{{$t("language.cancel")}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {saveAs} from '@/api/protocols'
  export default {
    props:['protocolsName','protocolsId'],
    data() {
      return {
        titleName: this.$t("language.save_as"),
        protocol_name:null
      }
    },
    mounted() {
      this.protocol_name = this.protocolsName
    },
    methods: {
      cancelRename(){
        this.$emit('close')
      },
      okSaveAs(){
        saveAs({'protocol_id':this.protocolsId,'protocol_name':this.protocol_name}).then((res)=>{
          console.log(res.code)
        })
        this.$emit('close')
      }
    }
  }
</script>

<style scoped="scoped">
  .protocols-save-as {
    z-index: 1000;
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    top: 0%;
    left: 0%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .protocols-save-model {
    width: 580px;
    height: 320px;
    background-color: #ffffff;
    border-radius: 6px;
  }

  .title-option-div {
    margin-left: 20px;
    width: 540px;
    height: 70px;
    font-size: 26px;
    line-height: 70px;
    border-bottom: 1px solid;
    color: #4c7cb2;
  }

  .input-div {
    display: flex;
    font-size: 24px;
    margin-top: 50px;
    width: 100%;
    height: 50px;
    line-height: 50px;
  }

.input-model {
    width: 286px;
    height: 100%;
    background-color: #ffffff;
    border-radius: 6px;
    border: solid 1px #c2cbda;
    text-indent: 25px;
    margin-left: 10px;
  }
 .ok-cancel-div {
    height: 50px;
    width: 100%;
    margin-bottom: 30px;
    margin-top: 70px;
  }

  .ok-cancel-model {
    float: right;
    width: 150px;
    height: 100%;
    line-height: 50px;
    border-radius: 6px;
    text-align: center;
    font-size: 18px;
  }
  .cancel{
    margin-right: 152px;
    color: #333333;
    border: solid 1px #2d60c7;
  }
  .ok{
    background-color: #538BC9;
    color: white;
    margin-right: 64px;
  }
</style>
