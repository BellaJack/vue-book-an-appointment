<template>
  <div class="archive">
    <header>
      <h2>{{typeName}}</h2>
    </header>
    <div class="something">
      <template v-if="typeID !== undefined && typeID !== ''">
        <template v-if="tagged.length">
          <Card v-for="boutique in tagged" :key="boutique.ID" :boutique="boutique"/>
        </template>
        <div v-else>No results found</div>
      </template>
      <template v-else>
        <Card v-for="boutique in boutiques" :key="boutique.ID" :boutique="boutique"/>
      </template>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Card from "../components/BoutiqueCard.vue";
export default {
  mounted() {
    window.scrollTo(0, 0);
  },
  computed: {
    ...mapGetters({
      boutiques: "bookable"
    }),
    typeID() {
      return this.$route.params.id;
    },
    typeName() {
      const name = this.$route.params.name;
      if (name !== "" && name !== undefined) {
        return "#" + name;
      } else {
        return "Archive";
      }
    },
    tagged() {
      const a = this.$store.getters.bookable,
        ID = this.$route.params.id,
        b = [];

      for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < a[i]["store-type"].length; j++) {
          if (a[i]["store-type"][j].term_id == ID) {
            b.push(a[i]);
          }
        }
      }
      return b;
    }
  },
  components: {
    Card
  }
};
</script>
