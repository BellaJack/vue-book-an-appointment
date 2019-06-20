<template>
  <div class="archive">
    <header>
      <h2>{{typeName}}</h2>
    </header>
    <div class="something">
      <template v-if="typeID !== undefined && typeID !== ''">
        <template v-if="tagged.length">
          <Card v-for="boutique in tagged" :key="boutique.ID" :boutique="boutique" />
        </template>
        <div v-else>
          No results found
        </div>
      </template>
      <template v-else>
        <Card v-for="boutique in boutiques" :key="boutique.ID" :boutique="boutique" />
      </template>
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
    }),
    typeID(){
      return this.$route.params.id
    },
    typeName() {
      const name = this.$route.params.name;
      if(name !== '' && name !== undefined) {
        return '#' + name;
      }else{
        return 'Archive';
      }
    },
    tagged() {
      const a = this.$store.getters.bookable,
        ID = this.$route.params.id;

      return a.filter(el => {
        for(let i = 0; i < el["store-type"].length; i++) {
          return el["store-type"][i].term_id == ID;
        }
      });
    }
  },
  components: {
    Card
  }
}
</script>
