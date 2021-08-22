<template>
  <div>
    <show-word v-bind:words="words" />

    <br>
    <hr>
    <import-export v-model="words" />
  </div>
</template>

<script>
import ShowWord from '@/components/ShowWord.vue';
import ImportExport from '@/components/ImportExport.vue';
import Word from '@/store/Word';

export default {
  name: 'App',
  methods: {
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
  height: 400px;
}
</style>
