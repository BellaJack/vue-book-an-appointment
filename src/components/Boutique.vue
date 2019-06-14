<template>
  <div class="boutique" v-if="boutiqueSelected.ID > 0 && boutiqueSelected.ID !== 0">
    <h1>Boutique</h1>
    <ul>
      <li>ID: {{boutiqueSelected.ID}}</li>
      <li>Name: {{boutiqueSelected["post_title"]}}</li>
      <li>Lat: {{boutiqueSelected["_yoox-store-lat"]}}</li>
      <li>Long: {{boutiqueSelected["_yoox-store-lng"]}}</li>
      <li>Store type: 
        <ul>
          <li v-for="(type, index) in boutiqueSelected['store-type']" :key="index">
            {{type['name']}}
          </li>
        </ul>
      </li>
      <li>Phone: {{boutiqueSelected["wpcf-yoox-store-phone"]}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'Boutique',
  computed: { 
    boutiqueSelected() {
      return this.$store.getters.boutiqueSelected;
    }
  }
}
</script>
