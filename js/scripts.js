$(document).ready(function() {
//HEADER CLOSE
  $('.login-header .js-close').click(function(){
    $('.login-header').addClass('js-hideme animate');
  });
//FANCYBOX
  $(".fancybox").fancybox({
      padding:0,
      helpers: { 
          title: null
      }
  });
//HOMEPAGE POST ITEMS
  size_li = $(".post-item--wrap .post-item--loader").size();
  x=8;
  $('.post-item--wrap .post-item--loader:lt('+x+')').each(function(index) {
    $(this).delay(400*index).fadeIn(300);
  });
  //$('.post-item--wrap .col-md-6:lt('+x+')').fadeIn();
  $('.js-loadmore').click(function () {
      x= (x+4 <= size_li) ? x+4 : size_li;
    $('.post-item--wrap .post-item--loader:lt('+x+')').each(function(index) {
      $(this).delay(400*(index - 8)).fadeIn(300);
    });
  }); 
  
  size_yammer = $(".box-aside.box-yammer .yammer-post").size();
  y=2;
  $('.box-aside.box-yammer .yammer-post:lt('+y+')').fadeIn();
  $('.yammer-load').click(function () {
      y= (y+2 <= size_yammer) ? y+2 : size_yammer;
      $('.box-aside.box-yammer .yammer-post:lt('+y+')').fadeIn();
  });   
//HOME PAGE FEATURED
  if($('.post-main--content').length > 0){
    function mainImage(){
      var mainImageHeight = $('.post-main--content').height() + 60;
      if (mainImageHeight > 450){
        $('.carousel-wrap').css({'height': mainImageHeight}); 
        $('.post-main--image').css({'height': mainImageHeight}); 
      } else {
        $('.carousel-wrap').css({'height': 450});
        $('.post-main--image').css({'height': 450});
      }      
    }
    mainImage();
    $(window).resize(function () {
      mainImage();
    });
  }  
//VIDEO TAG
  if($('.post-featured--video').length > 0){
    $('.post-featured--video').click(function(){
      $(this).hide();
      $('video').get(0).play();
      toggleControls();
    });
    var video = $('video')[0];
    video.addEventListener('pause', function(){
       $('.post-featured--video').show();
       toggleControls();
    });
    video.addEventListener('playing', function(){
       $('.post-featured--video').hide();
    });
    function toggleControls() {
      if (video.hasAttribute("controls")) {
         video.removeAttribute("controls")   
      } else {
         video.setAttribute("controls","controls")   
      }
    }
  }  
//SCROLLPANE
   jQuery('.scroll-pane').jScrollPane({
        autoReinitialise: true
     });
//FLEXSLIDER
  $(window).load(function(){
    $('.flexslider').flexslider({
      animation: "slide",
      start: function(slider){
        $('.carousel-wrap').removeClass('js-loading');
      }
    });
  });
//ARTICLE WITH SMALL IMAGE  
  function articleSmall(){
    var containerWidth = $('.container .col-md-8').width();
    var maincontainerWidth = $('.container').width();
    var mainWidth = $(window).width();
    var margins = (mainWidth - maincontainerWidth)/2;
    var correctedMargin = margins + containerWidth;
    $('.media-small').css({'width': correctedMargin})
    setTimeout(function(){
      var jsImageHeight = $('.carousel-wrap').height();
      $('.post-article').animate({'margin-top':jsImageHeight, 'opacity':1});
    }, 500);
  }
  if($('.js-imageSmall').length > 0){
    articleSmall();
    $(window).resize(function () {
      articleSmall();
    });
  }  
//MOBILE ARTICLE HACK
  if($('.post-article--interested').length > 0){
    var postInterested = $('.post-article--interested').html();
    var mobilePostInterested = $('.js-interested').html(postInterested);
  }  
  
//STICKY ASIDE
  function stickyAside(){
    $(window).scroll(function(){
        var offsetHeight = $('.post-featured--media').height() + $('.header-main').height() + $('.login-header').height() + 20;
        var asideWidth = $('.aside-wrapper.aside-article').width();
          if ($(this).scrollTop() > offsetHeight) {
              $('.js-aside').css({'width': asideWidth});
              $('.js-aside').addClass('js-sticky');
          } else {
              $('.js-aside').removeClass('js-sticky');
          }
      });
  }
  if($('.post-featured--media').length > 0){
    stickyAside();
    $(window).resize(function () {
      stickyAside();
    });
  }  
});