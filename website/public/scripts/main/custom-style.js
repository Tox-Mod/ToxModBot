function imgError(place) {
    place.src='https://toxmod.xyz/images/5D72D446-8F49-43B2-8924-A2E1CA45AC01.gif';
}

function backImgError(place) {
    place.src='images/ToxModBanner.jpg';
}




var $info = $('.tooltip');
$info.each( function () {
  var dataInfo = $(this).data("tooltip");
  $( this ).append('<span class="inner" >' + dataInfo + '</span>');
});
  
$('body').toggleClass('loaded');
$(document).ready(function() {
 
    setTimeout(function(){
        $('body').addClass('loaded');
        $('h1').css('color','#222222');
    }, 250);
 
});
