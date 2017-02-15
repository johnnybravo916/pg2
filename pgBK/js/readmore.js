//READ MORE
  var showChar = 200;
  var ellipsestext = "...";
  var moretext = "Read more";
  var lesstext = "Read less";

  $('.more').each(function() {
      var content = $(this).html();
      if(content.length > showChar) {
          var c = content.substr(0, showChar);
          var h = content.substr(showChar, content.length - showChar);
          var html = c + '<span class="moreellipses">' + ellipsestext+ '&nbsp;</span><span class="morecontent"><span>' + h + '</span><div class="morelink">' + moretext + '</div></span>';
          $(this).html(html);
      }
  });

  $(".comment-item--details").click(function(){
      if($(this).children('.more').hasClass("less")) {
          $(this).children('.more').removeClass("less");
          $(this).children().children('.morelink').html(moretext);
      } else {
          $(this).children('.more').addClass("less");
          $(this).children().children('.morelink').html(lesstext);
      }
      $(this).children('.more').children().children('.moreellipses').toggle();
      $(this).children('.more').children().children('.morecontent').children('span').toggle();
      return false;
  });