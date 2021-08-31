/* eslint-disable no-alert */
<template>
  <div>

    <div>
      <a href="#" @click="showAllWords">All words</a>
      |
      <a href="#" @click="showNewWords">Latest words ({{this.newWords.length}})</a>
      <hr>
    </div>

    <show-word v-bind:words="words" />

    <br>
    <hr>
    <import-export
      v-bind:words="allWords"
      @savedWords="saveWords"
      @newWords="updateWords"
      @newImport="overrideWords" />

    <p>
      Showing: {{this.words.length}}.
      Saved: {{this.savedWords.length}}.
      Pending to save: {{this.allWords.length-this.savedWords.length}}
    </p>
  </div>
</template>

<script>
import ShowWord from '@/components/ShowWord.vue';
import ImportExport from '@/components/ImportExport.vue';
import Word from '@/store/Word';

export default {
  name: 'App',
  methods: {
    showAllWords() {
      this.words = this.allWords;
    },
    showNewWords() {
      this.words = this.newWords;
    },
    overrideWords(newWords) {
      this.allWords = Array.from(newWords);
    },
    saveWords(savedWords) {
      this.savedWords = savedWords;
    },
    updateWords(newWords) {
      const existingWords = new Map(this.allWords.map((word) => [word.token, word]));
      const latestWords = [];

      Object.values(newWords).forEach((newWord) => {
        if (!existingWords.has(newWord.token)) {
          existingWords.set(newWord.token, newWord);
          latestWords.push(existingWords.get(newWord.token));
        } else {
          existingWords.get(newWord.token).appearanceCount += newWord.appearanceCount;
        }
      });

      const toBeInsertedCount = existingWords.size - this.allWords.length;
      const newWordsCount = Object.keys(newWords).length;

      if (window.confirm(`Import contains: ${newWordsCount} words, ${toBeInsertedCount} of them are new`)) {
        this.newWords = latestWords;
        this.allWords = Array.from(existingWords.values());
        this.words = this.allWords;
      }
    },
  },
  mounted() {
    this.words = this.allWords;
    chrome.storage.local.get(
      ['words'],
      (storage) => {
        if (storage.words) {
          this.allWords = storage.words;
          this.words = this.allWords;
          this.savedWords = this.allWords;
        }
      },
    );
    chrome.storage.local.get(
      ['incomingWords'],
      (storage) => {
        if (storage.incomingWords) {
          this.updateWords(storage.incomingWords);
        }
        console.log(this.newWords);
      },
    );
  },
  data() {
    return {
      allWords: [
        new Word('1', 'fdsss', ['one', 'two']),
        new Word('2', 'aaaa'),
        new Word('3', 'rewrew'),
      ],
      newWords: [],
      savedWords: [],
      words: [],
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
