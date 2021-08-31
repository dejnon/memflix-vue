<template>
  <div
   v-on:keyup.f="repeatWord"
   v-on:keyup.d="dislikeWord"
   v-on:keyup.n="nextWord">
    <p>Showing word {{currentWordIndex+1}} of {{words.length}}</p>
    <br />

    <h1>{{words[currentWordIndex].label}}</h1>

    <div>
      <span>Translations:</span>
      <ul id="translations">
        <li :key="translation" v-for="translation in words[currentWordIndex].translations">
          {{ translation }}
        </li>
      </ul>
    </div>

    <br />
    <p>Shown: {{words[currentWordIndex].shownCount}} times</p>
    <p>Appeard: {{words[currentWordIndex].appearanceCount}} times</p>

    <button @click="nextWord">Next word</button>
    <button @click="repeatWord">
      Add to repeats ({{this.words[this.currentWordIndex].repeatCount}})
    </button>
    <button @click="dislikeWord"  >
      Prevent from showing
    </button>
    <button @click="prevWord">Prev word</button>
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
  font-size: 20px;
}
</style>
