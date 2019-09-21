

function getPosition(el) {
    var xPos = 0;
    var yPos = 0;
   
    while (el) {
      if (el.tagName == "BODY") {
        // deal with browser quirks with body/window/document and page scroll
        var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
        var yScroll = el.scrollTop || document.documentElement.scrollTop;
   
        xPos += (el.offsetLeft - xScroll + el.clientLeft);
        yPos += (el.offsetTop - yScroll + el.clientTop);
      } else {
        // for all other non-BODY elements
        xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
        yPos += (el.offsetTop - el.scrollTop + el.clientTop);
      }
   
      el = el.offsetParent;
    }
    return {
      x: xPos,
      y: yPos
    };
  }

document.addEventListener("DOMContentLoaded", function(){


const stickyElement = (className,element,parrallax) =>{
    
    let elmt = document.getElementById(element);
    let offSet = elmt.offsetHeight * .10;
    let stickyPos = getPosition(elmt).y - (window.screen.height * parrallax);

    return function () {
        let scrollPos = (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0);
        if(scrollPos  > stickyPos + offSet){
            elmt.classList.add(className);
        }else{
            elmt.classList.remove(className);
        }
    }
}


let logo = document.getElementById("logo");
let navwrapper = document.getElementById("nav-wrapper");
let stickyplayer = document.getElementById('sticky-player-pos');
let audiopluginpos = document.getElementById('audio-plugin-pos');
let audioplugin = document.getElementById('audio-plugin');

const handleScrollEvent = (evt) =>{

    stickynav();
    stickyfooter();

    if(stickyaudio){
      stickyaudio();

      if(audioplugin.classList.contains("sticky-audio")){
        stickyplayer.appendChild(audioplugin);
    }else {
        audiopluginpos.appendChild(audioplugin);
    }
    }
    if(navbar.classList.contains("sticky-nav")){
        logo.classList.remove('hidden');
    }else{
        logo.classList.add('hidden');
        if(audiopluginpos){
          audiopluginpos.appendChild(audioplugin);
        }
    }

}
// const stickyFooter = stickyElement(,"footer-img");
let stickyaudio;

let stickynav = stickyElement("sticky-nav","nav-wrapper",0);
let stickyfooter = stickyElement("sticky","footer-img",.50)
if(stickyplayer){
  stickyaudio = stickyElement("sticky-audio", "audio-plugin",0)
}

let navbar = document.getElementById("nav-wrapper");

document.addEventListener("scroll", handleScrollEvent);

});


window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }