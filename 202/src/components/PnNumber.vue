<template>
  <div>
    <div class="pn-number">
      <div class="pn-number-text">{{$t("language.pn")}}{{pn_number}}</div>
      <div class="pn-number-button">{{$t("language.scan")}}</div>
    </div>
    <div class="tube-info-button">
      <div class="button-div save">{{this.$t("language.save")}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        pn_number: "161027489-000039"
      }
    },
    mounted() {
      
    },
    methods: {

    }
  }
</script>

<style scoped="scoped">
  .pn-number {
    height: 64px;
    width: 100%;
    margin-top: 32px;
  }

  .pn-number-text {
    font-size: 28px;
    line-height: 64px;
    font-weight: 600;
    margin-left: 30px;
    float: left;
  }

  .pn-number-button {
    width: 193px;
    float: right;
    height: 64px;
    background-color: #F6F9FF;
    border-radius: 6px;
    margin-right: 30px;
    box-sizing: border-box;
    border: solid 1px #c2cbda;
    font-size: 24px;
    text-align: center;
    line-height: 64px;
    color: #4c7cb2;
  }
  .tube-info-button {
    position: absolute;
    bottom: 30px;
    right: 30px;
  }

  .button-div {
    float: right;
    width: 193px;
    height: 64px;
    border-radius: 6px;
    line-height: 64px;
    font-size: 24px;
    text-align: center;
  }

  .save {
    color: white;
    background-color: #5187C3;
  }
</style>
