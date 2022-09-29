<template>
  <div class="aging-model">
    <div class="aging-div" v-for="(item,index) in agings" :key="index">
      <div class="aging-optional-div">
        <div class="aging-option">
          <div class="aging-option-icon" @click="selectAging(item)"><img src="../images/setting/list_selected.png"
              v-if="item.icon_status" /></div>
          <div style="text-indent: 16px;">{{item.description}}</div>
        </div>
        <div class="cycles-div" v-if="item.id!=9">
          <div class="cycles-text">{{$t("language.cycles")}}</div>
          <input type="number" class="cycle-number" />
        </div>
        <div :class="{'test-aging':item.id!=9,'test-all':item.id==9}">
          <div class="text-button">
            {{$t("language.test")}}
          </div>
        </div>
      </div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        agings: [{
          id: 1,
          description: this.$t("language.yaxis"),
          icon_status: false
        }, {
          id: 2,
          description: this.$t("language.zaxis"),
          icon_status: false
        }, {
          id: 3,
          description: this.$t("language.load"),
          icon_status: false
        }, {
          id: 4,
          description: this.$t("language.lid"),
          icon_status: false
        }, {
          id: 5,
          description: this.$t("language.pipettor_aging"),
          icon_status: false
        }, {
          id: 6,
          description: this.$t("language.mangnetic_aging"),
          icon_status: false
        }, {
          id: 7,
          description: this.$t("language.side_mangnetic"),
          icon_status: false
        }, {
          id: 8,
          description: this.$t("language.locker"),
          icon_status: false
        }, {
          id: 9,
          description: this.$t("language.machine"),
          icon_status: false
        }]
      }
    },
    mounted() {

    },
    methods: {
      selectAging(item) {
        item.icon_status = !item.icon_status;
      }
    }
  }
</script>

<style scoped="scoped">
  .aging-model {
    width: 1528px;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
  }

  .aging-div {
    width: 464px;
    height: 328px;
    background-color: #ffffff;
    border-radius: 6px;
    border: solid 1px #c2cbda;
    box-sizing: border-box;
    margin-top: 20px;
    margin-left: 30px;
  }

  .aging-optional-div {
    height: 34px;
    width: 100%;
  }

  .aging-option {
    width: 100%;
    display: flex;
    margin-top: 26px;
    margin-left: 30px;
    font-size: 24px;
    line-height: 34px;
    height: 34px;
  }

  .aging-option-icon {
    display: flex;
    align-items: center;
    height: 100%;
    width: 34px;
    border-radius: 2px;
    border: solid 1px #5a89c7;
    box-sizing: border-box;
  }

  .aging-option-icon>img {
    margin-left: 1px;
  }

  .cycles-div {
    width: 100%;
    height: 56px;
    margin-top: 40px;
    display: flex;
    font-size: 24px;
  }

  .cycles-text {
    height: 100%;
    line-height: 56px;
    margin-left: 30px;
  }

  .cycle-number {
    width: 304px;
    height: 56px;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px #c2cbda;
  }

  .test-aging {
    margin-top: 90px;
    width: 100%;
    height: 56px;
    display: flex;
    justify-content: center;
  }

  .text-button {
    height: 100%;
    width: 404px;
    font-size: 24px;
    background-color: #F8FAFF;
    text-align: center;
    line-height: 56px;
    border-radius: 4px;
    border: solid 1px #c2cbda;
    color: #4c7cb2;
  }

  .test-all {
    margin-top: 186px;
    width: 100%;
    height: 56px;
    display: flex;
    justify-content: center;
  }
</style>
