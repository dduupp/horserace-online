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
    <ui-section>
      <ui-container>
        <ui-panel>
          <h2>Active games</h2>
          <ul>
            <li v-for="(game, key) in activeGames" :key="key">
              {{ game.id }}
            </li>
          </ul>
        </ui-panel>
      </ui-container>
    </ui-section>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Home',
  data: () => ({
    gameId: null,
    activeGames: []
  }),
  mounted() {
    axios.get('/api/games').then(res => {
      this.activeGames = res.data;
    });
  },
  methods: {
    joinGame(id) {
      axios
        .post('/api/game/join', { id })
        .then(res => {
          console.log(res);
          this.$router.push({
            name: 'game',
            params: { id: res.data.gameId }
          });
        })
        .catch(error => {
          alert(error);
        });
    },
    createGame() {
      axios.post('/api/game/create').then(res => {
        console.log(res);
      });
    }
  }
};
</script>
