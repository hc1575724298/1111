<template>
  <div class="modified-paramters-back">
    <div class="modified-paramters">
      <div class="modified-info">
        <div class="modified-paramters-text">
          {{name}}:
        </div>
        <input type="number" class="input-paramters" v-model="paramters_value" @blur="check($event,name)" />
      </div>
      <div class="buttons">
        <div class="ok" @click="modifiedParamters">{{$t("language.ok")}}</div>
        <div class="cancel" @click="backTo">{{$t("language.cancel")}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['paramters_name'],
    data() {
      return {
        name: this.paramters_name,
        paramters_value: null,
        max_number: null,
        min_number: null
      }
    },
    mounted() {},
    methods: {
      backTo() {
        this.$emit('back');
      },
      check(event, name) {
        let val = event.target.value
        if (name == this.$t("language.horizontal_speed") || name == this.$t("language.magnetic_lifting_speed") ||
          name == this.$t("language.magnetic_sleeve_speed")) {
          if (val > 50) {
            this.paramters_value = 50;
          } else if (val < 5 && val > 0) {
            this.paramters_value = 5;
          }
        } else if (name == this.$t("language.aspirate_speed")) {
          if (val > 2000) {
            this.paramters_value = 2000;
          } else if (val < 20 && val > 0) {
            this.paramters_value = 20;
          }
        } else if (name == this.$t("language.aspirate_acceleration")) {
          if (val > 5000) {
            this.paramters_value = 5000;
          } else if (val < 100 && val > 0) {
            this.paramters_value = 100;
          }
        } else if (name == this.$t("language.aspirate_delay") || name == this.$t("language.magnet_dispense_delay") ||
          name == this.$t("language.dispense_delay")) {
          if (val > 10) {
            this.paramters_value = 10;
          } else if (val < 0.1 && val > 0) {
            this.paramters_value = 0.1;
          }
        } else if (name == this.$t("language.dispense_speed")) {
          if (val > 2000) {
            this.paramters_value = 2000;
          } else if (val < 20 && val > 0) {
            this.paramters_value = 20;
          }
        } else if (name == this.$t("language.blow_liquid") || name == this.$t("language.air_gap")) {
          if (val > 20) {
            this.paramters_value = 20;
          } else if (val < 0) {
            this.paramters_value = 0;
          }
        } else if (name == this.$t("language.prewetting_cycle")) {
          if (val > 10) {
            this.paramters_value = 10;
          } else if (val < 0) {
            this.paramters_value = 0;
          }
        } else if (name == this.$t("language.magnet_aspirate_speed")) {
          if (val > 1000) {
            this.paramters_value = 1000;
          } else if (val < 10) {
            this.paramters_value = 10;
          }
        } else if (name == this.$t("language.magnet_dispense_speed")) {
          if (val > 100) {
            this.paramters_value = 100;
          } else if (val < 10) {
            this.paramters_value = 10;
          }
        } else if (name == this.$t("language.magnet_speed")) {
          if (val > 15) {
            this.paramters_value = 15;
          } else if (val < 1 && val > 0) {
            this.paramters_value = 1;
          }
        }
      },
      modifiedParamters() {
        this.$emit('ok', this.paramters_value);
      }
    }
  }
</script>

<style scoped="scoped">
  .modified-paramters-back {
    position: absolute;
    z-index: 1000;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    top: 0%;
    left: 0%;
  }

  .modified-paramters {
    width: 700px;
    height: 300px;
    background-color: #ffffff;
    border-radius: 10px;
    border: solid 1px #707070;
  }

  .modified-info {
    margin-top: 90px;
    top: 90px;
    display: flex;
    width: 100%;
    height: 52px;
    justify-content: center;
  }

  .modified-paramters-text {
    height: 100%;
    font-size: 22px;
    line-height: 52px;
  }

  .input-paramters {
    width: 210px;
    height: 100%;
    margin-left: 20px;
    text-align: center;
    font-size: 22px;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px #666666;
  }

  .buttons {
    margin-top: 80px;
    height: 50px;
    width: 100%;
    font-size: 18px;
  }

  .cancel,
  .ok {
    float: right;
    width: 150px;
    height: 50px;
    margin-right: 24px;
    line-height: 50px;
    flex-shrink: 0;
    border-radius: 8px;
    text-align: center;

  }

  .cancel {
    border: 2px solid #93ADE2;
    color: black;
    box-sizing: border-box;
  }

  .ok {
    margin-right: 46px;
    background-image: linear-gradient(to bottom, #588DCF, #4D7DB4);
    color: white;
  }
</style>
