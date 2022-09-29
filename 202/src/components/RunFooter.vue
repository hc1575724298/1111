<template>
<div class="run-footer">
    <button class="run-footer-preview-btn" @click="clickPreViewBtn">
    <div>
      <img src="../images/run/preview-btn.png" alt="">
    </div>
    <div class="run-head-right-btn-text">View</div>
  </button>
    <button class="run-footer-run-btn" :disabled="isDisabledRunBtn" @click="clickRunBtn">
    <div>
      <img src="../images/run/runbtn.png" alt="">
    </div>
    <div class="run-head-right-btn-text run-color">Run</div>
    </button>
</div>
</template>

<script>

export default {
  name: 'RunFooter',
  components: {},
  props: {
    isDisabledRunBtn:{
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    };
  },
  watch: {},
  computed: {},
  methods: {
    clickRunBtn(){
      console.log('点击Run按钮');
      this.$router.push (
        {
          path: '/system/run/protocols',
        }
      )
    },
    clickPreViewBtn(){
      console.log('点击view按钮');
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped>
.run-footer {
  display: flex;
  align-items: center;
  justify-content: end;
  margin-top: 26px;
  box-sizing: border-box;
}
.run-footer-preview-btn {
   box-sizing: border-box;
  padding: 20px 60px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 210px;
	height: 70px;
	background-image: linear-gradient(0deg,
		#ffffff 0%,
		#f2f7ff 100%);
	border: solid 1px #496f9a;
  margin-right: 30px;
  border-radius: 6px;
}
.run-footer-run-btn {
  box-sizing: border-box;
   padding: 20px 60px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 210px;
	height: 70px;
	background-image: linear-gradient(0deg,
		#5792d5 0%,
		#4c7cb2 100%);
	border-radius: 6px;
  border: none;
}
.run-head-right-btn-text {
   font-size: 24px;
}
.run-color {
  color: #fff;
}
</style>
