function Resize() {
  // Make sure cover scroll the window height after 200px of down-scroll.
  var height_size_px = $(window).height();
  var width_size_px = $(window).width();

  // Adjust menu.
  var menu = $('#menu');
  var menu_width = menu.attr('nominal-width');
  var title = $('#menu .title');
  var title_width = title.attr('nominal-width');
  title.css('margin-left', '10px');
  var title_margin_right = (width_size_px - menu_width - title_width - 10) / 2;
  if (title_margin_right < 20) {
    title.hide();
    menu.css('margin-left', ((width_size_px - menu.width()) / 2) + 'px');
  } else {
    title.show();
    menu.css('margin-left', '0px');
    title.css('margin-right', title_margin_right + 'px');
  }
  
  // Get content size.
  var content = $('#content');
  var content_left = (content.outerWidth() - content.width()) / 2;
  var content_width = content.width();
  var margin = content_left + content_width;
  // Adjust all enter left class.
  var divs = $('.enter_left');
  divs.attr('data-0-bottom-top', 'margin-left:-' + margin + 'px');
  divs.attr('data-0-center-center', 'margin-left:0px');
  // Adjust all enter right class.
  divs = $('.enter_right');
  divs.attr('data-0-bottom-top', 'margin-left:' + margin + 'px');
  divs.attr('data-0-center-center', 'margin-left:0px');
  // Adjust all appear_disappear class.
  divs = $('.appear_disappear');
  divs.attr('data-0-bottom-bottom', 'opacity:0');
  divs.attr('data-0-center-center', 'opacity:1');
  divs.attr('data-0-top-top', 'opacity:0');
  // Adjust all appear class.
  divs = $('.appear');
  divs.attr('data-0-bottom-bottom', 'opacity:0');
  divs.attr('data-0-center-center', 'opacity:1');
  // Adjust all image_cut class.
  divs = $('.image_cut');
  divs.height(width_size_px * 0.25);
  divs.css('margin-left', '-' + content_left + 'px');
  divs.css('margin-right', '-' + content_left + 'px');
  divs.attr('data-0-top-bottom', 'background-position:0% 0%');
  divs.attr('data-0-bottom-top', 'background-position:0% 100%');
  // Adjust auto_image.
  $('.auto_image').each(function() {
    var anchor = $(this).attr('anchor');
    var max_width = $(this).attr('max_width');
    var inner_width = Math.min(600, width_size_px - 40);
    var inner_margin = (width_size_px - inner_width) / 2;
    var width;
    var padding;
    if (anchor == 'left') {
      padding = 0;
      width = inner_width + inner_margin;
      if (max_width !== undefined && width > max_width) {
        width = max_width;
      }
    } else if (anchor == 'right') {
      padding = inner_margin;
      width = inner_width + inner_margin;
      if (max_width !== undefined && width > max_width) {
        width = max_width;
        padding = width_size_px - width;
      }
    } else {
      if (max_width !== undefined && inner_width > max_width) {
        padding = (inner_width - max_width) / 2 + inner_margin;
        width = max_width;
      } else {
        padding = inner_margin;
        width = inner_width;
      }
    }
    $(this).css('width', width + 'px');
    $(this).css('margin-left', '-20px');
    $(this).css('padding-left', padding + 'px');
  });
  $('.position').each(function() {
    var position = $(this).attr('position');
    var width = $(this).attr('width');
    if (width === undefined)
      width = 0;
    var inner_width = Math.min(600, width_size_px - 40);
    var inner_margin = (width_size_px - inner_width) / 2;
    var padding = inner_margin + inner_width * position - width / 2;
    $(this).css('padding-left', padding + 'px');
  });
  var s = skrollr.init();
}

function GetQueryParams() {
  qs = document.location.search.split('+').join(' ');
  var params = {};
  var tokens;
  var re = /[?&]?([^=]+)=([^&]*)/g;
  while (tokens = re.exec(qs)) {
    params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
  }
  return params;
}

$(document).ready(function() {
  // Store the width of elements that might disappear.
  var menu = $('#menu');
  menu.attr('nominal-width', menu.width());
  var title = $('#menu .title');
  title.attr('nominal-width', title.width());
  // Activate buttons.
  $('.button').each(function() {
    var where = $(this).attr('where');
    if (where !== undefined) {
      // Account for menu bar.
      $(this).click(function() { $('html, body').animate({ scrollTop: $(where).offset().top - 60 }, 300); });
    } else {
      $(this).click(function() { window.location = '../index.html?anchor=' + $(this).attr('where-main'); });
    }
  });
  Resize();
  // Do we need the scroll somewhere?
  query = GetQueryParams();
  if (query.anchor !== undefined) {
    $('html, body').animate({ scrollTop: $(query.anchor).offset().top }, 300);
  }
});

$(window).resize(function() {
  Resize();
});