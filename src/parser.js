/* eslint-disable keyword-spacing */
/* eslint-disable no-multi-spaces */
/* eslint-disable quotes */
/* eslint-disable prefer-const */
/* eslint-disable dot-location */
/* eslint-disable no-new-object */
/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-useless-escape */
import Word from '@/store/Word';

class Parser {
  static stripKey(word) {
    let key = word.
      replace(/[\`\'\-\(\)]+/, '').
      replace(/s$/, '').
      toLowerCase();
    if (key.length <= 1 || key.match(/[0-9]/)) return;
    return key;
  }

  static extractWords(tag) {
    return tag.
      innerHTML.
      replace(/<br/g, " <br").
      replace(/<\/?[^>]+(>|$)/g, '').
      replace(/[\.\,\!\[\]\?\"]+/g, '').
      split(" ");
  }

  static xmlToWords(rawText) {
    let parser       = new DOMParser();
    let xmlDoc       = parser.parseFromString(rawText.trim(), "text/xml");
    let allLineNodes = xmlDoc.getElementsByTagName("p");
    let uniqWords    = new Object();

    for (let lineNode of allLineNodes) {
      for (let rawWord of Parser.extractWords(lineNode)) {
        let wordKey = Parser.stripKey(rawWord);
        if(!wordKey) continue;
        if(!uniqWords[wordKey]) {
          uniqWords[wordKey] = new Word(rawWord, rawWord.replace(/^-/, ''));
        } else {
          uniqWords[wordKey].appearanceCount++;
        }
      }
    }
    return uniqWords;
  }
}

export default Parser;
