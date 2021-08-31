/* eslint-disable no-unused-vars */
import Parser from '@/parser';

console.log('we have listener!');

chrome.runtime.onMessage.addListener((newRequest, sender, sendResponse) => {
  const newWords = Parser.xmlToWords(newRequest.data);
  console.log(newWords);

  chrome.storage.local.set(
    { incomingWords: newWords },
  );

  console.log('saved!');

  return true; // Keep the channel open
});
