
let nav = document.getElementById('navigation');
let logo = document.getElementById('logo-wrapper');
const handleScroll = ()=>{

  if(document.documentElement.scrollTop === 0){
    nav.classList.remove('sticky-nav');
    logo.classList.add('hidden');
    logo.classList.remove('show');
  }else
  {
    nav.classList.add('sticky-nav');
    logo.classList.add('show');
    logo.classList.remove('hidden');
    
  }
}

let navBar = document.getElementById('nav-bar');

const toggleMobileNav = (navBar) =>{
  return function toggle (e){
    if(navBar.classList.contains('active')){
      navBar.classList.remove('active');
    }else{
      navBar.classList.add('active');
    }
  }
}

let handleToggle = toggleMobileNav(navBar);
document.addEventListener('scroll', handleScroll);






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

  //Refactor later
document.addEventListener("DOMContentLoaded", function(){
 
  let mobileNav = document.getElementById('mobile-nav-btn');
  let styles = window.getComputedStyle(mobileNav);
if(!(styles.getPropertyValue('display') === 'none')){
  //Add click listener
  mobileNav.addEventListener('click',handleToggle);
}

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

let navigation = document.getElementById('navigation');


const scrollParallax = function (element){
    let transformOffset = 0;
    let posY = element.getBoundingClientRect().y;
    function parallax (e){
      let newPosY = element.getBoundingClientRect().y;
      transformOffset = (posY - newPosY ) * .50;
      element.style.transform = `translate3d(0px, ${transformOffset}px, 0px)`;
  }

  return parallax;
}



const handleParallax = (entries)=>{
  let target = entries[0];
  //add scroll event listener to document
  if(target.isIntersecting){
    document.addEventListener('scroll',handleParallaxEvt);
  }
  else{
    document.removeEventListener('scroll',handleParallaxEvt);
  }

};


//Parallax observer
let options = {
rootMargin: "0px",
threshhold: [0,1]
};
let target = document.getElementById('parallax-item');
let handleParallaxEvt = new scrollParallax(target);
let parallaxObserver = new IntersectionObserver(handleParallax, options);

parallaxObserver.observe(target);

let aplayer = audioplayer_plugin(document,"audio-plugin",data);

});





window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };


