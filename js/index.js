

const logView = ({author,date,title,thumb,link,summary})=>{
    let section = document.createElement('div');
    let titleElmt = document.createElement('h3');
    let detailsElmt = document.createElement('p');
    let authorElmt = document.createElement('span');
    let dateElmt = document.createElement('span');
    let summaryElmt = document.createElement('p');

    section.className = 'section-news';
    detailsElmt.className = 'blog-details';

    titleElmt.textContent = title;
    section.appendChild(titleElmt)

    authorElmt.textContent = author;
    date = new Date(Date.parse(date));
    dateElmt.textContent = `on ${date.toLocaleDateString(undefined,{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`;
    detailsElmt.appendChild(authorElmt);
    detailsElmt.appendChild(dateElmt);

    summaryElmt.textContent = summary;

    section.appendChild(detailsElmt);
    section.appendChild(summaryElmt);
  
    return section;
}

const renderLogs = (data)=>{
    let fragment = document.createDocumentFragment();

    for(let i = 0; i < 2; i++){
        if(data[i]){
            fragment.appendChild(logView(data[i]));
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