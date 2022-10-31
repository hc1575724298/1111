<template>
  <div class="worktable-model">
    <div class="worktable-menu">
      <div class="worktable-menu-option" v-for="(item,index) in menu_lists" :key="index" v-if="$store.getters.languageCode==1"
        :class="{'selected-worktable-menu':$store.getters.selectedWorktableStatus==item.id}"
        @click="changeMenu(item.id)">{{item.description}}</div>
        <div class="worktable-menu-option-chinese" v-for="(item,index) in menu_lists" :key="index" v-if="$store.getters.languageCode==0"
          :class="{'selected-worktable-menu':$store.getters.selectedWorktableStatus==item.id}"
          @click="changeMenu(item.id)">{{item.description}}</div>
    </div>
    <div class="worktable-img-div">
      <img class="worktable-img" src="../images/setting/tips.png" v-if="$store.getters.selectedWorktableStatus==1" />
      <img class="worktable-img" src="../images/setting/magnetic_sleeve.png"
        v-if="$store.getters.selectedWorktableStatus==2" />
      <img class="worktable-img" src="../images/setting/7_cartridege_rack_tips.png"
        v-if="$store.getters.selectedWorktableStatus==3" />
      <img class="worktable-img" src="../images/setting/7_cartridege_rack_sleeve.png"
        v-if="$store.getters.selectedWorktableStatus==4" />
      <img class="worktable-img" src="../images/setting/7_cartridege_rack_sleeve.png"
        v-if="$store.getters.selectedWorktableStatus==5" />
      <img class="worktable-img" src="../images/setting/elution_tube.png"
        v-if="$store.getters.selectedWorktableStatus==6" />
      <img class="worktable-img" src="../images/setting/reagent_tube.png"
        v-if="$store.getters.selectedWorktableStatus==7" />
      <img class="worktable-img" src="../images/setting/sample_tube.png"
        v-if="$store.getters.selectedWorktableStatus==8" />
    </div>
    <div class="worktable-content">
      <div class="option-div" v-if="$store.getters.selectedWorktableStatus==1">
        <div class="circle"></div>
        <div>{{$t("language.tips")}}</div>
      </div>
      <div class="option-div" v-if="$store.getters.selectedWorktableStatus==2">
        <div class="circle"></div>
        <div>{{$t("language.magnetic_sleeve")}}</div>
      </div>
      <div class="option-div" v-if="$store.getters.selectedWorktableStatus==3">
        <div style="margin-bottom: 18px;">
          <div class="circle"></div>
          <div>{{$t("language.cartridege_rack")}}</div>
        </div>
        <div>
          <div class="select-well" @click="dropDownWell()" ref="wells">
            {{Tip_well}}
            <span class="img-span"><img src="../images/setting/arraw.png" /></span>
          </div>
          <div class="select-well-option-div" v-if="well_status">
            <div class="select-well-option" @click="getTipWell(5)">{{$t("language.well5")}}</div>
            <div class="select-well-option" @click="getTipWell(7)">{{$t("language.well7")}}</div>
            <div class="select-well-option" @click="getTipWell(8)">{{$t("language.well8")}}</div>
          </div>
        </div>
      </div>
      <div class="option-div" v-if="$store.getters.selectedWorktableStatus==4">
        <div style="margin-bottom: 18px;">
          <div class="circle"></div>
          <div>{{$t("language.cartridege_rack")}}</div>
        </div>
        <div>
          <div class="select-well" @click="dropDownWell()" ref="wells">
            {{sleeve_well}}
            <span class="img-span"><img src="../images/setting/arraw.png" /></span>
          </div>
          <div class="select-well-option-div" v-if="well_status">
            <div class="select-well-option" @click="getSleeveWell(5)">{{$t("language.well5")}}</div>
            <div class="select-well-option" @click="getSleeveWell(7)">{{$t("language.well7")}}</div>
            <div class="select-well-option" @click="getSleeveWell(8)">{{$t("language.well8")}}</div>
          </div>
        </div>
      </div>
      <div class="option-div" v-if="$store.getters.selectedWorktableStatus==5">
        <div style="margin-bottom: 18px;">
          <div class="circle"></div>
          <div>{{$t("language.cartridege_rack")}}</div>
        </div>
        <div>
          <div class="select-well" @click="dropDownWell()" ref="wells">
            {{rod_well}}
            <span class="img-span"><img src="../images/setting/arraw.png" /></span>
          </div>
          <div class="select-well-option-div" v-if="well_status">
            <div class="select-well-option" @click="getRodWell(5)">{{$t("language.well5")}}</div>
            <div class="select-well-option" @click="getRodWell(7)">{{$t("language.well7")}}</div>
            <div class="select-well-option" @click="getRodWell(8)">{{$t("language.well8")}}</div>
          </div>
        </div>
      </div>
      <div class="option-div" v-if="$store.getters.selectedWorktableStatus==6">
        <div style="margin-bottom: 18px;">
          <div class="circle"></div>
          <div>{{$t("language.reagent_tube")}}</div>
        </div>
        <div class="worktable-tube-div">
          {{$t("language.reagent_worktable")}}
        </div>
      </div>
      <div class="option-div" v-if="$store.getters.selectedWorktableStatus==7">
        <div style="margin-bottom: 18px;">
          <div class="circle"></div>
          <div>{{$t("language.elution_tube")}}</div>
        </div>
        <div class="worktable-tube-div">
          {{$t("language.elution_worktable")}}
        </div>
      </div>
      <div class="option-div" v-if="$store.getters.selectedWorktableStatus==8">
        <div style="margin-bottom: 18px;">
          <div class="circle"></div>
          <div>{{$t("language.sample_tube")}}</div>
        </div>
        <div class="worktable-tube-div">
          {{$t("language.sample_tube_10")}}
        </div>
      </div>
      <div class="option-div">
        <div class="circle"></div>
        <div v-if="$store.getters.selectedWorktableStatus==1 ||$store.getters.selectedWorktableStatus==2
          ||$store.getters.selectedWorktableStatus==3||$store.getters.selectedWorktableStatus==6
          ||$store.getters.selectedWorktableStatus==7||$store.getters.selectedWorktableStatus==8">
          {{$t("language.load")}}&nbsp{{$t("language.tip")}}
        </div>
        <div v-if="$store.getters.selectedWorktableStatus==4||$store.getters.selectedWorktableStatus==5">
          {{$t("language.load")}}&nbsp{{$t("language.sleeve")}}
        </div>
      </div>
      <div class="load-div">
        <div class="load">{{$t("language.load")}}</div>
        <div class="load unload">{{$t("language.unload")}}</div>
      </div>
      <div class="option-div">
        <div class="circle"></div>
        <div>{{$t("language.zero_calibration")}}</div>
      </div>
      <div class="load-div">
        <div class="load">{{$t("language.pre_calibration")}}</div>
        <div class="load unload">{{$t("language.release")}}</div>
      </div>
      <div class="load-div">
        <div class="load">{{$t("language.zero_calibration")}}</div>
      </div>
      <div class="option-div">
        <div class="circle"></div>
        <div>{{$t("language.compensation")}}</div>
      </div>
      <div class="load-div">
        <div class="load">{{$t("language.return_calibration")}}</div>
        <div class="load unload">{{$t("language.reset")}}</div>
      </div>
      <div class="option-div">
        <span v-if="$store.getters.selectedWorktableStatus==1 ||$store.getters.selectedWorktableStatus==2
          ||$store.getters.selectedWorktableStatus==3||$store.getters.selectedWorktableStatus==6
          ||$store.getters.selectedWorktableStatus==7||$store.getters.selectedWorktableStatus==8" class="position-div">
          {{$t("language.tip_position")}}</span>
        <span v-if="$store.getters.selectedWorktableStatus==4" class="position-div">
          {{$t("language.sleeve_position")}}</span>
        <span v-if="$store.getters.selectedWorktableStatus==5" class="position-div">
          {{$t("language.Magnetic_rod_postion")}}</span>
        <span>({{y}},{{z}})</span>
      </div>
      <div class="y-z" v-if="$store.getters.selectedWorktableStatus!=5">
        <div class="y">Y(mm) :</div>
        <div><input type="number" class="y-z-data" v-model="y_data"></div>
        <div class="y-img"><img src="../images/setting/Y_left.png" @click="dealY('add')"></div>
        <div class="y-img"><img src="../images/setting/Y_right.png" @click="dealY('sub')"></div>
      </div>
      <div class="y-z">
        <div class="y">Z(mm) :</div>
        <div><input type="number" class="y-z-data" v-model="z_data"></div>
        <div class="y-img" style="margin-left: 45px;"><img src="../images/setting/Z_down.png" @click="dealZ('add')">
        </div>
        <div class="y-img" style="margin-left: 40px;"><img src="../images/setting/Z_top.png" @click="dealZ('sub')">
        </div>
      </div>
    </div>
    <div class="tube-info-button">
      <div class="button-div save" @click="saveAll()">{{this.$t("language.save")}}</div>
      <div class="button-div factory">{{this.$t("language.factory")}}</div>
    </div>
  </div>
