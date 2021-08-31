/* eslint-disable vars-on-top */
/* eslint-disable no-var */
console.log('INJECT');

var actualCode = `
console.log("INJECTED CODE");
(function() {
  var origOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function() {
    this.addEventListener('load', function() {
      console.log("matching....");
      if (!this.responseURL.match(/\\/\\?o\\=/g)) return;
      console.log(this);
      var event = new MessageEvent('memflix', {data: this.responseText});
      document.dispatchEvent(event);
      console.log("event set!");
    });
    origOpen.apply(this, arguments);
  };
})();
`;

document.addEventListener('memflix', (data) => {
  console.log('Sending...');
  chrome.runtime.sendMessage({ data: data.data });
});

var script = document.createElement('script');
script.textContent = actualCode;
(document.head || document.documentElement).appendChild(script);
script.remove();
