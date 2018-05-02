(function() {

  $(document).ready(frame);

  // TODO allow adding, removing, and refreshing frames
  $(document)
    .on('click', '.rotate', rotate)
    .on('click', '#set-src', setSrc);

  $(window).on('hashchange', route);


  function frame() {
    // TODO flexible frames
    var devices = [
      { name: 'iPhone 5/SE',  height: '568', width: '320' },
      { name: 'iPhone 6/7/8', height: '667', width: '375' },
      { name: 'iPhone X',     height: '812', width: '375' },
      // { name: '', height: '', width: '' },
      // { name: '', height: '', width: '' },
      // { name: '', height: '', width: '' },
    ];

    var $row = $('.devices.row');

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

  function rotate(event) {
    var height, width,
      $iframe = $(event.target).closest('.device').find('iframe');

    height = $iframe.prop('height');
    width  = $iframe.prop('width');

    $iframe.prop('height', width);
    $iframe.prop('width', height);
  }

  function route() {
    var target = (window.location.hash) ? window.location.hash : "#main";
    $('.page').hide();
    $(target).show();
    console.log(target);

    $('.navbar-link').removeClass('active');
    $('.navbar-link[href="' + target + '"]').addClass('active');
  }

  function setSrc(event) {
    event.stopPropagation();
    $('iframe').prop('src', $('#src').val());
  }
})();
