<template>
  <div>
    <show-word v-bind:words="words" />

    <br>
    <hr>
    <import-export v-bind:words="words" @newWords="updateWords" @newImport="overrideWords" />
  </div>
</template>

<script>
import ShowWord from '@/components/ShowWord.vue';
import ImportExport from '@/components/ImportExport.vue';
import Word from '@/store/Word';

export default {
  name: 'App',
  methods: {
    overrideWords(newWords) {
      this.words = Array.from(newWords);
    },
    updateWords(newWords) {
      const existingWords = new Map(this.words.map((word) => [word.token, word]));

      Object.values(newWords).forEach((newWord) => {
        if (!existingWords.has(newWord.token)) {
          existingWords.set(newWord.token, newWord);
        } else {
          existingWords.get(newWord.token).appearanceCount += newWord.appearanceCount;
        }
      });

      const toBeInsertedCount = existingWords.size - this.words.length;
      const newWordsCount = Object.keys(newWords).length;

      if (window.confirm(`Import contains: ${newWordsCount} words, ${toBeInsertedCount} of them are new`)) {
        this.words = Array.from(existingWords.values());
      }
    },
  },
  mounted() {
    chrome.storage.local.get(
      ['words'],
      (storage) => {
        if (storage.words) {
          this.words = storage.words;
        }
      },
    );
  },
  data() {
    return {
      words: [
        new Word('1', 'fdsss', ['one', 'two']),
        new Word('2', 'aaaa'),
        new Word('3', 'rewrew'),
      ],
    };
  },
  components: { ShowWord, ImportExport },
};
</script>

<style>
html {
  width: 450px;
  /* height: 400px; */
}
</style>
