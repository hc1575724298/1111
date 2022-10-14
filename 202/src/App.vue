<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapState as mapProtocolsState } from 'vuex'
import { getDoorState } from '@/api/run'
  export default {
    name: 'App',
    computed:{
      ...mapProtocolsState('protocols',['protocalInfo','pathName','initPathName'])
    },
    watch:{
    $route(to) {
      console.log(to.path);
      if(to.path==='/system/run/protocols/sampleSettings') {
        this.$store.commit('protocols/changeGoBackName',this.initPathName)
      }else if(to.path==='/system/run/protocols/loadlabware') {
        this.$store.commit('protocols/changeGoBackName', 'sampleSettings')
      }else if(to.path==='/system/run'||to.path==='/system/list') {
        this.getDoorState()
        this.$store.commit('protocols/clearRecord', [])
    //     this.$store.commit('protocols/clearRecord', [[],[{
    //   position: 1,
    //   sample_id: '',
    //   note: '',
    // }, {
    //   position: 2,
    //   sample_id: '',
    //   note: '',
    // }, {
    //   position: 3,
    //   sample_id: '',
    //   note: '',
    // }, {
    //   position: 4,
    //   sample_id: '',
    //   note: '',
    // }, {
    //   position: 5,
    //   sample_id: '',
    //   note: '',
    // }, {
    //   position: 6,
    //   sample_id: '',
    //   note: '',
    // },
    // {
    //   position: 7,
    //   sample_id: '',
    //   note: '',
    // }, {
    //   position: 8,
    //   sample_id: '',
    //   note: '',
    // }, {
    //   position: 9,
    //   sample_id: '',
    //   note: '',
    // }, {
    //   position: 10,
    //   sample_id: '',
    //   note: '',
    // }, {
    //   position: 11,
    //   sample_id: '',
    //   note: '',
    // }, {
    //   position: 12,
    //   sample_id: '',
    //   note: '',
    // }, {
    //   position: 13,
    //   sample_id: '',
    //   note: '',
    // }, {
    //   position: 14,
    //   sample_id: '',
    //   note: '',
    // }, {
    //   position: 15,
    //   sample_id: '',
    //   note: '',
    // }, {
    //   position: 16,
    //   sample_id: '',
    //   note: '',
    // }, {
    //   position: 17,
    //   sample_id: '',
    //   note: '',
    // }, {
    //   position: 18,
    //   sample_id: '',
    //   note: '',
    // }, {
    //   position: 19,
    //   sample_id: '',
    //   note: '',
    // }, {
    //   position: 20,
    //   sample_id: '',
    //   note: '',
    // }, {
    //   position: 21,
    //   sample_id: '',
    //   note: '',
    // }, {
    //   position: 22,
    //   sample_id: '',
    //   note: '',
    // }, {
    //   position: 23,
    //   sample_id: '',
    //   note: '',
    // }, {
    //   position: 24,
    //   sample_id: '',
    //   note: '',
    // }]])
      }
    }
  },
  methods: {
    async getDoorState() {
       const {data} = await getDoorState()
        this.$store.commit('protocols/updatedDoorState',data)
    }
   }
  }
</script>

<style>
@import "./style/base.css";
  #app {
    font-family: 'ArialMT','Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  * {
    padding: 0;
    margin: 0;
    user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -webkit-touch-callout: none;
    -khtml-user-select: none;

  }

</style>
