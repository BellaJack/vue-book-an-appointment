<template>
  <div class="boutique">
    <div v-if="boutiqueSelected.ID > 0 && boutiqueSelected.ID !== 0">
      <header>
        <h2>{{boutiqueSelected["post_title"]}}</h2>
      </header>
      <div class="boutique__info">
        <div class="boutique__info__block boutique__info__block--hours" v-if="boutiqueSelected['wpcf-yoox-store-hours']">
          <header>
            <h3>Opening Hours</h3>
          </header>
          <p style="white-space: pre-line">{{boutiqueSelected['wpcf-yoox-store-hours']}}</p>
        </div>
        <div class="boutique__info__block boutique__info__block--contacts">
          <header>
            <h3>Contacts</h3>
          </header>
          <ul>
            <li>
              <span style="white-space: pre-line"><strong>Address:</strong> {{boutiqueSelected["wpcf-yoox-store-address"]}}, {{boutiqueSelected["wpcf-city"]}}</span>
            </li>
            <li>
              <strong>Phone:</strong> {{boutiqueSelected["wpcf-yoox-store-phone"]}}
            </li>
            <li>
              <strong>Store Email:</strong> {{boutiqueSelected["wpcf-yoox-store-email"]}}
            </li>
            <li
              v-if="boutiqueSelected['wpcf-yoox-store-email-manager']"
            >
              <strong>Store Manager:</strong> {{boutiqueSelected["wpcf-yoox-store-email-manager"]}}
            </li>
          </ul>
        </div>
        <div v-if="womenType.length > 0 || menType.length > 0" class="boutique__info__block boutique__info__block--types">
          <header>
            <h3>Store types</h3>
          </header>
          <div v-if="womenType.length > 0">
            <header>
              <h4>Women</h4>
            </header>
            <ul>
              <li v-for="(type, index) in womenType" :key="index">{{type['name']}}</li>
            </ul>
          </div>
          <div v-if="menType.length > 0">
            <header>
              <h4>Men</h4>
            </header>
            <ul>
              <li v-for="(type, index) in menType" :key="index">{{type['name']}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <header>
        <h2>No boutique loaded</h2>
      </header>
    </div>
  </div>
</template>
<script>
export default {
  name: "Boutique",
  computed: {
    boutiqueSelected() {
      return this.$store.getters.boutiqueSelected;
    },
    womenType() {
      const a = this.$store.getters.boutiqueSelected["store-type"];
      return a.filter(value => {
        return value.parent == 359;
      });
    },
    menType() {
      const a = this.$store.getters.boutiqueSelected["store-type"];
      return a.filter(value => {
        return value.parent == 360;
      });
    }
  }
};
</script>
