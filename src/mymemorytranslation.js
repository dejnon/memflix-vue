import axios from 'axios';

class MyMemoryTranslation {
  static extractTranslations(results) {
    return (results.data.matches)
      // filter((match) => match.match >= 0.99).
      .map((source) => source.translation);
    // .uniqBy((token) => token.toLowerCase())
    // .compact()
    // .value();
  }

  static get(wordToTranslate, sourceLanguageCode, targetLanguageCode) {
    const url = 'https://api.mymemory.translated.net/get?'
                + `langpair=${sourceLanguageCode}|${targetLanguageCode}&`
                + 'de=test@testy.xx&'
                + `q=${wordToTranslate}&`
                + 'of=json';
    return axios.get(url)
      .then((results) => ({
        word: wordToTranslate,
        translations: this.extractTranslations(results),
      }))
      .catch((error) => {
        console.log(error);
        return error;
      });
  }
}

export default MyMemoryTranslation;
