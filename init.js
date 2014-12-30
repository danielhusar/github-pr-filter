(function(window, document, $, undefined){
  'use strict';

  var config = {
    images: ['jpg', 'jpeg', 'bmp', 'png', 'gif'],
    videos: ['avi', 'mp4', 'webm', 'flv', 'mkv'],
    html: ['html', 'erb', 'swig', 'jade', 'hbs'],
    css: ['css', 'less', 'sass', 'scss', 'styl'],
    javascript: ['js', 'coffee']
  };
  var dotfiles = false;

  function filename (str) {
    return str.replace(/^.*(\\|\/|\:)/, '');
  }

  function init () {
    if ($('#filter-nav').length > 0) {
      return;
    }

    var nav = '<div class="subnav-links" id="filter-nav" style="overflow: hidden; width: 100%; margin-top: 20px; text-transform: uppercase; letter-spacing: 1px;">';
    nav += '<a href="#" class="subnav-item selected" data-all="true">All</a>';

    var items = $('.info .js-selectable-text')
                  .map(function () {
                    var name = filename($(this).attr('title'));
                    dotfiles = name[0] === '.';
                    return /[^.]+$/.exec(name);
                  })
                  .splice(0)
                  .filter(function (e, i, arr) {
                    return arr.lastIndexOf(e) === i;
                  });

    items.forEach(function (el) {
      nav += '<a href="#" class="subnav-item">' + el + '</a>';
    });
    if (dotfiles) {
      nav += '<a href="#" class="subnav-item" data-dotfiles="true">Dotfiles</a>';
    }
    nav += '</div>';

    $('#toc').append(nav);

    events();
    filter();

  }

  function events () {
    $('#toc').off('click.filter').on('click.filter', '.subnav-item', function (e) {
      e.preventDefault();
      var $this = $(this);

      if ($this.data('all')) {
        $this.siblings().removeClass('selected');
        $('[data-all]').addClass('selected');
        return;
      }

      $('[data-all]').removeClass('selected');
      $this.toggleClass('selected');
    });
  }

  function filter () {

  }

  init();
  if ($('#js-repo-pjax-container').length) {
    new window.MutationObserver(init).observe(document.querySelector('#js-repo-pjax-container'), {childList: true});
  }

})(this, this.document, this.jQuery);
