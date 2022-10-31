<template>
  <div>
    <div v-for="(item,index) in img_lists" class="img-lists" :class="{'selected-text':$store.getters.selectedImg==item.id}"
      @click="changeImg(item.id)">
      <div class="img-lists-text">{{item.text}}</div>
      <div><img :src="item.src" class="back-img-model" /></div>
      <div class="import-img" v-if="item.id==3" @click="importImage()">{{$t("language.import_img")}}</div>
      <div class="circle-option" :class="{'selected-circle':$store.getters.selectedImg==item.id}">
        <div class="circle-option-inner"></div>
      </div>
    </div>
    <div class="tube-info-button">
      <div class="button-div save" @click="save">{{this.$t("language.save")}}</div>
    </div>
  </div>
</template>

<script>
  import {
    saveInstruments
  } from '@/api/setting.js'
  import {
    importOem
  } from '@/api/setting.js'
  import {
    instrumentGet
  } from '@/api/setting.js'
  export default {
    data() {
      return {
        img_lists: [{
          id: 1,
          text: this.$t("language.allsheng"),
          src: this.$store.getters.setting.oem[0],
        }, {
          id: 2,
          text: this.$t("language.neutral"),
          src: this.$store.getters.setting.oem[1],
        }, {
          id: 3,
          text: this.$t("language.other"),
          src: this.$store.getters.setting.oem[2] + "?" + Math.random(100000000000),
        }],
        checkCircle: 1,
      }
    },
    mounted() {
      this.EventBus.on(this.Notify.CODE_IMPORT_SUCCESS, (notify) => {
        this.img_lists[2].src = this.$store.getters.setting.oem[2] + "?" + Math.random(100000000)
      })
    },
    methods: {
      changeImg(type) {
        this.$store.commit('setSelectedImg',type)
      },
      save() {
        var labware = this.$store.getters.elutionData.concat(this.$store.getters.reagentData).concat(this.$store
          .getters
          .sampleData);
        var settings = this.$store.getters.setting;
        settings.oem[3] = this.$store.getters.selectedImg;
        settings.labware = labware;
        this.$store.commit('setSetting', settings)
        this.$store.commit('setBackSrc', this.img_lists[this.$store.getters.selectedImg-1].src)
        var instruments = this.$store.getters.setting;
        var setting_tmp = JSON.parse(JSON.stringify(this.$store.getters.saveParameters));
        for (let i = 0; i < setting_tmp.length; i++) {
          if (setting_tmp[i].key == 'aspirate_delay' || setting_tmp[i].key == 'dispense_delay' || setting_tmp[i].key ==
            'tip_dispense_delay') {
            setting_tmp[i].value *= 1000;
          }
        }
        saveInstruments({
          'parameters': JSON.stringify(setting_tmp),
          'instruments': JSON.stringify(instruments)
        }).then((res) => {
          if (res.code == 0) {
            this.$message({
              type: 'success',
              message: "保存设置成功"
            })
            this.$emit('refreshInstrument')
          }
        })
      },
      importImage() {
        importOem().then((res) => {
        })
      }
    }
  }
</script>

<style scoped="scoped">
  .back-img-model {
    width: 355px;
    height: 222px;
    border-radius: 4px;
    margin-left: 45px;
  }

  .img-lists {
    position: relative;
    float: left;
    font-size: 24px;
    width: 442px;
    height: 550px;
    background-color: #ffffff;
    border-radius: 9px;
    margin-left: 50px;
    margin-top: 248px;
  }

  .img-lists-text {
    margin-top: 40px;
    margin-bottom: 120px;
    width: 100%;
    text-align: center;
  }

  .circle-option {
    position: absolute;
    width: 36px;
    height: 36px;
    border: 1px solid #4c7cb2;
    background-color: white;
    border-radius: 18px;
    bottom: -62px;
    left: 203px;
  }

  .selected-circle {
    background-color: #4C7CB2;
  }

  .selected-text {
    color: #5a89c7;
    border: solid 2px #5a89c7;
    box-sizing: border-box;
  }

  .circle-option-inner {
    width: 16px;
    height: 16px;
    border-radius: 8px;
    background-color: #ffffff;
    margin: 10px 10px;
  }

  .import-img {
    width: 157px;
    height: 46px;
    background-color: #5a89c7;
    border-radius: 4px;
    color: white;
    float: right;
    margin-top: 63px;
    margin-right: 20px;
    text-align: center;
    line-height: 46px;
    font-size: 20px;
  }

  .tube-info-button {
    position: absolute;
    bottom: 30px;
    right: 30px;
  }

  .button-div {
    float: right;
    width: 193px;
    height: 64px;
    border-radius: 6px;
    line-height: 64px;
    font-size: 24px;
    text-align: center;
  }

  .save {
    color: white;
    background-color: #5187C3;
  }
</style>
