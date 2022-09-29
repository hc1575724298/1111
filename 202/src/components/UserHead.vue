<template>
  <div>
    <div class="system-head-info">
      <div class="back">
        <div @click="backToParent()" class="back-div" >
          <img src="../images/system/back.png" class="back-img" />
        </div>
      </div>
      <div class="system-page-info">{{page_name}}</div>
      <div class="time-light">
        <TimeLight></TimeLight>
      </div>
    </div>
  </div>
</template>

<script>
  import TimeLight from '@/components/TimeLight'
  export default {
    components: {
      TimeLight
    },
    props: ['page_name', 'path_name',"path_router"],
    data() {
      return {

      }
    },
    methods: {
      backToParent() {
        this.$store.commit('setSystemMenu',1)
        this.$store.commit('setSystemHeadMenu',1)
        this.$router.push({name:this.path_router})
      }
    }
  }
</script>

<style scoped="scoped">
  .system-head-info {
    display: flex;
    color: white;
    height: 90px;
    width: 100%;
    justify-content: center;
    font-size: 24px;
    align-items: center;
    background-color: #274261;
  }

  .back {
    width: 20%;
    height: 100%;
  }

  .back-div {
    display: flex;
    margin-left: 30px;
    height: 100%;
    width: 50px;
    align-items: center;
    justify-content: center;
  }

  .back-img {
    float: left;
    width: 25px;
    height: 40px;
    color: white;

  }

  .system-page-info {
    text-align: center;
    width: 60%;
    font-size: 30px;
    height: 100%;
    line-height: 90px;
  }

  .time-light {
    width: 20%;
  }
</style>
