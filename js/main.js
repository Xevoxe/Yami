
//
document.addEventListener("DOMContentLoaded", function(){

const stickyElement = (pos,element) =>{
    let stickyPos = document.getElementById(element).offsetTop - document.documentElement.clientHeight * pos;
    let elmt = document.getElementById(element);
    return function () {
        let scrollPos = window.pageYOffset;
        // console.log(scrollPos);
        // console.log(`Sticky = ${stickyPos}`)
        if(scrollPos >= stickyPos){
            elmt.classList.add("sticky");
        }else{
            elmt.classList.remove("sticky");
        }
    }
}

const stickyFooter = stickyElement(.50,"footer-img");

document.addEventListener("scroll", stickyFooter);
});