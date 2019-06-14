<template>
  <div class="form" v-if="boutiqueSelected.ID > 0 && boutiqueSelected.ID !== 0">
    <header>
      <h2>Contact our Boutique</h2>
    </header>
    <form>
      <div class="form__row">
        <label for="salutation">Salutation</label>
        <select>
          <option>Mr.</option>
          <option>Ms.</option>
          <option>Mrs.</option>
          <option>Dr.</option>
        </select>
      </div>
      <div class="form__row">
        <label for="name">Full Name</label>
        <input type="text" name="name" id="name" value="" />
      </div>
      <div class="form__row">
        <label for="phone">Telephone Number</label>
        <input type="tel" name="phone" id="phone" value="" />
      </div>
      <div class="form__row">
        <label for="email">Email</label>
        <input type="email" name="email" id="email" value="" />
      </div>
      <div class="form__row">
        <label for="date">Date</label>
        <input type="date" name="date" id="date" value="" />
      </div>
      <div class="form__row">
        <label for="hour">Hour</label>
        <input type="time" name="hour" id="hour" value="" />
      </div>
      <div class="form__row">
        <label for="message">Leave a messagge for our boutique</label>
        <textarea name="message" id="message"></textarea>
      </div>
      <div class="form__row form__row--hidden">
        <input type="hidden" name="boutique_id" id="boutique_id" :value="boutiqueSelected.ID" />
        <input type="hidden" name="boutique_name" id="boutique_name" :value="boutiqueSelected['post_title']" />
      </div>
      <div class="form_row">
        <input type="submit" value="Send" />
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: 'Form',
  computed: { 
    boutiqueSelected() {
      return this.$store.getters.boutiqueSelected;
    }
  }
}
</script>
<style lang="scss">

</style>

