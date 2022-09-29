<template>
  <div class="head-right">
    <div class="right-img"><img src="../images/system/light.png" class="light"></div>
    <div class="line"></div>
    <div class="system-time">{{$store.getters.systemTime}}</div>
  </div>
</template>

<script>
  import {
    getSystemTime
  } from '@/api/setting.js'
  export default {
    data() {
      return {
        time: "",
        timer: null
      }

    },
    mounted() {
      this.timer = setInterval(() => {
        this.getCurrentTime();
      }, 1000);
    },
    methods: {
      getCurrentTime() {
        getSystemTime().then((res) => {
          this.time = res.data;
          this.$store.commit('setSystemTime', this.time)
        })

      },
    }
  }
</script>

<style scoped="scoped">
  .head-right {
    float: right;
    height: 90px;
    align-items: center;
    width: fit-content;
    flex-shrink: 0;
  }

  .right-img {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 79px;
    float: right;
  }

  .light {
    width: 27px;
    flex-shrink: 0;
    height: 40px;
  }

  .system-time {
    height: 100%;
    line-height: 90px;
    width: 239px;
    font-size: 26px;
    margin-right: 30px;
    float: right;
    color: white;
  }

  .line {
    float: right;
    height: 30px;
    margin-top: 30px;
    width: 4px;
    background-color: #C2CBDA;
  }
</style>
