<template>
  <div>
    <ui-panel class="u-spacer">
      <h3>Join game</h3>
      <p>Enter the game ID</p>
      <div class="u-spacer">
        <input type="text" maxlength="4" v-model="gameId" />
      </div>
      <div class="u-spacer">
        <button @click="joinGame(gameId)" :disabled="!gameId">
          Join game!
        </button>
      </div>
    </ui-panel>
    <ui-panel class="u-spacer">
      <h3>Create game</h3>
      <button @click="createGame">Join game!</button>
    </ui-panel>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data: () => ({
    gameId: null
  }),
  methods: {
    joinGame(id) {
      this.$router.push({
        name: 'game',
        params: { id }
      });
    },
    createGame() {
      this.$router.push('create');
    }
  }
};
</script>
