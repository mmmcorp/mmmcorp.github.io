(function ($) {

  // Caption
  $('.article-entry').each(function (i) {
    $(this).find('img').each(function () {
      if ($(this).parent().hasClass('fancybox')) return;
      var alt = this.alt;
      if (alt) $(this).after('<span class="caption">' + alt + '</span>');
      $(this).wrap('<a href="' + this.src + '" title="' + alt + '" class="fancybox"></a>');
    });

    $(this).find('.fancybox').each(function () {
      $(this).attr('rel', 'article' + i);
    });
  });

  if ($.fancybox) {
    $('.fancybox').fancybox();
  }

  // Navigation
  $('.Nav > ul > li:has( > ul)').addClass('Nav__dropdown--parent');

  $('.Nav > ul > li > ul:not(:has(ul))').addClass('Nav__dropdown--child');

  $(".Header__content").before("<button aria-label=\"メニュー\" class=\"Nav__mobile\" ><span></span><span></span><span></span></button>");
  $(".Nav > ul > li").hover(function (e) {
    if ($(window).width() > 960) {
      $(this).children("ul").stop(true, false).toggleClass('Nav__list--child-display');
      e.preventDefault();
    }
  });

  $(".Nav__dropdown--parent-link").click(function (e) {
    if ($(window).width() <= 959) {
      $(this).parent("li").toggleClass('Nav__dropdown--parent-close');
      $("ul.Nav__list--child").fadeToggle(200);
      e.preventDefault();
    }
  });

  $(".Nav__mobile").click(function (e) {
    $(".Nav > ul").toggleClass('Nav__list--show');
    $(".Nav__mobile").toggleClass('Nav__mobile-close');
    e.preventDefault();
  });


  if (location.pathname != "/") {
    $('.Nav__list--item a[href^="/' + location.pathname.split("/")[1] + '"]').addClass('active');
  } else $('.Nav__list--item a:eq(0)').addClass('active');

  $('a[href^="#"]').click(function () {
    var speed = 500;
    var href = $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top;
    $("html, body").animate({ scrollTop: position }, speed, "swing");
    return false;
  });

  // Footer
  var offset = '100',
    footer = $(document).height() - $(window).height();

  $(window).scroll(function () {
    var scroll_top = $(window).scrollTop(),
      main = 100;
    if (scroll_top <= offset) {
      $('.Footer__top').removeClass('is-fixed');
    } else if (scroll_top > main) {
      $('.Footer__top').addClass('is-fixed');
    }
  });

})(jQuery);