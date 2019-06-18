<template>
  <div>
    <header>
      <h2>Archive</h2>
    </header>
    <div class="something">
      <Card v-for="boutique in boutiques" :key="boutique.ID" :boutique="boutique" />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Card from "../components/BoutiqueCard.vue";
export default {
  computed: {
    ...mapGetters({
      boutiques: 'bookable'
    })
  },
  components: {
    Card
  }
}
</script>
