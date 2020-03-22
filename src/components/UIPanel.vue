<template>
  <div :class="`ui-panel ui-panel--${this.size}`">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'ui-panel',
  props: {
    size: {
      type: String,
      default: 'med',
      validator(size) {
        return (
          ['xxs', 'xsm', 'sml', 'med', 'lrg', 'xlr', 'xxl'].indexOf(size) > -1
        );
      }
    }
  }
};
</script>

<style lang="scss">
$sizes: xxs, xsm, xsm, sml, med, lrg, xlr, xxl;

.ui-panel {
  border-width: var(--panel-border-width);
  border-style: var(--panel-border-style);
  border-color: var(--panel-border-color);
}

@each $size in $sizes {
  .ui-panel--#{$size} {
    padding: var(--spacing-#{$size});
  }
}
</style>
