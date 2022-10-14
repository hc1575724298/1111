<template>
  <div :class="['container', 'flexClo',selected?'selected' :'']" :style="{
    marginRight:isGroup?'20px':0
  }">
    <div :class="['header', 'flexClo']">
       <div v-if="tubeNum===7">
          <img src="@/images/run/组 8141.png" alt="" v-if="!selected&&!checked">
          <img src="@/images/run/组 8144.png" alt="" v-if="selected&&!checked">
          <img src="@/images/run/组 8147.png" alt="" v-if="checked">
       </div>
       <div v-if="tubeNum===5">
          <img src="@/images/run/组 8140.png" alt="" v-if="!selected&&!checked">
          <img src="@/images/run/组 8145.png" alt="" v-if="selected&&!checked">
          <img src="@/images/run/组 8148.png" alt="" v-if="checked">
       </div>
       <div v-if="tubeNum===8">
          <img src="@/images/run/组 8142.png" alt="" v-if="!selected&&!checked">
          <img src="@/images/run/组 8143.png" alt="" v-if="selected&&!checked">
          <img src="@/images/run/组 8146.png" alt="" v-if="checked">
       </div>
    </div>
    <!-- css画 7孔  -->
    <!-- <div :class="['header', 'flexClo',checked? 'checked' : '']">
      <span :class="['headerFirst',lighhightList.includes(1)?'bg':'',checked? 'checked-white' : '']"></span>
      <div class="flexClo headerMiddle">
        <span :class="[lighhightList.includes(2)?'bg':'',checked? 'checked-white' : '']"></span>
        <span :class="[lighhightList.includes(3)?'bg':'',checked? 'checked-white' : '']"></span>
        <span :class="[lighhightList.includes(4)?'bg':'',checked? 'checked-white' : '']"></span>
        <span :class="[lighhightList.includes(5)?'bg':'',checked? 'checked-white' : '']"></span>
        <span :class="[lighhightList.includes(6)?'bg':'',checked? 'checked-white' : '']"></span>
      </div>
      <span :class="[lighhightList.includes(7)?'bg':'',checked? 'checked-white' : '']"></span>
    </div> -->
    <div :class="['middle', 'flexClo',isGroup?'middleR':'']">
      <span :class="[lighhightList.includes('A')?'bg':'',checked? 'checked' : '']"></span>
      <span :class="[lighhightList.includes('B')?'bg':'',checked? 'checked' : '']"></span>
    </div>
    <div class="footer flexClo">
      <span :class="[lighhightList.includes('C')?'bg':'',checked? 'checked' : '']"></span>
      <section class="flexClo">
        <img src="@/images/run/组 8065.png" v-if="!(!!lighhightList.length)&&selected&&!checked">
        <img src="@/images/run/组 8135.png" v-else-if="!(!!lighhightList.length)&&!selected&&!checked">
        <img src="@/images/run/8.png" v-else-if="!!lighhightList.length &&lighhightList.includes('D')">
        <img src="@/images/run/9.png" v-else-if="!!lighhightList.length &&lighhightList.includes('E')">
        <img src="@/images/run/组 8136.png" v-else-if="!(!!lighhightList.length)&&checked"/>


        <!-- css画 -->
        <!-- <div><p :class="[lighhightList.includes('D')?'bg':'']"></p ></div>
        <div><p :class="[lighhightList.includes('E')?'bg':'']"></p ></div>
       <aside :class="['footerMiddle',selected?'selected' :'']">
        <div class="footerPosition"></div>
      </aside> -->
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TubeItem',
  components: {},
  props: {
    selected:{
      type:Boolean,
      default:false,
    },
    lighhightList:{
      type:Array,
      default:()=>[]
    },
    isGroup:true,
    checked:{
      type:Boolean,
      default:false,
    },
    tubeNum:{
      type: Number,
      default: 7
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
  div,
  span,
  section,
  p {
    box-sizing: border-box !important;
  }

.container{
  width: 54px;
	height: 675px;
	border-radius: 6px;
  align-items: center;
  justify-content: center;
}

.flexClo {
  display: flex;
  flex-direction: column;

}

.header {
  width: 40px;
  height: 360px;
  /* border: 1px solid #666; */
  /* border-radius: 8px; */
  align-items: center;
  justify-content: center;
}

.headerMiddle {
  margin: 14px 0;
}
.headerMiddle span {
  margin-bottom: 2px;
}
.header span {
  width: 26px;
  height: 26px;
  border: 1px solid #666;
  border-radius: 50%;
  box-sizing: border-box;
}

.header .headerFirst {
  border-radius: 15px;
  width: 26px;
  height: 144px;
  border-radius: 16px;
}

.middle {
  width: 35px;
  padding: 30px 0 15px;
  justify-content: space-between;
  align-items: center;
  position: relative;
  box-sizing: border-box;
}

.middle::before{
  content: '';
  position: absolute;
  bottom: 0;
  width: 54px;
  height: 1px;
  background-color: #c2cbda;
}
.middleR::before{
  content: '';
  position: absolute;
  bottom: 0;
  width: 91px;
  height: 1px;
  background-color: #c2cbda;
}

.middle span {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid #666;
}
.middle span:nth-child(1) {
  margin-bottom: 22px;
}

.footer{
  width: 40px;
   justify-content: space-between;
   align-items: center;
   box-sizing: border-box;
}

.footer>span {
 width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #555;
  margin-top: 15px;
}

.footer>section{
  position: relative;
  width: 40px;
  height: 75px;
  align-items: center;
  margin-top: 21px;
}
.footer>section img {
  width: 100%;
  height: 100%;
}

.footer .footerMiddle{
  position: absolute;
  width: 40px;
  height: 13px;
  top: 25px;
  left: 0;
  background-color: #fff;
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
right: -38px;
top: -10px;
width: 47px;
height: 29px;
border-radius: 49%;
  border: 1px solid #555;
  /* background-color: #fff; */
}

.footer .footerPosition::before{
content: '';
position: absolute;
left: -38px;
top: -10px;
width: 47px;
height: 29px;
border-radius: 49%;
  border: 1px solid #555;
  /* background-color: #fff; */
}

.footer>section div{
  display: flex;
  align-items: center;
  justify-content: center;
}
.footer>section>div:first-child{
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid #555;
  margin-bottom: 2px;
}

.footer>section>div:nth-child(2){
  width:40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #555;
}

.footer>section>div:first-child p {
  width: 20px;
  height: 20px;
   border-radius: 50%;
  border: 1px solid #555;
  /* background-color: #fff; */
}
.footer>section>div:nth-child(2) p {
  width: 26px;
  height: 26px;
   border-radius: 50%;
  border: 1px solid #555;
  /* background-color: #fff; */
}

.selected {
  background-color: #E6F2FF !important;
}

.bg{
  background-color: #F2E8B4 !important;
}
 .checked {
  background-color: #dfefff!important;
  border-color: #5691d3!important;
 }
 .checked-white {
  background-color: #fff!important;
  border-color: #5691d3 !important;
 }
</style>
