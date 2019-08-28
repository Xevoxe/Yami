"use-strict";
let slides = [{
    img: ["img/carousel/uprooter.jpg"],
    title: "Latest Concept Art",
    caption: "Uprooter"
},
{
    img: ["img/carousel/BrothersConcepts.jpg"],
    title: "Meet the Brothers",
    caption: "Yuki and Yuro",
}];

//First I need to attach the data to the elements
/**********************************
@Param document
@param srcElmt - Div where the plugin will be placed.
@param data - Array of data that containe images,title,caption
***********************************/
let carousel_plugin = (document,srcElmt,data) =>{
    let slider = function(){
        this.elmt = document.getElementById(srcElmt);
        // this.init = this.init.bind(this);
        this.init();
    }

    slider.prototype.init = function(){
        console.log(data);
        let html = "";
        html += `<div class="carousel" class="slides">`;
        html += data.map((slide,index)=>{
            let elmt = "";
            elmt +=`<picture>`;
            elmt +=`<img class="slide" src=\"${slide.img[0]}\">`;
            elmt +=`</picture>`;
            return elmt;
        }).join("");
        console.log(html);
        html += `<div id="slide-info">`
                +`<span class="slider-title">Latest Concept Art</span>`
                +`<span class ="slider-desc">Concept of the Uprooter!</span>`
                +`<div>`;
        html +=`</div>`;
        this.elmt.innerHTML = html;
    };

    return new slider;
};

  const corousel = carousel_plugin(document,"slider",slides);
