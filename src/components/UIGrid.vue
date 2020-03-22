<template>
  <ui-flex class="ui-grid" wrap>
    <slot />
  </ui-flex>
</template>

<script>
export default {};
</script>

<style lang="scss">
.ui-grid {
  margin-top: calc(var(--spacing-med) * -1);
  margin-left: calc(var(--spacing-xsm) * -1);
  margin-right: calc(var(--spacing-xsm) * -1);
  > * {
    margin-top: var(--spacing-med);
    flex-grow: 1;
    margin-left: var(--spacing-xsm);
    margin-right: var(--spacing-xsm);
  }
}
</style>
