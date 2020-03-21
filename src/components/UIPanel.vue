<template>
  <div :class="blockClass">
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
  },
  computed: {
    blockClass() {
      return `ui-panel ui-panel--${this.size}`;
    }
  }
};
</script>

<style lang="scss">
$sizes: xxs, xsm, xsm, sml, med, lrg, xlr, xxl;

.ui-panel {
  position: relative;
  box-shadow: var(--panel-box-shadow);
}

@each $size in $sizes {
  .ui-panel--#{$size} {
    padding: var(--spacing-#{$size});
  }
}
</style>
