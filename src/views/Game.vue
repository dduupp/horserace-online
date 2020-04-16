<template>
  <div>
    <div class="container">
      <div class="game" v-if="game">
        <div class="game__info">
          <img
            src="/img/cards/RED_BACK.svg"
            @click="iterateGame"
            alt=""
            class="card"
          />
          <div class="game__deck">
            <div class="hand hhand-compact">
              <img
                v-for="({ code }, key) in game.deck.pile"
                :key="key"
                class="card"
                v-bind:src="'/img/cards/' + code + '.svg'"
              />
            </div>
          </div>
          <button @click="resetGame">Reset game</button>
          <h2>Place your bets:</h2>
          <h3>&spades;</h3>
          <textarea name="" id="" rows="4"></textarea>
          <h3 style="color: red;">&hearts;</h3>
          <textarea name="" id="" rows="4"></textarea>
          <h3>&clubs;</h3>
          <textarea name="" id="" rows="4"></textarea>
          <h3 style="color: red;">&diams;</h3>
          <textarea name="" id="" rows="4"></textarea>
          <!-- <div v-if="firstPosition">
            First place position:
            <div>
              <img
                class="card"
                v-bind:src="'/img/cards/' + firstPosition.card.code + '.svg'"
              />
            </div>
          </div> -->
          <div v-if="winner" class="winner">
            <div>
              <h1>Winner:</h1>
              <div>
                <img
                  class="card"
                  v-bind:src="'/img/cards/' + firstPosition.card.code + '.svg'"
                />
              </div>
              <button @click="resetGame">Reset game</button>
            </div>
          </div>
        </div>
        <div class="game__lanes">
          <img
            v-for="({ position, card: { code } }, key) in game.lanes"
            v-bind:key="key"
            v-bind:style="{
              transform: `translateY(${100 * position}%)`
            }"
            class="game__card"
            v-bind:src="`/img/cards/${code}.svg`"
            alt=""
          />
        </div>
        <div class="game__buffer"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import SockJS from 'sockjs-client';
let Stomp = require('@stomp/stompjs');

export default {
  data: () => ({
    game: null
  }),
  created() {
    this.connect().then(() => this.createGame().then(() => this.subscribe()));
  },
  methods: {
    createGame() {
      return new Promise(resolve => {
        axios.post('https://test.tommartens.eu/game/').then(response => {
          this.gameLocation = response.data;
          resolve();
        });
      });
    },
    connect() {
      return new Promise(resolve => {
        this.stompClient = Stomp.Stomp.over(function() {
          return new SockJS(
            'https://test.tommartens.eu/horserace-online-websocket'
          );
        });
        this.stompClient.connect({}, function() {
          resolve();
        });
      });
    },
    subscribe() {
      const self = this;
      this.stompClient.subscribe(`${this.gameLocation}`, function(response) {
        self.game = JSON.parse(response.body);
      });
    },
    iterateGame: function() {
      this.stompClient.send(`${this.gameLocation}iterate/`, {});
    },
    resetGame() {
      this.createGame().then(() => this.subscribe());
    }
  },
  computed: {
    sortedPositions() {
      const { game } = this;

      if (!game) return [];

      return game.lanes.sort((a, b) => {
        if (a.position > b.position) return -1;
        if (a.position < b.position) return 1;
        return 0;
      });
    },
    firstPosition() {
      return this.sortedPositions[0];
    },
    lastPosition() {
      return this.sortedPositions[3];
    },
    winner() {
      const { game } = this;

      if (!game) return;

      return game.lanes.find(val => val.position == 10);
    }
  }
};
</script>

<style lang="scss">
body,
html {
  background: green;
}
* {
  font-family: Lato, sans-serif;
}

.game {
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
  height: 100vh;
  box-shadow: 0 0 36px rgba(0, 0, 0, 0.2);

  .game__info {
    flex-grow: 1;
    flex-shrink: 1;
    padding: 20px;
    background: white;
  }

  textarea {
    width: 100%;
    font-size: 20px;
    border: none;
    outline: none !important;
    border-radius: 5px;
    padding: 5px;
    background: #f5f5f5;

    &:focus {
      background: #f5f5f5;
    }
  }

  .game__lanes {
    background: black;
    padding: 5px;
    display: flex;
    flex-flow: row nowrap;
    align-items: stretch;
    overflow: hidden;
    box-shadow: 0 2px rgba(0, 0, 0, 0.2);
  }

  .game__card {
    transition: transform ease-in-out 0.2s;
    height: calc((100vh - 10px) / 10);
    margin: 0 5px;
  }
}

.winner {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: green;
  z-index: 9;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
