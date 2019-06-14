<template>
  <div id="app">
    <header>
      <h1>Vue(k) an appointment</h1></header>
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
<style lang="scss">
  @import "./styles/critical.scss";
</style>
