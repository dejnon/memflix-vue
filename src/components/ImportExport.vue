<template>
  <div>
    <button @click="exportJson">Export JSON</button>
    <button @click="importJson">Import JSON</button>
    <button @click="importXml">Import XML</button>

    <div v-if="showExportJson">
      <textarea rows="8" cols="38" v-model="exportJsonValue"></textarea>
    </div>

    <div v-if="showImportJson">
      <textarea rows="8" cols="38" v-model="jsonImportValue"></textarea>
      <br>
      <button @click="importJsonStart">Import</button>
      <br>
      <br>
    </div>

    <div v-if="showImportXml">
      <textarea rows="8" cols="38" v-model="xmlImportValue"></textarea>
      <br>
      <button @click="importXmlStart">Import</button>
      <br>
      <br>
    </div>
  </div>
</template>

<script>
import Word from '@/store/Word';
import Parser from '@/parser';

export default {
  name: 'ImportExport',
  data() {
    return {
      showExportJson: false,
      exportJsonValue: 'LOADING',
      showImportJson: false,
      jsonImportValue: 'Paste here...',
      showImportXml: false,
      xmlImportValue: 'Paste here...',
    };
  },
  props: {
    value: Array[Word],
  },
  mounted() {
    // browser.runtime.sendMessage({});
  },
  methods: {
    importJson() {
      this.showImportJson = !this.showImportJson;
      this.showExportJson = false;
      this.showImportXml = false;
    },
    importJsonStart() {
      this.$emit('input', JSON.parse(this.jsonImportValue));
    //   this.words = JSON.parse(this.jsonImportValue);
    },

    importXml() {
      this.showImportXml = !this.showImportXml;
      this.showImportJson = false;
      this.showExportJson = false;
    },
    importXmlStart() {
      const newWords = Parser.xmlToWords(this.xmlImportValue);
      const existingWords = new Map(this.value.map((word) => [word.token, word]));

      Object.values(newWords).forEach((newWord) => {
        if (!existingWords.get(newWord.token)) {
          existingWords.set(newWord.token, newWord);
        } else {
          existingWords.get(newWord.token).appearanceCount += newWord.appearanceCount;
        }
      });

      this.$emit('input', Array.from(existingWords.values()));
    //   this.words = Object.values(newWords);
    },

    exportJson() {
      this.showExportJson = !this.showExportJson;
      this.showImportJson = false;
      this.showImportXml = false;
      this.exportJsonValue = JSON.stringify(this.value);
    },
  },
  computed: {
  },
};
</script>

<style scoped>
</style>
