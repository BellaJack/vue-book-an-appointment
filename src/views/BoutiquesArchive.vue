<template>
  <div class="archive">
    <header>
      <h2>{{typeName}}</h2>
    </header>
    <div class="something">
      <select id="cityDropdown" @change="filterBoutique($event)">
        <option value="0">Filter by city</option>
        <template v-for="(city, index) in cityBookable">
          <option :key="index" :value="city['wpcf-city']">{{city["wpcf-city"]}}</option>
        </template>
      </select>
      <template v-if="typeID !== undefined && typeID !== ''">
        <template v-if="tagged.length">
          <Card v-for="boutique in tagged" :key="boutique.ID" :boutique="boutique" />
        </template>
        <div v-else>No results found</div>
      </template>
      <template v-else>
        <Card v-for="boutique in boutiques" :key="boutique.ID" :boutique="boutique" />
      </template>
    </div>
  </div>
</template>
<script>
import Card from "../components/BoutiqueCard.vue";
export default {
  data() {
    return {
      cityName: 0
    };
  },
  mounted() {
    window.scrollTo(0, 0);
    if (this.$store.getters.bookable == 0) {
      this.$router.push("/");
    }
  },
  computed: {
    cityBookable() {
      const cities = this.$store.getters.cityBookable;
      if (cities !== null && cities.length) {
        return cities;
      }
      return false;
    },
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
    boutiques() {
      const a = this.$store.getters.bookable;
      let b = [];
      for (let i = 0; i < a.length; i++) {
        if (this.cityName != 0) {
          b = a.filter(this.inCity);
        } else {
          b = a;
        }
      }
      return b;
    },
    tagged() {
      return this.$store.getters.bookable.filter(this.inStoreType);
    }
  },
  methods: {
    filterBoutique(e) {
      this.cityName = e.target.value;
    },
    inCity(el) {
      return el["wpcf-city"] == this.cityName;
    },
    inStoreType(el) {
      if (this.cityName != 0) {
        for (let j = 0; j < el["store-type"].length; j++) {
          return (
            el["store-type"][j].term_id == this.$route.params.id &&
            el["wpcf-city"] == this.cityName
          );
        }
      } else {
        for (let j = 0; j < el["store-type"].length; j++) {
          return el["store-type"][j].term_id == this.$route.params.id;
        }
      }
    }
  },
  components: {
    Card
  }
};
</script>
