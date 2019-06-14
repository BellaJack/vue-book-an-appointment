<template>
  <div>
    <div v-if="loading">
      <select @change="updateBoutique($event, 'country')" class="countryDropdown">
        <option value="0">Select your country</option>
        <option
          v-for="(country, index) in countryBookable"
          :key="index"
          :value="country.location.country.term_id"
        >{{country.location.country.name}}</option>
      </select>
      <select
        @change="updateBoutique($event, 'city')"
        class="cityDropdown"
        :disabled="boutiqueSelected.countryID == 0">
        <option value="0">Select your city</option>
        <template v-for="(city, index) in cityBookable">
          <option
            v-if="boutiqueSelected.countryID == city.location.country.term_id"
            :key="index"
            :value="city['wpcf-city']"
          >{{city["wpcf-city"]}}</option>
        </template>
      </select>
      <select
        @change="updateBoutique($event, 'boutique')"
        class="boutiqueDropdown"
        :disabled="boutiqueSelected.countryID == 0 || boutiqueSelected.cityID == 0">
        <option value="0">Select a boutique</option>
        <template v-for="boutique in boutiquesBookable">
          <option
            v-if="boutiqueSelected.cityID == boutique['wpcf-city'] && boutiqueSelected.countryID == boutique.location.country.term_id"
            :key="boutique.ID"
            :value="boutique.ID"
          >{{boutique.post_title}}</option>
        </template>
      </select>
      <hr />
      Boutique selected: {{boutiqueSelected.boutiqueID}}
    </div>
    <div v-if="errored">
      Whoops there is some errors...
      <hr />
      {{ errorLabel }}
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "SelectBoutique",
  data() {
    return {
      loading: false,
      errored: false,
      errorLabel: "",
      boutiqueSelected: {
        countryID: 0,
        cityID: 0,
        boutiqueID: 0
      }
    };
  },
  created() {
    axios
      .get("./data/bv_stores.json")
      .then(response => {
        this.$store.dispatch('initBoutiques', response.data);
        this.filterBookable();
      })
      .catch(error => {
        this.errored = true;
        this.errorLabel = error;
      })
      .finally(() => (this.loading = true));
  },
  computed: {
    boutiquesBookable() {
      return this.$store.getters.bookable;
    },
    cityBookable() {
      const boutiques = this.$store.getters.bookable;
      if (boutiques !== null && boutiques.length) {
        const b = [],
          c = [];
        for (let i = 0; i < boutiques.length; i++) {
          if (!b.includes(boutiques[i]["wpcf-city"])) {
            b.push(boutiques[i]["wpcf-city"]);
            c.push(boutiques[i]);
          }
        }
        return c.sort((x, y) => {
          if(x["wpcf-city"] < y["wpcf-city"]) { return -1; }
          if(x["wpcf-city"] > y["wpcf-city"]) { return 1; }
          return 0;
        });
      }
      return false;
    },
    countryBookable() {
      const boutiques = this.$store.getters.bookable;
      if (boutiques !== null && boutiques.length) {
        const b = [],
          c = [];
        for (let i = 0; i < boutiques.length; i++) {
          if (!b.includes(boutiques[i].location.country.name)) {
            b.push(boutiques[i].location.country.name);
            c.push(boutiques[i]);
          }
        }

        return c.sort((x, y) => {
          if(x.location.country.name < y.location.country.name) { return -1; }
          if(x.location.country.name > y.location.country.name) { return 1; }
          return 0;
        });
      }
      return false;
    }
  },
  methods: {
    filterBookable(){
      const boutiques = this.$store.getters.boutiques;
      if (boutiques !== null && boutiques.length) {
        this.$store.dispatch('initBookable', boutiques.filter(this.isBookable));
      }
    },
    isBookable(el) {
      return el["wpcf-yoox-store-bookable"] > 0;
    },
    updateBoutique(e, scope) {
      const value = e.target.value;
      switch(scope){
        case "country":
          this.boutiqueSelected.countryID = value;
          break;
        case "city":
          this.boutiqueSelected.cityID = value;
          break;
        case "boutique":
          this.boutiqueSelected.boutiqueID = value;
          break;
        default:
          this.boutiqueSelected.countryID = 0; 
          this.boutiqueSelected.cityID = 0;
          this.boutiqueSelected.boutiqueID = 0;
          break
      }
      this.$store.dispatch('updateBoutique', this.boutiqueSelected);
    }
  }
};
</script>
<style lang="scss">
select {
  border: 1px solid #e2e2e2;
  height: 25px;
  margin: 0 20px;
  min-width: 250px;
}
</style>