<template>
  <div class="setting-head">
    <div class="back">
      <div @click="backToParent()" class="back-div">
        <img src="../images/system/back.png" class="back-img" />
      </div>
      <div class="setting-name">
        Setting > {{this.$store.getters.settingOption}}
      </div>
    </div>
    <TimeLight></TimeLight>
  </div>
</template>

<script>
  import TimeLight from "@/components/TimeLight"
  export default {
    components: {
      TimeLight
    },
    data() {
      return {
      }
    },
    mounted() {

    },
    methods: {
      backToParent(){
        this.$router.push({name:"setting"})
      }
    }
  }
</script>

<style scoped="scoped">
  .setting-head {
    width: 1920px;
    height: 92px;
    background-color: #274261;
  }

  .back {
    float: left;
    width: 20%;
    height: 100%;
  }

  .back-div {
    float: left;
    display: flex;
    margin-left: 30px;
    height: 100%;
    width: 50px;
    align-items: center;
    justify-content: center;
  }

  .setting-name {
    float: left;
    font-size: 28px;
    margin-left: 20px;
    height: 100%;
    line-height:92px ;
    width: fit-content;
    color: white;
  }
</style>
