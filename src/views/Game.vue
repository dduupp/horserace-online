<template>
  <div>
    <h1>Horserace online</h1>
    <div class="game-board">
      <div class="left">
        <div v-if="game">
          <button class="next-btn" @click="iterateGame">
            Next Iteration ({{ getFirstPosition.position }})
          </button>

          <p>played stack:</p>
          <div class="hand hhand-compact">
            <img
              v-for="({ code }, key) in game.deck.pile"
              :key="key"
              class="card"
              v-bind:src="'/img/cards/' + code + '.svg'"
            />
          </div>
        </div>
        <div>
          First place position:
          <div>
            <img
              class="card"
              v-bind:src="'/img/cards/' + getFirstPosition.card.code + '.svg'"
            />
          </div>
        </div>
        <div>
          Harten-naam: Charlotte (4 slokken) <br />
          schuppen-naam: Hoerebok (4 slokken)<br />
          koeken-naam: Krak (2 slok)<br />
          Klaver-naam: Tok Tok (3 slok)<br />
        </div>
        <div>
          <!-- <pre>{{ game }}</pre> -->
        </div>
        <div v-if="getWinner" class="winning-screen">
          <h1>Winner:</h1>
          <div>
            <img
              class="card"
              v-bind:src="'/img/cards/' + getFirstPosition + '.svg'"
            />
          </div>
        </div>
      </div>
      <div class="right">
        <h2>Run for your life</h2>

        <div id="players" class="players">
          <div class="hand">
            <img
              v-for="({ position, card: { code } }, key) in game.lanes"
              v-bind:key="key"
              v-bind:style="{
                'margin-bottom': `-${100 * position}px`
              }"
              class="card"
              v-bind:src="`/img/cards/${code}.svg`"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    game: null
  }),
  created() {
    axios.post('//localhost:8080/game/').then(response => {
      this.gameUrl = response.headers.location;
      this.syncGameData();
    });
  },
  updated() {
    var element = document.getElementById('players');
    element.scrollTop = element.scrollHeight;
  },
  methods: {
    syncGameData() {
      axios.get(this.gameUrl).then(({ data }) => {
        this.game = data;
      });
    },
    iterateGame: function() {
      axios.put(`${this.gameUrl}iterate/`).then(() => {
        this.syncGameData();
      });
    }
  },
  computed: {
    getFirstPosition() {
      if (this.game) {
        const sortedPositions = [...this.game.lanes].sort((a, b) => {
          if (a.position > b.position) return -1;
          if (a.position < b.position) return 1;
          return 0;
        });

        return sortedPositions[0];
      }

      return this.game.lanes[0];
    },
    getLastPosition() {
      if (this.game) {
        const firstposition = [...this.game.lanes].sort((a, b) => {
          if (a.position > b.position) return -1;
          if (a.position < b.position) return -1;
          return 0;
        });

        return firstposition[0];
      }

      return this.game.lanes[0];
    },
    getWinner() {
      const game = this.game.lanes.find(val => val.status === 'FINISHED');
      return game;
    }
  }
};
</script>

<style>
.game-board {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.players {
  overflow: scroll;
  height: 500px;
  width: 300px;
  display: flex;
  justify-content: center;
  border: 1px solid red;
}

.winning-screen {
  width: 100vw;
  height: 100vh;
  background: red;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

img.card.pos-1 {
  margin-bottom: -100px;
}
.next-btn {
  position: fixed;
  background: deepskyblue;
  color: white;
  padding: 1rem;
  font-size: 3rem;
  bottom: 0;
  width: 100%;
}
</style>
