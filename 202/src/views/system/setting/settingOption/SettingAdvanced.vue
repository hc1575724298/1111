<template>
  <div class="setting-system-div">
    <div class="setting-system-siderbar">
      <div class="siderbar-div" :class="{'setting-system-siderbar-div': $store.getters.advancedSiderbar==item.id}"
        v-for="(item,index) in siderbar_lists" @click="changeSiderbar(item.id)">
        {{item.description}}
      </div>
    </div>
    <div class="advanced-content">
      <Upgrade v-if="$store.getters.advancedSiderbar==1"></Upgrade>
      <ErrorLog v-else-if="$store.getters.advancedSiderbar==2"></ErrorLog>
      <SystemInfo v-else-if="$store.getters.advancedSiderbar==3"></SystemInfo>
    </div>
  </div>
</template>

<script>
  import Upgrade from '@/components/Upgrade'
  import ErrorLog from '@/components/ErrorLog'
   import SystemInfo from '@/components/SystemInfo'
  export default {
    components: {
      Upgrade,ErrorLog,SystemInfo
    },
    data() {
      return {
        siderbar_lists: [{
          id: 1,
          description: this.$t("language.upgrade")
        }, {
          id: 2,
          description: this.$t("language.error_log")
        }, {
          id: 3,
          description: this.$t("language.sys_info")
        }, {
          id: 4,
          description: this.$t("language.encryption")
        }, {
          id: 5,
          description: this.$t("language.one_click")
        }]
      }
    },
    mounted() {

    },
    methods: {
      changeSiderbar(type) {
        this.$store.commit('setAdvancedSiderbar', type)
      }
    }
  }
</script>

<style scoped="scoped">
  .setting-system-div {
    display: flex;
    height: 100%;
    width: 100%;
    background-color: #F3F4F6;
  }

  .setting-system-siderbar {
    width: 392px;
    height: 100%;
    border-right: 2px solid #DAE0E8;
    background-color: white;
    box-sizing: border-box;
  }

  .siderbar-div {
    width: 100%;
    height: 98px;
    font-size: 26px;
    line-height: 98px;
    text-indent: 38px;
    border: solid 1px transparent;
  }

  .setting-system-siderbar-div {
    background-color: #e5eff9;
    border-color: #4c7cb2;
    box-sizing: border-box;
    color: #4C7CB2;
  }

  .advanced-content {
    width: 1528px;
    height: 100%;
  }
</style>
