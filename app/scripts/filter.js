(function () {
  'use strict';
  
  var settings = {
    'images': ['jpeg', 'jpg', 'png', 'gif'],
    'videos': ['mp4', 'webm'],
    'html': ['html', 'erb'],
    'styles': ['css', 'sass', 'scss', 'less', 'styl'],
    'javascript': ['js', 'coffee'],
    'ruby': ['rb', 'ru'],
    'python' : ['py']
  };

  function jQuery(selector) {
    this.el = [].slice.call(document.querySelectorAll(selector));
    this.length = this.el.length;
    return this;
  }
  
  jQuery.prototype = {
    each: function(fn) {
      this.el.forEach(function (element, index) {
        fn.apply(element, [element, index]);
      });
      return this;
    }
  };
  
  function $(selector) {
    return new jQuery(selector);
  }

  
})();
