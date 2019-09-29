
/*
@param numDisplay - Number of slides to display at a given time.
@param src- Src element from the document
*/


const gallery_plugin = (dest,media,numDisplay,customView,classNames)=>{
    let destElmt = document.getElementById(dest);

    let state = 0;
    
    
    //Markup for each media item
    let nodes;
    let tiles = [];

    let displayNodes = 4;

    //Keep track of current tile index
    let tileIndex = 0;
    //reference to the content div
    let content;
    //Reference to gallery container
    let gallery;

    let nextBtn;
    let prevBtn;

    const ImageTile = function (url,id){
        let elmt = document.createElement('a');
        elmt.href = url;
        elmt.className = "gallery-item";

        let item = document.createElement('DIV');
        item.className = "gallery-item-container";
        
        let img = document.createElement('IMG');
        img.src = url;
        img.className = "gallery-image";

        item.appendChild(img);
        elmt.appendChild(item);

        const clone = function(){
            return new ImageTile(url,id);
        }

        const getId = ()=>{
            return id;
        }

        const object = function (){
            this.Element = elmt;
            this.clone = clone;
            this.Id = getId();
        }

        return new object;
    }

    const createGallery = ()=>{

        gallery = document.createElement('DIV');
        gallery.className = "gallery-container";

        let mask = document.createElement('DIV');
        mask.className = "gallery-mask";
        gallery.appendChild(mask);

        content = document.createElement('DIV');
        content.className = "gallery-content";

        mask.appendChild(content);
        
        destElmt.appendChild(gallery);
    }

    const setupNodes = () =>{
       for(let i = 0; i < displayNodes * 2; i++){
            nodes.Enqueue(tiles[i % tiles.length].clone());
       }
    }

    const renderNodes = ()=>{

        if(content.firstChild){
            gallery.prepend(prevBtn);
        }
        
        while(content.firstChild){
            content.removeChild(content.firstChild);
        }

        let fragment = document.createDocumentFragment();
        for(let i = 0 ; i < nodes.Size();i++){
            fragment.appendChild(nodes.Peek(i).Element);
        }
       

        content.appendChild(fragment);


    }

    const shiftNodes = (direction)=>{
        //See if the queue is at the correct size
        if(nodes.Size() < displayNodes * 3){
            enqueueNodes();
            return;
        }
        
        if(direction > 0){
            //Shift left
            enqueueNodes();
            for(let i = 0 ; i < displayNodes; i++){
                nodes.Dequeue();
            }
        }else{
            //Shift Right
            pushNodes();
            for(let i = 0 ; i < displayNodes; i++){
                nodes.Pop();
            }

        }
    }

    const enqueueNodes = ()=>{
        let start = nodes.Peek(nodes.Size()-1).Id + 1;
        for(let i = 0 ; i < displayNodes; i++){
            nodes.Enqueue(tiles[start % tiles.length].clone());
            start++;
        }
    }

    const pushNodes = ()=>{
        let start = nodes.Peek(0).Id - 1;
        for(let i = 0 ; i < displayNodes; i++){
            nodes.Push(tiles[Math.abs(start % tiles.length)].clone());
            start--;
        }
    }

    const NodesDeque = ()=>{

        let nodes = [];
        
        const enqueue = (node)=>{
            nodes.push(node);
        }

        const pop = ()=>{
            if(isEmpty()){
                return "Empty Queue"
            }
            return nodes.pop();
        }

        const dequeue = ()=>{
            if(isEmpty()){
                return "Empty Queue"
            }
            return nodes.shift();
        }

        const push = (node)=>{
            nodes.unshift(node);
        }

        const peek = (index)=>{
            if(isEmpty()){
                return "Empty Queue"
            }
            if(index > nodes.length){
                return "Out of Bounds";
            }
            return nodes[index];
        }

        const isEmpty = ()=>{
            if(nodes.length === 0){
                return true;
            }
            return false;
        }

        const size = ()=>{
            return nodes.length;
        }
        
        const object = function (){
            this.Peek = peek;
            this.Enqueue = enqueue;
            this.Dequeue = dequeue;
            this.Size = size;
            this.Push = push;
            this.Pop = pop;
            this.getnodes = nodes;
        }

        return new object;
    }



    const handleNext = ()=>{
        let transform = (content.style.transform).slice(12,16);
        if(!transform) {transform = 0};
        content.classList.toggle("animating");
        content.style.transform = `translate3d(${parseInt(transform) -100}%,0,0)`;
        content.setAttribute('next',"");
        nextBtn.removeEventListener('click',handleNext);

    }

    const handlePrev = ()=>{
        let transform = (content.style.transform).slice(12,16);
        if(!transform) {transform = 0};
        content.classList.toggle("animating");
        content.style.transform = `translate3d(${parseInt(transform)+100}%,0,0)`;
        prevBtn.removeEventListener('click',handlePrev);
        content.setAttribute('prev',"");
    }


    const init = ()=>{

        nodes = NodesDeque();
        createGallery();

        //Initialize the tiles
        tiles = media.map((item,index)=>{
            return ImageTile(item.url,index);
        });

        let numTiles = 4;

        setupNodes();
        renderNodes();

        nextBtn = btn("SPAN",`<i class="material-icons">chevron_right</i>`,handleNext,"handle handle-next");
        prevBtn = btn("SPAN",`<i class="material-icons">chevron_left</i>`,handlePrev,"handle handle-prev");
        
        gallery.appendChild(nextBtn);

        //Add event listeners
        content.addEventListener('transitionend',(e)=>{

            if(content.classList.contains("animating")){
                content.classList.remove("animating");
                
                if(content.hasAttribute('next')){
                    shiftNodes(1);
                    content.removeAttribute('next');
                    nextBtn.addEventListener('click',handleNext);
                }else if(content.hasAttribute('prev')){
                    shiftNodes(-1);
                    content.removeAttribute('prev');
                    prevBtn.addEventListener('click',handlePrev);
                }  
                renderNodes();
                content.style.transform = "translate3d(-100%,0,0)";
            }
            });

    }
    const plugin = function(){
        //Initialize the plugin
        init();
        this.getnodes = nodes;

    }
    return new plugin;

}

