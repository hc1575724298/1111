import Vue from "vue";
import Vuex from "vuex";
import persistedState from 'vuex-persistedstate';
import protocols from './modules/protocols'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    token: '', //当前用户token
    user: {}, //当前登录用户
    menuIndex: 1,
    systemMenu: 1,
    systemHeadMenu: 1,
    settingOption:null,
    settingSystemSiderbar:1,
    languageCode:0,
    systemTime:null,
    settingTools:1,
    maintenanceSiderbar:1,
    instrumentsiderbar:1
  },
  getters: {
    token: state => state.token,
    user: state => state.user,
    menuIndex: state => state.menuIndex,
    systemMenu: state => state.systemMenu,
    systemHeadMenu: state => state.systemHeadMenu,
    settingOption:  state => state.settingOption,
    settingSystemSiderbar: state => state.settingSystemSiderbar,
    languageCode: state => state.languageCode,
    systemTime: state => state.systemTime,
    settingTools: state => state.settingTools,
    maintenanceSiderbar: state => state.maintenanceSiderbar,
    instrumentsiderbar: state => state.instrumentsiderbar,
  },
  actions: {},
  mutations: {
    setUser(state, data) {
      state.user = data;
      state.token = data.Token;
    },
    setMenuIndex(state, menu_index) {
      state.menuIndex = menu_index;
    },
    setSystemMenu(state, system_Menu) {
      state.systemMenu = system_Menu;
    },
    setSystemHeadMenu(state, system_Head_Menu) {
      state.systemHeadMenu = system_Head_Menu;
    },
    setSettingOption(state, setting_option) {
      state.settingOption = setting_option;
    },
    setSettingSystemSiderbar(state, setting_system_siderbar) {
      state.settingSystemSiderbar = setting_system_siderbar;
    },
    setSystemTime(state, system_time) {
      state.systemTime = system_time;
    },
    setLanguageCode(state, setting_language_code) {
      state.languageCode = setting_language_code;
    },
    setSettingTools(state, setting_tools) {
      state.settingTools =  setting_tools;
    },
    setMaintenanceSiderbar(state, maintenance_siderbar) {
      state.maintenanceSiderbar =  maintenance_siderbar;
    },
    setInstrumentSiderbar(state, instrument_siderbar) {
      state.instrumentsiderbar =  instrument_siderbar;
    }
  },
  modules: {
    protocols
  },
  plugins: [persistedState()],
})

export default store
