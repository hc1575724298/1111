<template>
  <div class="run-favorites">
    <RunHead />
    <div class="run-favorites-content">
      <!-- 左侧 -->
      <div class="run-favorites-content-left">
        <div
          v-for="item in farvoritesList"
          :key="item.id"
          @click="chooseProtocal(item.id, 'run')"
          :class="{ check: isCheckId === item.id }"
        >
          <div class="content-left-img">
            <img
              src="@/images/run/precept-check.png"
              alt=""
              v-if="isCheckId === item.id"
            />
            <img src="@/images/run/precept-uncheck.png" alt="" v-else />
          </div>
          <div style="width: 290px">
            <div
              class="protocol-name"
              :class="{ check: isCheckId === item.id }"
            >
              {{ item.name }}
            </div>
            <div
              class="protocol-time"
              :class="{ check: isCheckId === item.id }"
            >
              {{ item.updated_at }}
            </div>
          </div>
        </div>
      </div>
      <!-- 右侧 -->
      <div class="run-favorites-content-right">
        <div>
          <div class="right-title">{{ $t("language.information") }}</div>
          <el-row style="margin-bottom: 28px;">
            <el-col :span="10">
              <span class="Infomation-title"
                >{{$t('language.protocol_name')}}：</span
              >
              <span class="Infomation-info more">{{thisOneProtocal.name}}</span>
            </el-col>
            <el-col :span="6">
              <span class="Infomation-title"
                >{{ $t("language.pre_packaged") }}：</span
              >
              <span class="Infomation-info">{{
                thisOneProtocal.pre_packaged ? "yes" : "no"
              }}</span>
            </el-col>
            <el-col :span="6">
              <span class="Infomation-title"
                >{{ $t("language.cartridge") }}：</span
              >
              <span class="Infomation-info"
                >{{ thisOneProtocal.cartridge }} well</span
              >
            </el-col>
          </el-row>
          <el-row style="margin-bottom: 39px;">
            <el-col :span="10">
              <span class="Infomation-title">{{ $t("language.time") }}：</span>
              <span class="Infomation-info">{{
                thisOneProtocal.updated_at
              }}</span>
            </el-col>
            <el-col :span="8">
              <span class="Infomation-title"
                >{{ $t("language.expected_run_time") }}：</span
              >
              <span class="Infomation-info">{{
                thisOneProtocal.expected_run_time
              }}</span>
            </el-col>
          </el-row>
        </div>
        <div>
          <div class="right-title">{{ $t("language.remark") }}</div>
          <div class="remark">
            {{ thisOneProtocal.remark && thisOneProtocal.remark }}
          </div>
        </div>
        <div>
          <div class="right-title">{{ $t("language.labware") }}</div>
          <div class="labware-pic">
            <img
              src="@/images/run/8well.png"
              v-if="thisOneProtocal.cartridge === 8"
            />
            <img
              src="@/images/run/5well.png"
              v-if="thisOneProtocal.cartridge === 5"
            />
            <img
              src="@/images/run/7well.png"
              v-if="thisOneProtocal.cartridge === 7"
            />
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
      isCheckId: ""
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
    chooseProtocal(id, name) {
      this.thisOneProtocal = this.protocolsList.find(item => item.id === id);
      this.$store.commit("protocols/updatedInfo", [this.thisOneProtocal, name]);
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
    this.isCheckId = this.farvoritesList && this.farvoritesList[0].id;
    this.chooseProtocal(this.isCheckId, "run");
  }
};
</script>

<style scoped="scoped">
/* 点击选中类名 */
.check {
  background-color: #4c7cb2 !important;
  color: #fff !important;
}
div {
  box-sizing: border-box !important;
}
.run-favorites {
  height: 100%;
  width: 100%;
  padding: 23px 35px 26px 40px;
}
.run-favorites-content {
  box-sizing: border-box;
  display: flex;
}
/* 左侧 */
.run-favorites-content-left {
  max-height: 876px;
  flex: 1;
  overflow: auto;
  margin-right: 9px;
}
.run-favorites-content-left > div {
  display: flex;
  align-items: center;
  padding: 21px 20px 26px 33px;
  width: 430px;
  height: 124px;
  background-color: #fff;
  border-radius: 8px;
  font-size: 24px;
  line-height: 28px;
  margin-bottom: 26px;
}
.content-left-img {
  margin-right: 30px;
  width: 58px;
  height: 47px;
}
.content-left-img img {
  width: 100%;
  height: 100%;
}
.protocol-name {
  width: 100%;
  color: #333333;
  margin-bottom: 26px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.more {
  width: 42%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.protocol-time {
  width: 100%;
  color: #666666;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
/* 右侧 */
.run-favorites-content-right {
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
  margin-bottom: 25px;
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
.labware-pic > img {
  width: 465px;
  height: 150px;
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
*::-webkit-scrollbar-track {
  background: unset !important;
}
.remark {
  text-indent: 2em;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 60px;
  margin-bottom: 10px;
  font-size: 24px;
  color: #333333;
}
</style>
