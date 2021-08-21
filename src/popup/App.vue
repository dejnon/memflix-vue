<template>
  <div>
    <show-word v-bind:words="words" />
  </div>
</template>

<script>
import ShowWord from '@/components/ShowWord.vue';
import Word from '@/store/Word';

export default {
  name: 'App',
  data() {
    return {
      words: [
        new Word('1', 'fdsss', ['one', 'two']),
        new Word('2', 'aaaa'),
        new Word('3', 'rewrew'),
      ],
    };
  },
  components: { ShowWord },
};
</script>

<style>
html {
  width: 400px;
  height: 400px;
}
</style>
