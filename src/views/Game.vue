<template>
  <ui-section>
    <ui-container>
      <h1>Horserace online</h1>
      <div v-if="game">
        <ui-button @click="iterateGame">Draw a card</ui-button>
        <table>
          <tbody>
            <tr v-for="position in game.finish" :key="position">
              <td v-for="(lane, key) in game.lanes" :key="key">
                <span v-show="lane.position == position">
                  {{ lane.card.code }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </ui-container>
  </ui-section>
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
  methods: {
    syncGameData() {
      axios.get(this.gameUrl).then(({ data }) => {
        this.game = data;
      });
    },
    iterateGame() {
      axios.put(`${this.gameUrl}iterate/`).then(() => {
        this.syncGameData();
      });
    }
  }
};
</script>

<style></style>
