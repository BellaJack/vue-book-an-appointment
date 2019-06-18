<template>
  <article class="boutique-card">
    <header>
      <h3>{{boutique.post_title}}</h3>
    </header>
    <div class="boutique-card__box">
      <div class="boutique-card__address">{{boutique["wpcf-yoox-store-address"]}}</div>
      <div class="boutique-card__book">
        <router-link to="/">Book an appointment</router-link>
      </div>
    </div>
  </article>
</template>
<script>
export default {
  props: ["boutique"]
}
</script>