<template>
  <div :class="['container', 'flexClo',selected?'selected' :'']">
    <div class="header flexClo">
      <span class="headerFirst"></span>
      <div class="flexClo headerMiddle">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <span style="margin-bottom: 0;"></span>
    </div>
    <div class="middle flexClo">
      <span></span>
      <span style="margin-top: 22px;"></span>
    </div>
    <div class="footer flexClo">
      <span></span>
      <section class="flexClo">
        <div><p></p ></div>
        <div><p></p ></div>
      <aside :class="['footerMiddle',selected?'selected' :'']">
        <div class="footerPosition"></div>
      </aside>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {},
  props: {
    selected:{
      type:Boolean,
      default:false,

    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
}
</script>

<style scoped>

.container{
  padding: 5px;
}

.flexClo {
  display: flex;
  flex-direction: column;
}

.header {
  width: 40px;
	height: 360px;
	background-color: #ffffff;
	border-radius: 10px;
	border: solid 1px #666666;
  padding: 12px 7px;
  justify-content: space-between;
  box-sizing: border-box;
}

.headerMiddle {
  margin: 14px 0 12px;
}

.header span {
  width: 26px;
  height: 26px;
  border: 1px solid #666;
  border-radius: 50%;
  box-sizing: border-box;
  margin-bottom: 2px;
}

.header .headerFirst {
  flex: 1;
  border-radius: 12px;
  width: 26px;
	height: 144px;
	background-color: #ffffff;
	border-radius: 16px;
	border: solid 1px #666666;
  margin: 0;
}

.middle {
  width: 35px;
  min-height: 70px;
  /* padding: 10px 0; */
  justify-content: space-between;
  align-items: center;
  position: relative;
  box-sizing: border-box;
}

/* .middle::before{
  content: '';
  position: absolute;
  bottom: 0;
  width: 50px;
  height: 1px;
  background-color: #555;
} */

.middle span {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid #666;
  box-sizing: border-box;
  margin-top: 30px;
}

.footer{
  padding: 15px 0;
  width: 40px;
  min-height: 130px;
   justify-content: space-between;
   align-items: center;
   box-sizing: border-box;
}

.footer>span {
 width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #666;
}

.footer>section{
  position: relative;
  width: 40px;
  height: 74px;
  align-items: center;
}

.footer .footerMiddle{
  position: absolute;
  width: 40px;
  height: 13px;
  top: 25px;
  left: 0;
  background-color: #ffffff;
  overflow: hidden;
}

.footer .footerPosition{
  position: relative;
  width: 100%;
  height: 100%;
}

.footer .footerPosition::after{
content: '';
position: absolute;
right: -37px;
top: -11px;
width: 46px;
height: 30px;
border-radius: 50%;
  border: 1px solid #555;
}

.footer .footerPosition::before{
content: '';
position: absolute;
left: -37px;
top: -11px;
width: 46px;
height: 30px;
border-radius: 50%;
  border: 1px solid #555;
}

.footer>section div{
  display: flex;
  align-items: center;
  justify-content: center;
}
.footer>section>div:first-child{
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid #555;
  margin-bottom: 2px;
}

.footer>section>div:nth-child(2){
  width:35px;
  height: 35px;
  border-radius: 50%;
  border: 1px solid #555;
}

.footer>section>div p {
  width: 60%;
  height: 60%;
   border-radius: 50%;
  border: 1px solid #555;
}

.selected {
  background-color: #e1e1e1 !important;
}

</style>
