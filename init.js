(function(window, document, undefined){
  'use strict';

  var $ = window.jQuery;
  
  var config = {
    images: ['jpg', 'jpeg', 'bmp', 'png', 'gif'],
    videos: ['avi', 'mp4', 'webm', 'flv', 'mkv'],
    css: ['css', 'less', 'sass', 'scss', 'styl'],
    javascript: ['js', 'coffee'],
    html: ['html', 'erb', 'swig', 'jade', 'hbs']
  };

  function init () {

    if ($('#filter-nav').length > 0) {
      return;
    }

    var nav = '<div class="subnav-links" id="filter-nav" style="overflow: hidden; width: 100%; margin-top: 20px; text-transform: uppercase; letter-spacing: 1px;">';
    nav += '<a href="#" class="subnav-item selected" data-all="true">All</a>';

    var items = $('.info .js-selectable-text')
                  .map(function () {
                    return /[^.]+$/.exec($(this).attr('title'));
                  })
                  .splice(0)
                  .filter(function (e, i, arr) {
                    return arr.lastIndexOf(e) === i;
                  });

    items.forEach(function (el) {
      nav += '<a href="#" class="subnav-item">' + el + '</a>';
    });
    nav += '</div>';

    $('#toc').append(nav);

  }

  init();
  if ($('#js-repo-pjax-container').length) {
    new window.MutationObserver(init).observe(document.querySelector('#js-repo-pjax-container'), {childList: true});
  }

})(this, this.document);