</template>

<script>
  import {
    saveInstruments
  } from '@/api/setting.js'
  import {
    moveYZ
  }from '@/api/setting.js'
  export default {
    data() {
      return {
        menu_lists: [{
          id: 1,
          description: this.$t("language.tips")
        }, {
          id: 2,
          description: this.$t("language.magnetic_sleeve")
        }, {
          id: 3,
          description: this.$t("language.cartridege_rack_tips")
        }, {
          id: 4,
          description: this.$t("language.cartridege_rack_sleeve")
        }, {
          id: 5,
          description: this.$t("language.cartridege_rack_rod")
        }, {
          id: 6,
          description: this.$t("language.reagent_tube_big")
        }, {
          id: 7,
          description: this.$t("language.elution_tube")
        }, {
          id: 8,
          description: this.$t("language.sample_tube")
        }, ],
        Tip_well: this.$t("language.well7"),
        tip_well_number: 7,
        sleeve_well: this.$t("language.well7"),
        sleeve_well_number: 7,
        rod_well: this.$t("language.well7"),
        rod_well_number: 7,
        well_status: false,
        y: null,
        z: null,
        y_data: '0.0',
        z_data: '0.0',
      }
    },
    mounted() {
      this.getFirstData()
    },
    methods: {
      closeSelect(event) {
        if (!this.$refs.wells.contains(event.target)) {
          this.well_status = false;
        }
      },
      changeMenu(id) {
        this.y_data = '0.0';
        this.z_data = '0.0';
        if (id == 1) {
          for (let i = 0; i < this.$store.getters.yzlists.length; i++) {
            if (this.$store.getters.yzlists[i].type == 'tips') {
              this.y = this.$store.getters.yzlists[i].y;
              this.z = this.$store.getters.yzlists[i].z;
            }
          }
        } else if (id == 2) {
          for (let i = 0; i < this.$store.getters.yzlists.length; i++) {
            if (this.$store.getters.yzlists[i].type == 'magnetic_sleeve') {
              this.y = this.$store.getters.yzlists[i].y;
              this.z = this.$store.getters.yzlists[i].z;
            }
          }
        } else if (id == 3) {
          for (let i = 0; i < this.$store.getters.yzlists.length; i++) {
            if (this.$store.getters.yzlists[i].type == 'cartridge_rack_tips' && this.$store.getters.yzlists[i]
              .labware == this.tip_well_number) {
              this.y = this.$store.getters.yzlists[i].y;
              this.z = this.$store.getters.yzlists[i].z;
            }
          }
        } else if (id == 4) {
          for (let i = 0; i < this.$store.getters.yzlists.length; i++) {
            if (this.$store.getters.yzlists[i].type == 'cartridge_rack_sleeve' && this.$store.getters.yzlists[i]
              .labware == this.sleeve_well_number) {
              this.y = this.$store.getters.yzlists[i].y;
              this.z = this.$store.getters.yzlists[i].z;
            }
          }
        } else if (id == 5) {
          for (let i = 0; i < this.$store.getters.yzlists.length; i++) {
            if (this.$store.getters.yzlists[i].type == 'cartridge_rack_rod' && this.$store.getters.yzlists[i]
              .labware == this.rod_well_number) {
              this.y = this.$store.getters.yzlists[i].y;
              this.z = this.$store.getters.yzlists[i].z;
            }
          }
        } else if (id == 6) {
          for (let i = 0; i < this.$store.getters.yzlists.length; i++) {
            if (this.$store.getters.yzlists[i].type == 'reagent_tube') {
              this.y = this.$store.getters.yzlists[i].y;
              this.z = this.$store.getters.yzlists[i].z;
            }
          }
        } else if (id == 7) {
          for (let i = 0; i < this.$store.getters.yzlists.length; i++) {
            if (this.$store.getters.yzlists[i].type == 'elution_tube') {
              this.y = this.$store.getters.yzlists[i].y;
              this.z = this.$store.getters.yzlists[i].z;
            }
          }
        } else if (id == 8) {
          for (let i = 0; i < this.$store.getters.yzlists.length; i++) {
            if (this.$store.getters.yzlists[i].type == 'sample_tube') {
              this.y = this.$store.getters.yzlists[i].y;
              this.z = this.$store.getters.yzlists[i].z;
            }
          }
        }
        if (id == 3||id == 4||id == 5) {
          document.addEventListener('click', this.closeSelect);
        } else {
          document.removeEventListener('click', this.closeSelect);
        }
        this.$store.commit('setSelectedWorktableStatus', id)
      },
      dropDownWell() {
        this.well_status = !this.well_status
      },
      getTipWell(type) {
        if (type == 5) {
          this.Tip_well = this.$t("language.well5")
        } else if (type == 7) {
          this.Tip_well = this.$t("language.well7")
        } else if (type == 8) {
          this.Tip_well = this.$t("language.well8")
        }
        this.tip_well_number = type;
        for (let i = 0; i < this.$store.getters.yzlists.length; i++) {
          if (this.$store.getters.yzlists[i].type == 'cartridge_rack_tips' && this.$store.getters.yzlists[i]
            .labware == this.tip_well_number) {
            this.y = this.$store.getters.yzlists[i].y;
            this.z = this.$store.getters.yzlists[i].z;
          }
        }
        this.well_status = false;
      },
      getSleeveWell(type) {
        if (type == 5) {
          this.sleeve_well = this.$t("language.well5")
        } else if (type == 7) {
          this.sleeve_well = this.$t("language.well7")
        } else if (type == 8) {
          this.sleeve_well = this.$t("language.well8")
        }
        this.sleeve_well_number = type;
        for (let i = 0; i < this.$store.getters.yzlists.length; i++) {
          if (this.$store.getters.yzlists[i].type == 'cartridge_rack_sleeve' && this.$store.getters.yzlists[i]
            .labware == this.sleeve_well_number) {
            this.y = this.$store.getters.yzlists[i].y;
            this.z = this.$store.getters.yzlists[i].z;
          }
        }
        this.well_status = false;
      },
      getRodWell(type) {
        if (type == 5) {
          this.rod_well = this.$t("language.well5")
        } else if (type == 7) {
          this.rod_well = this.$t("language.well7")
        } else if (type == 8) {
          this.rod_well = this.$t("language.well8")
        }
        for (let i = 0; i < this.$store.getters.yzlists.length; i++) {
          if (this.$store.getters.yzlists[i].type == 'cartridge_rack_rod' && this.$store.getters.yzlists[i]
            .labware == this.rod_well_number) {
            this.y = this.$store.getters.yzlists[i].y;
            this.z = this.$store.getters.yzlists[i].z;
          }
        }
        this.rod_well_number = type;
        this.well_status = false;
      },
      getFirstData() {
        this.$store.commit('setYzlists', this.$store.getters.setting.worktable_calibration)
        for (let i = 0; i < this.$store.getters.yzlists.length; i++) {
          if (this.$store.getters.yzlists[i].type == 'tips') {
            this.y = this.$store.getters.yzlists[i].y;
            this.z = this.$store.getters.yzlists[i].z;
          }
        }
      },
      dealZ(type) {
        var yz = JSON.parse(JSON.stringify(this.$store.getters.yzlists));
        if (this.$store.getters.selectedWorktableStatus == 1) {
          for (let i = 0; i < yz.length; i++) {
            if (yz[i].type == 'tips') {
              if (type == 'sub') {
                yz[i].z = yz[i].z - Number(this.z_data);
                this.z = yz[i].z
              } else if (type == 'add') {
                yz[i].z = yz[i].z + Number(this.z_data);
                this.z = yz[i].z
              }
              moveYZ({'axis_type':"z",'location':yz[i].z}).then((res)=>{
                  if (res.code == 0) {
                    this.$message({
                      type: 'success',
                      message: "移动成功"
                    })
                  }
              })
            }
          }
        } else if (this.$store.getters.selectedWorktableStatus == 2) {
          for (let i = 0; i < yz.length; i++) {
            if (yz[i].type == 'magnetic_sleeve') {
              if (type == 'sub') {
                yz[i].z = yz[i].z - Number(this.z_data);
                this.z = yz[i].z
              } else if (type == 'add') {
                yz[i].z = yz[i].z + Number(this.z_data);
                this.z = yz[i].z
              }
              moveYZ({'axis_type':"z",'location':yz[i].z}).then((res)=>{
                  if (res.code == 0) {
                    this.$message({
                      type: 'success',
                      message: "移动成功"
                    })
                  }
              })
            }
          }
        } else if (this.$store.getters.selectedWorktableStatus == 3) {
          for (let i = 0; i < yz.length; i++) {
            if (yz[i].type == 'cartridge_rack_tips' && yz[i]
              .labware == this.tip_well_number) {
              if (type == 'sub') {
                yz[i].z = yz[i].z - Number(this.z_data);
                this.z = yz[i].z
              } else if (type == 'add') {
                yz[i].z = yz[i].z + Number(this.z_data);
                this.z = yz[i].z
              }
              moveYZ({'axis_type':"z",'location':yz[i].z}).then((res)=>{
                  if (res.code == 0) {
                    this.$message({
                      type: 'success',
                      message: "移动成功"
                    })
                  }
              })
            }
          }
        } else if (this.$store.getters.selectedWorktableStatus == 4) {
          for (let i = 0; i < this.$store.getters.yzlists.length; i++) {
            if (yz[i].type == 'cartridge_rack_sleeve' && yz[i]
              .labware == this.sleeve_well_number) {
              if (type == 'sub') {
                yz[i].z = yz[i].z - Number(this.z_data);
                this.z = yz[i].z
              } else if (type == 'add') {
                yz[i].z = yz[i].z + Number(this.z_data);
                this.z = yz[i].z
              }
              moveYZ({'axis_type':"z",'location':yz[i].z}).then((res)=>{
                  if (res.code == 0) {
                    this.$message({
                      type: 'success',
                      message: "移动成功"
                    })
                  }
              })
            }
          }
        } else if (this.$store.getters.selectedWorktableStatus == 5) {
          for (let i = 0; i < this.$store.getters.yzlists.length; i++) {
            if (yz[i].type == 'cartridge_rack_rod' && yz[i]
              .labware == this.rod_well_number) {
              if (type == 'sub') {
                yz[i].z = yz[i].z - Number(this.z_data);
                this.z = yz[i].z
              } else if (type == 'add') {
                yz[i].z = yz[i].z + Number(this.z_data);
                this.z = yz[i].z
              }
              moveYZ({'axis_type':"z",'location':yz[i].z}).then((res)=>{
                  if (res.code == 0) {
                    this.$message({
                      type: 'success',
                      message: "移动成功"
                    })
                  }
              })
            }
          }
        } else if (this.$store.getters.selectedWorktableStatus == 6) {
          for (let i = 0; i < this.$store.getters.yzlists.length; i++) {
            if (yz[i].type == 'reagent_tube') {
              if (type == 'sub') {
                yz[i].z = yz[i].z - Number(this.z_data);
                this.z = yz[i].z
              } else if (type == 'add') {
                yz[i].z = yz[i].z + Number(this.z_data);
                this.z = yz[i].z
              }
              moveYZ({'axis_type':"z",'location':yz[i].z}).then((res)=>{
                  if (res.code == 0) {
                    this.$message({
                      type: 'success',
                      message: "移动成功"
                    })
                  }
              })
            }
          }
        } else if (this.$store.getters.selectedWorktableStatus == 7) {
          for (let i = 0; i < this.$store.getters.yzlists.length; i++) {
            if (yz[i].type == 'elution_tube') {
              if (type == 'sub') {
                yz[i].z = yz[i].z - Number(this.z_data);
                this.z = yz[i].z
              } else if (type == 'add') {
                yz[i].z = yz[i].z + Number(this.z_data);
                this.z = yz[i].z
              }
              moveYZ({'axis_type':"z",'location':yz[i].z}).then((res)=>{
                  if (res.code == 0) {
                    this.$message({
                      type: 'success',
                      message: "移动成功"
                    })
                  }
              })
            }
          }
        } else if (this.$store.getters.selectedWorktableStatus == 8) {
          for (let i = 0; i < this.$store.getters.yzlists.length; i++) {
            if (yz[i].type == 'sample_tube') {
              if (type == 'sub') {
                yz[i].z = yz[i].z - Number(this.z_data);
                this.z = yz[i].z
              } else if (type == 'add') {
                yz[i].z = yz[i].z + Number(this.z_data);
                this.z = yz[i].z
              }
              moveYZ({'axis_type':"z",'location':yz[i].z}).then((res)=>{
                  if (res.code == 0) {
                    this.$message({
                      type: 'success',
                      message: "移动成功"
                    })
                  }
              })
            }
          }
        }
        this.$store.commit('setYzlists', yz)
        var setting_temp = JSON.parse(JSON.stringify(this.$store.getters.setting))
        setting_temp.worktable_calibration = yz
        this.$store.commit('setSetting', setting_temp)
      },
      dealY(type) {
        var yz = JSON.parse(JSON.stringify(this.$store.getters.yzlists));
        if (this.$store.getters.selectedWorktableStatus == 1) {
          for (let i = 0; i < yz.length; i++) {
            if (yz[i].type == 'tips') {
              if (type == 'sub') {
                yz[i].y = yz[i].y - Number(this.y_data);
                this.y = yz[i].y
              } else if (type == 'add') {
                yz[i].y = yz[i].y + Number(this.y_data);
                this.y = yz[i].y
              }
              moveYZ({'axis_type':"y",'location':yz[i].y}).then((res)=>{
                  if (res.code == 0) {
                    this.$message({
                      type: 'success',
                      message: "移动成功"
                    })
                  }
              })
            }
          }
        } else if (this.$store.getters.selectedWorktableStatus == 2) {
          for (let i = 0; i < yz.length; i++) {
            if (yz[i].type == 'magnetic_sleeve') {
              if (type == 'sub') {
                yz[i].y = yz[i].y - Number(this.y_data);
                this.y = yz[i].y
              } else if (type == 'add') {
                yz[i].y = yz[i].y + Number(this.y_data);
                this.y = yz[i].y
              }
              moveYZ({'axis_type':"y",'location':yz[i].y}).then((res)=>{
                  if (res.code == 0) {
                    this.$message({
                      type: 'success',
                      message: "移动成功"
                    })
                  }
              })
            }
          }
        } else if (this.$store.getters.selectedWorktableStatus == 3) {
          for (let i = 0; i < yz.length; i++) {
            if (yz[i].type == 'cartridge_rack_tips' && yz[i]
              .labware == this.tip_well_number) {
              if (type == 'sub') {
                yz[i].y = yz[i].y - Number(this.y_data);
                this.y = yz[i].y
              } else if (type == 'add') {
                yz[i].y = yz[i].y + Number(this.y_data);
                this.y = yz[i].y
              }
              moveYZ({'axis_type':"y",'location':yz[i].y}).then((res)=>{
                  if (res.code == 0) {
                    this.$message({
                      type: 'success',
                      message: "移动成功"
                    })
                  }
              })
            }
          }
        } else if (this.$store.getters.selectedWorktableStatus == 4) {
          for (let i = 0; i < this.$store.getters.yzlists.length; i++) {
            if (yz[i].type == 'cartridge_rack_sleeve' && yz[i]
              .labware == this.sleeve_well_number) {
              if (type == 'sub') {
                yz[i].y = yz[i].y - Number(this.y_data);
                this.y = yz[i].y
              } else if (type == 'add') {
                yz[i].y = yz[i].y + Number(this.y_data);
                this.y = yz[i].y
              }
              moveYZ({'axis_type':"y",'location':yz[i].y}).then((res)=>{
                  if (res.code == 0) {
                    this.$message({
                      type: 'success',
                      message: "移动成功"
                    })
                  }
              })
            }
          }
        } else if (this.$store.getters.selectedWorktableStatus == 5) {
          for (let i = 0; i < this.$store.getters.yzlists.length; i++) {
            if (yz[i].type == 'cartridge_rack_rod' && yz[i]
              .labware == this.rod_well_number) {
              if (type == 'sub') {
                yz[i].y = yz[i].y - Number(this.y_data);
                this.y = yz[i].y
              } else if (type == 'add') {
                yz[i].y = yz[i].y + Number(this.y_data);
                this.y = yz[i].y
              }
              moveYZ({'axis_type':"y",'location':yz[i].y}).then((res)=>{
                  if (res.code == 0) {
                    this.$message({
                      type: 'success',
                      message: "移动成功"
                    })
                  }
              })
            }
          }
        } else if (this.$store.getters.selectedWorktableStatus == 6) {
          for (let i = 0; i < this.$store.getters.yzlists.length; i++) {
            if (yz[i].type == 'reagent_tube') {
              if (type == 'sub') {
                yz[i].y = yz[i].y - Number(this.y_data);
                this.y = yz[i].y
              } else if (type == 'add') {
                yz[i].y = yz[i].y + Number(this.y_data);
                this.y = yz[i].y
              }
              moveYZ({'axis_type':"y",'location':yz[i].y}).then((res)=>{
                  if (res.code == 0) {
                    this.$message({
                      type: 'success',
                      message: "移动成功"
                    })
                  }
              })
            }
          }
        } else if (this.$store.getters.selectedWorktableStatus == 7) {
          for (let i = 0; i < this.$store.getters.yzlists.length; i++) {
            if (yz[i].type == 'elution_tube') {
              if (type == 'sub') {
                yz[i].y = yz[i].y - Number(this.y_data);
                this.y = yz[i].y
              } else if (type == 'add') {
                yz[i].y = yz[i].y + Number(this.y_data);
                this.y = yz[i].y
              }
              moveYZ({'axis_type':"y",'location':yz[i].y}).then((res)=>{
                  if (res.code == 0) {
                    this.$message({
                      type: 'success',
                      message: "移动成功"
                    })
                  }
              })
            }
          }
        } else if (this.$store.getters.selectedWorktableStatus == 8) {
          for (let i = 0; i < this.$store.getters.yzlists.length; i++) {
            if (yz[i].type == 'sample_tube') {
              if (type == 'sub') {
                yz[i].y = yz[i].y - Number(this.y_data);
                this.y = yz[i].y
              } else if (type == 'add') {
                yz[i].y = yz[i].y + Number(this.y_data);
                this.y = yz[i].y
              }
              moveYZ({'axis_type':"y",'location':yz[i].y}).then((res)=>{
                  if (res.code == 0) {
                    this.$message({
                      type: 'success',
                      message: "移动成功"
                    })
                  }
              })
            }
          }
        }
        this.$store.commit('setYzlists', yz)
        var setting_temp = JSON.parse(JSON.stringify(this.$store.getters.setting))
        setting_temp.worktable_calibration = yz
        this.$store.commit('setSetting', setting_temp)
      },
      saveAll() {
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
            this.$store.commit('setSetting',res.data)
             this.$store.commit('setYzlists', res.data.worktable_calibration)
          }
        })
      }
    },
    destroyed() {
      document.removeEventListener('click', this.closeSelect);
    }
  }
