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

    let slider = function() {
        this.init = init.bind(this);
        this.prev = prev.bind(this);
        this.next = next.bind(this);
        this.createView = createView.bind(this);
        this.setSlide = setSlide.bind(this);
        this.mobile = document.documentElement.clientWidth < 576 ? true : false;
        this.caption = {}
        this.activeSlide = 0;
        this.init();
    };
    
    const init = function (){
                console.log(this);
                this.elmt = document.getElementById(srcElmt);
                console.log(this.elmt);
                let wrapper = document.createElement("DIV");
                wrapper.className='slider'; 
                
                this.slides = data.map((slide,index)=>{
                    let elmt = document.createElement('PICTURE');
                    elmt.setAttribute("data-title", slide.title);
                    elmt.setAttribute("data-caption", slide.caption);
                    let imageElmt = document.createElement('IMG');
                    imageElmt.className = "slide";
                    imageElmt.setAttribute("src",slide.img[0]);

                    elmt.appendChild(imageElmt);
                    return elmt;
                });
    
                let prev = document.createElement('DIV');
                prev.className='slider-btn-prev';
                prev.addEventListener('click', this.prev);
    
                let next = document.createElement('DIV');
                next.className ='slider-btn-next';
                next.addEventListener('click', this.next);

            this.slides.forEach((slide)=>{
                wrapper.appendChild(slide);
            })
            wrapper.appendChild(prev);
            wrapper.appendChild(next);

            this.captionView = createView(); 

            //Set up first slide
            this.setSlide(0);
            this.elmt.appendChild(wrapper);
            this.elmt.appendChild(this.captionView);  
    }

    const prev = function (){
        this.setSlide(this.activeSlide - 1);
    }
    const next = function (){
        this.setSlide(this.activeSlide + 1);
    }

    const setSlide = function (slideIndex){
        if (slideIndex < 0){
            slideIndex += this.slides.length;
        }

        if(slideIndex > this.slides.length - 1){
            slideIndex -= this.slides.length;
        }
        if(this.slides[this.activeSlide]){
            this.slides[this.activeSlide].children[0].classList.remove('active');
        }
        this.slides[slideIndex].children[0].classList.add('active');
        this.activeSlide = slideIndex;

        this.captionView.children[0].innerHTML = this.slides[slideIndex].getAttribute('data-title');
        this.captionView.children[1].innerHTML = this.slides[slideIndex].getAttribute('data-caption');
        

    }

    const createView = function (){
        let wrapper = document.createElement('DIV');
        wrapper.className = "slide-info";
        let title = document.createElement('SPAN');
        title.className="slide-title";
        let caption = document.createElement('SPAN');
        caption.className = "slide-caption";    
        wrapper.appendChild(title);
        wrapper.appendChild(caption);
        return wrapper;
    }

    return new slider;
};

  const corousel = carousel_plugin(document,"hero-slider",slides);
