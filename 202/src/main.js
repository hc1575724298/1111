import store from "./store";
import EventBus from 'eventing-bus';
import {
  Init
} from '@/message';

import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import VueI18n from 'vue-i18n';
import inputFilter from './utils/input';
Vue.directive('inputFilter', inputFilter);
//通过实例属性定义全局工具类
import pub from "./utils/function.js"
Vue.prototype.pub = pub;

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueI18n);
Vue.use(EventBus);
Vue.prototype.$store = store;
Vue.prototype.EventBus = EventBus;


Vue.prototype.simulateRun = process.env.NODE_ENV == 'development';
//接收来自c#的通知
Vue.prototype.OnNotify = async function(notifyString) {
  //notifyString是包含Code：代码 Message：信息 Data：数据 三个属性的json字符串
  console.log("main.js 接收到消息:" + notifyString);
  try {
    let notify = JSON.parse(notifyString);

    // if (notify.Code >= 0x1001 && notify.Code < 0x3001) {
    //     if (notify.Code == Notify.CODE_HARDWARE_USB_ERROR) { //急停按钮关闭 0x1003
    //         this.$message.error(this.$t('language.device_offline'));
    //     } else if (notify.Code == Notify.CODE_HARDWARE_X_OFFLINE) { //电源关闭 0x1002。开机如果不连usb也提示这个
    //         this.$message.error(this.$t('language.device_offline'));
    //     } else if (notify.Code == Notify.CODE_HARDWARE_FZB_STOP) { //USB拔出
    //         this.$message.error(this.$t('language.device_offline'));
    //     } else if (notify.Code == Notify.CODE_HARDWARE_FZB_NOTONLINE) { //USB拔出
    //         this.$message.error(this.$t('language.device_offline'));
    //     } else if (notify.Code == Notify.CODE_HARDWARE_ERROR_NOTIFY)//硬件错误通知，显示提示信息
    //     {
    //         let hardware = notify.Data.Hardware;//硬件名称
    //         let hardwareErrorCode = notify.Data.HardErrorCode;//硬件错误码
    //         let desc;
    //         if (localStorage.getItem("locale") == "zh-CN") {
    //           desc = notify.Data.descZh.split('|').join("<br/>");
    //         } else {
    //           desc = notify.Data.descEn.split('|').join("<br/>");
    //         }
    //         this.$message({
    //             dangerouslyUseHTMLString: true,
    //             message: hardware +"<br/>"+ desc,
    //             type: 'error'
    //         });
    //     } else {
    //         this.$message.error("Error: " + notify.Code + "," + notify.Message);
    //     }
    // } else {
    //     // this.$message({
    //     //     message: notifyString,
    //     //     type: 'success'
    //     // });
    // }

    // EventBus.publish(notify.Code, notify);

    // if ([
    //         Notify.CODE_HARDWARE_USB_ERROR,
    //         Notify.CODE_HARDWARE_FZB_STOP,
    //         Notify.CODE_HARDWARE_FZB_NOTONLINE,
    //         Notify.CODE_HARDWARE_X_OFFLINE
    //     ].indexOf(notify.Code) > -1) {
    //     // console.log('do unconnected');
    //     this.$store.commit('unconnected');
    // }

    // if (notify.Code == Notify.CODE_AUCOOLER_TEMPERATURE) { //制冷模块1,对应p8,温度数据
    //     this.$store.commit("setTemperatureP8", parseFloat(notify.Data).toFixed(1));
    // }
    // if (notify.Code == Notify.CODE_AUCOOLER2_TEMPERATURE) { //制冷模块2,对应p3,温度数据
    //     this.$store.commit("setTemperatureP3", parseFloat(notify.Data).toFixed(1));
    // }

    // if (notify.Code == Notify.CODE_AUCOOLER_P8_OPEN) { //P8板位温度打开
    //     this.$store.commit("startAucoolerP8", parseFloat(notify.Data).toFixed(1));
    // }

    // if (notify.Code == Notify.CODE_AUCOOLER_P8_CLOSE) { //P8板位温度关闭
    //     this.$store.commit("stopAucoolerP8");
    // }

    // if (notify.Code == Notify.CODE_HARDWARE_BOOT_COMPLETE) {
    //     this.$store.commit('connected');
    //     //仪器连接成功；
    //     //1:如果原来制冷模块的状态是打开，则打开制冷
    //     if (this.$store.getters.aucoolerP3On) {
    //         let params = new URLSearchParams();
    //         params.append("temperature", this.$store.getters.target_temperature_p3);
    //         params.append("plate", "p3");
    //         startCooler(params).then(res => {});
    //     }
    //     if (this.$store.getters.aucoolerP8On) {
    //         let params = new URLSearchParams();
    //         params.append("temperature", this.$store.getters.target_temperature_p8);
    //         params.append("plate", "p8");
    //         startCooler(params).then(res => {});
    //     }
    //     //关闭照明灯
    //     store.commit("setLightOn", false);
    // }

    console.log("main.js 发送事件 Code: 0x" + notify.Code.toString(16));
  } catch (e) {
    console.log(e)
  }
}

import locale from 'element-ui/lib/locale';
import messages from './i18n';

const i18n = new VueI18n({
  locale: 'en-US', // 语言标识
  messages,
  fallbackLocale: 'en-US', //没有英文的时候默认中文语言
  silentFallbackWarn: true, //抑制警告
})
locale.i18n((key, value) => i18n.t(key, value))

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App),
  mounted() {
    window.vue = this;
    // Init(this);
  }
})
