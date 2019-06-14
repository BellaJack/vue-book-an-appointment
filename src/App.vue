<template>
  <div id="app">
    <div class="main">
      <header class="main__header">
        <h1>Vue(k) an appointment</h1>
      </header>
      <SelectBoutique/>
      <div class="boutiqueWrap">
        <!--div class="boutique__img">
          <img
            src="/img/768.jpg"
            srcset="/img/320.jpg 320w,
              /img/375.jpg 375w,
              /img/640.jpg 640w,
              /img/720.jpg 720w,
              /img/768.jpg 768w,
              /img/1024.jpg 1024w,
              /img/1280.jpg 1280w,
              /img/1920.jpg 1920w"
            alt="Boutique interior" />
        </div-->
        <transition name="slide" mode="out-in">
          <Boutique/>
        </transition>
        <transition name="slide" mode="out-in">
          <Form/>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import SelectBoutique from "./components/SelectBoutique.vue";
import Boutique from "./components/Boutique";
import Form from "./components/Form";

export default {
  name: "app",
  components: {
    SelectBoutique,
    Boutique,
    Form
  }
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
