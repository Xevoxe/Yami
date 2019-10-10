const logView = ({author,date,title,summary})=>{
    date = new Date(Date.parse(date));
return (
        `
                <h3>${title}</h3>
                <p class="blog-details"><span class="primary">${author} </span><span>on ${date.toLocaleDateString(undefined,{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}</span></p>
                <p>${summary}</p>
        `
)};

const handleClickLog = (devlog)=>{
    document.body.appendChild(renderLogModal(devlog));
}

const handleModalClose = ()=>{
    console.log("Close");
    let modal = document.getElementById('modal-container');
    modal.remove();
}

const renderLogModal = (devlog)=>{
    let fragment = document.createDocumentFragment();
    
    let modal = document.createElement('Div');
    modal.id ="modal-container";
    modal.className ="log-modal-container";
    
    let inner = document.createElement('Div');
    inner.className="modal-inner";
    inner.innerHTML = devlog;

    // let closeBtn = document.createElement('I');
    // closeBtn.className = "modal-close-btn material-icons";
    // closeBtn.textContent = "close";

    // let btncontainer = document.createElement('Div');
    // btncontainer.className ="btn-container";

    // btncontainer.appendChild(closeBtn);
    // modal.appendChild(btncontainer);
    modal.appendChild(inner);
    modal.addEventListener('click',handleModalClose);

    fragment.appendChild(modal);
    return fragment;
}





const renderLogs = (data)=>{
    let fragment = document.createDocumentFragment();

    for(let i = 0; i < 2; i++){
        if(data[i]){
            let container = document.createElement('div');
            container.className="section-news";
            container.innerHTML = logView(data[i]);
            container.addEventListener('click', (e)=>{
                handleClickLog(data[i].link);
            })
            fragment.appendChild(container);
        }
    }
    document.getElementById('log-container').appendChild(fragment);
}

async function getData(url) {
    const response = await fetch(url);
    if(!response.ok){
        throw new Error(res.status);
    }
    return await response.json();
}

(async ()=>{
    try{
        let data = await getData(`https://yamicms-d339a.firebaseio.com/devlogs.json?orderBy="$key"&limitToLast=3`);
        console.log(data);
        data = data.reverse();
        renderLogs(data);
    }catch (err){
        console.log(err);
    }finally{
    }
 })();