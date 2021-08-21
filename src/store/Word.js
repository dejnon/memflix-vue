class Word {
  constructor(
    label, token, translations = [], appearanceCount = 0, shownCount = 0, repeatCount = 0,
  ) {
    this.label = label;
    this.token = token;
    this.appearanceCount = appearanceCount;
    this.shownCount = shownCount;
    this.repeatCount = repeatCount;
    this.translations = translations;
  }
}

// class WordCollection {
//   constructor(words, wordIndex = 0) {
//     this.words = words;
//     this.wordIndex = wordIndex;
//   }
// }

export default Word;
