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
  
  function $ (selector, context) {
    context = context ? context : document;
    this.items = context.querySelectorAll(selector);
    
    this.addClass = function (cl) {
      this.items.each(function () {
        this.classList.add(cl);
      });
      return this;
    };
    
    this.remveClass = function (cl) {
      this.items.each(function () {
        this.classList.remove(cl);
      });
      return this;
    };
    
    return this;
  }
  
})();
