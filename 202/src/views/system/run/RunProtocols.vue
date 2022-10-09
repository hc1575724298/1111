<template>
  <div>
  <UserHead :page_name="pageName" :path_router="pathName"/>
  <router-view/>
  </div>
</template>

<script>
import UserHead from '@/components/UserHead.vue'
import { getProtocolDetail } from '@/api/run.js'
import { mapState as mapProtocolsState } from 'vuex'
export default {
  components:{
    UserHead,
  },
  data () {
    return {

    }
  },
  computed:{
    ...mapProtocolsState('protocols',['protocolsId','pathName','pageName','initPathName'])
  },
  created () {
   console.log(this.protocolsId);
   console.log(this.pathName);
  },

  methods: {

  },
  watch:{
    $route(to) {
      if(to.path==='/system/run/protocols/sampleSettings') {
        this.$store.commit('protocols/changeGoBackName',this.initPathName)
      }else if(to.path==='/system/run/protocols/loadlabware') {
        this.$store.commit('protocols/changeGoBackName', 'sampleSettings')
      }
    }
  }
}
</script>

<style scoped>

</style>
