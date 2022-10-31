<template>
  <div class="labware">
    <div class="labware-title">
      <div class="labware-div elution-tube" :class="{'selected-tube':$store.getters.tubeType=='elution_tube'}"
        @click="switchTube('elution_tube')">
        {{$t("language.elution_tube")}}
      </div>
      <div class="labware-div reagent-tube" :class="{'selected-tube':$store.getters.tubeType=='reagent_tube'}"
        @click="switchTube('reagent_tube')">
        {{$t("language.reagent_tube_big")}}
      </div>
      <div class="labware-div sample-tube" :class="{'selected-tube':$store.getters.tubeType=='sample_tube'}"
        @click="switchTube('sample_tube')">
        {{$t("language.sample_tube")}}
      </div>
      <div class="labware-icon labware-delete" :disabled="selectedIds.length === 0"><img
          src="../images/setting/delete.png" @click="deleteTube()" /></div>
      <div class="labware-icon"><img src="../images/setting/export.png" /></div>
      <div class="labware-icon"><img src="../images/setting/import.png" /></div>
      <div class="labware-icon" @click="addTube()"><img src="../images/setting/add_tube.png" /></div>
    </div>
    <div class="tube-table-div">
      <el-table :data="tubleData" class="tube-table" :header-cell-style="{ background: '#4C7CB2', color: '#ffffff'}"
        :row-style="{height:85+'px'}" style="width: 1408px" max-height="770" @select='selectRow'
        @select-all='selectRow'>
        <el-table-column type="selection" width="100" align="center">
        </el-table-column>
        <el-table-column :label="$t('language.no')" width="80" align="center">
          <template slot-scope="scope">
            {{(scope.$index+1)<10 ? '0'+(scope.$index+1):scope.$index+1}}
          </template>
        </el-table-column>
        <el-table-column :label="$t('language.brand')" width="150" align="center">
          <template slot-scope="scope">
            <span class="brand-span">{{scope.row.brand}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="volume" align="center" width="150">
          <template slot="header">
            <div v-if="$store.getters.languageCode==1">{{$t('language.volume')}}</div>
            <div v-if="$store.getters.languageCode==1">{{$t('language.ml')}}</div>
            <div v-if="$store.getters.languageCode==0">{{$t('language.volume')}}{{$t('language.ml')}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="buttom_diameter" align="center" width="300">
          <template slot="header">
            <div v-if="$store.getters.languageCode==1">{{$t('language.buttom_diameter')}}</div>
            <div v-if="$store.getters.languageCode==1">{{$t('language.mm')}}</div>
            <div v-if="$store.getters.languageCode==0">{{$t('language.buttom_diameter')}}{{$t('language.mm')}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="depth" align="center">
          <template slot="header">
            <div v-if="$store.getters.languageCode==1">{{$t('language.depth_tube')}}</div>
            <div v-if="$store.getters.languageCode==1">{{$t('language.mm')}}</div>
            <div v-if="$store.getters.languageCode==0">{{$t('language.depth_tube')}}{{$t('language.mm')}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="inner_height" align="center">
          <template slot="header">
            <div v-if="$store.getters.languageCode==1">{{$t('language.inner_height')}}</div>
            <div v-if="$store.getters.languageCode==1">{{$t('language.mm')}}</div>
            <div v-if="$store.getters.languageCode==0">{{$t('language.inner_height')}}{{$t('language.mm')}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="cap_height" align="center">
          <template slot="header">
            <div v-if="$store.getters.languageCode==1">{{$t('language.caps_height')}}</div>
            <div v-if="$store.getters.languageCode==1">{{$t('language.mm')}}</div>
            <div v-if="$store.getters.languageCode==0">{{$t('language.caps_height')}}{{$t('language.mm')}}</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="tube-info-button">
      <div class="total">{{this.$t("language.total")}}{{total}}</div>
      <div class="selected">{{this.$t("language.selected")}}{{selectedIds.length}}</div>
      <div class="button-div save" @click="saveLabware()">{{this.$t("language.save")}}</div>
      <div class="button-div factory">{{this.$t("language.factory")}}</div>
      <div class="button-div factory" @click="editLabware()">{{this.$t("language.edit")}}</div>
    </div>
    <AddTube @back='back' v-if="add_status" @addTempTube='addTemp' :edit_content='edit_labware' :edit='edit_status'>
    </AddTube>
  </div>
</template>

<script>
  import AddTube from '@/components/AddTube'
  import {
    saveInstruments
  } from '@/api/setting.js'
  import {
    instrumentGet
  } from '@/api/setting.js'
  export default {
    components: {
      AddTube
    },
    data() {
      return {
        tube_type: 'elution_tube',
        total: null,
        selected: 0,
        selectedIds: [],
        add_status: false,
        timer: new Date().getTime(),
        tube: null,
        tubleData: null,
        edit_labware: null,
        edit_status: false,
      }
    },

    mounted() {
      this.getlabware()
    },
    watch: {
      'tubleData': {
        deep: true,
        handler(newval, oldval) {
          if (this.tube_type == 'elution_tube') {
            this.$store.commit('setElutionData', this.tubleData)
          } else if (this.tube_type == 'reagent_tube') {
            this.$store.commit('setReagentData', this.tubleData)
          } else if (this.tube_type == 'sample_tube') {
            this.$store.commit('setSampleData', this.tubleData)
          }
          this.getTotal()
        }
      }
    },
    methods: {
      getlabware() {
        var elution = [];
        var reagent = [];
        var sample = [];
        var settings = JSON.parse(JSON.stringify(this.$store.getters.setting));
        for (let i = 0; i < settings.labware.length; i++) {
          if (this.$store.getters.setting.labware[i].type == 'elution_tube') {
            elution.push(this.$store.getters.setting.labware[i]);
          } else if (this.$store.getters.setting.labware[i].type == 'reagent_tube') {
            reagent.push(this.$store.getters.setting.labware[i]);
          } else if (this.$store.getters.setting.labware[i].type == 'sample_tube') {
            sample.push(this.$store.getters.setting.labware[i]);
          }
        }
        this.$store.commit('setElutionData', elution)
        this.$store.commit('setReagentData', reagent)
        this.$store.commit('setSampleData', sample)
        if (this.$store.getters.tubeType == 'elution_tube') {
          this.tubleData = this.$store.getters.elutionData;
        } else if (this.$store.getters.tubeType == 'reagent_tube') {
          this.tubleData = this.$store.getters.reagentData;
        } else if (this.$store.getters.tubeType == 'sample_tube') {
          this.tubleData = this.$store.getters.sampleData;
        }
      },
      getTotal() {
        if (this.tube_type == 'elution_tube') {
          this.total = this.$store.getters.elutionData.length;
        } else if (this.tube_type == 'reagent_tube') {
          this.total = this.$store.getters.reagentData.length;
        } else if (this.tube_type == 'sample_tube') {
          this.total = this.$store.getters.sampleData.length;
        }
      },
      switchTube(type) {
        this.selectedIds = [];
        this.tube_type = type;
        if (type == 'elution_tube') {
          this.$store.commit('setTubeType', 'elution_tube')
          this.tubleData = this.$store.getters.elutionData;
        } else if (type == 'reagent_tube') {
          this.tubleData = this.$store.getters.reagentData;
          this.$store.commit('setTubeType', 'reagent_tube')
        } else if (type == 'sample_tube') {
          this.tubleData = this.$store.getters.sampleData;
          this.$store.commit('setTubeType', 'sample_tube')
        }
      },
      addTube() {
        this.add_status = true;
      },
      back() {
        this.add_status = false;
        this.edit_status = false;
        this.timer = new Date().getTime();
      },

      selectRow(selection, row) {
        this.selectedIds = [];
        for (let i = 0; i < selection.length; i++) {
          this.selectedIds.push(selection[i].id);
        }
        this.edit_labware = selection;
      },
      deleteTube() {
        let newArr = [];
        for (let i = 0; i < this.tubleData.length; i++) {
          if (this.selectedIds.indexOf(this.tubleData[i].id) == -1) {
            newArr.push(this.tubleData[i]);
          }
        }
        this.tubleData = JSON.parse(JSON.stringify(newArr))
        var type = this.tube_type;
        if (type == 'elution_tube') {
          this.$store.commit('setElutionData', this.tubleData)
        } else if (type == 'reagent_tube') {
          this.$store.commit('setReagentData', this.tubleData)
        } else if (type == 'sample_tube') {
          this.$store.commit('setSampleData', this.tubleData)
        }
        var labware = this.$store.getters.elutionData.concat(this.$store.getters.reagentData).concat(this.$store.getters
          .sampleData);
        var settings = this.$store.getters.setting;
        settings.labware = labware;
        this.$store.commit('setSetting', settings)
        this.selectedIds = [];
      },
      addTemp(data, type) {
        this.edit_status = false;
        if (type == 'edit') {
          for (let i = 0; i < this.tubleData.length; i++) {
            if (this.tubleData[i].id == data.id) {
              this.tubleData.splice(i, 1, data)
            }
          }
        } else if (type == 'add') {
          data.id = this.tubleData.length + 3;
          this.tubleData.push(data);
        }
        var type = this.tube_type;
        if (type == 'elution_tube') {
          this.$store.commit('setElutionData', this.tubleData)
        } else if (type == 'reagent_tube') {
          this.$store.commit('setReagentData', this.tubleData)
        } else if (type == 'sample_tube') {
          this.$store.commit('setSampleData', this.tubleData)
        }
        var labware = this.$store.getters.elutionData.concat(this.$store.getters.reagentData).concat(this.$store.getters
          .sampleData);
        var settings = this.$store.getters.setting;
        settings.labware = labware;
        this.$store.commit('setSetting', settings)
        this.selectedIds = [];
        this.add_status = false;
      },
      saveLabware() {
        var labware = this.$store.getters.elutionData.concat(this.$store.getters.reagentData).concat(this.$store.getters
          .sampleData);
        var settings = this.$store.getters.setting;
        settings.labware = labware;
        settings.oem[3] = this.$store.getters.selectedImg;
        this.$store.commit('setSetting', settings)
        if (this.$store.getters.selectedImg == 1) {
          this.$store.commit('setBackSrc', settings.oem[0])
        } else if (this.$store.getters.selectedImg == 2) {
          this.$store.commit('setBackSrc', settings.oem[1])
        } else if (this.$store.getters.selectedImg == 3) {
          this.$store.commit('setBackSrc', settings.oem[2] + "?" + Math.random(100000000000))
        }
        var setting_tmp = JSON.parse(JSON.stringify(this.$store.getters.saveParameters));
        for (let i = 0; i < setting_tmp.length; i++) {
          if (setting_tmp[i].key == 'aspirate_delay' || setting_tmp[i].key == 'dispense_delay' || setting_tmp[i].key ==
            'tip_dispense_delay') {
            setting_tmp[i].value *= 1000;
          }
        }
        saveInstruments({
          'parameters': JSON.stringify(setting_tmp),
          'instruments': JSON.stringify(settings)
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
      editLabware() {
        this.edit_status = true
        if (this.selectedIds.length == 1) {
          this.add_status = true
        }
      },
    }
  }
</script>

<style scoped="scoped">
  .labware-title {
    width: 100%;
    height: 58px;
    margin-top: 12px;
  }

  .labware-div {
    float: left;
    width: 180px;
    height: 58px;
    font-size: 22px;
    text-align: center;
    line-height: 58px;
    box-sizing: border-box;
  }

  .selected-tube {
    background-color: #548DCD;
    color: white;
  }

  .elution-tube {
    margin-left: 31px;
    border-radius: 4px 0px 0px 4px;
    border: solid 1px #c2cbda;
  }

  .reagent-tube {
    border: solid 1px #c2cbda;
  }

  .sample-tube {
    border-radius: 0px 4px 4px 0px;
    border: solid 1px #c2cbda;
  }

  .labware-icon {
    float: right;
    width: fit-content;
    height: fit-content;
    margin-right: 19px;
    margin-top: 2px;
  }

  .labware-delete {
    margin-right: 30px;
  }

  .tube-info-button {
    margin-top: 41px;
    height: 64px;
    line-height: 64px;
    width: 100%;
    font-size: 24px;
  }

  .total {
    float: left;
    margin-left: 30px;
  }

  .selected {
    float: left;
    margin-left: 34px;
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
    margin-right: 26px;
  }

  .factory {
    border: solid 1px #4c7cb2;
    margin-right: 32px;
    box-sizing: border-box;
  }

  .tube-table-div {
    margin-top: 22px;
    margin-left: 30px;
  }

  .tube-table {
    height: 711px;
    margin-right: 30px;
    font-size: 24px;
    border: solid 1px #c2cbda;
  }

  .brand-span {
    height: 30px;
    display: inline-block;
    font-size: 26px;
    line-height: 30px;
  }
</style>
<style>
  .tube-table .el-checkbox__inner::after {
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
    content: "";
    border: 3px solid #4171BB;
    border-left: 0;
    border-top: 0;
    height: 25px;
    width: 14px;
    left: 9px;
    position: absolute;
    top: -3px;
    transform: rotate(40deg) scaleY(0);
    transition: transform .01s ease-in .03s;
    transform-origin: center;
  }

  .tube-table .el-checkbox__input.is-checked .el-checkbox__inner,
  .tube-table .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: white;
  }

  .tube-table .el-checkbox__inner {
    display: inline-block;
    position: relative;
    border: solid 1px #5a89c7;
    border-radius: 2px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 36px;
    height: 36px;
    background-color: #FFF;
    z-index: 1;
  }

  *::-webkit-scrollbar {
    width: 12px;
  }

  *::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #E8EEF3 !important;
    border: 1px solid #DCDCDC;
  }

  *::-webkit-scrollbar-track {
    background: #FFFFFF;
  }

  .el-table th.el-table__cell>.cell {
    display: inline-block;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: relative;
    vertical-align: middle;
    padding-left: 10px;
    padding-right: 10px;
    width: 100%;
    font-weight: 400;
  }
</style>
