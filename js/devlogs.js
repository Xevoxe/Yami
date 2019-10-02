
   
async function getData(url) {
    const response = await fetch(url);
    if(!response.ok){
        throw new Error(res.status);
    }
    return await response.json();
}

const loaded = ()=> {
    document.getElementById("spinner").style.display = 'none';
}
const loading = ()=> {
    document.getElementById("spinner").style.display = 'block';
}

const renderLogItemView = ({author,date,title,thumb,link,summary},key)=>{

    let row = document.createElement('DIV');
    let detailsCol = document.createElement('DIV');

    row.className="dev-log-item";

    let imgThumb = document.createElement('IMG');
    imgThumb.src = `img/tlogosm.PNG`;
    imgThumb.alt = `Dev-Log: ${title}`;

    let titleElmt = document.createElement('H3');
    titleElmt.textContent= title;

    let captionElmt = document.createElement('p');
    captionElmt.className ="blog-details";
    date = new Date(Date.parse(date));
    let dateElmt = document.createElement('span');
    dateElmt.textContent = `on ${date.toLocaleDateString(undefined,{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`;

    let authorElmt = document.createElement('SPAN');
    authorElmt.textContent = `By ${author} `;
    captionElmt.appendChild(authorElmt);
    captionElmt.appendChild(dateElmt);
    
    
    let summaryElmt = document.createElement('p');
    summaryElmt.textContent = summary;

    detailsCol.appendChild(titleElmt)
    detailsCol.appendChild(summaryElmt);
    detailsCol.appendChild(captionElmt);

    row.appendChild(imgThumb);
    row.appendChild(detailsCol);

    //Add event listeners
    row.addEventListener('click',(e)=>{
        handleClickLog(link);
    });

    row.setAttribute('key',key);
    return row;

}

const handleClickLog = (devlog)=>{
    renderLogModal(devlog);
}

const handleModalClose = ()=>{
    let modal = document.getElementById('log-modal');
    modal.removeChild(modal.childNodes[0]);
}

const renderLogModal = (devlog)=>{
    let dest = document.getElementById('log-modal');
    let fragment = document.createDocumentFragment();
    
    let modal = document.createElement('Div');
    modal.className = "log-modal-container";
    
    let inner = document.createElement('Div');
    inner.className="modal-inner";
    inner.innerHTML = devlog;

    let closeBtn = document.createElement('I');
    closeBtn.className = "modal-close-btn material-icons";
    closeBtn.textContent = "close";

    modal.appendChild(closeBtn);
    modal.appendChild(inner);

    fragment.appendChild(modal);
    dest.appendChild(fragment);
    dest.addEventListener('click',handleModalClose);

}

const renderLogContainer = (data)=>{
    let dest = document.getElementById('devlogs')
    let container = document.createDocumentFragment();
    
    let list = document.createElement('ul');

    //loop through data and render log items
    for(let x = 0 ; x < data.length; x++){
        if(data[x]){
            let listItem = document.createElement('li');
           listItem.appendChild(renderLogItemView(data[x],x));
           list.appendChild(listItem);
       }else{
            break;
        }
    }
    container.appendChild(list);
    dest.appendChild(container);


}

const renderData = (data) =>{
    let dest = document.getElementById('devlogs');
     //loop through data and render log items
     for(let x = 0 ; x < data.length; x++){
        if(data[x]){
            let listItem = document.createElement('li');
           listItem.appendChild(renderLogItemView(data[x],x+1));
           dest.appendChild(listItem);
       }else{
            break;
        }
    }
}

async function renderMore (entry,observer){
    let visiblePct = (Math.floor(entry[0].intersectionRatio * 100)) + "%";
    console.log(visiblePct);

    // if(entry[0].isIntersecting){
        // if(entry[0].intersectionRatio >= 1.0){
        //     let logs = document.getElementsByClassName('dev-log-item');
        //     let end = logs[logs.length-1].getAttribute('key');
        //     console.log(end);
        //     let start = logs.length - end;
        //     console.log(start);
        //     try{
        //         loading();
        //         let data = await getData(`https://yamicms-d339a.firebaseio.com/devlogs.json?orderBy="$key"&"&endAt="${start}"&limitToLast=3`);
        //         data = data.reverse();
        //         console.log(data);
        //         renderData(data);
        //     }catch (err){
        //         console.log(err);
        //     }finally{
        //         loaded();
        //     }
        // }
    // }
}

(async ()=>{
    //keeps track of pagination
    try{
        let data = await getData(`https://yamicms-d339a.firebaseio.com/devlogs.json?orderBy="$key"&limitToLast=3`);
        data = data.reverse();
        renderLogContainer(data);
    }catch (err){
        console.log(err);
    }finally{
        loaded();
        let options = {
            root: null,
            rootMargin: '0px',
            threshold: 1.0
          }
          
          let observer = new IntersectionObserver(renderMore, options);
          console.log(observer);
          let logs = document.getElementsByClassName('dev-log-item');
          observer.observe(logs[logs.length-1]);

    }
 })();