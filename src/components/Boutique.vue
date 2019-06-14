<template>
  <div class="boutique" v-if="boutiqueSelected.ID > 0 && boutiqueSelected.ID !== 0">
    <header>
      <h2>{{boutiqueSelected["post_title"]}}</h2>
    </header>
    <div class="boutique__info">
      <div>
        <header>
          <h3>Opening Hours</h3>
        </header>
        <p style="white-space: pre-line">
          {{boutiqueSelected['wpcf-yoox-store-hours']}}
        </p>
      </div>
      <div>
        <header>
          <h3>Contacts</h3>
        </header>
        <ul>
          <li>
            <span>Phone:</span>
            {{boutiqueSelected["wpcf-yoox-store-phone"]}}
          </li>
          <li>
            <span>Store Email:</span>
            {{boutiqueSelected["wpcf-yoox-store-email"]}}
          </li>
          <li
            v-if="boutiqueSelected['wpcf-yoox-store-email-manager']"
          >
            <span>Store Manager:</span>
            {{boutiqueSelected["wpcf-yoox-store-email-manager"]}}
          </li>
        </ul>
      </div>
      <div class="boutique__types">
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
