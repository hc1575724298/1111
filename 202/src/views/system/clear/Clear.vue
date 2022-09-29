<template>
  <div>
    <div class="clear-info">
      <div class="clear-info-title">
        <div class="clear-info-title-icon"></div>
        <div class="clear-info-title-text">{{$t("language.clear_title")}}</div>
      </div>
      <div class="clear-time">
        <div class="clear-time-text">{{$t("language.clear_time_text")}}</div>
        <div class="clear-hours"><input type="number" class="clear-hours-input" v-model="interval_set.hours"
            @blur="inputOnBlur($event,'hour')" oninput="if(value>23)value=23"  /></div>
        <div class="clear-icon">:</div>
        <div class="clear-minutes"><input type="number" class="clear-minutes-input" oninput="if(value>59)value=59"
            v-model="interval_set.minutes" @blur="inputOnBlur($event,'minute')" /></div>
      </div>
    </div>
    <div class="clear-tube">
      <div class="clear-tube-serial">
        <div v-for="(item,index) in tube_lists" :key="index"
          :class="{'tube-serial-first':item.id==1,'tube-serial-seventh':item.id==7
        ,'tube-serial-A':item.id==8,'tube-serial-B':item.id==9,'tube-serial-C':item.id==10,'tube-serial-D':item.id==11}">
          {{item.serial}}
        </div>
      </div>
      <div v-for="(item,index) in tube_icons" :key="index" class="one-tube"
        :class="{'one-tube-first':item.id==1,'one-tube-other':item.id==9||item.id==17}">
        <div class="tube-square"></div>
        <div class="tube-first-circle"></div>
        <div class="tube-second-circle"></div>
        <div class="tube-third-circle"></div>
        <div class="tube-fourth-circle"></div>
      </div>
    </div>
    <Interval v-if="interval_status" @intervalEnd="intervalEnd()" :interval="interval_set"></Interval>
    <IntervalStart v-if="interval_start_status" @startInterval="startInterval()"></IntervalStart>
  </div>
</template>

<script>
  import Interval from "@/components/Interval"
  import IntervalStart from "@/components/IntervalStart"
  export default {
    components: {
      Interval,
      IntervalStart
    },
    data() {
      return {
        interval_status: false,
        interval_start_status: true,
        interval_set: {
          hours: '00',
          minutes: '15'
        },
        tube_lists: [{
          id: 1,
          serial: 1
        }, {
          id: 2,
          serial: 2
        }, {
          id: 3,
          serial: 3
        }, {
          id: 4,
          serial: 4
        }, {
          id: 5,
          serial: 5
        }, {
          id: 6,
          serial: 6
        }, {
          id: 7,
          serial: 7
        }, {
          id: 8,
          serial: "A"
        }, {
          id: 9,
          serial: "B"
        }, {
          id: 10,
          serial: "C"
        }, {
          id: 11,
          serial: "D"
        }, {
          id: 12,
          serial: "E"
        }],
        tube_icons: [{
          id: 1
        }, {
          id: 2
        }, {
          id: 3
        }, {
          id: 4
        }, {
          id: 5
        }, {
          id: 6
        }, {
          id: 7
        }, {
          id: 8
        }, {
          id: 9
        }, {
          id: 10
        }, {
          id: 11
        }, {
          id: 12
        }, {
          id: 13
        }, {
          id: 14
        }, {
          id: 15
        }, {
          id: 16
        }, {
          id: 17
        }, {
          id: 18
        }, {
          id: 19
        }, {
          id: 20
        }, {
          id: 21
        }, {
          id: 22
        }, {
          id: 23
        }, {
          id: 24
        }]
      }
    },
    mounted() {

    },
    methods: {
      startInterval() {
        this.interval_start_status = false;
        this.interval_status = true;
      },
      intervalEnd() {
        this.interval_status = false;
        this.interval_start_status = true;
      },
      inputOnBlur(event, type) {
        let objRegExp1 = /^[0-9]\d*$/;
        let value = event.target.value;
        if (type == "hour") {
          // if (value == '') {
          //   this.interval_set.hours = '00';
          // }
          if (!objRegExp1.test(this.interval_set.hours)) {
            return this.interval_set.hours = '00';
          }
          if (this.interval_set.hours == ''||this.interval_set.hours == 0) {
            return this.interval_set.hours = '00';
          }
          if (this.interval_set.hours < 10 && this.interval_set.hours > 0) {
            this.interval_set.hours = '0' + this.interval_set.hours;
          } else if (this.interval_set.hours >= 10 && this.interval_set.hours <= 23) {
            this.interval_set.hours = Number(this.interval_set.hours);
          } 
        }
        if (type == "minute") {
          // if (value == '') {
          //   this.interval_set.minutes = '15';
          // }
          if (!objRegExp1.test(this.interval_set.minutes)) {
            return this.interval_set.minutes = '15';
          }
          if (this.interval_set.minutes == ''||this.interval_set.minutes == 0) {
            return this.interval_set.minutes = '15';
          }
          if (this.interval_set.minutes < 10 && this.interval_set.minutes > 0) {
            this.interval_set.minutes = '0' + this.interval_set.minutes;
          } else if (this.interval_set.minutes >= 10 && this.interval_set.minutes <= 59) {
            this.interval_set.minutes = Number(this.interval_set.minutes);
          }
        }
      },
    },

  }
