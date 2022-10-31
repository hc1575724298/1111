<template>
  <div class="add-tube-model">
    <div class="add-tube-div">
      <div class="add-tube-title" v-if="!edit">
        {{$t("language.new")}}
      </div>
      <div class="add-tube-title" v-if="edit">
        {{$t("language.edit")}}
      </div>
      <div class="add-tube-content">
        <div class="add-tube-content-img" v-if="$store.getters.tubeType == 'sample_tube'">
          <img src="../images/setting/tube.png"/>
        </div>
        <div class="add-reagent-content-img" v-if="$store.getters.tubeType == 'reagent_tube'">
          <img src="../images/setting/reagent.png" />
        </div>
        <div class="add-elution-content-img" v-if="$store.getters.tubeType == 'elution_tube'">
          <img src="../images/setting/elution.png"/>
        </div>
        <div>
          <div v-for="(item,index) in new_tube" :key="index" class="add-tube-info">
            <div class="tube-text">
              <div class="tube-list" v-if="item.id==3">①</div>
              <div class="tube-list" v-if="item.id==4">②</div>
              <div class="tube-list" v-if="item.id==5">③</div>
              <div class="tube-list" v-if="item.id==6">④</div>
              <div style="line-height: 60px;">{{item.description}}</div>
            </div>
            <div style="float: right;"><input type="number" class="input-number" v-if="item.id!=1 && item.id!=2"
                @blur="check($event,index)" v-model="new_tube[index].value" />
            </div>
            <div style="float: right;">
              <input class="input-number" v-if="item.id==1" v-model="new_tube[0].value" />
            </div>
            <div class="volume-div"
              v-if="item.id==2 && ($store.getters.tubeType == 'elution_tube'||$store.getters.tubeType == 'reagent_tube')">
              {{new_tube[1].value}}
            </div>
            <div v-if="item.id==2 && $store.getters.tubeType == 'sample_tube'" class="sample-volume-div">
              <template>
                <div style="margin-right: 130px;">
                  <el-radio v-model="new_tube[1].value" :label="5">5</el-radio>
                </div>
                <div>
                  <el-radio v-model="new_tube[1].value" :label="10">10</el-radio>
                </div>
              </template>
            </div>
          </div>

        </div>
      </div>
      <div class="buttons">
        <div class="ok" @click="addTubeOk()">{{$t("language.ok")}}</div>
        <div class="cancel" @click="backToParent()">{{$t("language.cancel")}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['edit_content', 'edit'],
    data() {
      return {
        new_tube: [{
          id: 1,
          description: this.$t("language.brand"),
          value: null
        }, {
          id: 2,
          description: this.$t("language.volume_ml"),
          value: null
        }, {
          id: 3,
          description: this.$t("language.buttom_diameter_mm"),
          value: null
        }, {
          id: 4,
          description: this.$t("language.depth_tube_mm"),
          value: null
        }, {
          id: 5,
          description: this.$t("language.inner_height_mm"),
          value: null
        }, {
          id: 6,
          description: this.$t("language.caps_height_mm"),
          value: null
        }],
        tube_type: {
          type: null,
          brand: null,
          volume: null,
          buttom_diameter: null,
          depth: null,
          inner_height: null,
          cap_height: null,
        },
      }
    },
    mounted() {
      if (this.edit == true) {
        this.new_tube[0].value = this.edit_content[0].brand;
        this.new_tube[1].value = this.edit_content[0].volume;
        this.new_tube[2].value = this.edit_content[0].buttom_diameter;
        this.new_tube[3].value = this.edit_content[0].depth;
        this.new_tube[4].value = this.edit_content[0].inner_height;
        this.new_tube[5].value = this.edit_content[0].cap_height;
      } else {
        if (this.$store.getters.tubeType == 'elution_tube' || this.$store.getters.tubeType == 'reagent_tube') {
          this.new_tube[1].value = 1.5;
        }else if(this.$store.getters.tubeType == 'sample_tube'){
          this.new_tube[1].value = 5;
        }
      }
    },
    methods: {
      backToParent() {
        this.$emit('back')
      },
      addTubeOk() {
        this.tube_type.type = this.$store.getters.tubeType
        this.tube_type.brand = this.new_tube[0].value
        this.tube_type.volume = this.new_tube[1].value+"";
        this.tube_type.buttom_diameter = this.new_tube[2].value
        this.tube_type.depth = this.new_tube[3].value
        this.tube_type.inner_height = this.new_tube[4].value
        this.tube_type.cap_height = this.new_tube[5].value
        if (this.edit == true) {
          this.tube_type.id = this.edit_content[0].id
        }
        if (this.tube_type.volume == '') {
          this.tube_type.volume = 0;
        } else if (this.tube_type.buttom_diameter == '') {
          this.tube_type.buttom_diameter = 0;
        } else if (this.tube_type.depth == '') {
          this.tube_type.depth = 0;
        } else if (this.tube_type.inner_height == '') {
          this.tube_type.inner_height = 0;
        } else if (this.tube_type.cap_height == '') {
          this.tube_type.cap_height = 0;
        }
        this.$emit('addTempTube', this.tube_type,this.edit ? 'edit' : 'add');
      },

      check(event, index) {
        let objRegExp1 = /^[0-9]\d*$/;
        let value = Number(event.target.value);
        if (value < 0) {
          return this.new_tube[index].value = null;
        }
        if (!objRegExp1.test(value)) {
          this.new_tube[index].value = value.toFixed(2);
        }
      }
    }
  }
