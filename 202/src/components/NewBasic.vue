<template>
  <div class="new-basic-model">
    <div class="info-title">
      <div class="info-title-icon"></div>
      <div class="info-title-text">{{title}}</div>
    </div>
    <div class="protocol-list">
      <div class="protocols-name">
        {{$t("language.protocols_name")}}
        <input class="input-protocol-name" v-model="$store.getters.protocol.name" />
      </div>
      <div class="protocols-packaged">
        {{$t("language.pre_packaged")}}:
        <div class="check" @click="selectPackage">
          <img src="../images/protocols/select-pre.png" v-if="$store.getters.protocol.pre_packaged" class="icon-check">
        </div>
      </div>
      <div class="cartridge">
        {{$t("language.cartridge")}}:
        <div class="tube-img-div tube-img-first" :class="{'selected-tube':$store.getters.protocol.cartridge==8}"
          @click="selectTube(8)">
          <div class="well"><img src="../images/protocols/well8.png" /></div>
          <div>{{tubesType[0].description}}</div>
        </div>
        <div class="tube-img-div tube-img-second" :class="{'selected-tube':$store.getters.protocol.cartridge==7}"
          @click="selectTube(7)">
          <div class="well"><img src="../images/protocols/well7.png" /></div>
          <div>{{tubesType[1].description}}</div>
        </div>
        <div class="tube-img-div tube-img-third" :class="{'selected-tube':$store.getters.protocol.cartridge==5}"
          @click="selectTube(5)">
          <div class="well"><img src="../images/protocols/well5.png" /></div>
          <div>{{tubesType[2].description}}</div>
        </div>
      </div>
      <div class="protocols-name">
        {{$t("language.elution_tube")}}:
        <div class="protocol-tube">
          {{$store.getters.protocol.elution_tube_info}}
          <div class="img-down">
            <img src="../images/protocols/down-prto.png" class="img-model" @click="openTube(1)" />
          </div>
        </div>
      </div>
      <div class="protocols-name">
        {{$t("language.reagent_tube_big")}}:
        <div class="protocol-tube">
          {{$store.getters.protocol.reagent_tube_info}}
          <div class="img-down">
            <img src="../images/protocols/down-prto.png" class="img-model" @click="openTube(2)" />
          </div>
        </div>
        <span class="tube-span">{{$t("language.reagent_volume")}}:</span>
        <input class="tube-volume" v-model="$store.getters.protocol.reagent_volume" />
      </div>
      <div class="protocols-name">
        {{$t("language.sample_tube")}}:
        <div class="protocol-tube">
          {{$store.getters.protocol.sample_tube_info}}
          <div class="img-down">
            <img src="../images/protocols/down-prto.png" class="img-model" @click="openTube(3)" />
          </div>
        </div>
        <span class="tube-span" v-if="$store.getters.protocol.sample_tube_info.split('_', 1)[0].substring(0, $store.getters
            .protocol.sample_tube_info.split('_', 1)[0].length - 2)==5">{{$t("language.sample_volume_5000")}}:</span>
            <span class="tube-span" v-if="$store.getters.protocol.sample_tube_info.split('_', 1)[0].substring(0, $store.getters
                .protocol.sample_tube_info.split('_', 1)[0].length - 2)==10">{{$t("language.sample_volume_10")}}:</span>
        <input class="tube-volume" v-model="$store.getters.protocol.sample_volume" />
      </div>
      <div class="protocols-remark">
        {{$t("language.remark_optional")}}:
        <el-input type="textarea" :rows="7" v-model="$store.getters.protocol.remark" class="protocols-remark-div">
        </el-input>
      </div>
    </div>
    <Tube v-if="is_tube" :content_title='tube_title' @close='closeTube()'></Tube>
  </div>
</template>

