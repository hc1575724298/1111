<template>
  <div class="container-tube-group">
    <div class="sort">
      <div class="header flexClo">
        <template v-if="protocalInfo.cartridge === 7">
          <span class="headerFirst">1</span>
          <div class="flexClo headerMiddle">
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>6</span>
          </div>
          <span>7</span>
        </template>
        <template v-if="protocalInfo.cartridge === 5">
          <span class="headerFirst">1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
        </template>
        <template v-if="protocalInfo.cartridge === 8">
          <div class="flexClo headerFirst">
            <span style="padding-top: 35px;">1</span>
            <span style="padding-top: 25px;">2</span>
          </div>

          <div class="flexClo headerMiddle">
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>6</span>
            <span>7</span>
          </div>
          <span>8</span>
        </template>
      </div>
      <div class="middle flexClo">
        <span>A</span>
        <span>B</span>
      </div>
      <div class="footer flexClo">
        <span>C</span>
        <section class="flexClo">
          <div>D</div>
          <div>E</div>
        </section>
      </div>
    </div>
    <div class="col-string"></div>

    <el-checkbox-group
      fill="#5691d3"
      v-model="selectedList"
      @change="handleCheckedTubeChange"
    >
      <template>
        <div v-for="(item, i) in selected" :key="item">
          <TubeItem
            v-bind="$attrs"
            :isGroup="(i + 1) % 8 == 0"
            :selected="selectedList.includes(item)"
            :checked="checkedList.includes(item)"
            :tubeNum="protocalInfo.cartridge"
            @click.native="clickTubeItem(item)"
          />
          <div class="tubeNum">{{ item }}</div>

          <div class="checked-btn" @click="clickTubeItem(item)">
            <img
              src="@/images/run/6.png"
              alt=""
              v-if="!selectedList.includes(item) && !checkedList.length"
            />
            <img
              src="@/images/run/7.png"
              alt=""
              v-else-if="selectedList.includes(item) & !checkedList.length"
            />
            <img
              src="@/images/run/checkedTube.png"
              v-if="checkedList.includes(item)"
            />
          </div>
        </div>
      </template>
    </el-checkbox-group>
  </div>
</template>

<script>
import TubeItem from "@/components/TubeItem";
import { mapState as mapProtocolsState } from "vuex";
export default {
  name: "home",
  components: { TubeItem },
  props: {
    // 是否能被点击
    isDisabled: {
      type: Array,
      default: () => []
    },
    // 选中列表
    selectedList: {
      type: Array,
      default: () => []
    },
    //完成列表
    checkedList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      checkAll: false,
      selected: [
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
      ],
      isIndeterminate: true,
      currentCheckedBtnList: []
    };
  },
  computed: {
    ...mapProtocolsState("protocols", ["protocalInfo"])
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleCheckAllChange(val) {
      console.log(8, val);
      this.selectedList = val
        ? [
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
          ]
        : [];
      this.isIndeterminate = false;
    },
    handleCheckedTubeChange(value) {
      console.log(7, value);
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.selected.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.selected.length;
    },
    clickTubeItem(val) {
      console.log(val);
      if (this.isDisabled.includes(val)) {
        return;
      } else {
        let newList = [];
        if (this.selectedList.includes(val)) {
          newList = this.selectedList.filter(v => v != val);
        } else {
          newList = [val, ...this.selectedList];
        }
        this.currentCheckedBtnList = newList;
        this.$store.commit(
          "protocols/changeSelectedTubeList",
          newList.sort((a, b) => a - b)
        );
      }
    }
  }
};
</script>

<style scoped>
.container-tube-group {
  display: flex;
  position: relative;
}

.sort {
  height: 675px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  height: 360px;
  padding: 5px;
}

.headerMiddle {
  margin: -16px 0;
}
.header span,
.middle span {
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}
.header span:last-child {
  height: 45px;
}
.header .headerFirst {
  flex: 1;
  display: flex;
}

.middle {
  padding: 28px 0;
  height: 90px;
  justify-content: space-between;
}

.footer {
  padding: 15px 0;
  width: 40px;
  height: 130px;
  font-size: 20px;
  justify-content: space-between;
}

.footer > span {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer > section {
  position: relative;
  width: 100%;
  height: 80px;
  align-items: center;
}

.footer > section > div {
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer > section > div:first-child {
  height: 39px;
}

.footer > section > div:nth-child(2) {
  height: 33px;
}

.flexClo {
  display: flex;
  flex-direction: column;
}

.el-checkbox-group {
  display: flex;
}
.container-tube-group >>> .el-checkbox {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-flow: column-reverse;
  margin: 0 !important;
}
.container-tube-group >>> .el-checkbox__label {
  padding: 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-left: 0 !important;
}
.item {
  display: flex;
  flex-direction: column;
}
.col-string {
  position: absolute;
  /* z-index: 99; */
  width: 1px;
  height: 770px;
  left: 42px;
  top: 0;
  background-color: #c2cbda;
}
/* 多选框按钮 */
.checkbox-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.el-checkbox-button:last-child >>> .el-checkbox-button__inner {
  width: 30px !important;
  height: 35px;
  border-radius: 50%;
  border: solid 1px #5691d3;
}
.tubeNum {
  width: 22px;
  height: 22px;
  margin: 15px 12px;
  font-size: 20px;
  line-height: 20px;
  text-align: center;
  color: #333333;
}

.checked-btn {
  padding-left: 10px;
}
</style>
