<template>
  <div id="app">
    <div class="main">
      <header class="main__header">
        <h1>Vue(k) an appointment</h1>
      </header>
      <router-view></router-view>
      <footer class="main__footer">
        <router-link activeClass="active" to="/">
          Select a Boutique
        </router-link>
        <router-link activeClass="active" to="/archive">
          Archive
        </router-link>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>
<style lang="scss">
  @import "./styles/critical.scss";
  .slide{
  &-enter-active {
    animation: slide-in 500ms ease-out forwards;
  }
  &-leave-active {
    animation: slide-out 500ms ease-out forwards;
  }
  }

  @keyframes slide-in {
    from {
      transform: translateY(30px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  @keyframes slide-out {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(30px);
      opacity: 0;
    }
  }
</style>
