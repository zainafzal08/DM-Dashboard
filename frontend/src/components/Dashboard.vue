<template>
  <div class="main-container">
    <div class="left-panel">
        <div class="card-border" style="width: 100%;height:100%;"></div>
    </div>
    <div class="right-panel">
      <div class="focus">
        
      </div>
      <div class="sub-focus">
        <Terminal></Terminal>
      </div>
    </div>
  </div>
</template>

<script>
import Terminal from './Terminal.vue'

export default {
  name: 'Dashboard',
  data () {
    return {}
  },
  components: {
    Terminal
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-container {
  height: calc(100vh);
  width: calc(100vw);
  padding: 1%;
  display: flex;
  flex-direction: row;
}
.left-panel {
  width: 35%;
  padding-right: 0.5%;
  height: 100%;
}
.right-panel {
  width: 65%;
  padding-left: 0.5%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.focus {
  width: 100%;
  height: 60%;
  padding-bottom: 0.5%;
}
.sub-focus {
  width: 100%;
  height: 40%;
  padding-top: 0.5%;
}
</style>
