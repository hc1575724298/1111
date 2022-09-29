<template>
<div class="run-head">
  <div class="run-head-left"></div>
  <div class="run-head-title">{{$t("language.protocols")}}</div>
  <button class="run-head-right-btn" @click="clickOpenDoor">
    <div>
      <img src="../images/run/open-door.png" alt="">
    </div>
    <div class="run-head-right-btn-text">Open door</div>
  </button>
</div>
</template>

<script>
export default {
  name: 'RunHead',
  components: {},
  props: {},
  data() {
    return {
    };
  },
  watch: {},
  computed: {},
  methods: {
    clickOpenDoor(){
      console.log('点击open door');
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped>
.run-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 26px;
}
.run-head-left {
	  width: 5px;
    height: 28px;
    background-color: #4C7CB2;
}
.run-head-title{
  flex: 1;
  margin-left: 20px;
  font-size: 28px;
  color: black;
}
.run-head-right-btn {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 220px;
	height: 64px;
	background-image: linear-gradient(0deg,
		#ffffff 0%,
		#f2f7ff 100%);
	border: solid 1px #496f9a;
  border-radius: 4px;
  box-sizing: border-box;
}
.run-head-right-btn-text {
  font-family: Arial;
	font-size: 24px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 28px;
	letter-spacing: 0px;
	color: #5a89c7;
  box-sizing: border-box;
}

</style>
