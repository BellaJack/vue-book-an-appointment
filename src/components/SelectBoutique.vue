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
      boutiques: null,
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
        this.boutiques = response.data;
      })
      .catch(error => {
        this.errored = true;
        this.errorLabel = error;
      })
      .finally(() => (this.loading = true));
  },
  computed: {
    boutiquesBookable() {
      if (this.boutiques !== null && this.boutiques.length) {
        return this.boutiques.filter(this.isBookable);
      }
      return false;
    },
    cityBookable() {
      if (this.boutiques !== null && this.boutiques.length) {
        const a = this.boutiques.filter(this.isBookable),
          b = [],
          c = [];
        for (let i = 0; i < a.length; i++) {
          if (!b.includes(a[i]["wpcf-city"])) {
            b.push(a[i]["wpcf-city"]);
            c.push(a[i]);
          }
        }
        return c.sort((a, b) => {
          if(a["wpcf-city"] < b["wpcf-city"]) { return -1; }
          if(a["wpcf-city"] > b["wpcf-city"]) { return 1; }
          return 0;
        });
      }
      return false;
    },
    countryBookable() {
      if (this.boutiques !== null && this.boutiques.length) {
        const a = this.boutiques.filter(this.isBookable),
          b = [],
          c = [];
        for (let i = 0; i < a.length; i++) {
          if (!b.includes(a[i].location.country.name)) {
            b.push(a[i].location.country.name);
            c.push(a[i]);
          }
        }

        return c.sort((a, b) => {
          if(a.location.country.name < b.location.country.name) { return -1; }
          if(a.location.country.name > b.location.country.name) { return 1; }
          return 0;
        });
      }
      return false;
    }
  },
  methods: {
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