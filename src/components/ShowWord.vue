<template>
  <div
   v-on:keyup.f="repeatWord"
   v-on:keyup.d="dislikeWord"
   v-on:keyup.n="nextWord">
    <p class="md-body-1">Showing word {{currentWordIndex+1}} of {{words.length}}</p>

    <md-content class="md-scrollbar">
      <h1 class="md-display-1">{{words[currentWordIndex].label}}</h1>

      <div>
        <span>Translations:</span>
        <ul id="translations">
          <li :key="translation" v-for="translation in words[currentWordIndex].translations">
            {{ translation }}
          </li>
        </ul>
      </div>
    </md-content>

    <p class="md-body-1">Shown: {{words[currentWordIndex].shownCount}} times</p>
    <p class="md-body-1">Appeard: {{words[currentWordIndex].appearanceCount}} times</p>

    <md-button class="md-dense md-primary" @click="nextWord">Next word</md-button>
    <md-button class="md-dense md-primary" @click="prevWord">Prev word</md-button>
    <br />

    <md-button class="md-dense" @click="repeatWord">
      Add to repeats ({{this.words[this.currentWordIndex].repeatCount}})
    </md-button>
    <md-button class="md-dense" @click="dislikeWord">
      Prevent from showing
    </md-button>
  </div>
</template>

<script>
import Word from '@/store/Word';
import MyMemoryTranslation from '@/mymemorytranslation';

export default {
  name: 'ShowWord',
  data() {
    return {
      currentWordIndex: 0,
    };
  },
  props: {
    words: Array[Word],
  },
  mounted() {
    // browser.runtime.sendMessage({});
    this.words[this.currentWordIndex].shownCount += 1;
  },
  methods: {
    repeatWord() {
      this.words[this.currentWordIndex].repeatCount += 1;
    },
    dislikeWord() {
      this.words[this.currentWordIndex].dislikeCount += 1;
      this.nextWord();
    },
    nextWord() {
      this.currentWordIndex += 1;
      this.words[this.currentWordIndex].shownCount += 1;
      MyMemoryTranslation
        .get(this.words[this.currentWordIndex].label, 'de', 'en')
        .then((translation) => {
          this.words[this.currentWordIndex].translations = translation.translations;
        });
    },
    prevWord() {
      this.currentWordIndex -= 1;
      this.words[this.currentWordIndex].shownCount += 1;
    },
  },
  computed: {
  },
};
// window.addEventListener('keyup', function(e) {
//   app.handleGlobalKeyDown(e)
// });
</script>

<style scoped>
p {
  padding: 0 5px;
}
.md-content {
  padding: 0 10px;
  height: 200px;
  overflow: auto;
}
</style>
