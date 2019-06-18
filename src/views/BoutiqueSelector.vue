<template>
  <div>
    <SelectBoutique/>
    <div class="boutiqueWrap">
      <transition name="slide" mode="out-in">
        <Boutique/>
      </transition>
      <transition name="slide" mode="out-in">
        <Form/>
      </transition>
    </div>
  </div>
</template>
<script>
import SelectBoutique from "../components/SelectBoutique.vue";
import Boutique from "../components/Boutique";
import Form from "../components/Form";

export default {
  components: {
    SelectBoutique,
    Boutique,
    Form
  }
};
</script>
