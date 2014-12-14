(function (window, document) {
  'use strict';

  var s = document.createElement('script');
  s.src = chrome.extension.getURL('init.js');
  s.onload = function () {
    this.parentNode.removeChild(this);
  };

  (document.head || document.documentElement).appendChild(s);

})(this, this.document);
