<template>
  <div class="content">
    <ContentTitle1 :title="$t('language.software')"></ContentTitle1>
    <div class="advanced-list">
      <div class="list-name">{{$t("language.ui")}}</div>
      <div class="advanced-list-img"><img src="../images/system/drop_down.png" /></div>
      <div class="system-version">{{version}}</div>
    </div>
    <ContentTitle2 :title="$t('language.firmware')"></ContentTitle2>
    <div class="advanced-list">
      <div class="list-name">{{$t("language.mix_motion")}}</div>
      <div class="advanced-list-img"><img src="../images/system/drop_down.png" /></div>
      <div class="system-version">{{version}}</div>
    </div>
    <div class="advanced-list">
      <div class="list-name">{{$t("language.temp_control")}}</div>
      <div class="advanced-list-img"><img src="../images/system/drop_down.png" /></div>
      <div class="system-version">{{version}}</div>
      <div></div>
    </div>
    <div class="advanced-list">
      <div class="list-name">{{$t("language.Auxiliary")}}</div>
      <div class="advanced-list-img"><img src="../images/system/drop_down.png" /></div>
      <div class="system-version">{{version}}</div>
    </div>
    <div class="help" @click="openHelp">{{$t("language.help")}}</div>
    <AdvancedHelp @closeHelp="closeHelpDiv" v-if="help_status"></AdvancedHelp>
  </div>
</template>

<script>
  import ContentTitle1 from '@/components/ContentTitle'
  import ContentTitle2 from '@/components/ContentTitle'
  import AdvancedHelp from '@/components/AdvancedHelp'
  export default {
    components: {
      ContentTitle1,
      ContentTitle2,
      AdvancedHelp
    },
    data() {
      return {
        version: "a1.0.0 20220719",
        help_status:false
      }
    },
    mounted() {

    },
    methods: {
      openHelp(){
         this.help_status=true
      },
      closeHelpDiv(){
        this.help_status=false
      }
    }
  }
</script>

<style scoped="scoped">
  .content {
    margin-top: 30px;
    margin-left: 30px;
  }

  .advanced-list {
    width: 1466px;
    height: 90px;
    background-color: #ffffff;
    border-radius: 6px;
    border: solid 1px #c2cbda;
    margin-top: 30px;
    margin-bottom: 28px;
  }

  .list-name {
    float: left;
    height: 100%;
    line-height: 90px;
    font-size: 26px;
    margin-left: 32px;
  }

  .system-version {
    float: right;
    font-size: 26px;
    line-height: 90px;
    margin-right: 35px;
    height: 100%;
    width: fit-content;
  }

  .advanced-list-img {
    float: right;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: fit-content;
    margin-right: 32px;
  }

  .help {
    position: absolute;
    width: 193px;
    height: 64px;
    background-color: #5187C4;
    border-radius: 6px;
    bottom: 30px;
    right: 30px;
    font-size: 24px;
    line-height: 64px;
    text-align: center;
    color: white;
  }
</style>
