<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapState as mapProtocolsState } from "vuex";
import { getDoorState } from "@/api/run";
export default {
  name: "App",
  computed: {
    ...mapProtocolsState("protocols", [
      "protocalInfo",
      "pathName",
      "initPathName"
    ])
  },
  watch: {
    $route(to, from) {
      if (to.path === "/system/run" || to.path === "/system/list") {
        this.getDoorState();
        this.$store.commit("protocols/clearRecord", []);
      } else if (to.path === "/system/run/protocols/viewrunstep") {
        this.$store.commit("protocols/clearRecord", []);
        this.$store.commit("protocols/updatedInitPathName", this.pathName);
      }
    }
  },
  methods: {
    async getDoorState() {
      const { data } = await getDoorState();
      this.$store.commit("protocols/updatedDoorState", data);
    }
  }
};
</script>

<style>
@import "./style/base.css";
#app {
  font-family: "ArialMT", "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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

*::-webkit-scrollbar {
  width: 12px;
}

*::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #e8eef3 !important;
  border: 1px solid #dcdcdc;
}

*::-webkit-scrollbar-track {
  background: #ffffff;
}

.el-table__header thead > tr {
  background-color: #4c7cb2;
}

.el-table__header thead > tr .gutter {
  background-color: transparent;
  border-bottom: 1px solid #ebeef5;
  border-bottom-width: 1px !important;
}
</style>
