<template>
  <div id="app">
    <SelectBoutique/>
    <Boutique/>
  </div>
</template>

<script>
import SelectBoutique from './components/SelectBoutique.vue'
import Boutique from './components/Boutique'

export default {
  name: 'app',
  components: {
    SelectBoutique,
    Boutique
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