<script>
  import Tube from '@/components/Tube'
  export default {
    components: {
      Tube
    },
    data() {
      return {
        title: this.$t("language.basic_information"),
        tubesType: [{
          id: 1,
          description: this.$t("language.cartridege_8")
        }, {
          id: 2,
          description: this.$t("language.cartridege_7")
        }, {
          id: 3,
          description: this.$t("language.cartridege_5")
        }],
        is_tube: false,
      }
    },
    mounted() {

    },
    methods: {
      selectPackage() {
        var protocol = JSON.parse(JSON.stringify(this.$store.getters.protocol))
        if (this.$store.getters.protocol.pre_packaged == 0) {
          protocol.pre_packaged = 1
        } else if (this.$store.getters.protocol.pre_packaged == 1) {
          protocol.pre_packaged = 0
        }
        this.$store.commit('setProtocol', protocol)
      },
      selectTube(type) {
        var protocol = JSON.parse(JSON.stringify(this.$store.getters.protocol))
        protocol.cartridge = type;
        this.$store.commit('setProtocol', protocol)
      },
      openTube(type) {
        this.tube_title = type
        this.is_tube = true
      },
      closeTube(data) {
        this.is_tube = false
      },
    },
  }
</script>

<style scoped="scoped">
  .new-basic-model {
    width: 1685px;
    height: 1048px;
    background-color: #ffffff;
    border-radius: 6px;
    border: solid 1px #c2cbda;
    font-size: 24px;
    color: #666666;
  }

  .info-title {
    height: 79px;
    width: 1625px;
    margin-left: 31px;
    border-bottom: solid 1px #c2cbda;
    display: flex;
    align-items: center;
  }

  .info-title-icon {
    width: 4px;
    height: 28px;
    background-color: #4C7CB2;
  }

  .info-title-text {
    font-size: 25px;
    margin-left: 18px;
    line-height: 28px;
    color: #333333;
    font-weight: 600;
  }

  .protocol-list {
    height: 879px;
    width: 1645px;
    margin-top: 28px;
    padding-left: 40px;
  }

  .protocols-name {
    width: 100%;
    position: relative;
    height: 58px;
    margin-bottom: 32px;
    line-height: 58px;
  }

  .protocol-tube,
  .input-protocol-name {
    width: 390px;
    height: 100%;
    position: absolute;
    text-indent: 22px;
    left: 264px;
    top: 0;
    color: #333333;
    background-color: #ffffff;
    border-radius: 2px;
    border: solid 1px #c2cbda;
  }

  .protocols-packaged {
    width: 100%;
    position: relative;
    height: 32px;
    margin-bottom: 32px;
    line-height: 32px;
  }

  .check {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 264px;
    top: 0;
    height: 32px;
    width: 32px;
    border: 0;
    border-radius: 3px;
    border: solid 1px #c2cbda;
  }

  .icon-check {
    width: 28px;
    height: 20px;
  }

  .cartridge {
    height: 177px;
    width: 100%;
    position: relative;
    margin-bottom: 32px;
  }

  .tube-img-div {
    position: absolute;
    top: 0;
    width: 240px;
    height: 177px;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px #c2cbda;
    font-size: 20px;
    text-align: center;
  }

  .tube-img-first {
    left: 264px;
  }

  .tube-img-second {
    left: 543px;
  }

  .tube-img-third {
    left: 823px;
  }

  .well {
    width: 100%;
    height: 123px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .selected-tube {
    background-color: #f5faff;
    border: solid 1px #4c7cb2;
  }

  .img-down {
    float: right;
    margin-right: 16px;
    height: 100%;
    display: flex;
    align-items: center;
    margin-right: 16px;
  }

  .tube-span {
    display: inline-block;
    position: absolute;
    left: 754px;
  }

  .tube-volume {
    width: 281px;
    height: 58px;
    background-color: #ffffff;
    border-radius: 2px;
    position: absolute;
    right: 236px;
    text-indent: 22px;
    border: solid 1px #c2cbda;
  }

  .protocols-remark {
    height: 238px;
    width: 100%;
    position: relative;
  }

  .protocols-remark-div {
    width: 1035px;
    position: absolute;
    left: 264px;
    top: 0;
    color: #333333;
    font-size: 24px;
    text-indent: 22px;
    background-color: #ffffff;
    border-radius: 2px;
    border: solid 1px #c2cbda;
  }
</style>
<style>
  .protocols-remark-div .el-textarea__inner {
    color: #333333;
    font-family: Arial;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
  }
</style>
