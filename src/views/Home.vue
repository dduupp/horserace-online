<template>
  <div>
    <ui-section>
      <ui-container>
        <h1>Horserace online</h1>
        <ui-grid>
          <ui-panel>
            <h3>Join game</h3>
            <p>Enter the game ID</p>
            <div class="u-spacer">
              <input type="text" maxlength="4" v-model="gameId" />
            </div>
            <div class="u-spacer">
              <button @click="joinGame(gameId)" :disabled="!gameId">
                Join game
              </button>
            </div>
          </ui-panel>
          <ui-panel>
            <h3>Create game</h3>
            <button @click="createGame">
              Create game
            </button>
          </ui-panel>
        </ui-grid>
      </ui-container>
    </ui-section>
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
