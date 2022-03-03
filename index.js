const saveBtn    = document.getElementById('input-btn');
const inputEl    = document.getElementById('input-el');
const ulEl       = document.getElementById('ul-el');
const delBtn     = document.getElementById('delete-btn');
const saveTabBtn = document.getElementById('tab-btn');
let myLeads = [];

//Convert json to Array (JON.parse)
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}


function render(leads){
    myLeads = leads;
    let listItems =""
    myLeads.forEach(lead => {
        listItems += `
        <li>
            <a href="${lead}" target='blank'>
            ${lead}
            </a>
        </li>
        `
    })

    ulEl.innerHTML = listItems
}

saveTabBtn.addEventListener('click', ()=> {
    //Grab URL of current tab. Google will send us an array 'tabs'
    //on a callback when he founds the active&current tab. So, there will be only 1 element 
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})

saveBtn.addEventListener('click', ()=>{
    myLeads.push(inputEl.value);     
    inputEl.value = "";
    let JSONleads = JSON.stringify(myLeads);
    localStorage.setItem('myLeads', JSONleads);
    render(myLeads);
})

delBtn.addEventListener('dblclick', ()=> {
    localStorage.clear();
    myLeads= [];
    render(myLeads);
})

