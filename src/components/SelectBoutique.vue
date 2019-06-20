<template>
  <div class="boutiqueSelector" :class="{'loading': !loaded}">
    <section v-if="loaded" class="boutiqueSelector__wrap">
      <div class="boutiqueSelector__img">
        <figure>
          <img
            src="/img/768.jpg"
            srcset="/img/640_1139.jpg 320w,
              /img/750_1335.jpg 375w, 
              /img/640_1139.jpg 640w,
              /img/750_1335.jpg 750w,
              /img/768.jpg 768w,
              /img/1024.jpg 1024w,
              /img/1280.jpg 1280w,
              /img/1920.jpg 1920w"
            alt="Boutique interior"
          >
        </figure>
      </div>
      <div class="boutiqueSelector__box">
        <header>
          <h2>Please select a Boutique</h2>
        </header>
        <div class="boutiqueDropdown">
          <select
            @change="updateBoutique($event, 'country')"
            id="countryDropdown"
          >
            <option value="0">Select your country</option>
            <option
              v-for="(country, index) in countryBookable"
              :key="index"
              :value="country.location.country.term_id"
              :selected="country.location.country.term_id == boutiqueSelected.countryID"
            >{{country.location.country.name}}</option>
          </select>
          <select
            @change="updateBoutique($event, 'city')"
            id="cityDropdown"
            :disabled="boutiqueSelected.countryID == 0"
          >
            <option value="0">Select your city</option>
            <template v-for="(city, index) in cityBookable">
              <option
                v-if="boutiqueSelected.countryID == city.location.country.term_id"
                :key="index"
                :value="city['wpcf-city']"
                :selected="city['wpcf-city'] == boutiqueSelected.cityID"
              >{{city["wpcf-city"]}}</option>
            </template>
          </select>
          <select
            @change="updateBoutique($event, 'boutique')"
            id="storeDropdown"
            :disabled="boutiqueSelected.countryID == 0 || boutiqueSelected.cityID == 0"
          >
            <option value="0">Select a boutique</option>
            <template v-for="boutique in boutiquesBookable">
              <option
                v-if="boutiqueSelected.cityID == boutique['wpcf-city'] && boutiqueSelected.countryID == boutique.location.country.term_id"
                :key="boutique.ID"
                :value="boutique.ID"
                :selected="boutique.ID == boutiqueSelected.boutiqueID"
              >{{boutique.post_title}}</option>
            </template>
          </select>
        </div>
      </div>
    </section>
    <div class="loader" v-else>
      Loading...
    </div>
    <div v-if="errored">
      <header>
        <h2>Whoops there is some errors...</h2>
      </header>
      <p>{{ errorLabel }}</p>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { setTimeout } from 'timers';
export default {
  name: "SelectBoutique",
  data() {
    return {
      loaded: false,
      errored: false,
      errorLabel: "",
      boutiqueSelected: {
        countryID: 0,
        cityID: 0,
        boutiqueID: 0
      },
      isoCode: "us",
      storesUrl: "https://www.bottegaveneta.com/experience/",//"./data/bv_stores.json"
      storesQuery: "/?yoox_storelocator_action=true&action=yoox_storelocator_get_all_stores"
    };
  },
  created() {
    const ajaxUrl = this.storesUrl + this.isoCode + this.storesQuery;

    if(this.$store.getters.bookable.length){
      this.loaded = true;
    }else{
      axios
      .get(ajaxUrl)
      .then(response => {
        //this.$store.dispatch('initBoutiques', response.data);
        this.filterBookable(response.data);
      })
      .catch(error => {
        this.errored = true;
        this.errorLabel = error;
      })
      .finally(() => (this.loaded = true));
    }
    
  },
  mounted() {
    if(this.$store.getters.bookable.length){
      window.scrollTo(0,0);
      this.boutiqueSelected.countryID = this.$route.params.country;
      this.boutiqueSelected.cityID = this.$route.params.city;
      this.boutiqueSelected.boutiqueID = this.$route.params.store;
      this.$store.dispatch(
        "updateBoutique",
        this.$store.getters.bookable.find(el => el.ID == this.boutiqueSelected.boutiqueID)
      );
    }
  },
  computed: {
    boutiquesBookable() {
      return this.$store.getters.bookable;
    },
    cityBookable() {
      const boutiques = this.$store.getters.bookable;
      if (boutiques !== null && boutiques.length) {
        const city = [],
          cityFiltered = [];
        for (let i = 0; i < boutiques.length; i++) {
          if (!city.includes(boutiques[i]["wpcf-city"])) {
            city.push(boutiques[i]["wpcf-city"]);
            cityFiltered.push(boutiques[i]);
          }
        }
        return cityFiltered.sort((x, y) => {
          if (x["wpcf-city"] < y["wpcf-city"]) {
            return -1;
          }
          if (x["wpcf-city"] > y["wpcf-city"]) {
            return 1;
          }
          return 0;
        });
      }
      return false;
    },
    countryBookable() {
      const boutiques = this.$store.getters.bookable;
      if (boutiques !== null && boutiques.length) {
        const country = [],
          countryFiltered = [];
        for (let i = 0; i < boutiques.length; i++) {
          if (!country.includes(boutiques[i].location.country.name)) {
            country.push(boutiques[i].location.country.name);
            countryFiltered.push(boutiques[i]);
          }
        }

        return countryFiltered.sort((x, y) => {
          if (x.location.country.name < y.location.country.name) {
            return -1;
          }
          if (x.location.country.name > y.location.country.name) {
            return 1;
          }
          return 0;
        });
      }
      return false;
    }
  },
  methods: {
    filterBookable(boutiques) {
      //const boutiques = this.$store.getters.boutiques;
      if (boutiques !== null && boutiques.length) {
        this.$store.dispatch("initBookable", boutiques.filter(this.isBookable));
      }
    },
    isBookable(el) {
      return el["wpcf-yoox-store-bookable"] > 0;
    },
    updateBoutique(e, scope) {
      const value = e.target.value;
      switch (scope) {
        case "country":
          this.boutiqueSelected.countryID = value;
          break;
        case "city":
          this.boutiqueSelected.cityID = value;
          this.$store.dispatch(
            "updateBoutique", 0
          );
          break;
        case "boutique":
          this.boutiqueSelected.boutiqueID = value;
          this.$store.dispatch(
            "updateBoutique",
            this.$store.getters.bookable.find(el => el.ID == value)
          );
          break;
        default:
          this.boutiqueSelected.countryID = 0;
          this.boutiqueSelected.cityID = 0;
          this.boutiqueSelected.boutiqueID = 0;
          break;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../styles/components/boutiqueSelector";
</style>