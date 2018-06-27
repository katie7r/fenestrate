(function() {


  $(document).ready(function() {
    window.onbeforeunload = function() {
      return 'Are you sure? You\'ll lose any changes you\'ve made.'
    };

    frame();
  });

  $(window).on('hashchange', route);

  // TODO allow adding, removing, and refreshing frames
  $(document)
    .on('keydown', handleKeydown)
    .on('click', '.rotate', rotateOne)
    .on('click', '#rotate-all', rotateAll)
    .on('click', '.set-custom', setCustom)
    .on('click', '#set-src', setSrc)
    ;

  function frame() {
    var $row = $('.devices.row');

    // TODO custom frames
    var devices = [
      { name: 'Tiny',         height: '480', width: '320' },
      { name: '< XS',         height: '527', width: '320' },
      { name: 'iPhone 5/SE',  height: '568', width: '320' },
      { name: 'iPhone 6/7/8', height: '667', width: '375' },
      { name: 'iPhone X',     height: '812', width: '375' },
      { name: 'iPad [?]',     height: '768', width: '1024' },
      { name: 'Large',        height: '569', width: '767' },
    ];

    $.each(devices, function(idx, device) {
      var $device, $heading, $iframe,
        src = $('#src').val() || '//127.0.0.1:4001';

      $device  = $('<div class="device column"></div>');
      $heading = $('<h6>' + device.name + '</h6>')
        .append('<small>' + device.width + ' x ' + device.height + '</small>')
        .append('<button class="rotate xs">~</button>');
      $iframe = $('<iframe src="' + src + '" width="' + device.width + '" height="' + device.height + '"></iframe>');


      $device.append($heading).append($iframe);
      $row.append($device);
    });
  }

  function handleKeydown(event) {
    if (event.key === 'Enter' && $('#src').is(':focus')) {
      setSrc(event);
    }
  }

  function rotate($iframe) {
    console.log($iframe);

    var height, width;

    height = $iframe.prop('height');
    width  = $iframe.prop('width');

    $iframe.prop('height', width);
    $iframe.prop('width', height);
    // $iframe.data('rotated', !$iframe.data('rotated')); // TODO something like this
  }

  function rotateOne(event) {
    var $iframe = $(event.target).closest('.device').find('iframe');
    rotate($iframe);
  }

  function rotateAll(event) {
    $('iframe').each(function(idx, iframe) {
      rotate($(iframe));
    });
  }

  function route(event) {
    // TODO stop anchor jump on active link click
    event.stopPropagation();

    var target = (window.location.hash) ? window.location.hash : "#main";
    $('.page').hide();
    $(target).show();

    $('.navbar-link').removeClass('active');
    $('.navbar-link[href="' + target + '"]').addClass('active');

    window.scrollTo(0, 0);
  }

  function setCustom(event) {
    event.stopPropagation();

    var $device, $iframe, height, width;
    $device = $(event.target).closest('.device');
    $iframe = $device.find('iframe');
    height  = $device.find('.custom-height').val();
    width   = $device.find('.custom-width').val();

    // TODO account for rotated or not in dimensions

    if (!$iframe.prop('src')) {
      $iframe.prop('src', $('#src').val());
    }

    $iframe
      // .prop('src',    $('#src').val())
      .prop('height', height)
      .prop('width',  width)
      .show();
  }

  function setSrc(event) {
    event.stopPropagation();
    $('iframe')
      .prop('src', '')
      .prop('src', $('#src').val());
  }
})();