</script>

<style scoped="scoped">
  .clear-info {
    width: 1682px;
    margin-top: 25px;
    margin-left: 34px;
    height: 59px;
  }

  .clear-info-title {
    float: left;
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 28px;
    color: black;
  }

  .clear-info-title-icon {
    width: 5px;
    height: 28px;
    background-color: #4C7CB2;
  }

  .clear-info-title-text {
    margin-left: 20px;
  }

  .clear-time {
    display: flex;
    float: right;
    height: 100%;
    font-size: 22px;
    align-items: center;
    text-align: center;
  }

  .clear-time-text {
    line-height: 59px;
  }

  .clear-hours,
  .clear-minutes {
    width: 79px;
    height: 59px;
    font-size: 25px;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px #c2cbda;
  }

  .clear-icon {
    font-size: 23px;
    width: 23px;
    height: 31px;
    font-weight: 600;
  }

  .clear-hours-input,
  .clear-minutes-input {
    height: 100%;
    width: 100%;
    padding: 0;
    border: none;
    text-align: center;
  }

  .clear-tube {
    width: 1569px;
    height: 882px;
    display: flex;
    border-radius: 4px;
    border: dashed 1px #688197;
    margin-top: 68px;
    margin-left: 90px;
  }

  .clear-tube-serial {
    width: 73px;
    height: 100%;
    font-size: 26px;
    text-align: center;
    border-right: 1px solid #9298a2;
  }

  .tube-serial-first {
    height: fit-content;
    width: 100%;
    margin-top: 147px;
    margin-bottom: 85px;
    font-size: 26px;
  }

  .tube-serial-seventh {
    margin-top: 22px;
    margin-bottom: 65px;
  }

  .tube-serial-A {
    margin-bottom: 39px;
  }

  .tube-serial-B {
    margin-bottom: 43px;
  }

  .tube-serial-C {
    margin-bottom: 48px;
  }

  .tube-serial-D {
    margin-bottom: 16px;
  }

  .one-tube {
    width: 42px;
    height: 100%;
    margin-left: 14px;
  }

  .one-tube-first {
    margin-left: 50px;
  }

  .one-tube-other {
    margin-left: 53px;
  }

  .tube-square {
    width: 100%;
    height: 449px;
    border-radius: 2px;
    border: solid 1px #688197;
    box-sizing: border-box;
    margin-top: 46px;
    margin-bottom: 36px;
  }

  .tube-first-circle {
    width: 34px;
    height: 34px;
    margin-left: 4px;
    border-radius: 17px;
    border: solid 1px #688197;
    margin-bottom: 36px;
  }
  .tube-second-circle {
    width: 34px;
    height: 34px;
    margin-left: 4px;
    border-radius: 17px;
    border: solid 1px #688197;
    margin-bottom: 36px;
  }
  .tube-third-circle {
    width: 100%;
    height: 42px;
    border-radius: 21px;
    border: solid 1px #688197;
    margin-bottom: 36px;
  }
  .tube-fourth-circle {
    width: 100%;
    height: 88px;
    border-radius: 18px;
    border: solid 1px #688197;
  }

</style>
