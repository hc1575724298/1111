<template>
  <div>
  <UserHead :page_name="protocalInfo.name" :path_router="pathName"/>
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
    ...mapProtocolsState('protocols',['protocalInfo','pathName','initPathName'])
  },
  created () {
   console.log(this.protocalInfo.id);
   console.log(this.pathName);
  },

  methods: {

  },
}
</script>

<style scoped>

</style>
