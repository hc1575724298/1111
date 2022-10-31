<template>
  <div class="system-info">
    <div class="system-info-content">
      <div class="Instrument-info">
        <div class="info-text">{{$t("language.instrument_info")}}</div>
        <div class="info-content">
          <div class="info-first">
            <span>{{$t("language.name")}}</span>
            <span></span>
          </div>
          <div class="info-first"></div>
          <div class="info-first"></div>
          <div class="info-first"></div>
        </div>
      </div>
    </div>
    <div class="export">
      <div class="export-div">
        {{$t("language.export")}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    mounted() {

    },
    methods: {

    }
  }
</script>

<style scoped="scoped">
  .system-info {
    position: relative;
    width: 1468px;
    height: 1048px;
    background-color: #ffffff;
    border-radius: 10px;
    border: solid 1px #c2cbda;
    margin-left: 30px;
    margin-top: 30px;
  }

  .export {
    position: absolute;
    height: 64px;
    bottom: 30px;
    width: 100%;
  }

  .export-div {
    height: 100%;
    width: 200px;
    background-color: #538AC9;
    color: white;
    text-align: center;
    line-height: 64px;
    font-size: 24px;
    float: right;
    margin-right: 30px;
    border-radius: 6px;
  }

  .system-info-content {
    height: 921px;
    width: 100%;
    overflow-y: auto;
  }

  .Instrument-info {
    position: relative;
    width: 100%;
    height: 250px;
    margin-top: 51px;
  }

  .info-text {
    float: left;
    margin-left: 60px;
    width: 18.4%;
    font-size: 26px;
    height: 100%;
  }

  .info-content {
    float: left;
    width: 76%;
    height: 100%;
    border-bottom: solid 1px #c2cbda;
  }
  .info-first{
    height: 30px;
    margin-bottom: 30px;
    font-size: 26px;
    width: 100%;
  }
</style>
