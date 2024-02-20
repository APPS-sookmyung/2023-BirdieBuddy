import {$} from "../src/util.js";
import {buttonline} from "../src/buttonline.js"
buttonline();

function pauseEvent(e){
    if(e.stopPropagation) e.stopPropagation();
    if(e.preventDefault) e.preventDefault();
    e.cancelBubble=true;
    e.returnValue=false;
    return false;
}
$("#cropWorkSpace").addEventListener("mousedown",(e)=>{pauseEvent(e)});
$("#cropWorkSpace").addEventListener("mousemove",(e)=>{pauseEvent(e)});


var openFile = function(file) {
    var input = file.target;
    var reader = new FileReader();
    reader.onload = function(){
        var dataURL = reader.result;
        for(let i=0; i<input.files.length; i++){
            let addedImg = `
            <div class="img" onmouseover="displayOptions(event)" onmouseleave="hideOptions(event)">
                <div class="imgOptions">
                    <img src="../UI/greyStar.png" class="option greyStar" onclick="changeStar(event)">
                    <img src="../UI/X.png" class="option" onclick="deletePic(event)">
                </div>
                <img src="` + URL.createObjectURL(input.files[i]) + `" class="output">
            </div>`
            $("#imgs").insertAdjacentHTML("beforeend",addedImg);
        }
    };
    reader.readAsDataURL(input.files[0]);
};

$("#fileButton").addEventListener("change", (e)=>{
    openFile(e);
});

