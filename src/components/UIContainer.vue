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
  padding: 0 var(--container-padding, var(--grid-spacing));
  margin: 0 auto;
}
</style>
