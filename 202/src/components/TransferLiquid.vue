<template>
  <div>
    <div class="aspirate-dispense-model">
      <div class="aspirate-dispense-div">
        <div class="content-div" v-for="(item,index) in contents" :key="index">
          <div class="content-title" :class="{'color-title':item.id==1}">{{item.description}}</div>
          <div class="aspirate-modified">
            <div class="aspirate-modified-div">{{$t("language.aspirate")}}</div>
            <div class="aspirate-modified-div">{{$t("language.modified")}}</div>
          </div>
          <div class="aspirate-modified-input">
            <div class="aspirate-modified" v-for="(item,index) in transfer_lists">
              <div class="aspirate-modified-sort">{{item.description}}</div>
              <div style="float: left;"><input class="aspirate-modified-input-div" /></div>
              <div style="float: left;"><input class="aspirate-modified-input-div" /></div>
            </div>
          </div>
          <div class="img-divid"><img src="../images/setting/divide.png" /></div>
        </div>
      </div>
      <div class="suggetion">
        <div class="suggetion-div">
          <div style="margin-bottom: 10px;">{{$t("language.transfer_step1")}}</div>
          <div>{{$t("language.transfer_step2")}}<span style="color: red;">{{$t("language.position_a")}}</span></div>
        </div>
        <div class="blow">{{$t("language.blow")}}</div>
      </div>
      <div class="operate">
        <div style="margin-left: 63px;">{{$t("language.aspirate_volume")}}</div>
        <div><input class="operate-input" /></div>
        <div style="margin-right:154px ;" class="operate-start">{{$t("language.Interval_start")}}</div>
        <div>{{$t("language.dispense_volume")}}</div>
        <div><input class="operate-input" /></div>
        <div class="operate-start">{{$t("language.Interval_start")}}</div>
      </div>
    </div>
    <div class="tube-info-button">
      <div class="button-div save">{{this.$t("language.save")}}</div>
      <div class="button-div factory">{{this.$t("language.factory")}}</div>
    </div>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        contents: [{
          id: 1,
          description: this.$t("language.aspirate_ul")
        }, {
          id: 2,
          description: this.$t("language.dispense_ul")
        }],
        transfer_lists: [{
          id: 1,
          description: "1."
        }, {
          id: 2,
          description: "2."
        }, {
          id: 3,
          description: "3."
        }, {
          id: 4,
          description: "4."
        }]
      }
    },
    mounted() {

    },
    methods: {

    }
  }
</script>

<style scoped="scoped">
  .aspirate-dispense-model {
    position: relative;
    width: 1468px;
    height: 950px;
    background-color: #ffffff;
    border-radius: 6px;
    border: solid 1px #c2cbda;
    margin-top: 30px;
    margin-left: 30px;
  }

  .aspirate-dispense-div {
    height: 488px;
    width: 100%;
    margin-top: 43px;
  }

  .content-div {
    float: left;
    height: 488px;
    width: 50%;
  }

  .content-title {
    width: 100%;
    text-align: center;
    font-size: 26px;
    color: #d2a516;
    margin-bottom: 32px;
  }

  .color-title {
    color: #4c7cb2;
  }

  .aspirate-modified {
    width: 622px;
    height: 64px;
    margin-left: 63px;
    margin-bottom: 16px;
  }

  .aspirate-modified-div:nth-child(1) {
    margin-left: 98px;
  }

  .aspirate-modified-div {
    float: left;
    width: 220px;
    height: 64px;
    font-size: 26px;
    text-align: center;
    line-height: 64px;
    margin-left: 80px;
  }

  .aspirate-modified-input {
    height: 358px;
    width: 100%;
  }

  .aspirate-modified-sort {
    height: 100%;
    line-height: 64px;
    font-size: 26px;
    float: left;
  }

  .aspirate-modified-input-div {
    margin-bottom: 34px;
    width: 220px;
    height: 64px;
    font-size: 26px;
    text-align: center;
    line-height: 64px;
    margin-left: 80px;
    border-radius: 4px;
    border: solid 1px #c2cbda;
    box-sizing: border-box;
  }

  .img-divid {
    position: absolute;
    top: 56px;
    left: 50.5%;
  }

  .suggetion {
    margin-top: 77px;
    font-size: 26px;
    height: 70px;
    width: 100%;
    margin-bottom: 50px;
  }

  .suggetion-div {
    float: left;
    margin-left: 63px;
  }

  .blow {
    float: right;
    margin-right: 63px;
    color: white;
    width: 177px;
    height: 56px;
    background-color: #5691d3;
    border-radius: 4px;
    text-align: center;
    line-height: 56px;
  }

  .operate {
    display: flex;
    line-height: 60px;
    height: 60px;
    width: 100%;
    font-size: 26px;
    flex-shrink: 0;
  }

  .operate-input {
    width: 177px;
    height: 100%;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px #c2cbda;
    margin-right: 20px;
    text-align: center;
  }

  .operate-start {
    width: 120px;
    height: 60px;
    background-color: #5691d3;
    border-radius: 4px;
    color: white;
    text-align: center;
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

  .factory {
    border: solid 1px #4c7cb2;
    margin-right: 32px;
    background-color: white;
    box-sizing: border-box;
  }
</style>
