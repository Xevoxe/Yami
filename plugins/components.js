`use-strict`;

const btn = (type,html,onClick,className)=>{  
    let elmt = document.createElement(type);
    if(className){
        elmt.className = className;
    }
    elmt.innerHTML = html;
    elmt.addEventListener('click',onClick);
    return elmt;
}
