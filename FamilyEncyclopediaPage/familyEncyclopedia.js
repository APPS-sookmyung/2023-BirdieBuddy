import {$} from '../src/util.js'
import { buttonline } from '../src/buttonline.js';

buttonline();

let encyclopedia = [];
fetch('./familyEncyclopedia.json')
    .then((response) => {return response.json();})
    .then((json) => { return json["data"].sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))})
    .then((sorted)=>{ sorted.forEach(sort=>encyclopedia.push(sort));addFamilyLog(sorted)})

function addFamilyLog(dataLog){
    dataLog.forEach(data=>{
        console.log(data);
        let addFamily = `
            <li class="family"><a href="../FamilySearchPage/familySearch.html">${data}<span class="birdSciName"></span></a></li>
        `
        $("#familyList").insertAdjacentHTML("beforeend", addFamily);
    })
}
$("#searchBoxInput").addEventListener("keyup", ()=>{
    console.log("pressed!");
    document.querySelectorAll(".family").forEach(info=>{info.remove();})
    let search = $("#searchBoxInput").value;
    
    encyclopedia.forEach(data => {
        if (data.includes(search)){
            let addFamily = `
                <li class="family"><a href="../FamilySearchPage/familySearch.html">${data}<span class="birdSciName"></span></a></li>
            `;
            $("#familyList").insertAdjacentHTML("beforeend", addFamily);
        }
    })
})