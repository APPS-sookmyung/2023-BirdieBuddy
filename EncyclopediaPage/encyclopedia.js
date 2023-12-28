import { $ } from '../src/util.js';
const pageButton = document.getElementsByClassName("pageButton");
for (let i=0; i<pageButton.length;i++){
    if (pageButton[i].id != "currentButton"){
    pageButton[i].addEventListener("mouseover",function(){this.style.backgroundColor = "#DCEC97"})
    pageButton[i].addEventListener("mouseout",function(){this.style.backgroundColor = "#DAE2B6";})
    }
}

let encyclopedia = [];
fetch('./encyclopedia.json')
    .then((response) => response.json())
    .then((json) => {return json["data"].sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))})
    .then((sorted)=>{sorted.forEach(sort=>encyclopedia.push(sort)); addEncyclopediaLog(sorted)})

function addEncyclopediaLog(dataLog){
    dataLog.forEach(data => {
        let addData = `
        <div class="birdInfo">
            <image class="birdPic" src="${data["image"]}"></image>
            <div class="birdText">
                <div class="link" birdId="${data["id"]}"><p class="birdName">${data["name"]}<span class="birdSciName">(${data["sci_name"]})</span></p></div>
                <p class="birdExplanation">${data["content"]}</p>
            </div>
        </div>
        `;
        $("#main").insertAdjacentHTML("beforeend", addData);
    });
}

$("#searchBoxInput").addEventListener("keyup", ()=>{
    console.log("pressed!");
    document.querySelectorAll(".birdInfo").forEach(info=>{info.remove();})
    let search = $("#searchBoxInput").value;
    
    encyclopedia.forEach(data => {
        if (data["name"].includes(search)){
            let addData = `
            <div class="birdInfo">
                <image class="birdPic" src="${data["image"]}"></image>
                <div class="birdText">
                    <div class="link" birdId="${data["id"]}"><p class="birdName">${data["name"]}<span class="birdSciName">(${data["sci_name"]})</span></p></div>
                    <p class="birdExplanation">${data["content"]}</p>
                </div>
            </div>
            `;
            $("#main").insertAdjacentHTML("beforeend", addData);
        }
    })
})
async function callPage(element){
    return element.getAttribute("birdId");
}

document.querySelector("#main").addEventListener("click",(e)=>{
    if (e.target.className=="birdName"||e.target.className=="birdSciName"){
        console.log(e.target.closest(".link").getAttribute("birdId"));
        callPage(e.target.closest(".link"))
            .then(id => {
                localStorage.setItem("pageId", id);
            })
            .then(r => {
                window.location.href = "../BirdPage/bird.html";
            })
        
    }
    
})