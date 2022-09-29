<template>
  <div>
    <div class="setting-div">
      <div v-for="(item,index) in setting_lists" :key="index" class="single-setting" @click="ToRouter(item)">
        <div class="setting-img">
          <div>
            <img :src="item.src" />
          </div>
          <div class="setting-text">
            {{item.description}}
          </div>
        </div>
      </div>
    </div>


  </div>

</template>

<script>
  export default {
    data() {
      return {
        setting_lists: [{
            id: 1,
            description: this.$t("language.system"),
            src: require("../../../images/setting/system.png"),
            router: "settingSystem"
          },
          {
            id: 2,
            description: this.$t("language.instrument"),
            src: require("../../../images/setting/instrument.png"),
            router: "instrument"
          },
          {
            id: 3,
            description: this.$t("language.tools"),
            src: require("../../../images/setting/tools.png"),
            router: "settingTools"
          },
          {
            id: 4,
            description: this.$t("language.maintenance"),
            src: require("../../../images/setting/maintenance.png"),
            router: "maintenance"
          },
          {
            id: 5,
            description: this.$t("language.reports"),
            src: require("../../../images/setting/reports.png"),
            router: ""
          },
          {
            id: 6,
            description: this.$t("language.advanced"),
            src: require("../../../images/setting/advanced.png"),
            router: ""
          }, {
            id: 7,
            description: this.$t("language.help"),
            src: require("../../../images/setting/help.png"),
            router: ""
          }
        ]
      }
    },
    methods: {
      ToRouter(item) {
        if (item.id == 1) {
          this.$store.commit('setSettingOption', this.$t("language.system"));
          this.$store.commit('setSettingSystemSiderbar', 1);
        } else if (item.id == 2) {
          this.$store.commit('setSettingOption', this.$t("language.instrument"));
          this.$store.commit('setInstrumentSiderbar', 1);
        } else if (item. id == 3){
          this.$store.commit('setSettingOption', this.$t("language.tools"));
          this.$store.commit('setSettingTools', 1);
        }else if (item. id == 4){
          this.$store.commit('setMaintenanceSiderbar', 1);
          this.$store.commit('setSettingOption', this.$t("language.maintenance"));
        }
        this.$router.push({
          name: item.router
        })
      }
    }
  }
</script>

<style>
  .setting-div {
    width: 100%;
    height: 100%;
  }

  .single-setting {
    width: 384px;
    height: 480px;
    float: left;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    border-radius: 6px;
    border: solid 1px #c2cbda;
    margin-left: 42px;
    margin-top: 44px;
  }

  .single-setting:nth-child(5),
  .single-setting:nth-child(1) {
    margin-left: 50px;
  }

  .single-setting:nth-child(n+5) {
    margin-top: 53px;
  }

  .setting-img {
    font-size: 30px;
    color: #333333;
    text-align: center;
    width: fit-content;
  }

  .setting-text {
    margin-top: 43px;
  }

  .single-setting:nth-child(6)>div>div {
    margin-top: 44px;
  }

  .single-setting:nth-child(7)>div>div {
    margin-top: 22px;
  }
</style>
