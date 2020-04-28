<template>
  <div>
    <div class="container">
      <div class="game" v-if="game">
        <div class="game__info">
          <img src="/img/cards/RED_BACK.svg" alt="" class="card" />
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
          <h2>Place your bets:</h2>
          <h3>&spades;</h3>
          <textarea rows="4"></textarea>
          <h3 style="color: red;">&hearts;</h3>
          <textarea rows="4"></textarea>
          <h3>&clubs;</h3>
          <textarea rows="4"></textarea>
          <h3 style="color: red;">&diams;</h3>
          <textarea rows="4"></textarea>
          <div v-if="winner" class="winner">
            <div>
              <h1>Winner:</h1>
              <div>
                <img
                  class="card"
                  v-bind:src="'/img/cards/' + winner + '.svg'"
                />
              </div>
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
import SockJS from 'sockjs-client';
let StompJS = require('@stomp/stompjs');

export default {
  data: () => ({
    game: null
  }),
  created() {
    this.connect().then(() => this.subscribe());
  },
  methods: {
    connect() {
      return new Promise(resolve => {
        this.stompClient = StompJS.Stomp.over(function() {
          return new SockJS(
            process.env.VUE_APP_API_URL + process.env.VUE_APP_SOCKET_LOCATION
          );
        });
        this.stompClient.connect({}, function() {
          resolve();
        });
      });
    },
    subscribe() {
      const self = this;
      this.stompClient.subscribe(
        '/room/' + `${this.$route.params.id}` + '/',
        function(response) {
          self.game = JSON.parse(response.body).game;
        }
      );
    }
  },
  computed: {
    winner() {
      const { game } = this;
      return (
        game &&
        game.status === 'FINISHED' &&
        game.lanes.find(lane => lane.status === 'WINNER').card.code
      );
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
  height: 100%;
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
