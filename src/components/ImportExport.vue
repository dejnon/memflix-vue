<template>
  <md-bottom-bar>
    <md-bottom-bar-item md-label="Export JSON" md-icon="download" @click="exportJson"/>
    <md-bottom-bar-item md-label="Import JSON" md-icon="upload" @click="importJson"/>
    <md-bottom-bar-item md-label="Import XML" md-icon="upload" @click="importXml"/>
    <md-bottom-bar-item md-label="Export to Browser" md-icon="download" @click="exportBrowser"/>
    <div v-if="showExportJson">
      <md-field>
        <md-textarea rows="8" cols="38" v-model="exportJsonValue"/>
      </md-field>
    </div>

    <div v-if="showImportJson">
      <md-field>
        <md-textarea rows="8" cols="38" v-model="jsonImportValue"/>
      </md-field>
      <md-button class="md-raised md-primary" @click="importJsonStart">Import</md-button>
    </div>

    <div v-if="showImportXml">
      <md-field>
        <md-textarea rows="8" cols="38" v-model="xmlImportValue"/>
      </md-field>
      <md-button class="md-raised md-primary" @click="importXmlStart">Import</md-button>
    </div>
  </md-bottom-bar>
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
    words: Array[Word],
  },
  mounted() {
    // browser.runtime.sendMessage({});
  },
  methods: {
    exportBrowser() {
      chrome.storage.local.set(
        { words: this.words },
      );
      this.$emit('savedWords', this.words);
    },
    importJson() {
      this.showImportJson = !this.showImportJson;
      this.showExportJson = false;
      this.showImportXml = false;
    },
    importJsonStart() {
      this.$emit('newImport', JSON.parse(this.jsonImportValue));
    //   this.words = JSON.parse(this.jsonImportValue);
    },

    importXml() {
      this.showImportXml = !this.showImportXml;
      this.showImportJson = false;
      this.showExportJson = false;
    },
    importXmlStart() {
      const newWords = Parser.xmlToWords(this.xmlImportValue);
      this.$emit('newWords', newWords);
    //   this.words = Object.values(newWords);
    },

    exportJson() {
      this.showExportJson = !this.showExportJson;
      this.showImportJson = false;
      this.showImportXml = false;
      this.exportJsonValue = JSON.stringify(this.words);
    },
  },
  computed: {
  },
};
</script>

<style scoped>
</style>