</script>

<style scoped="scoped">
  .add-tube-model {
    z-index: 100;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    top: 0%;
    left: 0%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .add-tube-div {
    width: 1139px;
    height: 763px;
    background-color: white;
  }

  .add-tube-title {
    height: 66px;
    width: 1110px;
    font-size: 24px;
    line-height: 66px;
    float: right;
    border-bottom: solid 1px #c2cbda;
    color: #4171bb;
    margin-bottom: 50px;
  }
.add-reagent-content-img{
  margin-left: 42px;
  margin-top: 0px;
}
.add-elution-content-img{
  margin-left: 42px;
  margin-top: 0px;
}
  .add-tube-content {
    display: flex;
    width: 100%;
    height: 510px;
    margin-bottom: 62px;
  }

  .add-tube-content-img {
    margin-top: 30px;
    margin-left: 77px;
  }

  .add-tube-info:nth-child(1) {
    margin-top: 0px;
  }

  .add-tube-info {
    height: 60px;
    width: 880px;
    margin-top: 30px;
    font-size: 24px;
  }

  .input-number {
    text-indent: 21px;
    color: #333333;
    width: 375px;
    float: right;
    height: 60px;
    background-color: #ffffff;
    margin-right: 62px;
    border-radius: 2px;
    border: solid 1px #c2cbda;
  }

  .sample-volume-div {
    color: #333333;
    display: flex;
    width: 375px;
    float: right;
    height: 60px;
    line-height: 60px;
    margin-right: 62px;
  }

  .volume-div {
    float: right;
    margin-right: 60px;
    width: 375px;
    height: 60px;
    text-indent: 21px;
    line-height: 60px;
    background-color: #e4e4e4;
    border-radius: 2px;
    border: solid 1px #c2cbda;
  }

  .tube-text {
    height: 60px;
    display: flex;
    margin-left: 69px;
    float: left;
  }

  .tube-list {
    height: fit-content;
    float: left;
    margin-top: 10px;

  }

  .buttons {
    height: 50px;
    width: 100%;
    font-size: 18px;
    right: 0;
    bottom: 0;
  }

  .cancel,
  .ok {
    width: 150px;
    height: 50px;
    float: right;
    margin-right: 30px;
    line-height: 50px;
    flex-shrink: 0;
    border-radius: 6px;
    text-align: center;

  }

  .cancel {
    border: 1px solid #2d60c7;
    box-sizing: border-box;
    color: black;
  }

  .ok {
    background-image: linear-gradient(to bottom, #588DCF, #4D7DB4);
    color: white;
  }
</style>
<style>
 .add-tube-info .el-radio__inner {
    border: 1px solid #DCDFE6;
    display: inline-block;
    border-radius: 100%;
    width: 30px;
    height: 30px;
    background-color: #FFF;
    cursor: pointer;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .add-tube-info .el-radio__inner::after {
    width: 12px;
    height: 12px;
    border-radius: 100%;
    background-color: #FFF;
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
  }

  .add-tube-info .el-radio__label {
    position: absolute;
    display: inline-block;
    font-size: 24px;
    margin-top: 5px;
  }
</style>
