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
  var dotfilesArr = [];

  /*
  Get the filename from url
   */
  function filename (str) {
    return str.replace(/^.*(\\|\/|\:)/, '');
  }

  /*
  Build the html fot the navigation
   */
  function init () {
    if ($('#filter-nav').length > 0) {
      return;
    }

    var nav = '<div class="subnav-links" id="filter-nav" style="overflow: hidden; width: 100%; margin-top: 20px; text-transform: uppercase; letter-spacing: 1px;">';
    nav += '<a href="#" class="subnav-item selected" data-all="true">all</a>';

    var items = $('.info .js-selectable-text')
                  .map(function () {
                    var name = filename($(this).attr('title'));
                    var ext = name.split('.').pop();
                    if (name[0] === '.') {
                      dotfilesArr.push(ext);
                      return 'dotfiles';
                    } else {
                      return getExt(ext);
                    }
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

    events();
  }

  /*
    Get file extension from group
   */
  function getExt (ext) {
    var curretnExt = ext;
    $.each(config, function (key, el) {
      if (el.indexOf(ext) !== -1) {
        curretnExt = key;
      }
    });
    return curretnExt;
  }

  /**
   * Bind events on navigation
   * @return {void}
   */
  function events () {
    $('#toc').off('click.filter').on('click.filter', '.subnav-item', function (e) {
      e.preventDefault();
      var $this = $(this);

      if ($this.data('all')) {
        $this.siblings().removeClass('selected');
        $('[data-all]').addClass('selected');
      } else {
        $('[data-all]').removeClass('selected');
        $this.toggleClass('selected');
      }

      if ($('#filter-nav .selected').length === 0) {
        $('[data-all]').trigger('click.filter');
      }

      filter();
    });
  }

  /*
    Filter the items
   */
  function filter () {
    $('[data-path]').parent().addClass('hidden');
    $('#filter-nav .selected').each(function () {
      var item = $(this).text();

      if (item === 'all') {
        $('[data-path]').parent().removeClass('hidden');
        return false;
      }

      if (item === 'dotfiles') {
        $.each(dotfilesArr, function (key, el) {
          $('[data-path$=".'+ el +'"]').parent().removeClass('hidden');
        });
      }

      $('[data-path$=".' + item + '"]').parent().removeClass('hidden');
      if(config[item]) {
        $.each(config[item], function (key, el) {
          $('[data-path$=".' + el + '"]').parent().removeClass('hidden');
        });
      }

    });
  }

  init();
  if ($('#js-repo-pjax-container').length) {
    new window.MutationObserver(init).observe(document.querySelector('#js-repo-pjax-container'), {childList: true});
  }

})(this, this.document, this.jQuery);
