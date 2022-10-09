<template>
  <div class="run-list">
    <RunHead />
    <el-table
      @row-click="clickRow"
      :data="protocolsList"
      class="protocols-list"
      :header-cell-style="{
        background: '#4C7CB2',
        color: '#ffffff',
        width: '100%',
        height: '69px',
        fontSize: '24px',
        boxSizing: 'border-box'
      }"
    >
      <el-table-column
        type="index"
        :label="$t('language.no')"
        width="130"
        align="center"
      >
        <template slot-scope="scope">
          {{
            scope.$index + 1 < 10 ? "0" + (scope.$index + 1) : scope.$index + 1
          }}
        </template>
      </el-table-column>
      <el-table-column prop="name" :label="$t('language.name_A_Z')" align="center">
      </el-table-column>
      <el-table-column
        prop="cartridge"
        :label="$t('language.cartridge')"
        align="center"
        :formatter="handleCartridge"
      >
      </el-table-column>
      <el-table-column
        prop="pre_packaged"
        :label="$t('language.pre_packaged')"
        align="center"
        :formatter="handlePrePackaged"
      >
      </el-table-column>
      <el-table-column
        prop="creator_name"
        :label="$t('language.user_A_Z')"
        align="center"
        class="operation"
      >
      </el-table-column>
      <el-table-column
        prop="updated_at"
        align="center"
        :label="$t('language.timeNewToOld')"
      >
        <template slot="header">
          <div v-if="sort_code" class="time-sort">
            {{ $t("language.timeNewToOld") }}
            <img
              src="../../../images/users/sort_down.png"
              @click="changeSort()"
              class="sort-icon"
            />
          </div>
          <div v-else class="time-sort">
            {{ $t("language.timeOldToNew") }}
            <img
              src="../../../images/users/sort_top.png"
              @click="changeSort()"
              class="sort-icon"
            />
          </div>
        </template>
      </el-table-column>
    </el-table>
    <RunFooter :isDisabledRunBtn="isDisabledRunBtn" />
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
      sort_code: true,
      isDisabledRunBtn: true
    };
  },
  mounted() {},
  methods: {
    // 获取列表
    async getAllProtocol() {
      const { data } = await getAllProtocol();
      this.protocolsList = data;
      console.log(data);
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
    //点击某一行
    clickRow(row, column) {
      this.isDisabledRunBtn = false;
      this.$store.commit("protocols/changeprotocolsId", [
        row.id,
        "list",
        row.name
      ]);
    },
    handleNo(index) {
      return index > 0 ? index : "0" + index;
    },
    handleCartridge(row) {
      return row.cartridge + " well";
    },
    handlePrePackaged(row) {
      return row.pre_packaged ? "yes" : "no";
    },
    //时间反转
    changeSort() {
      this.sort_code = !this.sort_code;
      this.protocolsList = this.protocolsList.reverse();
    }
  },
  async created() {
    await this.getAllProtocol();
    this.handleupdatedTime();
  }
};
</script>

<style scoped="scoped">
.run-list {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 23px 35px 26px 40px;
}
.protocols-list {
  width: 1676px;
  height: 875px;
  background-color: #ffffff;
  border-radius: 10px;
  border: solid 1px #c2cbda;
  color: #333333;
  font-size: 24px;
  box-sizing: border-box;
}
.time-sort {
  align-items: center;
}

.sort-icon {
  margin-left: 18px;
}
</style>
