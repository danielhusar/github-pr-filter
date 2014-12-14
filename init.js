(function(window, document, undefined){
  'use strict';

  var $ = window.jQuery;

  function init () {
  }

  init();
  if ($('#js-repo-pjax-container').length) {
    new window.MutationObserver(init).observe(document.querySelector('#js-repo-pjax-container'), {childList: true});
  }

})(this, this.document);
