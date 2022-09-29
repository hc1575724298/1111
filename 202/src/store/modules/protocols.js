import { getProtocolDetail } from '@/api/run'
export default {
  namespaced: true,
  state: {
    protocolsId: '',
    pathName: '',
    pageName: ''
  },
  mutations: {
    changeprotocolsId (state, playload) {
      state.protocolsId = playload[0];
      state.pathName = playload[1];
      state.pageName = playload[2]
    }
  },
  actions: {

  }
}
