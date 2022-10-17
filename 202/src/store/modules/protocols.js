import { getProtocolDetail } from '@/api/run'
export default {
  namespaced: true,
  state: {
    protocalInfo: {},
    pathName: '',
    initPathName: '',
    selectedTubeList: [],
    sampleIdDataStore: [],
    start_step_id: '',
    run_step_ids: '',
    doorState: '',
    showCountSampleidDialog: 0
  },
  mutations: {
    updatedInfo (state, playload) {
      state.protocalInfo = playload[0];
      state.pathName = playload[1];
      state.initPathName = playload[1]
    },
    updatedInitPathName (state, playload) {
      state.initPathName = playload
    },
    changeGoBackName (state, name) {
      state.pathName = name
    },
    changeSelectedTubeList (state, playload) {
      state.selectedTubeList = playload
    },
    updatedSampleIdInfo (state, playload) {
      state.sampleIdDataStore = playload
    },
    updatedStepIds (state, playload) {
      state.start_step_id = playload[0]
      state.run_step_ids = playload[1]
      state.pathName = playload[2]
    },
    updatedDoorState (state, playload) {
      state.doorState = playload
    },
    updatedShowCountSampleidDialog (state) {
      state.showCountSampleidDialog += 1
    },
    clearRecord (state, playload) {
      state.selectedTubeList = playload
      state.sampleIdDataStore = playload
      state.showCountSampleidDialog = 0
    }
  },
  getters: {
    sampleIdInfo (state) {
      state.selectedTubeList.sort((a, b) => a - b)
      return state.selectedTubeList.map(item => item = {
        position: item,
        sample_id: '',
        note: ''
      })
    }
  },
  actions: {

  }
}
