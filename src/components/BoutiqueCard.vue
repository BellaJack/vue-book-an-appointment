<template>
  <article class="boutique-card">
    <header>
      <h3>{{boutique.post_title}}</h3>
    </header>
    <div class="boutique-card__box">
      <div class="boutique-card__address">{{boutique["wpcf-yoox-store-address"]}}</div>
      <div class="boutique-card__book">
        <router-link
          :to="{
            name: 'selector',
            params:{
              country: boutique.location.country.term_id,
              city: boutique['wpcf-city'],
              store: boutique.ID
            }
          }"
        >Book an appointment</router-link>
      </div>
    </div>
  </article>
</template>
<script>
export default {
  props: ["boutique"]
};
</script>