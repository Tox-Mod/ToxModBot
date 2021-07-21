/**
* 
* Website Copyright (c) Toxic Development | github.com/TheRealToxicDev
*
*/

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
   }
   return "";
}
    

function theme() {
    if(getCookie("theme") == "dark"){
    document.cookie = "theme=light; expires=Tue, 19 Jan 2038 03:14:07; path=/"
    window.location.href=window.location.href
    }else if(getCookie("theme") == "light"){
    document.cookie = "theme=dark; expires=Tue, 19 Jan 2038 03:14:07; path=/"
    window.location.href=window.location.href
    }else{
    document.cookie = "theme=dark; expires=Tue, 19 Jan 2038 03:14:07; path=/"
    window.location.href=window.location.href
  }
}