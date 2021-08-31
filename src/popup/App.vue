/* eslint-disable no-alert */
<template>
  <div  class="md-layout">
    <div class="md-layout-item">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <md-toolbar class="md-caption md-dense">
      <md-button @click="showAllWords">All words</md-button>
      <md-button @click="showLatestWords">Latest ({{this.newWords.length}})</md-button>
      <md-button @click="showNewWords">By frequency</md-button>
      <md-button @click="showDislikedWords">Disliked</md-button>
      <hr>
    </md-toolbar>

    <show-word v-bind:words="words" />

    <br>
    <import-export
      v-bind:words="allWords"
      @savedWords="saveWords"
      @newWords="updateWords"
      @newImport="overrideWords" />

    <md-toolbar class="md-dense">
      <p class="md-caption">
      Showing: {{this.words.length}}.
      Saved: {{this.savedWords.length}}.
      Pending to save: {{this.allWords.length-this.savedWords.length}}
      </p>
    </md-toolbar>
</div>
  </div>
</template>

<script>
import VueMaterial from 'vue-material';
import Vue from 'vue';
import ShowWord from '@/components/ShowWord.vue';
import ImportExport from '@/components/ImportExport.vue';
import Word from '@/store/Word';
import 'vue-material/dist/vue-material.min.css';
// import 'vue-material/dist/theme/default-dark.css'; // dark mode
import 'vue-material/dist/theme/default.css'; // light mode

Vue.use(VueMaterial);

export default {
  name: 'App',
  methods: {
    showAllWords() {
      this.words = this.allWords;
    },
    showLatestWords() {
      this.words = this.newWords;
    },
    showDislikedWords() {
      this.words = [...this.allWords]
        .filter((a) => a.dislikeCount > 0);
    },
    showNewWords() {
      this.words = [...this.allWords]
        .filter((a) => a.dislikeCount <= 0)
        .sort((a, b) => b.shownCount - a.shownCount || b.appearanceCount - a.appearanceCount);
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
  width: 500px;
  /* height: 400px; */
}
</style>
