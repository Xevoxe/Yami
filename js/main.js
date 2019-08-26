
//
document.addEventListener("DOMContentLoaded", function(){
    // Handler when the DOM is fully loaded
document.read
let resizeId;

window.onresize= ()=> {
    clearTimeout(resizeId);
    resizeId= setTimeout(resizeReload,250);
};

window.onbeforeunload = ()=>{
    // window.scrollTo(0,0);
}

const resizeReload = ()=> {
    location.reload(true);
}
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