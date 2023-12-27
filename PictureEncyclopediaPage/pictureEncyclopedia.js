import {$} from '../src/util.js'
import {buttonline} from '../src/buttonline.js';
buttonline();
let questionNum = 0;
let jsonReference = "habitats";
let encyclopedia = [];
let checked = [];

const question = {
    "서식지": 
        [{"논밭":"./img/ricefield.png"},
        {"바다":"./img/ocean.png"},
        {"산":"./img/mountain.png"},
        {"강":"./img/river.png"},
        {"갈대":"./img/reeds.png"},
        {"연못":"./img/pond.png"},
        {"호수":"./img/lake.png"},
        {"습지":"./img/wetland.png"},
        {"모르겠음":"./img/questionmark.png"}],
    "크기":
        [{"참새":"./img/sparrow.png"},
        {"직박구리":"./img/brownearedbulbul.png"},
        {"비둘기":"./img/pigeon.png"},
        {"까마귀":"./img/largebilledcrow.png"},
        {"중백로":"./img/greategret.png"},
        {"왜가리":"./img/heron.png"}]
}

function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

function makeQuestion(){
    switch (questionNum) {
        case 0:
            jsonReference = "habitats";
            break;
        case 1:
            jsonReference = "size_tag";
            break;
        default:
            return;
    }
    let qName = Object.keys(question)[questionNum];
    $("#questionName").innerHTML = "<span>Q.</span>" + qName;
    
    let objNum = 1;
    question[qName].forEach(q=>{
        let addquestion = `
        <div class="question">
            <label class="questionLabel">
                <div>
                    <input type="checkbox" class="questionCheckbox" name="answer" value="${Object.keys(q)}" qdata="${objNum}">
                    <img src="${Object.values(q)}" class="answerImg">
                </div>
            </label>
            <p class="answerExplain">${Object.keys(q)}</p>
        </div>
        `;
        $("#submitAnswer").insertAdjacentHTML("beforebegin",addquestion)
        objNum ++;
    })
    document.querySelectorAll(".questionCheckbox").forEach(q=>{
        q.addEventListener("click",()=>{
            q.parentElement.parentElement.style.outline = "2px solid #f00";
            if (q.checked)
                q.parentElement.parentElement.style.outline = "2px solid #f00";
            else
                q.parentElement.parentElement.style.outline = "none";
                
        })
    })
    questionNum ++;
    if (questionNum==2){
        $("#submitAnswer").remove();
    }
}

makeQuestion();
$("#submitAnswer").addEventListener("click", ()=>{
    document.querySelectorAll(".question").forEach(q=>q.remove());
    let currentPage = [];
    document.querySelectorAll(".birdInfo").forEach(i=>{
        encyclopedia.forEach(e => {
            if (e["name"] == i.querySelector(".birdName").innerText){
                currentPage.push({
                    "name": e["name"],
                    "sci_name": e["sci_name"],
                    "image": e["image"],
                    "content": e["content"],
                    "size_tag": e["size_tag"],
                    "habitats": e["habitats"]
                })
            }
        })
    })
    encyclopedia = currentPage
    document.querySelectorAll(".birdInfo").forEach(q=>q.remove());
    addEncyclopediaLog(encyclopedia);
    makeQuestion();
    checked = [];
})


fetch('./pictureEncyclopedia.json')
    .then((response) => response.json())
    .then((json) => {return json["data"].sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))})
    .then((sorted)=>{sorted.forEach(sort=>encyclopedia.push(sort)); addEncyclopediaLog(sorted)})

function addEncyclopediaLog(dataLog){
    dataLog.forEach(data => {
        let addData = `
        <div class="birdInfo">
            <image class="birdPic" src="${data["image"]}"></image>
            <div class="birdText">
                <a href="../BirdPage/bird.html"><p class="birdName">${data["name"]}</p><p class="birdSciName">(${data["sci_name"]})</p></a>
                <p class="birdExplanation">${data["content"]}</p>
            </div>
        </div>
        `;
        $("#main").insertAdjacentHTML("beforeend", addData);
    });
}


let checker = (arr, target) => target.every(v => arr.includes(v));
$("#questions").addEventListener("click", (e)=>{
    if (e.target.className=="questionCheckbox"){
        if (e.target.checked){
            document.querySelectorAll(".questionCheckbox").forEach(q=>{
                if (q.checked && !checked.includes(parseInt(e.target.getAttribute("qdata")))){
                    checked.push(parseInt(e.target.getAttribute("qdata")));
                    console.log(checked);
                }
            })
            document.querySelectorAll(".birdInfo").forEach(q=>q.remove());
            encyclopedia.forEach(data=>{
                if (checked.every(r => data[jsonReference].includes(r))){
                    let addData = `
                    <div class="birdInfo">
                        <image class="birdPic" src="${data["image"]}"></image>
                        <div class="birdText">
                            <a href="../BirdPage/bird.html"><p class="birdName">${data["name"]}</p><p class="birdSciName">(${data["sci_name"]})</p></a>
                            <p class="birdExplanation">${data["content"]}</p>
                        </div>
                    </div>
                    `;
                    $("#main").insertAdjacentHTML("beforeend", addData);
                }
            })
        } else{
            removeItemOnce(checked, parseInt(e.target.getAttribute("qdata")));
            document.querySelectorAll(".birdInfo").forEach(q=>q.remove());
            encyclopedia.forEach(data=>{
                if (checked.every(r => data[jsonReference].includes(r))){
                    let addData = `
                    <div class="birdInfo">
                        <image class="birdPic" src="${data["image"]}"></image>
                        <div class="birdText">
                            <a href="../BirdPage/bird.html"><p class="birdName">${data["name"]}<span class="birdSciName">(${data["sci_name"]})</span></p></a>
                            <p class="birdExplanation">${data["content"]}</p>
                        </div>
                    </div>
                    `;
                    $("#main").insertAdjacentHTML("beforeend", addData);
                }
            })
        }
    }
})
