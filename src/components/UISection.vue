<template>
  <section class="ui-section ui-section--default">
    <h2 class="ui-section__title" v-if="title" v-html="title" />
    <slot />
  </section>
</template>

<script>
export default {
  props: {
    title: String
  }
};
</script>

<style>
.ui-section {
  padding: var(--spacing-med) 0;
}

.ui-section--default + .ui-section--default {
  padding-top: 0;
}
</style>
