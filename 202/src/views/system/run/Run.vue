<template>
  <div class="run-favorites">
    <RunHead />
    <div class="run-favorites-content">
      <!-- 左侧 -->
      <div class="run-favorites-content-left">
        <div
          v-for="item in farvoritesList"
          :key="item.id"
          @click="chooseProtocal(item.id,item.name)"
          :class="{ check: isCheckId===item.id }"
        >
          <div class="content-left-img">
            <img src="@/images/run/precept-check.png" alt="" v-if="isCheckId===item.id" />
            <img src="@/images/run/precept-uncheck.png" alt="" v-else />
          </div>
          <div>
            <div class="protocol-name" :class="{ check: isCheckId===item.id }">
              {{ item.name }}
            </div>
            <div class="protocol-time" :class="{ check: isCheckId===item.id }">
              {{ item.updated_at }}
            </div>
          </div>
        </div>
      </div>
      <!-- 右侧 -->
      <div class="run-favorites-content-right">
        <div>
          <div class="right-title">{{$t('language.information')}}</div>
          <el-row style="margin-bottom: 28px;">
            <el-col :span="8">
              <span class="Infomation-title">{{$t('language.protocol_name')}}：</span>
              <span class="Infomation-info">{{ thisOneProtocal.name }}</span>
            </el-col>
            <el-col :span="5">
              <span class="Infomation-title">{{$t('language.pre_packaged')}}：</span>
              <span class="Infomation-info">{{
                thisOneProtocal.pre_packaged ? "yes" : "no"
              }}</span>
            </el-col>
            <el-col :span="6">
              <span class="Infomation-title">{{$t('language.cartridge')}}：</span>
              <span class="Infomation-info"
                >{{ thisOneProtocal.cartridge }} well</span
              >
            </el-col>
          </el-row>
          <el-row style="margin-bottom: 39px;">
            <el-col :span="10">
              <span class="Infomation-title">{{$t('language.time')}}：</span>
              <span class="Infomation-info">{{
                thisOneProtocal.updated_at
              }}</span>
            </el-col>
            <el-col :span="14">
              <span class="Infomation-title"
                >{{$t('language.expected_run_time')}}：</span
              >
              <span class="Infomation-info">{{
                thisOneProtocal.expected_run_time
              }}</span>
            </el-col>
          </el-row>
        </div>
        <div>
          <div class="right-title">{{$t('language.remark')}}</div>
          <div style="height: 70px">{{thisOneProtocal.remark&&thisOneProtocal.remark}}</div>
        </div>
        <div>
          <div class="right-title">{{$t('language.labware')}}</div>
          <div class="labware-pic">
            <img src="@/images/run/8well.png" v-if="thisOneProtocal.cartridge === 8">
            <img src="@/images/run/8well.png" v-if="thisOneProtocal.cartridge === 5">
            <img src="@/images/run/8well.png" v-if="thisOneProtocal.cartridge === 7">
          </div>
        </div>
      </div>
    </div>
    <!-- 底部按钮 -->
    <RunFooter />
  </div>
</template>

<script>
import RunHead from "@/components/RunHead";
import RunFooter from "@/components/RunFooter";
import { getAllProtocol } from "@/api/run";
import utilsFunction from "@/utils/function";
export default {
  components: {
    RunHead,
    RunFooter
  },
  data() {
    return {
      protocolsList: [],
      thisOneProtocal: {},
      isCheckId: ''
    };
  },
  methods: {
    // 获取列表
    async getAllProtocol() {
      const { data } = await getAllProtocol();
      this.protocolsList = data;
    },
    //处理时间
    handleupdatedTime() {
      this.protocolsList.forEach(
        item =>
          (item.updated_at = utilsFunction.changeSecondsToSecondTime(
            item.updated_at,
            "en-US"
          ))
      );
    },
    // 右侧数据
    chooseProtocal(id,name) {
      this.thisOneProtocal = this.protocolsList.find(item => item.id === id);
      this.$store.commit('protocols/updatedInfo',[this.thisOneProtocal,'run'])
      this.isCheckId = id;
    }
  },
  computed: {
    farvoritesList() {
      return this.protocolsList.filter(item => item.favorites === 1);
    }
  },
  async created() {
    await this.getAllProtocol();
    this.handleupdatedTime();
    this.isCheckId = this.farvoritesList&&this.farvoritesList[0].id
    this.chooseProtocal(this.isCheckId)
  },

};
</script>

<style scoped="scoped">
/* 点击选中类名 */
.check {
  background-color: #4c7cb2 !important;
  color: #fff !important;
}
.run-favorites {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 23px 35px 26px 40px;
}
.run-favorites-content {
  box-sizing: border-box;
  display: flex;
  /* padding-top: 26px; */
}
/* 左侧 */
.run-favorites-content-left {
  max-height: 876px;
}
.run-favorites-content-left > div {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 21px 0 26px 33px;
  width: 430px;
  height: 124px;
  background-color: #fff;
  border-radius: 8px;
  font-size: 24px;
  line-height: 28px;
  margin: 0 30px 26px 0;
}
.content-left-img {
  margin-right: 30px;
}
.protocol-name {
  color: #333333;
  margin-bottom: 26px;
}
.protocol-time {
  color: #666666;
}
/* 右侧 */
.run-favorites-content-right {
  box-sizing: border-box;
  width: 1217px;
  height: 876px;
  background-color: #ffffff;
  border-radius: 4px;
  border: solid 1px #c2cbda;
  padding: 33px 38px 36px 30px;
}
.right-title {
  font-family: Arial;
  font-size: 24px;
  line-height: 28px;
  letter-spacing: 0px;
  color: #333333;
  margin-bottom: 26px;
}

.labware-pic {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1141px;
  height: 454px;
  background-color: #ffffff;
  border: dashed 1px #707070;
}
.Infomation-title {
  font-family: Arial;
  font-size: 24px;
  line-height: 28px;
  letter-spacing: 0px;
  color: #666666;
}
.Infomation-info {
  font-size: 24px;
  line-height: 28px;
  letter-spacing: 0px;
  color: #333333;
}
</style>
