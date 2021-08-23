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
        if (!existingWords.get(newWord.token)) {
          existingWords.set(newWord.token, newWord);
        } else {
          existingWords.get(newWord.token).appearanceCount += newWord.appearanceCount;
        }
      });

      this.words = Array.from(existingWords.values());
    },
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
  width: 400px;
  /* height: 400px; */
}
</style>
