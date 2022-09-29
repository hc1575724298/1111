<template>
  <div style="background-color: #F3F4F6;">
  <UserHead :page_name="pageName" :path_route="'run'"/>
  <RexItem/>
  <img src="@/images/run/52运行进度2.png" alt="">
  </div>
</template>

<script>
import UserHead from '@/components/UserHead.vue'
import RexItem from '@/components/RexItem.vue'
import { getProtocolDetail } from '@/api/run.js'
import { mapState as mapProtocolsState } from 'vuex'
export default {
  components:{
    UserHead,
    RexItem
  },
  data () {
    return {

    }
  },
  computed:{
    ...mapProtocolsState('protocols',['protocolsId','pathName','pageName'])
  },
  created () {
   console.log(this.protocolsId);
   console.log(this.pathName);
  },

  methods: {

  }
}
</script>

<style scoped>

</style>
