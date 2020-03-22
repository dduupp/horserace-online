<template>
  <div class="container">
    <slot />
  </div>
</template>

<script>
export default {};
</script>

<style>
.container {
  max-width: var(--container-width);
  padding: var(--container-padding, var(--grid-spacing));
  margin: 0 auto;
}
</style>
