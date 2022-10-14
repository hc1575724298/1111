<template>
  <div class="container">
    <RunProgress :progressNum="1"/>

    <div class="container-bottom">
      <!-- 左侧 -->
      <div class="container-bottom-left">
        <div class="title">{{$t("language.parameters")}}</div>
        <!-- <div style="padding: 30px 0 0 26px;">
          <div class="volume-title">{{$t("language.elution_volume")}}：</div>
          <div class="volume-num">20</div>
        </div> -->
        <!-- <div style="padding: 30px 0 0 26px;">
          <div class="volume-title">{{$t("language.reagent_volume")}}：</div>
          <div class="volume-num grayBg">20</div>
        </div> -->
        <div style="padding: 30px 0 0 26px;">
          <div class="volume-title">{{$t("language.sample_volume")}}：</div>
          <div class="volume-num grayBg">{{$store.state.protocols.protocalInfo.sample_volume}}</div>
        </div>
      </div>
      <!-- 右侧 -->
      <div class="container-bottom-right">
        <div class="title">{{$t('language.worktable_select_sample_positions')}}</div>
        <TubeGroup
          :selectedList="selectedTubeList"
          :isDisabled="isDisabledList"
        />
        <div class="bottom">
          <div class="bottom-left">
            <div>
              {{$t('language.selected')}}：<span>{{ selectedTubeList.length }}</span>
            </div>
            <div class="select-all" @click="changeSelectAll">
              <span style="margin-right: 16px;">{{$t('language.select_all')}}:</span>
              <img src="@/images/run/48全选开启.png" alt="" v-if="selectAll||selectedTubeList.length===24" />
              <img src="@/images/run/47全选未开启.png" alt="" v-else />
            </div>
          </div>
          <div class="bottom-right">
            <button class="sampleId" @click="clickSampleId">{{$t('language.sampleID')}}</button>
            <button class="next" @click="clickNext" :disabled="isDisabledNextBtn">{{$t('language.next')}}</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 弹框 -->
    <SampleIdDialog
    :isShowSampleidDialog="isShowSampleidDialog"
    @close="isShowSampleidDialog=false"/>
  </div>
</template>

<script>
import TubeItem from "@/components/TubeItem";
import TubeGroup from "@/components/TubeGroup.vue";
import RunProgress from "@/components/RunProgress.vue";
import SampleIdDialog from './components/SampleIdDialog.vue'
import { mapState as mapProtocolsState } from 'vuex'
export default {
  components: {
    TubeItem,
    TubeGroup,
    RunProgress,
    SampleIdDialog
  },
  props: {},
  data() {
    return {
      isDisabledList: [],
      selectAll: false,
      selectedList: [],
      isShowSampleidDialog: false,
      isDisabledNextBtn: false,
    };
  },
  watch: {},
  computed:{
    ...mapProtocolsState('protocols',['selectedTubeList']),
  },
  methods: {
    //全选按钮
    changeSelectAll() {
      this.selectAll = !this.selectAll;
      if (this.selectAll) {
        this.selectedList = [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24"
        ];

      } else {
        this.selectedList = [];
      }
      this.$store.commit('protocols/changeSelectedTubeList',this.selectedList)
    },
    clickSampleId() {
      this.isShowSampleidDialog =!this.isShowSampleidDialog;
    },
    clickNext() {
      if(this.selectedTubeList.length>0){
        this.$router.push({
        name: 'loadlabware',
      })
      this.$store.commit('protocols/changeGoBackName','sampleSettings')
      }else {
        this.isDisabledNextBtn = true
        this.$message('Please select sample positions');
      }
      this.isDisabledNextBtn = false
    }
  },
  created() {

  },
  mounted() {},

};
</script>
<style scoped>
div {
  box-sizing: border-box !important;
}
.container {
  /* width: 1920px;
  height: 100%; */
  padding: 20px 34px 30px;
  background-color: #f3f4f6;
}
.container-bottom {
  display: flex;
  justify-content: space-between;
}
.container-bottom-left {
  width: 404px;
  height: 967px;
  background-color: #ffffff;
  border-radius: 6px;
  border: solid 1px #c2cbda;
}
.container-bottom-right {
  width: 1418px;
  height: 967px;
  background-color: #ffffff;
  border-radius: 6px;
  border: solid 1px #c2cbda;
}
.title {
  font-size: 26px;
  color: #333;
  margin: 22px 0 19px 29px;
}
.bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #333333;
  font-size: 24px;
  padding: 40px 30px 0 52px;
}
.bottom-left {
  display: flex;
  align-items: center;
}
.select-all {
  display: flex;
  align-items: center;
  margin-left: 110px;
}
.sampleId {
  width: 190px;
  height: 64px;
  background-image: linear-gradient(0deg, #ffffff 0%, #f2f7ff 100%);
  border: solid 1px #c2cbda;
  margin: 0 26px 0 490px;
}
.next {
  float: right;
  width: 190px;
  height: 64px;
  color: #ffffff;
  background-image: linear-gradient(0deg, #5792d5 0%, #4c7cb2 100%);
  border-radius: 6px;
  border: none;
}

/* 左侧 */
.volume-title {
  font-size: 24px;
  color: #666666;
}
.volume-num {
  margin-top: 27px;
  font-size: 24px;
  color: #333;
  width: 350px;
  height: 66px;
  line-height: 66px;
  text-align: center;
  background-color: #ffffff;
  border-radius: 4px;
  border: solid 1px #c2cbda;
}
.grayBg {
  background-color: #f3f3f3;
}
</style>
