import { getProtocolDetail } from "@/api/run";
export default {
  namespaced: true,
  state: {
    protocalInfo: {},
    pathName: "",
    initPathName: "",
    selectedTubeList: [],
    sampleIdDataStore: [],
<<<<<<< HEAD
    start_step_id: '',
    run_step_ids: '',
    doorState: '',
    startRunTime: '', // loadLabware 点击Run时间
=======
    start_step_id: "",
    run_step_ids: "",
    doorState: "",
    showCountSampleidDialog: 0
>>>>>>> 91f7dd1835b78245eba537ed5352d67aa569d630
  },
  mutations: {
    updatedInfo(state, playload) {
      state.protocalInfo = playload[0];
      state.pathName = playload[1];
      state.initPathName = playload[1];
    },
    updatedInitPathName(state, playload) {
      state.initPathName = playload;
    },
    changeGoBackName(state, name) {
      state.pathName = name;
    },
    changeSelectedTubeList(state, playload) {
      state.selectedTubeList = playload;
    },
    updatedSampleIdInfo(state, playload) {
      state.sampleIdDataStore = playload;
    },
<<<<<<< HEAD
    updatedStepIds (state, playload) {
      state.start_step_id = playload[0]
      state.run_step_ids = playload[1]
=======
    updatedStepIds(state, playload) {
      state.start_step_id = playload[0];
      state.run_step_ids = playload[1];
      state.pathName = playload[2];
>>>>>>> 91f7dd1835b78245eba537ed5352d67aa569d630
    },
    updatedDoorState(state, playload) {
      state.doorState = playload;
    },
<<<<<<< HEAD
    updatedStartRunTime (state, playload) {
      state.startRunTime = playload
    },
    clearRecord (state, playload) {
      state.selectedTubeList = playload
      state.sampleIdDataStore = playload
    }
  },
  getters: {
=======
    updatedShowCountSampleidDialog(state) {
      state.showCountSampleidDialog += 1;
    },
    clearRecord(state, playload) {
      state.selectedTubeList = playload;
      state.sampleIdDataStore = playload;
      state.showCountSampleidDialog = 0;
    }
  },
  getters: {
    // sampleIdDataStore(state) {
    //   console.log(44, state.selectedTubeList);
    //   state.selectedTubeList.sort((a, b) => a - b);
    //   return state.selectedTubeList.map(item => ({
    //     position: item,
    //     sample_id: "",
    //     note: ""
    //   }));
    // }
>>>>>>> 91f7dd1835b78245eba537ed5352d67aa569d630
  },
  actions: {}
};