</script>

<style scoped="scoped">
  .worktable-model {
    width: 1467px;
    height: 1048px;
    background-color: #ffffff;
    border-radius: 6px;
    border: solid 1px #c2cbda;
    margin-left: 30px;
    margin-top: 30px;
  }

  .worktable-menu {
    height: 74px;
    width: 100%;
    font-size: 24px;
    border-bottom: solid 1px #c2cbda;
  }

  .worktable-menu-option {
    float: left;
    width: fit-content;
    height: 100%;
    line-height: 74px;
    margin-left: 21px;
  }
  .worktable-menu-option-chinese{
    float: left;
    width: fit-content;
    height: 100%;
    line-height: 74px;
    margin-left: 72px;
  }

  .selected-worktable-menu {
    color: #5a89c7;
    border-bottom: 3px solid #5a89c7;
    box-sizing: border-box;

  }

  .worktable-img-div {
    float: left;
    width: 1060px;
    height: 864px;
    border-right: solid 1px #c2cbda;
    border-bottom: solid 1px #c2cbda;
  }

  .worktable-content {
    float: left;
    height: 864px;
    width: 406px;
    border-bottom: solid 1px #c2cbda;
  }

  .worktable-img {
    margin-top: 183px;
    margin-left: 33px;
  }

  .option-div {
    width: 100%;
    height: fit-content;
    margin-top: 25px;
    font-size: 22px;
    line-height: 18px;
    margin-bottom: 20px;
  }

  .circle {
    float: left;
    width: 18px;
    margin-left: 30px;
    height: 18px;
    border-radius: 9px;
    background-color: #5a89c7;
    margin-right: 14px;
  }

  .select-well {
    position: relative;
    width: 347px;
    height: 50px;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px #c2cbda;
    margin-left: 30px;
    line-height: 50px;
    text-align: center;
    text-align-last: center;
  }

  .select-well-option-div:first {
    border-top: none;
  }

  .select-well-option-div {
    position: absolute;
    border: solid 1px #c2cbda;
    border-bottom: none;
    margin-left: 30px;
    width: 347px;
  }

  .img-span {
    position: absolute;
    /* padding-left: 65px; */
    right: 22px;
  }

  .select-well-option {
    width: 100%;
    height: 50px;
    background-color: #ffffff;
    border-bottom: solid 1px #c2cbda;
    text-align: center;
    line-height: 50px;
    border-radius: 4px;
  }

  .select-well-option:hover {
    color: #5a89c7 !important;
  }

  .worktable-tube-div {
    width: 347px;
    height: 55px;
    text-align: center;
    background-color: #ebebeb;
    border-radius: 4px;
    border: solid 1px #c2cbda;
    margin-left: 30px;
    line-height: 55px;
  }

  .load-div {
    width: 100%;
    height: 53px;
    margin-bottom: 20px;
  }

  .load {
    width: 160px;
    height: 100%;
    float: left;
    text-align: center;
    line-height: 53px;
    font-size: 20px;
    border-radius: 4px;
    border: solid 1px #c2cbda;
    box-sizing: border-box;
    margin-left: 30px;
    background-color: #F9FBFF;

  }

  .unload {
    margin-left: 28px;
  }

  .position-div {
    display: inline-block;
    width: 222px;
    margin-left: 31px;
  }

  .y-z {
    height: 40px;
    width: 100%;
    margin-bottom: 14px;
    font-size: 20px;
    display: flex;
    align-items: center;
  }

  .y {
    margin-left: 31px;
    line-height: 40px;
    width: 81px;
    height: 100%;
    flex-shrink: 0;
  }

  .y-z-data {
    margin-left: 13px;
    width: 110px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px #c2cbda;
    lex-shrink: 0;
  }

  .y-img {
    height: 100%;
    lex-shrink: 0;
    margin-left: 35px;
    display: flex;
    align-items: center;
  }

  .button-div {
    float: right;
    width: 193px;
    height: 64px;
    border-radius: 6px;
    line-height: 64px;
    font-size: 24px;
    text-align: center;
    margin-top: 23px;
    margin-right: 28px;
  }

  .save {
    color: white;
    background-color: #5187C3;
  }

  .factory {
    border: solid 1px #4c7cb2;
    margin-right: 32px;
    background-color: white;
    box-sizing: border-box;
  }
</style>
